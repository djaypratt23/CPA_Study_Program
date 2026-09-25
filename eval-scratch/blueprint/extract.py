"""
Extract Area -> Group -> Topic -> representative tasks (with skill level) from the AICPA Blueprint PDFs.
Skill levels are graphical checkmarks, so each page is rendered to a 72-dpi grayscale image and the four
skill columns are probed for ink beside each task's text block.
Usage (repo root):  python3 eval-scratch/blueprint/extract.py <dir-with-CPA_Blueprint___*.pdf> <out-dir>
Output: <out-dir>/<SEC>.json. The PDFs and their text are AICPA copyright: keep outputs out of git.
Requires poppler-utils (pdftotext, pdftoppm).
"""
import glob, html, json, os, re, subprocess, sys, tempfile

SKILL_COLS = [('remembering', 203, 279), ('application', 279, 329), ('analysis', 329, 379), ('evaluation', 379, 430)]
TASK_X = 430      # task text starts right of this
TOPIC_X = 200     # topic labels live left of this

def lines_of(pdf, page):
    out = subprocess.run(['pdftotext', '-f', str(page), '-l', str(page), '-bbox-layout', pdf, '-'], capture_output=True, text=True).stdout
    res = []
    for m in re.finditer(r'<line xMin="([\d.]+)" yMin="([\d.]+)" xMax="([\d.]+)" yMax="([\d.]+)">(.*?)</line>', out, re.S):
        words = re.findall(r'<word[^>]*>(.*?)</word>', m.group(5), re.S)
        text = html.unescape(' '.join(words)).strip()
        if text:
            res.append(dict(x0=float(m.group(1)), y0=float(m.group(2)), x1=float(m.group(3)), y1=float(m.group(4)), text=text))
    return sorted(res, key=lambda l: (round(l['y0']), l['x0']))

def raster(pdf, page):
    with tempfile.TemporaryDirectory() as d:
        subprocess.run(['pdftoppm', '-f', str(page), '-l', str(page), '-r', '72', '-gray', pdf, os.path.join(d, 'p')], check=True)
        f = glob.glob(os.path.join(d, 'p*.pgm'))[0]
        data = open(f, 'rb').read()
    # P5 header
    parts = data.split(b'\n', 3)
    w, h = map(int, parts[1].split())
    px = parts[3]
    return w, h, px

def ink(img, x0, x1, y0, y1, thr=120):
    w, h, px = img
    n = 0
    for y in range(max(0, int(y0)), min(h, int(y1) + 1)):
        row = y * w
        # skip horizontal rules (dark across most of the skill band)
        if sum(1 for x in range(205, 428) if px[row + x] < thr) > 120:
            continue
        for x in range(int(x0), int(x1)):
            if px[row + x] < thr:
                n += 1
    return n

def extract(pdf):
    npages = int(re.search(r'Pages:\s+(\d+)', subprocess.run(['pdfinfo', pdf], capture_output=True, text=True).stdout).group(1))
    areas, area, group, topic = [], None, None, None
    for p in range(1, npages + 1):
        ls = lines_of(pdf, p)
        head = [l for l in ls if 45 < l['y0'] < 120 and l['x0'] < 120]
        htxt = ' '.join(l['text'] for l in head)
        m = re.search(r'Area ([IVX]+) [–-] (.*?)\s*\((\d+)[–-](\d+)%\)', htxt)
        if not m:
            continue
        if m and (not area or area['id'] != m.group(1)):
            area = dict(id=m.group(1), title=m.group(2).strip(), min=int(m.group(3)), max=int(m.group(4)), groups=[])
            areas.append(area)
        img = raster(pdf, p)
        hdr = [l['y1'] for l in ls if l['text'].startswith('Representative Task')]
        top = (max(hdr) + 6) if hdr else 150
        body = [l for l in ls if top < l['y0'] < 565]
        # group header rows: text at x<200 starting 'A.' etc., drawn in a dark bar
        tasks_lines = [l for l in body if l['x0'] >= TASK_X]
        left = [l for l in body if l['x0'] < TOPIC_X]
        # build task blocks
        blocks, cur = [], None
        for l in tasks_lines:
            if cur and l['y0'] - cur['y1'] < 4.5:
                cur['text'] += ' ' + l['text']; cur['y1'] = max(cur['y1'], l['y1'])
            else:
                cur = dict(y0=l['y0'], y1=l['y1'], text=l['text']); blocks.append(cur)
        # merge left-column items into a timeline with blocks
        events = [('L', l['y0'], l) for l in left] + [('T', b['y0'], b) for b in blocks]
        events.sort(key=lambda e: (e[1] - (4 if e[0] == 'L' else 0), 0 if e[0] == 'L' else 1))
        for kind, _, obj in events:
            if kind == 'L':
                t = obj['text']
                mg = re.match(r'^([A-Z])\.\s*(.*)', t)
                mt = re.match(r'^(\d+)\.\s*(.*)', t)
                if mg:
                    if area['groups'] and area['groups'][-1]['id'] == mg.group(1):
                        group = area['groups'][-1]  # "(continued)" on a new page
                        topic = group['topics'][-1] if group['topics'] else None
                        if topic is not None: topic['_y'] = -999
                    else:
                        group = dict(id=mg.group(1), title=mg.group(2), topics=[]); area['groups'].append(group); topic = None
                elif mt:
                    if group['topics'] and group['topics'][-1]['id'] == mt.group(1):
                        topic = group['topics'][-1]; topic['_y'] = -999  # "(continued)"
                    else:
                        topic = dict(id=mt.group(1), title=mt.group(2), tasks=[]); group['topics'].append(topic)
                elif topic is not None and obj['y0'] - topic.get('_y', 0) < 30:
                    topic['title'] += ('' if re.fullmatch(r'[A-Z]', topic['title']) else ' ') + t.lstrip()
                elif group is not None and not group['topics'] and topic is None:
                    group['title'] += ' ' + t
                if topic is not None and mt and topic.get('_y') != -999:
                    topic['_y'] = obj['y0']
            else:
                pad = 5
                counts = {name: ink(img, a + 3, b - 3, obj['y0'] - pad, obj['y1'] + pad) for name, a, b in SKILL_COLS}
                skills = [k for k, v in counts.items() if v >= 6]
                target = topic
                if target is None:  # group without numbered topics
                    if group is None:
                        continue
                    if not group['topics'] or group['topics'][-1]['id'] not in ('-',):
                        group['topics'].append(dict(id='-', title=group['title'], tasks=[]))
                    target = group['topics'][-1]
                target['tasks'].append(dict(text=obj['text'], skills=skills, ink=counts, page=p))
    for a in areas:
        for g in a['groups']:
            for t in g['topics']:
                t.pop('_y', None)
    return areas

if __name__ == '__main__':
    src, out = sys.argv[1], sys.argv[2]
    os.makedirs(out, exist_ok=True)
    for pdf in sorted(glob.glob(os.path.join(src, '*CPA_Blueprint___*.pdf'))):
        sec = re.search(r'___([A-Z]{3})', pdf).group(1)
        areas = extract(pdf)
        json.dump(areas, open(os.path.join(out, sec + '.json'), 'w'), indent=1)
        nt = sum(len(t['tasks']) for a in areas for g in a['groups'] for t in g['topics'])
        bad = sum(1 for a in areas for g in a['groups'] for t in g['topics'] for k in t['tasks'] if len(k['skills']) != 1)
        print(sec, 'areas', len(areas), 'groups', sum(len(a['groups']) for a in areas), 'topics', sum(len(g['topics']) for a in areas for g in a['groups']), 'tasks', nt, 'tasks without exactly one skill', bad)

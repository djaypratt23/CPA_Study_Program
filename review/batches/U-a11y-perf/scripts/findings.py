#!/usr/bin/env python3
"""Source of truth for U-a11y-perf findings. Run to (re)write findings.jsonl and ledger.csv."""
import json, os

OUT = os.path.join(os.path.dirname(__file__), '..')
F = []


def add(sev, cat, item, file, issue, evidence, fix, conf='high', source='', module='', section='ALL'):
    F.append(dict(severity=sev, category=cat, section=section, module=module, item=item, file=file, issue=issue,
                  evidence=evidence, source=source, fix=fix, confidence=conf))


S = 'review/screens/'

# ---------------- axe-core (4.14, tags wcag2a/aa, wcag21a/aa, wcag22aa, best-practice), 4 viewport x theme runs ----------------
add('S3', 'accessibility', '/welcome (onboarding steps 1-3), /exam/:id results', 'src/pages/Onboarding.tsx; src/pages/ExamPlayer.tsx',
    'Onboarding and the mock-exam results page render outside <Layout>, so they have no <main> landmark and all of their content sits outside any landmark. Screen-reader users who jump to "main" land nowhere on the first screen of the app and on the exam score page.',
    'axe landmark-one-main (target "html") + region on all 3 onboarding steps and on exam-results (region: 16 nodes, e.g. "a[href=\'#/\']" "← Home", "h1" "Simulated exam results", ".my-6" score card) in all 4 runs (desktop/phone x light/dark). Screens: '
    + S + 'ua-axe-d-l-01-onboarding-1.png, ' + S + 'ua-axe-d-l-34-exam-results.png; raw: review/batches/U-a11y-perf/axe/axe-*.json. Expected: one <main> per page. Observed: none. Steps: fresh profile -> #/welcome; or finish a mock -> #/exam/<id>.',
    'Wrap the Onboarding root <div> and the ExamResults root <div> in <main> (e.g. change the outer element to <main className=...>).',
    source='WCAG 2.2 SC 1.3.1, 2.4.1 (axe best-practice landmark-one-main, region)')

add('S3', 'accessibility', '/exam/:id (MCQ testlet, TBS testlet, submit confirmation)', 'src/pages/ExamPlayer.tsx',
    'While an exam testlet is running the page has no h1 (and the MCQ testlet has no heading at all: "Question 1 of 25" is a <span>). Heading navigation, the most common way screen-reader users orient on a page, finds nothing during the MCQ testlets.',
    'axe page-has-heading-one on exam-mcq, exam-tbs and exam-submit-confirm in all 4 runs. Screens: ' + S + 'ua-axe-d-l-27-exam-mcq.png, ' + S + 'ua-axe-d-l-30-exam-tbs.png. Accessibility tree of the MCQ testlet: review/batches/U-a11y-perf/aria/exam-mcq.yml (no heading nodes).',
    'Add a visually hidden <h1> such as "FAR simulated exam — testlet 1 of 5" to ExamRunner, and render "Question n of N" in McqView as an <h2> (or role="heading" aria-level=2) when index/total are given.',
    source='WCAG 2.2 SC 1.3.1, 2.4.6 (axe best-practice page-has-heading-one)')

add('S4', 'accessibility', '/module/:id (lessons with worked or faded examples), /final-review docs', 'src/components/LessonBlocks.tsx',
    'Worked-example and faded-example titles are <h4> directly under the lesson\'s <h2> sections, skipping h3, so the heading outline is broken in every lesson that has these blocks.',
    'axe heading-order (3 nodes) on #/module/far-income-statement-oci in all 4 runs: "section[aria-label=\'Worked example: A euro payable\'] > h4", ".border-violet-200 > h4" ("Your turn — build the statement"). Screen: ' + S + 'ua-axe-d-l-06-lesson.png.',
    'Use <h3> for WorkedExample/FadedExample titles (keep the visual style with the existing classes).',
    source='WCAG 2.2 SC 1.3.1 (axe best-practice heading-order)')

add('S3', 'accessibility', '/tbs/:id desktop split view (exhibit panel); /tbs/:id after submit (journal table)', 'src/components/TbsView.tsx',
    'In the desktop split view the exhibit panel is its own scroll container (max-h calc(100dvh-5rem), overflow-y-auto) with no focusable content, and after submitting, the journal-entry table wrapper (overflow-x-auto) contains only disabled inputs. Browsers that do not auto-focus scrollers (Safari; Chrome before 130) give keyboard users no way to scroll a long exhibit or the wide table.',
    'axe scrollable-region-focusable (serious): "div.min-h-0.overflow-y-auto[role=tabpanel]" on #/tbs/far-tbs-u1-statement-review and "section:nth-child(3) > .overflow-x-auto" on #/tbs/far-tbs-r3-deferred-tax after Submit, desktop light+dark. Screens: '
    + S + 'ua-axe-d-l-24-tbs-review.png, ' + S + 'ua-axe-d-l-25-tbs-results.png.',
    'Give both scroll containers tabIndex={0}, an accessible name (the exhibit panel already has aria-label on its <aside>; add aria-labelledby to the tabpanel pointing at the exhibit <h2>), and a visible focus style.',
    conf='medium', source='WCAG 2.2 SC 2.1.1 (axe scrollable-region-focusable)')

add('S4', 'accessibility', 'dark theme: every btn-primary on hover (e.g. /welcome step 3 "Build my plan")', 'src/index.css',
    'In dark mode the primary button\'s hover colour (dark:hover:bg-blue-500, #2b7fff) gives white 14px semibold text 3.76:1, below 4.5:1. The resting colour passes.',
    'axe color-contrast on ".btn-primary" "Build my plan" (fg #ffffff, bg #2b7fff, 3.76:1, expected 4.5:1), desktop dark run, mouse resting on the button. Screen: ' + S + 'ua-axe-d-d-03-onboarding-3.png.',
    'Use a darker hover in dark mode (dark:hover:bg-blue-700, or keep blue-600 and change only the border/shadow on hover).',
    source='WCAG 2.2 SC 1.4.3')

# ---- MORE ----


def write():
    with open(os.path.join(OUT, 'findings.jsonl'), 'w') as fh:
        for i, f in enumerate(F, 1):
            fh.write(json.dumps({'id': f'U-a11y-perf-{i:03d}', **f}, ensure_ascii=False) + '\n')
    with open(os.path.join(OUT, 'ledger.csv'), 'w') as fh:
        fh.write('id,type,reviewed,findings_count,note\n')
    print(len(F), 'findings written')


if __name__ == '__main__':
    write()

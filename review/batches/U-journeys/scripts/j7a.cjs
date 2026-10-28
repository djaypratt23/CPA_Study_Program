const L = require('./lib.cjs');
const { dayKey } = { dayKey: (d) => d.toISOString().slice(0, 10) };
const today = new Date(); const add = (n) => { const d = new Date(today); d.setDate(d.getDate() + n); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; };
async function setDate(page, v) { await page.goto(L.BASE + '#/settings'); await page.waitForTimeout(500); await page.fill('#d-FAR', v); await page.waitForTimeout(400); }
async function setMinutes(page, arr) { await page.goto(L.BASE + '#/settings'); await page.waitForTimeout(500); for (let i = 0; i < 7; i++) await page.locator(`#sm${i}`).fill(String(arr[i])); await page.waitForTimeout(400); }
async function report(page, tag, vp) {
  await page.goto(L.BASE + '#/'); await page.waitForTimeout(900);
  const dash = (await L.text(page)).replace(/Skip to content[\s\S]*?Settings\n/, '');
  await L.shot(page, `j7a-${vp}-${tag}-dashboard`);
  await page.goto(L.BASE + '#/plan'); await page.waitForTimeout(900);
  const plan = (await L.text(page)).replace(/Skip to content[\s\S]*?Settings\n/, '');
  await L.shot(page, `j7a-${vp}-${tag}-plan`);
  const days = await page.locator('ol > li.card').count();
  console.log(`== ${vp} ${tag}\nDASH: ${dash.slice(0, 420).replace(/\n+/g, ' | ')}\nPLAN: ${plan.slice(0, 900).replace(/\n+/g, ' | ')}\nplan days: ${days}`);
}
(async () => {
  const b = await L.launch();
  for (const [vp, opts] of [['d', L.DESKTOP], ['m', L.PHONE]]) {
    const { ctx, page } = await L.newPage(b, opts, 'j7a-' + vp);
    // exam date tomorrow chosen during onboarding
    await L.onboard(page, { section: 'FAR', date: add(1) });
    await report(page, 'tomorrow', vp);
    if (vp === 'm') { await ctx.close(); continue; }
    await setDate(page, add(0)); await report(page, 'today', vp);
    await setDate(page, add(-10)); await report(page, 'past', vp);
    await setDate(page, ''); await report(page, 'nodate', vp);
    await setDate(page, '2027-01-15');
    await setMinutes(page, [60, 0, 0, 0, 0, 0, 0]); await report(page, '1h-week', vp);
    // max out every slider
    await setMinutes(page, [360, 360, 360, 360, 360, 360, 360]);
    const maxTxt = await page.locator('#sm0').getAttribute('max');
    console.log('slider max per day (min):', maxTxt, '=> max weekly hours', (Number(maxTxt) * 7) / 60);
    await L.shot(page, 'j7a-d-max-sliders', true);
    await report(page, '42h-week-max', vp);
    // exam in 3 days with large hours
    await setDate(page, add(3)); await report(page, '3days', vp);
    // far future: 2 years
    await setDate(page, add(800)); await report(page, '800days', vp);
    await ctx.close();
  }
  L.saveLogs('j7a');
  await b.close();
})().catch((e) => { console.error('FAIL', e); process.exit(1); });

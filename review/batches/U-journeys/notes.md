# U-journeys — usability review, journeys 1–8

Setup: `dist/` as built at HEAD, served by `vite preview --port 4173`. Driven with Playwright (global install, Chromium 1194, headless) at desktop 1366×900 and phone 390×844 (isMobile, hasTouch). A fresh browser context per journey; console errors, page errors and failed requests captured per journey into `logs/*.log`. Scripts are in `scripts/` (`lib.cjs` helpers, `jN.cjs` per journey, `findings_list.py` → `findings.jsonl`). Screenshots: `review/screens/uj-*.png`. The session was interrupted twice by usage limits; the preview server was restarted each time on the same port and same dist.

## Journey 1 — first visit, onboarding, first dashboard

# ---- Journey 1: first visit / onboarding ----
add('S3', 'ALL', '#/welcome', 'src/pages/Onboarding.tsx',
    'Discipline picker shows placeholder labels "BAR — BAR" and "ISC — ISC" because those sections have no content; the learner cannot tell what BAR/ISC are or that they have no material.',
    'review/screens/uj-j1-d-02-sections.png. Steps: fresh context -> #/welcome -> "Got it" -> open "Which discipline section will you take?" -> options read "BAR — BAR", "ISC — ISC", "TCP — Tax Compliance and Planning". Code: Onboarding.tsx falls back to `?? d` when content.sections lacks the id.',
    'Add a static name map (BAR = Business Analysis and Reporting, ISC = Information Systems and Controls) and suffix "(no content yet)" for sections not in content.sections.',
    expected='Full section names, with a note when a section has no content.', observed='"BAR — BAR", "ISC — ISC".',
    steps='Open #/welcome in a fresh context, click "Got it — set up my plan", open the discipline select.')

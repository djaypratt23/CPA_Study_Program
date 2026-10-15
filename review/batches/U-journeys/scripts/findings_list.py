# ---- Journey 1: first visit / onboarding ----
add('S3', 'ALL', '#/welcome', 'src/pages/Onboarding.tsx',
    'Discipline picker shows placeholder labels "BAR — BAR" and "ISC — ISC" because those sections have no content; the learner cannot tell what BAR/ISC are or that they have no material.',
    'review/screens/uj-j1-d-02-sections.png. Steps: fresh context -> #/welcome -> "Got it" -> open "Which discipline section will you take?" -> options read "BAR — BAR", "ISC — ISC", "TCP — Tax Compliance and Planning". Code: Onboarding.tsx falls back to `?? d` when content.sections lacks the id.',
    'Add a static name map (BAR = Business Analysis and Reporting, ISC = Information Systems and Controls) and suffix "(no content yet)" for sections not in content.sections.',
    expected='Full section names, with a note when a section has no content.', observed='"BAR — BAR", "ISC — ISC".',
    steps='Open #/welcome in a fresh context, click "Got it — set up my plan", open the discipline select.')

# ---- Journey 2: course and lesson ----
add('S3', 'ALL', '#/module/far-income-statement-oci', 'src/pages/ModulePage.tsx',
    'The lesson completion button promises "Mark complete & practice (28 questions)" but opens a 10-question set. The count is every practice item in the module (questionsForModule), while PracticeStart builds the set with count: 10.',
    'review/screens/uj-j2-d-09-before-complete.png (button label "Mark complete & practice (28 questions)"), review/screens/uj-j2-d-10-after-complete.png (quiz header "0/10 answered"). Steps: onboard FAR -> #/module/far-income-statement-oci -> scroll to "Finished reading?" -> click the button.',
    'Label the button with the set size actually served, e.g. "Mark complete & practice (10 questions)" (Math.min(10, practiceCount)), or "practice 10 of 28 questions".',
    expected='The button states the number of questions in the set it starts.', observed='Says 28; the set has 10.',
    steps='Open a lesson, click "Mark complete & practice (N questions)", compare N with the quiz header.')
add('S3', 'ALL', '#/module/far-income-statement-oci', 'src/hooks/useTextHighlights.ts',
    'Inline lesson questions each show a "Highlight selection" tool, but every McqView writes to one global CSS highlight ("exam-highlight"), so highlighting text in the second check question silently erases the highlight in the first. These question highlights are also ephemeral, while the lesson\'s own "Save highlight" is persistent: two unrelated highlight behaviours on one page.',
    'review/screens/uj-j2b-d-03-check1-highlight-after-check2.png. Steps (desktop): open #/module/far-income-statement-oci, select the first words of check 1\'s stem, click its "Highlight selection" (CSS.highlights.get("exam-highlight").size = 1), do the same in check 2 -> size is still 1 and check 1\'s highlight is gone.',
    'Hide the ephemeral highlight tool on inline lesson questions (showTools=false should cover it), or key the CSS highlight name per question (e.g. `exam-highlight-${q.id}` registered in CSS) so instances do not overwrite each other.',
    expected='Highlights in one inline question survive highlighting another, or the tool is not offered in lessons.', observed='Only the latest question keeps its highlight.',
    steps='Highlight text in two different "Check your understanding" questions on one lesson.')
add('S4', 'ALL', '#/module/far-income-statement-oci', 'src/pages/ModulePage.tsx',
    'Saved lesson highlights appear only in a list at the bottom of the page; the highlighted passage is not marked in the lesson text, and text in the warm-up question, "big idea" box and key takeaways cannot be highlighted (selection there shows no "Save highlight" button) although the tip says "select any text in the lesson".',
    'review/screens/uj-j2b-d-01-body-selection.png, review/screens/uj-j2b-d-02-highlight-list.png, review/screens/uj-j2-d-07-selection.png. Steps: select a sentence in the body -> "Save highlight" -> no <mark>/CSS highlight in the body (count 0); select text in the pre-question explanation -> no button.',
    'Render saved highlights inline (CSS Custom Highlight API or <mark>) and widen bodyRef to the big idea and takeaways, or reword the tip to "select text in the lesson body".')

# ---- Journey 3: practice ----
add('S3', 'ALL', '#/quiz/:id (results)', 'src/pages/QuizPlayer.tsx',
    'The results page miscounts what entered spaced review. It reports missed + guessed-right, but needsRequeue() also queues correct answers rated "Unsure"; and when nothing was missed it says "Clean sweep. These will stay out of your review queue." even when Unsure answers were queued, or when half the test-mode set was unanswered and scored wrong (50%).',
    'Tutor set: 1 wrong-Unsure, 1 wrong-Confident, 1 right-Guess, 1 right-Unsure -> IndexedDB srs table has 4 q: rows, page says "3 question(s) were added" (review/screens/uj-j3-d-06-results.png). Test set with 2 answered correctly and 2 unanswered -> "50% ... 2 questions were left unanswered and scored as wrong. Clean sweep." (review/screens/uj-j3-d-12-test-results.png).',
    'Compute the count from the same rule as scheduling (answered && needsRequeue(correct, confidence ?? "confident")), and show "Clean sweep" only when every item was answered correctly with confidence; otherwise say e.g. "No questions were added to review; 2 unanswered questions were scored wrong."',
    expected='The count matches the questions actually queued; "Clean sweep" only for a perfect set.', observed='Undercounts by the Unsure-correct items; "Clean sweep" at 50%.',
    steps='Practice a module in tutor mode answering one item correctly with "Unsure"; then run a 4-question test-mode set leaving 2 unanswered.')
add('S3', 'ALL', '#/quiz/:id (test mode)', 'src/pages/QuizPlayer.tsx',
    'In test mode an answer chosen without a confidence rating is scored, and the question navigator marks it answered, but the header and Submit button count it as unanswered ("0/4 answered"). Submitting with unanswered questions gives no warning or confirmation.',
    'review/screens/uj-j3-m-11-test-last.png, review/screens/uj-j3-d-11-test-last.png. Steps: #/practice -> tick Area I -> 4 questions -> Test -> Timed -> Start; pick a choice on Q1 only -> header shows "0/4 answered" while the navigator square 1 is filled; Q1 is later scored Correct. On Q4 "Submit set (1/4)" submits at once.',
    'Count answeredCount by `choice` alone in test mode (confidence is optional there), and when unanswered items remain show a confirm step ("2 questions unanswered will be scored wrong. Submit anyway?") listing them.',
    expected='One definition of "answered" across header, navigator and scoring; a confirmation before submitting with blanks.', observed='Header says 0 answered while the navigator and scoring treat the item as answered; no confirmation.',
    steps='Run a test-mode custom set as above.')
add('S4', 'ALL', '#/quiz/:id', 'src/components/McqView.tsx',
    'Keyboard shortcut race: pressing a choice letter and then a confidence digit in quick succession (under ~50 ms, e.g. a fast typist or a key macro) drops the confidence key silently, because the hotkey handler checks the rendered `selected` prop, which updates only after the IndexedDB write round-trips.',
    'Desktop: on a tutor-mode question press "d" then "2" with no delay -> choice D is selected but nothing is submitted (review/screens/uj-j3-d-03-q2-wrong.png from the first run shows D selected, no feedback). With a 150 ms gap it works.',
    'Track the last chosen letter in a ref inside McqView (set on onSelect) and let the confidence key use it when `selected` has not caught up yet.')

# ---- Journey 4: flashcards ----
add('S3', 'ALL', '#/flashcards, #/review', 'src/components/FlashcardPlayer.tsx',
    'A flashcard session has no way to stop early: there is no End/Exit button, Escape does nothing, and the "Flashcard decks" navigation entry (same route) keeps the learner inside the session because the session lives in component state. The only exit is to navigate to a different page.',
    'review/screens/uj-j4-d-07-nav-decks-still-in-session.png, review/screens/uj-j4-m-07-nav-decks-still-in-session.png. Steps: complete a lesson -> #/flashcards?module=far-income-statement-oci -> "Study this deck" -> click "Flashcard decks" in the sidebar (desktop) or More > Flashcard decks (phone) -> still on the card ("8 left in this session"); press Escape -> still in session.',
    'Add an "End session" button beside "N left in this session" that calls onDone (graded cards are already saved), and reset `session` when the location key changes (or put the session in the URL, e.g. ?study=1) so the nav entry returns to the deck list.',
    expected='A visible way to end a session; the "Flashcard decks" link shows the deck list.', observed='No exit control; the nav link leaves the learner on the card.',
    steps='Start any flashcard session and try to get back to the deck list.')
add('S4', 'ALL', '#/review', 'src/components/FlashcardPlayer.tsx',
    'Cards graded Again/Hard/Good on a new card are rescheduled minutes later (1m / 6m / 10m), but if the learner reloads or leaves, those cards are not in the resumed session and the review page says "0 due" until the minutes pass; the done screen never says they will return later today.',
    'review/screens/uj-j4-d-03-card-back.png (grade labels "Again 1m, Hard 6m, Good 10m, Easy 8d"), review/screens/uj-j4-d-04-after-reload.png ("0 due · 4 new today" after grading 4 of 8). Steps: study 8 new cards, grade the first four Again/Hard/Good/Easy, reload.',
    'On the done screen and the review page, show "N cards come back in a few minutes" (count of srs cards due later today), and offer a short "Study again" when they become due.')

# ---- Journey 5: TBS ----
add('S3', 'ALL', '#/tbs/aud-tbs-r3-conduct-rules', 'src/components/TbsView.tsx',
    'Rows labelled only "1"…"7" (the situations live in an exhibit tab). On a phone there is no split view, so the learner must switch between the "Situations" tab and the "Task" tab for every row, and the results list shows "✗ 1 — You: Not a violation · Answer: Violation" without restating the situation. Same pattern in far-tbs-r3-property-tax, aud-tbs-r3-journal-entries and aud-tbs-r3-it-coso.',
    'review/screens/uj-j5-m-aud-tbs-r3-conduct-rules-b-partial-full.png (phone: seven selects labelled 1–7, results "✗ 1"). Steps: phone viewport -> #/tbs/aud-tbs-r3-conduct-rules -> answer the 7 rows (each needs a trip to the "Situations" tab) -> submit with row 1 wrong.',
    'Give each row a short descriptive label (e.g. "1. Contingent fee — original return"), or on narrow screens render the matching exhibit paragraph under each row label; in TbsResults show the row label text plus the situation excerpt.',
    expected='Each row and each result cell identifies the situation it scores.', observed='Bare numbers; the phone layout forces tab switching per row.',
    steps='Open the TBS on a 390px viewport.')
add('S4', 'ALL', '#/tbs/:id', 'src/pages/TbsPage.tsx',
    'Submitting a simulation scrolls to the very bottom of the page, past the "Score: x/y cells" heading, so on both viewports the learner first sees the last cell and the action buttons, not the score. "Submit" with blank cells and "Try again from scratch" (which deletes the saved run) both act without confirmation.',
    'review/screens/uj-j5-d-far-tbs-u1-income-statement-b-partial-score.png (viewport after submit: last cells and buttons, no score heading). Code: TbsPage.submit() -> window.scrollTo({ top: document.body.scrollHeight }).',
    'Scroll the #tbs-results heading into view and focus it; confirm "Submit with N blank cells?" and "Discard this attempt and start over?".')

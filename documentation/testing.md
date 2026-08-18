# Testing

This project uses **manual QA per increment**, as defined in the Iterative/Incremental workflow:
each roadmap phase is tested against its relevant requirements before the next phase begins.
A final full pass across all features is done during UX polish (see `roadmap.md`).

## Test Approach

**Type** Manual functional testing (no automated test framework -
appropriate for a small, no-backend, vanilla **JS/HTML/CSS** project)

**When it runs** After each roadmap phase/increment is implemented, and again
during the final full pass

**Tools** Manual browser testing (Chrome, Firefox, Edge, Safari - **NFR2**)
**NVDA** screen reader for accessibility checks (**NFR3**)
Browser **DevTools** for inspecting `localStorage` and console errors

**Pass/fail** A test case passes if the observed behavior matches the
**Expected Result** exactly. Any deviation is logged as a bug and
must be fixed before the phase is marked complete.

## Functional Requirement Test Cases

- [x] **TC1** (**FR1**) Category selection
Steps: Load the app, view category list, click a category
Expected: List of categories is shown; selecting one starts the quiz for that category

- [x] **TC2** (**FR2**) Answer and progress through questions
Steps: Start a quiz, select an answer choice, submit/proceed
Expected: Selected answer is registered; next question loads (or quiz ends if last question)

- [x] **TC3** (**FR2**) Allow proceeding without selecting an answer 
Steps: Start a quiz, try to proceed without selecting a choice
Expected: System continues the progression of the quiz and the unanswered question will be treated as wrong

- [x] **TC4** (**FR3**) Progress indicator updates
Steps: Start a quiz, answer questions one by one
Expected: Indicator (e.g. "Question 3 of 10") updates accurately after each question

- [x] **TC5** (**FR4**) Score calculated correctly
Steps: Complete a quiz with a mix of correct/incorrect answers
Expected: Final score matches the actual number of correct answers

- [x] **TC6** (**FR5**) Score displayed after quiz
Steps: Complete a quiz
Expected: Score is shown clearly (e.g. "7/10") on the results screen

- [x] **TC7** (**FR6**) Correct answers shown after submission
Steps: Complete a quiz
Expected: Each question shows the correct answer alongside the user's selected answer

- [x] **TC8** (**FR7**) Score saved to `localStorage`
Steps: Complete a quiz, inspect `localStorage` via DevTools
Expected: The dedicated key holds a single JSON object with the latest score that persists after page reload; a repeat quiz attempt overwrites the previous value.

- [x] **TC9** (**FR7**) Data does not sync across browsers/devices
Steps: Complete a quiz in Browser A, open the app in Browser B
Expected: Score from Browser A does not appear in Browser B

## Non-Functional Requirement Test Cases

- [x] **TC10** (**NFR1**) Score retrieval is fast
Steps: Store a single score entry, reload the results/history view
Expected: Scores load and render with no noticeable delay

- [x] **TC11** (**NFR2**) Works on all supported browsers
Steps: Run TC1-TC9 on latest Chrome, Firefox, Edge, and Safari
Expected: All test cases pass consistently across all four browsers

- [ ] **TC12** (**NFR3**) Screen reader can navigate the quiz
Steps: Navigate the quiz using **NVDA** only (no mouse)
Expected: Questions, choices, categories, and results are announced
clearly and in a logical order

- [ ] **TC13** (**NFR3**) Mobile layout is usable
Steps: Open the app on a mobile viewport/device
Expected: Quiz is fully usable - text readable, buttons tappable,
no horizontal scrolling

- [ ] **TC14** (**NFR4**) CSP blocks injected scripts
Steps: Attempt to inject a script via quiz input or console
(e.g. `<script>` in a text field, if applicable)
Expected: Script does not execute; browser console shows a **CSP** violation

- [ ] **TC15** (**NFR4**) CSP meta tag present and correctly scoped
Steps: Inspect `index.html`
Expected: `<meta>` **CSP** tag exists, restricting scripts/styles/objects to same-origin
# Project Summary

A one-page overview of the project. For details, see the linked document for each section.

## What This Is

A web-based quiz system built with HTML, CSS, and JavaScript, with no database or backend -
built to apply front-end skills learned over the past months. Users pick a category, answer
a set of fixed questions, and get a scored result with correct answers shown. Scores are
saved locally via `localStorage`. See `objectives.md`.


## What's In / Out of Scope

**In:** category selection, question/answer flow with progress tracking, automatic scoring,
answer review, local score storage, responsive design, accessibility (NVDA), and XSS
protection (CSP + input sanitization).

**Out:** quiz creation/editing, database or server, login/signup, leaderboards/streaks,
deployment/hosting.

See `scope.md` for the full breakdown.


## How It's Built

Development follows an **Iterative/Incremental** methodology - each increment is a complete,
working piece of functionality, manually tested before the next begins. See `methodology.md`.

The build is sequenced into **7 increments**, ordered by technical dependency (e.g.
categories before questions, questions before scoring):

1. Category Selection
2. User Identification + Input Sanitization
3. Question & Answer Flow + Progress Indicator
4. Scoring, Results, and Data Storage
5. Accessibility (ARIA + Screen Reader Support)
6. UI/UX Polish
7. Responsive Design + Final Regression

See `roadmap.md` for the full breakdown.


## Requirements at a Glance

- **8 Functional Requirements** (FR1-FR8): category selection, question/answer flow,
  progress indicator, scoring, score display, answer review, local storage, and user
  identification.
- **5 Non-Functional Requirements** (NFR1-NFR5): performance, browser support,
  accessibility, security, and responsive design.

See `requirements.md` for full definitions.


## How It's Verified

Manual QA, one pass per increment, plus a final full regression pass in Increment 7.
**16 test cases** (TC1-TC16), each traced to a specific FR or NFR ID.

See `testing.md` for the full test plan.


## What Gets Delivered

- The working application
- This documentation set
- Full commit history in the project's Git repository

See `deliverables.md` for the full checklist.


## Document Map

## File Structure

```                        
 documentation/                         - documentation files
   |-- deliverables.md                  - tangible project requirement
   |-- features.md                      - functionalites of the system
   |-- objectives.md                    - project goals
   |-- scope-and-limitation.md          - range of the system
   |-- summary.md                       - mini-project summary
   |-- system-methodology.md            - how the project will be executed
   |-- roadmap.md                       - system methodology development basis
   |-- system-requirements.md           - what the system needs to satisfy
   |-- tech-stack.md                    - software technologies used
   |-- testing.md                       - manual QA test cases per requirement
```
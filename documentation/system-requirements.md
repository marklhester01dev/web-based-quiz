## Functional Requirements

- [x] **FR1 (Category Selection)**: Allow users to choose a quiz category
Before starting the quiz, the system presents a list of available categories and allows the user to select one to begin.

- [x] **FR2 (Question & Answer Flow):** Present questions and accept answers
The system displays quiz questions one at a time (or as configured), presents the available answer choices, and allows the user to select and submit an answer for each question before proceeding.

- [x] **FR3 (Progress Indicator):** Show quiz progress
While the quiz is in progress, the system displays the user's current position (e.g., "Question 3 of 10") so the user knows how much of the quiz remains.

- [x] **FR4 (Automatic Scoring):** Calculate the user's score
Upon completion of the quiz, the system automatically compares the user's selected answers against the correct answers and calculates the total number of correct responses.

- [x] **FR5 (Score Display):** Show quiz scores to users
Upon completion of the quiz, the system displays the user's score (e.g., number correct out of total questions).

- [x] **FR6 (Answer Review):** Show correct answers after quiz submission
After the user submits or finishes the quiz, the system displays the correct answer for each question alongside the user's chosen answer.

- [x] **FR7 (Data Storage):** Store user score locally
The user's score is stored in the browser's `localStorage` under a dedicated key as a single JSON object, not a history of multiple entries. Each completed quiz overwrites the previously stored score under that key. There is no server component — data is local to the browser/device it was entered on and will not sync across devices or browsers.

*Revised after Increment 4 testing: originally specified as a JSON array of score entries (history of attempts); changed to a single stored score after testing showed multi-entry storage wasn't behaving as expected.*

## Non-Functional Requirements

- [x] **NFR1 (Performance)**
The system retrieves and displays stored user scores quickly, with no noticeable delay when reading from `localStorage`.

- [x] **NFR2 (Browser Support)**
The system supports modern browsers only (e.g., latest versions of Chrome, Firefox, Edge, Safari). Legacy browser support is not required.

- [ ] **NFR3 (Accessibility)**
The system covers parts essential for users to navigate the quiz independently — questions, quiz categories, answer choices, and results — and ensures these are readable by screen readers, with particular support for NVDA. The interface must also accommodate the mobile version of the system for the target users.

- [ ] **NFR4 (Security)**
The application enforces a Content-Security-Policy via a meta tag in `index.html`, restricting scripts, styles, and objects to same-origin sources, and sanitizes/validates user-entered input (identification fields and enumerable selections such as category/answer choices) before rendering or storing it, to mitigate XSS from injected or malicious content.
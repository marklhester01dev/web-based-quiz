const userScoreHolder = document.getElementById("userScore");
const main = document.getElementById("questionAnswerContainer");

const storageData = {
  totalQuestions: Number(localStorage.getItem("Total Questions")) || 0,
  userAnswers: JSON.parse(localStorage.getItem("userAnswers") || "[]"),
  correctAnswers: JSON.parse(localStorage.getItem("correctAnswers") || "[]"),
  questions: JSON.parse(localStorage.getItem("questions") || "[]"),
  orderedFlags: JSON.parse(localStorage.getItem("orderedFlags") || "[]"),
};

function renderUserScore() {
  const score = localStorage.getItem("score");
  userScoreHolder.textContent = score ?? "0";
}

function renderQuizAnswers() {
  const {
    totalQuestions,
    userAnswers,
    correctAnswers,
    questions,
    orderedFlags,
  } = storageData;

  const ul = document.createElement("ul");
  ul.className = "results-list";

  for (let i = 0; i < totalQuestions; i++) {
    const li = document.createElement("li");
    li.id = `question-${i + 1}`;

    const userSet = (userAnswers[i] ?? []).map((a) =>
      String(a).trim().toLowerCase(),
    );

    const correctSet = (correctAnswers[i] ?? []).map((a) =>
      String(a).trim().toLowerCase(),
    );

    const filteredUserSet = userSet.filter((a) => a !== "");

    const userText = filteredUserSet.length ? filteredUserSet.join(", ") : "No answer";
    const correctText = correctSet.join(", ");

    let isCorrect;

    if (orderedFlags[i]) {
      isCorrect =
        correctSet.length === userSet.length &&
        correctSet.every((ans, index) => ans === userSet[index]);
    } else {
      isCorrect =
        correctSet.length === userSet.length &&
        correctSet.every((ans) => userSet.includes(ans));
    }

    const questionText = questions[i] || `Question ${i + 1}`;

    li.innerHTML = `
      <div class="result-item ${isCorrect ? "correct" : "wrong"}">
        <h2>${i + 1}. ${questionText}</h2>
        <p>Your answer: <strong class="${isCorrect ? "correct-text" : "wrong-text"}">${userText}</strong></p>
        <p>Correct answer: <strong class="correct-text">${correctText}</strong></p>
      </div>
    `;

    ul.appendChild(li);
  }

  main.appendChild(ul);
}

renderUserScore();
renderQuizAnswers();

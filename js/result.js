const userScoreHolder = document.getElementById("userScore");
const body = document.querySelector("body");

const storageData = {
  totalQuestions: Number(localStorage.getItem("Total Questions")) || 0,
  userAnswers: JSON.parse(localStorage.getItem("userAnswers") || "[]"),
  correctAnswers: JSON.parse(localStorage.getItem("correctAnswers") || "[]"),
  questions: JSON.parse(localStorage.getItem("questions") || "[]"),
};

function renderUserScore() {
  const score = localStorage.getItem("score");
  userScoreHolder.textContent = score ?? "0";
}

function renderQuizAnswers() {
  const { totalQuestions, userAnswers, correctAnswers, questions } =
    storageData;

  const main = document.createElement("main");
  const ul = document.createElement("ul");
  ul.className = "results-list";

  for (let i = 0; i < totalQuestions; i++) {
    const li = document.createElement("li");
    li.id = `question-${i + 1}`;

    const userAns = userAnswers[i] ?? "No answer";
    const correctAns = correctAnswers[i] ?? "—";
    const isCorrect = userAns === correctAns;
    const questionText = questions[i] || `Question ${i + 1}`;

    li.innerHTML = `
      <div class="result-item ${isCorrect ? "correct" : "wrong"}">
        <h3>${i + 1}. ${questionText}</h3>
        <p>
          Your answer: 
          <strong class="${isCorrect ? "correct-text" : "wrong-text"}">
            ${userAns}
          </strong>
        </p>
        <p>
          Correct answer: 
          <strong class="correct-text">${correctAns}</strong>
        </p>
      </div>
    `;

    ul.appendChild(li);
  }

  main.appendChild(ul);
  body.appendChild(main);
}

renderUserScore();
renderQuizAnswers();

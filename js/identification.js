const questions = [
  {
    id: 1,
    question: "What is the largest planet in our solar system?",
    answer: ["Jupiter"],
  },
  { id: 2, question: "What is the chemical symbol for gold?", answer: ["Au"] },
  {
    id: 3,
    question: "Who wrote the play 'Romeo and Juliet'?",
    answer: ["William Shakespeare"],
  },
  { id: 4, question: "What is the capital city of Japan?", answer: ["Tokyo"] },
  {
    id: 5,
    question:
      "What gas do plants absorb from the atmosphere for photosynthesis?",
    answer: ["Carbon Dioxide"],
  },
  {
    id: 6,
    question: "What is the longest river in the world?",
    answer: ["Nile"],
  },
  {
    id: 7,
    question: "What is the powerhouse of the cell?",
    answer: ["Mitochondria"],
  },
  {
    id: 8,
    question: "Who painted the Mona Lisa?",
    answer: ["Leonardo da Vinci"],
  },
  { id: 9, question: "What is the smallest prime number?", answer: "2" },
  {
    id: 10,
    question: "What is the freezing point of water in Celsius?",
    answer: ["0"],
  },
  {
    id: 11,
    question: "What is the national language of the Philippines?",
    answer: ["Filipino"],
  },
  {
    id: 12,
    question: "What planet is known as the Red Planet?",
    answer: ["Mars"],
  },
  { id: 13, question: "What is the currency used in Japan?", answer: ["Yen"] },
  {
    id: 14,
    question: "What organ pumps blood throughout the human body?",
    answer: ["Heart"],
  },
  {
    id: 15,
    question: "What is the tallest mountain in the world?",
    answer: ["Mount Everest"],
  },
  {
    id: 16,
    question: "Who is known as the Father of Computers?",
    answer: ["Charles Babbage"],
  },
  {
    id: 17,
    question: "What is the largest ocean on Earth?",
    answer: ["Pacific Ocean"],
  },
  {
    id: 18,
    question: "What is H2O more commonly known as?",
    answer: ["Water"],
  },
  {
    id: 19,
    question: "What is the study of living organisms called?",
    answer: ["Biology"],
  },
  {
    id: 20,
    question: "What is the capital city of France?",
    answer: ["Paris"],
  },
];

let currentIndex = 0;
let userAnswers = [];

const quiz = document.getElementById("quiz");

function renderQuestion() {
  const question = questions[currentIndex];
  const isLast = currentIndex === questions.length - 1;
  const answerValue = userAnswers[currentIndex] ?? "";

  quiz.setAttribute("question-id", question.id);
  quiz.setAttribute("question-text", question.question);
  quiz.setAttribute("input-count", question.answer.length);
  quiz.setAttribute("is-last", isLast.toString());
  quiz.setAttribute("is-first", (currentIndex === 0).toString());
  quiz.setAttribute("current-answer", answerValue);
}

quiz.addEventListener("quiz-answer", (event) => {
  userAnswers[currentIndex] = event.detail.userInputs;

  currentIndex++;

  if (currentIndex < questions.length) {
    renderQuestion();
  } else {
    console.log("Quiz Finished", userAnswers);
  }
});

quiz.addEventListener("quiz-back", () => {
  if (currentIndex === 0) return;

  currentIndex--;
  renderQuestion();
});

renderQuestion();

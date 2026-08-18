const questions = [
  {
    id: 1,
    question: "The Pacific Ocean is the largest ocean on Earth.",
    choices: [
      { value: "True", label: "True" },
      { value: "False", label: "False" },
    ],
    answer: ["True"],
  },
  {
    id: 2,
    question: "The capital city of Australia is Sydney.",
    choices: [
      { value: "True", label: "True" },
      { value: "False", label: "False" },
    ],
    answer: ["False"],
  },
  {
    id: 3,
    question: "An octopus has three hearts.",
    choices: [
      { value: "True", label: "True" },
      { value: "False", label: "False" },
    ],
    answer: ["True"],
  },
  {
    id: 4,
    question: "The human heart has four chambers.",
    choices: [
      { value: "True", label: "True" },
      { value: "False", label: "False" },
    ],
    answer: ["True"],
  },
  {
    id: 5,
    question: "The chemical symbol for gold is Ag.",
    choices: [
      { value: "True", label: "True" },
      { value: "False", label: "False" },
    ],
    answer: ["False"],
  },
  {
    id: 6,
    question: "Venus is the closest planet to the Sun.",
    choices: [
      { value: "True", label: "True" },
      { value: "False", label: "False" },
    ],
    answer: ["False"],
  },
  {
    id: 7,
    question: "JavaScript can be used to create interactive web pages.",
    choices: [
      { value: "True", label: "True" },
      { value: "False", label: "False" },
    ],
    answer: ["True"],
  },
  {
    id: 8,
    question: "HTML is a programming language.",
    choices: [
      { value: "True", label: "True" },
      { value: "False", label: "False" },
    ],
    answer: ["False"],
  },
  {
    id: 9,
    question: "Water is made up of two hydrogen atoms and one oxygen atom.",
    choices: [
      { value: "True", label: "True" },
      { value: "False", label: "False" },
    ],
    answer: ["True"],
  },
  {
    id: 10,
    question: "Lightning travels faster than sound.",
    choices: [
      { value: "True", label: "True" },
      { value: "False", label: "False" },
    ],
    answer: ["True"],
  },
  {
    id: 11,
    question: "Penguins are mammals.",
    choices: [
      { value: "True", label: "True" },
      { value: "False", label: "False" },
    ],
    answer: ["False"],
  },
  {
    id: 12,
    question: "The square root of 81 is 9.",
    choices: [
      { value: "True", label: "True" },
      { value: "False", label: "False" },
    ],
    answer: ["True"],
  },
  {
    id: 13,
    question:
      "The Great Wall of China is visible from the Moon with the naked eye.",
    choices: [
      { value: "True", label: "True" },
      { value: "False", label: "False" },
    ],
    answer: ["False"],
  },
  {
    id: 14,
    question: "Albert Einstein developed the theory of relativity.",
    choices: [
      { value: "True", label: "True" },
      { value: "False", label: "False" },
    ],
    answer: ["True"],
  },
  {
    id: 15,
    question: "A leap year has 366 days.",
    choices: [
      { value: "True", label: "True" },
      { value: "False", label: "False" },
    ],
    answer: ["True"],
  },
  {
    id: 16,
    question: "The Sahara Desert is the largest desert on Earth.",
    choices: [
      { value: "True", label: "True" },
      { value: "False", label: "False" },
    ],
    answer: ["False"],
  },
  {
    id: 17,
    question: "The Eiffel Tower is located in Paris.",
    choices: [
      { value: "True", label: "True" },
      { value: "False", label: "False" },
    ],
    answer: ["True"],
  },
  {
    id: 18,
    question: "The human body has 300 bones in adulthood.",
    choices: [
      { value: "True", label: "True" },
      { value: "False", label: "False" },
    ],
    answer: ["False"],
  },
  {
    id: 19,
    question: "The chemical symbol for sodium is Na.",
    choices: [
      { value: "True", label: "True" },
      { value: "False", label: "False" },
    ],
    answer: ["True"],
  },
  {
    id: 20,
    question: "Mount Everest is the highest mountain above sea level.",
    choices: [
      { value: "True", label: "True" },
      { value: "False", label: "False" },
    ],
    answer: ["True"],
  },
];

let currentIndex = 0;
const userAnswers = [];

const quiz = document.getElementById("quiz");

function calculateUserAnswer(questionAnswers, userAnswers) {
  let correctAnswer = 0;
  let wrongAnswer = 0;

  localStorage.setItem("Total Questions", questionAnswers.length);
  localStorage.setItem("userAnswers", JSON.stringify(userAnswers));
  localStorage.setItem(
    "correctAnswers",
    JSON.stringify(questionAnswers.map((q) => q.answer)),
  );
  localStorage.setItem(
    "questions",
    JSON.stringify(questionAnswers.map((q) => q.question)),
  );

  for (let i = 0; i < questionAnswers.length; i++) {
    const correctSet = questionAnswers[i].answer.map((a) =>
      a.trim().toLowerCase(),
    );
    const userSet = (userAnswers[i] ?? []).map((a) =>
      String(a).trim().toLowerCase(),
    );

    const isFullyCorrect =
      correctSet.length === userSet.length &&
      correctSet.every((ans) => userSet.includes(ans));

    isFullyCorrect ? correctAnswer++ : wrongAnswer++;
  }

  return {
    userScore: correctAnswer,
    correctAnswers: correctAnswer,
    wrongAnswers: wrongAnswer,
  };
}

function renderQuestion() {
  const currentQuestion = questions[currentIndex];
  const isLast = currentIndex === questions.length - 1;

  quiz.setAttribute("question-id", currentQuestion.id);
  quiz.setAttribute("question-text", currentQuestion.question);
  quiz.setAttribute("choices", JSON.stringify(currentQuestion.choices));
  quiz.setAttribute("is-last", isLast.toString());
  quiz.setAttribute("is-first", (currentIndex === 0).toString());
  quiz.setAttribute("total-questions", questions.length);
  quiz.setAttribute("current-progress", currentIndex + 1);
}

quiz.addEventListener("quiz-answer", (event) => {
  userAnswers.push(event.detail.value);
  currentIndex++;

  if (currentIndex < questions.length) {
    renderQuestion();
  } else {
    console.log("Quiz Finished", userAnswers);

    let result = calculateUserAnswer(questions, userAnswers);

    try {
      localStorage.setItem("score", JSON.stringify(result.userScore));
    } catch (err) {
      console.error("Could not save score:", err);
    }

    console.log("Your Score:", result.userScore);
    console.log("Correct Answer:", result.correctAnswers);
    console.log("Wrong Answer:", result.wrongAnswers);
    console.log(localStorage.getItem("score"));

    window.location.href = "result.html";
  }
});

quiz.addEventListener("quiz-back", () => {
  if (currentIndex === 0) return;

  currentIndex--;
  userAnswers.pop();
  renderQuestion();
});

renderQuestion();

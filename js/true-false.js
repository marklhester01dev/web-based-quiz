const questions = [
  {
    id: 1,
    question: "Mars is known as the Red Planet.",
    choices: [
      { value: "True", label: "True" },
      { value: "False", label: "False" },
    ],
    answer: "True",
  },
  {
    id: 2,
    question: "Plants absorb oxygen from the atmosphere for photosynthesis.",
    choices: [
      { value: "True", label: "True" },
      { value: "False", label: "False" },
    ],
    answer: "False",
  },
  {
    id: 3,
    question: "The Pacific Ocean is the largest ocean on Earth.",
    choices: [
      { value: "True", label: "True" },
      { value: "False", label: "False" },
    ],
    answer: "True",
  },
  {
    id: 4,
    question: "William Shakespeare wrote 'Romeo and Juliet'.",
    choices: [
      { value: "True", label: "True" },
      { value: "False", label: "False" },
    ],
    answer: "True",
  },
  {
    id: 5,
    question: "The chemical symbol for gold is Ag.",
    choices: [
      { value: "True", label: "True" },
      { value: "False", label: "False" },
    ],
    answer: "False",
  },
  {
    id: 6,
    question: "The Great Barrier Reef is located in Australia.",
    choices: [
      { value: "True", label: "True" },
      { value: "False", label: "False" },
    ],
    answer: "True",
  },
  {
    id: 7,
    question: "There are eight continents on Earth.",
    choices: [
      { value: "True", label: "True" },
      { value: "False", label: "False" },
    ],
    answer: "False",
  },
  {
    id: 8,
    question: "The nucleus is known as the powerhouse of the cell.",
    choices: [
      { value: "True", label: "True" },
      { value: "False", label: "False" },
    ],
    answer: "False",
  },
  {
    id: 9,
    question: "Mandarin Chinese has the most native speakers in the world.",
    choices: [
      { value: "True", label: "True" },
      { value: "False", label: "False" },
    ],
    answer: "True",
  },
  {
    id: 10,
    question: "The smallest prime number is 2.",
    choices: [
      { value: "True", label: "True" },
      { value: "False", label: "False" },
    ],
    answer: "True",
  },
  {
    id: 11,
    question: "The pancreas produces insulin.",
    choices: [
      { value: "True", label: "True" },
      { value: "False", label: "False" },
    ],
    answer: "True",
  },
  {
    id: 12,
    question: "World War II ended in 1945.",
    choices: [
      { value: "True", label: "True" },
      { value: "False", label: "False" },
    ],
    answer: "True",
  },
  {
    id: 13,
    question: "Proxima Centauri is the closest star to Earth.",
    choices: [
      { value: "True", label: "True" },
      { value: "False", label: "False" },
    ],
    answer: "False",
  },
  {
    id: 14,
    question: "Tokyo is the capital city of Japan.",
    choices: [
      { value: "True", label: "True" },
      { value: "False", label: "False" },
    ],
    answer: "True",
  },
  {
    id: 15,
    question: "Electrical resistance is measured in volts.",
    choices: [
      { value: "True", label: "True" },
      { value: "False", label: "False" },
    ],
    answer: "False",
  },
  {
    id: 16,
    question: "Mount Everest is the tallest mountain in the world.",
    choices: [
      { value: "True", label: "True" },
      { value: "False", label: "False" },
    ],
    answer: "True",
  },
  {
    id: 17,
    question: "AB+ is the universal donor blood type.",
    choices: [
      { value: "True", label: "True" },
      { value: "False", label: "False" },
    ],
    answer: "False",
  },
  {
    id: 18,
    question: "The main function of red blood cells is to carry oxygen.",
    choices: [
      { value: "True", label: "True" },
      { value: "False", label: "False" },
    ],
    answer: "True",
  },
  {
    id: 19,
    question: "Leonardo da Vinci painted the Mona Lisa.",
    choices: [
      { value: "True", label: "True" },
      { value: "False", label: "False" },
    ],
    answer: "True",
  },
  {
    id: 20,
    question: "Water freezes at 100°C.",
    choices: [
      { value: "True", label: "True" },
      { value: "False", label: "False" },
    ],
    answer: "False",
  },
];

let currentIndex = 0;
const userAnswers = [];

const quiz = document.getElementById("quiz");

function renderQuestion() {
  const currentQuestion = questions[currentIndex];
  const isLast = currentIndex === questions.length - 1;

  quiz.setAttribute("question-id", currentQuestion.id);
  quiz.setAttribute("question-text", currentQuestion.question);
  quiz.setAttribute("choices", JSON.stringify(currentQuestion.choices));
  quiz.setAttribute("is-last", isLast.toString());
  quiz.setAttribute("is-first", (currentIndex === 0).toString());
}

quiz.addEventListener("quiz-answer", (event) => {
  userAnswers.push(event.detail.value);
  currentIndex++;

  if (currentIndex < questions.length) {
    renderQuestion();
  } else {
    console.log("Quiz Finished", userAnswers);
  }
});

quiz.addEventListener("quiz-back", () => {
  if(currentIndex === 0) return;

  currentIndex--;
  userAnswers.pop();
  renderQuestion();
})

renderQuestion();
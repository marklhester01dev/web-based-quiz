const questions = [
  {
    id: 1,
    question: "Which planet is known as the Red Planet?",
    choices: [
      { value: "a", label: "Earth" },
      { value: "b", label: "Mars" },
      { value: "c", label: "Venus" },
      { value: "d", label: "Jupiter" },
    ],
    answer: "b",
  },
  {
    id: 2,
    question: "Which gas do plants absorb from the atmosphere?",
    choices: [
      { value: "a", label: "Oxygen" },
      { value: "b", label: "Nitrogen" },
      { value: "c", label: "Carbon Dioxide" },
      { value: "d", label: "Hydrogen" },
    ],
    answer: "c",
  },
  {
    id: 3,
    question: "What is the largest ocean on Earth?",
    choices: [
      { value: "a", label: "Atlantic Ocean" },
      { value: "b", label: "Indian Ocean" },
      { value: "c", label: "Arctic Ocean" },
      { value: "d", label: "Pacific Ocean" },
    ],
    answer: "d",
  },
  {
    id: 4,
    question: "Who wrote the play 'Romeo and Juliet'?",
    choices: [
      { value: "a", label: "Charles Dickens" },
      { value: "b", label: "William Shakespeare" },
      { value: "c", label: "Mark Twain" },
      { value: "d", label: "Jane Austen" },
    ],
    answer: "b",
  },
  {
    id: 5,
    question: "What is the chemical symbol for gold?",
    choices: [
      { value: "a", label: "Gd" },
      { value: "b", label: "Go" },
      { value: "c", label: "Au" },
      { value: "d", label: "Ag" },
    ],
    answer: "c",
  },
  {
    id: 6,
    question: "Which country is home to the Great Barrier Reef?",
    choices: [
      { value: "a", label: "Brazil" },
      { value: "b", label: "Australia" },
      { value: "c", label: "Mexico" },
      { value: "d", label: "Thailand" },
    ],
    answer: "b",
  },
  {
    id: 7,
    question: "How many continents are there on Earth?",
    choices: [
      { value: "a", label: "5" },
      { value: "b", label: "6" },
      { value: "c", label: "7" },
      { value: "d", label: "8" },
    ],
    answer: "c",
  },
  {
    id: 8,
    question: "What is the powerhouse of the cell?",
    choices: [
      { value: "a", label: "Nucleus" },
      { value: "b", label: "Ribosome" },
      { value: "c", label: "Mitochondria" },
      { value: "d", label: "Golgi Apparatus" },
    ],
    answer: "c",
  },
  {
    id: 9,
    question: "Which language has the most native speakers worldwide?",
    choices: [
      { value: "a", label: "English" },
      { value: "b", label: "Spanish" },
      { value: "c", label: "Mandarin Chinese" },
      { value: "d", label: "Hindi" },
    ],
    answer: "c",
  },
  {
    id: 10,
    question: "What is the smallest prime number?",
    choices: [
      { value: "a", label: "0" },
      { value: "b", label: "1" },
      { value: "c", label: "2" },
      { value: "d", label: "3" },
    ],
    answer: "c",
  },
  {
    id: 11,
    question: "Which organ in the human body produces insulin?",
    choices: [
      { value: "a", label: "Liver" },
      { value: "b", label: "Pancreas" },
      { value: "c", label: "Kidney" },
      { value: "d", label: "Stomach" },
    ],
    answer: "b",
  },
  {
    id: 12,
    question: "What year did World War II end?",
    choices: [
      { value: "a", label: "1943" },
      { value: "b", label: "1945" },
      { value: "c", label: "1947" },
      { value: "d", label: "1950" },
    ],
    answer: "b",
  },
  {
    id: 13,
    question: "Which is the closest star to Earth?",
    choices: [
      { value: "a", label: "Proxima Centauri" },
      { value: "b", label: "Sirius" },
      { value: "c", label: "The Sun" },
      { value: "d", label: "Betelgeuse" },
    ],
    answer: "c",
  },
  {
    id: 14,
    question: "What is the capital city of Japan?",
    choices: [
      { value: "a", label: "Seoul" },
      { value: "b", label: "Beijing" },
      { value: "c", label: "Tokyo" },
      { value: "d", label: "Bangkok" },
    ],
    answer: "c",
  },
  {
    id: 15,
    question: "Which unit is used to measure electrical resistance?",
    choices: [
      { value: "a", label: "Volt" },
      { value: "b", label: "Ohm" },
      { value: "c", label: "Ampere" },
      { value: "d", label: "Watt" },
    ],
    answer: "b",
  },
  {
    id: 16,
    question: "What is the tallest mountain in the world?",
    choices: [
      { value: "a", label: "K2" },
      { value: "b", label: "Mount Kilimanjaro" },
      { value: "c", label: "Mount Everest" },
      { value: "d", label: "Mount Fuji" },
    ],
    answer: "c",
  },
  {
    id: 17,
    question: "Which blood type is known as the universal donor?",
    choices: [
      { value: "a", label: "AB+" },
      { value: "b", label: "O-" },
      { value: "c", label: "A+" },
      { value: "d", label: "B-" },
    ],
    answer: "b",
  },
  {
    id: 18,
    question: "What is the main function of red blood cells?",
    choices: [
      { value: "a", label: "Fight infection" },
      { value: "b", label: "Carry oxygen" },
      { value: "c", label: "Clot blood" },
      { value: "d", label: "Digest food" },
    ],
    answer: "b",
  },
  {
    id: 19,
    question: "Which artist painted the Mona Lisa?",
    choices: [
      { value: "a", label: "Vincent van Gogh" },
      { value: "b", label: "Pablo Picasso" },
      { value: "c", label: "Leonardo da Vinci" },
      { value: "d", label: "Claude Monet" },
    ],
    answer: "c",
  },
  {
    id: 20,
    question: "What is the freezing point of water in Celsius?",
    choices: [
      { value: "a", label: "0°C" },
      { value: "b", label: "32°C" },
      { value: "c", label: "100°C" },
      { value: "d", label: "-10°C" },
    ],
    answer: "a",
  },
];

let currentIndex = 0;
const userAnswers = [];

const quiz = document.getElementById("quiz");

function calculateUserAnswer(questionAnswers, userAnswers) {
  let correctAnswer = 0;
  let wrongAnswer = 0;

  for (let i = 0; i < questionAnswers.length; i++) {
    if (userAnswers[i] === questionAnswers[i].answer) correctAnswer++;
    else wrongAnswer++;
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
    console.log("Your Score:", result.userScore);
    console.log("Correct Answer:", result.correctAnswers)
    console.log("Wrong Answer:", result.wrongAnswers)
  }
});

quiz.addEventListener("quiz-back", () => {
  if (currentIndex === 0) return;

  currentIndex--;
  userAnswers.pop();
  renderQuestion();
});

renderQuestion();

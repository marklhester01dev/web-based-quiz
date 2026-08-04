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
}

quiz.addEventListener("quiz-answer", (event) => {
 userAnswers.push(event.detail.value);

 currentIndex++;

 if(currentIndex < questions.length) {
   renderQuestion();
 } else{
  console.log("Quiz Finished", userAnswers);
 }
});

renderQuestion();

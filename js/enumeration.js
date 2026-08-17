const questions = [
  {
    id: 1,
    question: "Name the primary colors.",
    answer: ["Red", "Blue", "Yellow"],
  },
  {
    id: 2,
    question: "Name the planets closest to the Sun (in order, first four).",
    answer: ["Mercury", "Venus", "Earth", "Mars"],
  },
  {
    id: 3,
    question: "Name the states of matter.",
    answer: ["Solid", "Liquid", "Gas", "Plasma"],
  },
  {
    id: 4,
    question: "Name the continents that border the Pacific Ocean.",
    answer: ["Asia", "Australia", "North America", "South America"],
  },
  {
    id: 5,
    question: "Name the countries that make up the United Kingdom.",
    answer: ["England", "Scotland", "Wales", "Northern Ireland"],
  },
  {
    id: 6,
    question: "Name the basic food groups.",
    answer: ["Carbohydrates", "Proteins", "Fats", "Vitamins", "Minerals"],
  },
  {
    id: 7,
    question: "Name the branches of the Philippine government.",
    answer: ["Executive", "Legislative", "Judicial"],
  },
  {
    id: 8,
    question:
      "Name the noble gases in Group 18 of the periodic table (first four).",
    answer: ["Helium", "Neon", "Argon", "Krypton"],
  },
  {
    id: 9,
    question: "Name the Great Lakes of North America.",
    answer: ["Superior", "Michigan", "Huron", "Erie", "Ontario"],
  },
  {
    id: 10,
    question: "Name the layers of the Earth.",
    answer: ["Crust", "Mantle", "Outer Core", "Inner Core"],
  },
  {
    id: 11,
    question: "Name the Beatles band members.",
    answer: ["John Lennon", "Paul McCartney", "George Harrison", "Ringo Starr"],
  },
  {
    id: 12,
    question: "Name the types of blood cells.",
    answer: ["Red Blood Cells", "White Blood Cells", "Platelets"],
  },
  {
    id: 13,
    question: "Name the seasons of the year.",
    answer: ["Spring", "Summer", "Autumn", "Winter"],
  },
  {
    id: 14,
    question: "Name the main island groups of the Philippines.",
    answer: ["Luzon", "Visayas", "Mindanao"],
  },
  {
    id: 15,
    question: "Name the programming paradigms JavaScript supports.",
    answer: ["Procedural", "Object-Oriented", "Functional"],
  },
  {
    id: 16,
    question:
      "Name the food groups in the classic food pyramid (base to tip, main tiers).",
    answer: ["Grains", "Vegetables", "Fruits", "Dairy", "Protein"],
  },
  {
    id: 17,
    question: "Name the ASEAN founding member countries.",
    answer: ["Indonesia", "Malaysia", "Philippines", "Singapore", "Thailand"],
  },
  {
    id: 18,
    question: "Name the parts of a plant.",
    answer: ["Root", "Stem", "Leaf", "Flower"],
  },
  {
    id: 19,
    question: "Name the primary colors of light (additive color model).",
    answer: ["Red", "Green", "Blue"],
  },
  {
    id: 20,
    question: "Name the terrestrial (rocky) planets in our solar system.",
    answer: ["Mercury", "Venus", "Earth", "Mars"],
  },
];

let currentIndex = 0;
let userAnswers = [];

const quiz = document.getElementById("quiz");

function calculateUserAnswer(questionAnswers, userAnswers) {
  let correctAnswer = 0;
  let wrongAnswer = 0;

  for (let i = 0; i < questionAnswers.length; i++) {
    const correctAnswers = questionAnswers[i].answer;
    const userInputs = Object.values(userAnswers[i] ?? {});

    const normalizedCorrect = correctAnswers.map((answer) =>
      answer.trim().toLowerCase(),
    );

    const normalizedUser = userInputs.map((answer) =>
      answer.trim().toLowerCase(),
    );

    const sortedCorrect = [...normalizedCorrect].sort();
    const sortedUser = [...normalizedUser].sort();

    const isCorrect =
      sortedUser.length === sortedCorrect.length &&
      sortedUser.every((answer, index) => answer === sortedCorrect[index]);

    if (isCorrect) {
      correctAnswer++;
    } else {
      wrongAnswer++;
    }
  }

  return {
    userScore: correctAnswer,
    correctAnswers: correctAnswer,
    wrongAnswers: wrongAnswer,
  };
}

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
  quiz.setAttribute("total-questions", questions.length);
  quiz.setAttribute("current-progress", currentIndex + 1);
}

quiz.addEventListener("quiz-answer", (event) => {
  userAnswers[currentIndex] = event.detail.userInputs;
  console.log(userAnswers);

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
  }
});

quiz.addEventListener("quiz-back", () => {
  if (currentIndex === 0) return;

  currentIndex--;
  userAnswers.pop();
  renderQuestion();
});

renderQuestion();

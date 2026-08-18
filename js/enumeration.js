const questions = [
  {
    id: 1,
    question: "Name the primary colors.",
    answer: ["Red", "Blue", "Yellow"],
    ordered: false,
  },
  {
    id: 2,
    question: "Name the planets closest to the Sun (in order, first four).",
    answer: ["Mercury", "Venus", "Earth", "Mars"],
    ordered: true,
  },
  {
    id: 3,
    question: "Name the states of matter.",
    answer: ["Solid", "Liquid", "Gas", "Plasma"],
    ordered: false,
  },
  {
    id: 4,
    question: "Name the continents that border the Pacific Ocean.",
    answer: ["Asia", "Australia", "North America", "South America"],
    ordered: false,
  },
  {
    id: 5,
    question: "Name the countries that make up the United Kingdom.",
    answer: ["England", "Scotland", "Wales", "Northern Ireland"],
    ordered: false,
  },
  {
    id: 6,
    question: "Name the basic food groups.",
    answer: ["Carbohydrates", "Proteins", "Fats", "Vitamins", "Minerals"],
    ordered: false,
  },
  {
    id: 7,
    question: "Name the branches of the Philippine government.",
    answer: ["Executive", "Legislative", "Judicial"],
    ordered: false,
  },
  {
    id: 8,
    question:
      "Name the noble gases in Group 18 of the periodic table (first four).",
    answer: ["Helium", "Neon", "Argon", "Krypton"],
    ordered: false,
  },
  {
    id: 9,
    question: "Name the Great Lakes of North America.",
    answer: ["Superior", "Michigan", "Huron", "Erie", "Ontario"],
    ordered: false,
  },
  {
    id: 10,
    question: "Name the layers of the Earth.",
    answer: ["Crust", "Mantle", "Outer Core", "Inner Core"],
    ordered: false,
  },
  {
    id: 11,
    question: "Name the Beatles band members.",
    answer: ["John Lennon", "Paul McCartney", "George Harrison", "Ringo Starr"],
    ordered: false,
  },
  {
    id: 12,
    question: "Name the types of blood cells.",
    answer: ["Red Blood Cells", "White Blood Cells", "Platelets"],
    ordered: false,
  },
  {
    id: 13,
    question: "Name the seasons of the year.",
    answer: ["Spring", "Summer", "Autumn", "Winter"],
    ordered: false,
  },
  {
    id: 14,
    question: "Name the main island groups of the Philippines.",
    answer: ["Luzon", "Visayas", "Mindanao"],
    ordered: false,
  },
  {
    id: 15,
    question: "Name the programming paradigms JavaScript supports.",
    answer: ["Procedural", "Object-Oriented", "Functional"],
    ordered: false,
  },
  {
    id: 16,
    question:
      "Name the food groups in the classic food pyramid (base to tip, main tiers).",
    answer: ["Grains", "Vegetables", "Fruits", "Dairy", "Protein"],
    ordered: false,
  },
  {
    id: 17,
    question: "Name the ASEAN founding member countries.",
    answer: ["Indonesia", "Malaysia", "Philippines", "Singapore", "Thailand"],
    ordered: false,
  },
  {
    id: 18,
    question: "Name the parts of a plant.",
    answer: ["Root", "Stem", "Leaf", "Flower"],
    ordered: false,
  },
  {
    id: 19,
    question: "Name the primary colors of light (additive color model).",
    answer: ["Red", "Green", "Blue"],
    ordered: false,
  },
  {
    id: 20,
    question: "Name the terrestrial (rocky) planets in our solar system.",
    answer: ["Mercury", "Venus", "Earth", "Mars"],
    ordered: false,
  },
];

let currentIndex = 0;
let userAnswers = [];

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
  localStorage.setItem(
    "orderedFlags",
    JSON.stringify(questionAnswers.map((q) => !!q.ordered)),
  );

  for (let i = 0; i < questionAnswers.length; i++) {
    const question = questionAnswers[i];

    const correct = question.answer.map((a) => String(a).trim().toLowerCase());
    const user = (userAnswers[i] ?? []).map((a) =>
      String(a).trim().toLowerCase(),
    );

    let isFullyCorrect;

    if (question.ordered) {
      isFullyCorrect =
        correct.length === user.length &&
        correct.every((ans, index) => ans === user[index]);
    } else {
      const sortedCorrect = [...correct].sort();
      const sortedUser = [...user].sort();

      isFullyCorrect =
        sortedCorrect.length === sortedUser.length &&
        sortedCorrect.every((ans) => sortedUser.includes(ans));
    }

    isFullyCorrect ? correctAnswer++ : wrongAnswer++;
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

  currentIndex++;

  if (currentIndex < questions.length) {
    renderQuestion();
  } else {
    let result = calculateUserAnswer(questions, userAnswers);

    try {
      localStorage.setItem("score", JSON.stringify(result.userScore));
    } catch (err) {
      console.error("Could not save score:", err);
    }

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

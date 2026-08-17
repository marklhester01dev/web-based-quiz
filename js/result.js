const userScoreHolder = document.getElementById("userScore");


function renderUserScore(){
  userScoreHolder.innerHTML = `
    ${localStorage.getItem("score")}
  `;
}

renderUserScore();
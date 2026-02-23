let gameScore = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  losses: 0,
  tie: 0,
};

updateGameScore();

function pickComputerMove() {
  let computerMove = "";
  let randomNumber = Math.random();
  if (randomNumber < 0.3) computerMove = "scissors";
  else if (randomNumber > 0.3 && randomNumber < 0.6) computerMove = "rock";
  else {
    computerMove = "paper";
  }
  return computerMove;
}

function decideWinner(userMove) {
  const computerMove = pickComputerMove();
  let result = "";

  if (userMove === "rock") {
    if (computerMove === "paper") {
      result = "You Lose.";
    } else if (computerMove === userMove) {
      result = "Tie.";
    } else {
      result = "You Win.";
    }
  } else if (userMove === "paper") {
    if (computerMove === "scissors") {
      result = "You Lose.";
    } else if (computerMove === userMove) {
      result = "Tie.";
    } else {
      result = "You Win.";
    }
  } else {
    if (computerMove === "rock") {
      result = "You Lose!";
    } else if (computerMove === userMove) {
      result = "Tie.";
    } else {
      result = "You Win.";
    }
  }
  if (result === "You Win.") {
    gameScore.wins += 1;
  } else if (result === "You Lose.") {
    gameScore.losses += 1;
  } else {
    gameScore.tie += 1;
  }

  localStorage.setItem("message", "hello.");
  localStorage.setItem("score", JSON.stringify(gameScore));

  document.querySelector(".result").innerHTML = result;

  document.querySelector(
    ".choiceMatch"
  ).innerHTML = `You  <img class="choice-emojis" src="Images/${userMove}-emoji.png"> <img class="choice-emojis" src="Images/${computerMove}-emoji.png"> Computer`;

  updateGameScore();
}
function updateGameScore() {
  document.querySelector(
    ".gameScoreText"
  ).innerHTML = ` Wins : ${gameScore.wins}, Losses : ${gameScore.losses}, Ties : ${gameScore.tie}`;
}

const resetCode = `
<p class="Reset-comformation">
Are You Sure You Want To Reset The Score? 
    <button class="reset-btns" onclick="resetScore('Yes')">Yes</button>
    <button class="reset-btns" onclick="resetScore('No')">No</button>
</p>

    `;
document.querySelector('.reset-score-btn').addEventListener('click', function(){
  document.querySelector('.Reset-comformation-div').innerHTML = resetCode;
});


function resetScore(ifReset) {
    if (ifReset === 'Yes'){
      gameScore.wins = 0;
      gameScore.losses = 0;
      gameScore.tie = 0;
      updateGameScore(); // localStorage.setItem('score', JSON.stringify(gameScore));
      localStorage.removeItem("score");
      document.querySelector('.Reset-comformation-div').innerHTML ='';
    }else{
      document.querySelector('.Reset-comformation-div').innerHTML ='';
    }

}



let intervalId;
let isPlaying = false;

document.querySelector('.js-auto-play').addEventListener('click', autoPlay);


function autoPlay() {
  const playButton = document.querySelector(".js-auto-play");
  if (!isPlaying) {
    playButton.innerText = "Stop Play";
    intervalId = setInterval(function () {
      const userMove = pickComputerMove();
      setInterval(decideWinner(userMove), 1000);
    }, 1000);
    isPlaying = true;
  } else {
    playButton.innerText = "Auto Play";
    clearInterval(intervalId);
    isPlaying = false;
  }
}



document.body.addEventListener('keydown', (event) => {
  console.log(event.key);
  if (event.key === 'r'){
    decideWinner('rock');
  }else if (event.key === 'p'){
    decideWinner('paper');
  }else if(event.key === 's'){
    decideWinner('scissors');
  }else if (event.key === 'a'){
    autoPlay();
  }else if (event.key === ' '){
    document.querySelector('.Reset-comformation-div').innerHTML = resetCode;
  }else {
    console.log('Incorrect key pressed!');
  }
});

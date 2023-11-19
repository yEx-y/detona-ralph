const state = {
  view: {
    squares: document.querySelectorAll(".square"),
    enemy: document.querySelector(".enemy"),
    timeLeft: document.querySelector("#time-left"),
    score: document.querySelector("#score"),
  },
  values: {
    gameVelocity: 1000,
    hitPosition: 0,
    resutl: 0,
    currentTime: 30,
  },
  actions: {
    timerId: setInterval(randomSquare, 1000),
    countDownTimerId: setInterval(countDown, 1000),
  },
};
function playSound(audioName){
  let audio = new Audio(`/detona-ralph/src/sounds/${audioName}.m4a`);
  audio.volume = 0.1;
  audio.play();
}

function countDown() {
  state.values.currentTime--;
  state.view.timeLeft.textContent = state.values.currentTime;

  if (state.values.currentTime <= 0) {
    clearInterval(state.actions.countDownTimerId);
    clearInterval(state.actions.timerId);
    alert("Tempo acabado seu resultado é: ==>" + state.values.resutl);
  }
}

function randomSquare() {
  state.view.squares.forEach((square) => {
    square.classList.remove("enemy");
  });

  let randomNumber = Math.floor(Math.random() * 9);
  console.log(randomNumber);
  let randomSquare = state.view.squares[randomNumber];
  randomSquare.classList.add("enemy");
  state.values.hitPosition = randomSquare.id;
}
// function moveEnemy() {
//   state.values.timerId = setInterval(randomSquare, state.values.gameVelocity);
// }

function addListenerHitBox() {
  state.view.squares.forEach((square) => {
    square.addEventListener("mousedown", () => {
      if (square.id === state.values.hitPosition) {
        state.values.resutl++;
        state.view.score.textContent = state.values.resutl;
        state.values.hitPosition = null;
        playSound("hit");
      }
    });
  });
}

function initialize() {
  // moveEnemy();
  addListenerHitBox();
}

initialize();

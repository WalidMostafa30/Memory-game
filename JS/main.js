const gameIcons = [
  "😎",
  "😎",
  "🐬",
  "🐬",
  "🐓",
  "🐓",
  "🦋",
  "🦋",
  "🙈",
  "🙈",
  "🐼",
  "🐼",
  "🐸",
  "🐸",
  "🙋‍♂️",
  "🙋‍♂️",
];

const gameContainer = document.querySelector(".icons__container");
const trySpan = document.querySelector(".tries span");
const Modal = document.querySelector(".Modal");
const ModalMessage = document.querySelector(".Modal__message");
const ModalBtn = document.querySelector(".Modal__btn");
const duration = 1000;
const shuffleIcon = gameIcons.sort(() => (Math.random() > 0.5 ? 2 : -1));
let tries = 4;

trySpan.innerHTML = tries;

function generateCards() {
  shuffleIcon.forEach((icon) => {
    gameContainer.innerHTML += `<div class="icon" data-name=${icon}>${icon}</div>`;
  });
}

generateCards();

const cards = Array.from(document.querySelectorAll(".icon"));

cards.forEach((card) => {
  card.addEventListener("click", () => flipCard(card));
});

const flipCard = (card) => {
  if (card.classList.contains("open") || card.classList.contains("match"))
    return;

  card.classList.add("open");

  const flippedCards = cards.filter((c) => c.classList.contains("open"));

  if (flippedCards.length === 2) {
    disableClicks();

    checkMatch(flippedCards[0], flippedCards[1]);

    setTimeout(() => {
      enableClicks();
    }, duration);
  }
};

function checkMatch(card1, card2) {
  if (card1.dataset.name === card2.dataset.name) {
    handleMatch(card1, card2);
  } else {
    handleMismatch(card1, card2);
  }
}

function handleMatch(card1, card2) {
  setTimeout(() => {
    card1.classList.replace("open", "match");
    card2.classList.replace("open", "match");
    document.getElementById("correct").play();

    if (checkWin()) {
      showModal("You Win 🎉");
    }
    enableClicks();
  }, duration);
}

function handleMismatch(card1, card2) {
  setTimeout(() => {
    card1.classList.remove("open");
    card2.classList.remove("open");

    tries--;
    trySpan.innerHTML = tries;
    document.getElementById("wrong").play();
    enableClicks();

    if (tries === 0) {
      showModal("You Lose 😓");
    }
  }, duration);
}

function checkWin() {
  return cards.every((card) => card.classList.contains("match"));
}

function showModal(message) {
  setTimeout(() => {
    Modal.classList.add("active");
    ModalMessage.innerHTML = message;
  }, 500);
}

function disableClicks() {
  gameContainer.classList.add("noClick");
}

function enableClicks() {
  gameContainer.classList.remove("noClick");
}

window.addEventListener("load", () => {
  disableClicks();
  cards.forEach((box) => {
    setTimeout(() => {
      box.classList.add("open");
    }, 500);
    setTimeout(() => {
      enableClicks();
      box.classList.remove("open");
    }, 5000);
  });
});

ModalBtn.addEventListener("click", () => {
  window.location.reload();
});

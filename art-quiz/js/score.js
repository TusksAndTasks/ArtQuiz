import { images } from "./images.js";

function declareContainer() {
  const container = document.querySelector(".score-container");
  return container;
}

function declarePictures() {
  if (document.querySelectorAll(".score-result")) {
    const pictures = document.querySelectorAll(".score-result");
    return pictures;
  }
}

function declarePopupProperties() {
  const popup = document.querySelector(".info-popup");
  const name = document.querySelector(".info-name");
  const author = document.querySelector(".info-author");
  const year = document.querySelector(".info-year");
  const continueButton = document.querySelector(".info-popup .next-question");

  return [popup, name, author, year, continueButton];
}

function declareNavButtons() {
  const next = document.querySelector(".next-score");
  const prev = document.querySelector(".prev-score");

  return [next, prev];
}

function createSlots(category, number) {
  let container = declareContainer();
  let type = 0;
  let currentNumber = number - 1;
  if (category === "paintingScore") {
    type = 110;
    currentNumber = number;
  }
  let firstPictureNumber = type + 10 * currentNumber;
  for (let i = 0; i < 10; i++) {
    container.innerHTML =
      container.innerHTML +
      `<img src="./img/${
        firstPictureNumber + i
      }.jpg" alt="first-picture" width="260" height="260" class="score-result non-answered">`;
  }
  showResults(firstPictureNumber);
}

function showResults(number) {
  let pictures = declarePictures();
  let answerNumber = number;
  pictures.forEach(function (picture) {
    if (
      localStorage.getItem(`${answerNumber}`) != null &&
      localStorage.getItem(`${answerNumber}`) === "true"
    ) {
      picture.classList.remove("non-answered");
      const staticNumber = answerNumber;
      picture.addEventListener("click", function () {
        showAnswerInfo(staticNumber);
      });
    }
    answerNumber++;
  });
}

function showAnswerInfo(number) {
  let popup = declarePopupProperties();
  let popupContainer = popup[0];
  let name = popup[1];
  let author = popup[2];
  let year = popup[3];
  let button = popup[4];

  name.textContent = images[number].name;
  author.textContent = images[number].author;
  year.textContent = images[number].year;

  button.addEventListener("click", function () {
    popupContainer.classList.remove("active");
  });

  popupContainer.classList.add("active");
}

function hideButtons(number) {
  let buttons = declareNavButtons();

  if (number === 1) {
    buttons[1].style.opacity = "0";
  } else if (number === 12) {
    buttons[0].style.opacity = "0";
  }
}

export default class {
  constructor() {}

  createScore(category, number) {
    createSlots(category, number);
  }

  hideButtons(number) {
    hideButtons(+number);
  }
}

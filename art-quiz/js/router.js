import category from "./category.js";
import { QuizConstructor } from "./painting-question.js";
const categoryLayout = new category();
const quizConstructor = new QuizConstructor();

function isQuizView(num){
  const categoryNumbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
  let indicator = categoryNumbers.find(element => element === num[num.length - 1]);
  return indicator ? true : false;
}


function getRoute(){
    let hash = location.hash ? location.hash.slice(1) : '';
    let numberOfPack = 0;
    let hashOfPack = '';
    let check = isQuizView(hash);

    hashOfPack = hash;

    if(check){
      hashOfPack = hash.split('-')[0];
      numberOfPack = hash.split('-')[1];
    }
    

    return [hashOfPack, numberOfPack]
}



function changeRoute() {
   const route = getRoute()[0]; 
   const packNumber = getRoute()[1];

    switchView(route, packNumber);
}

const header = document.querySelector('header');
const main = document.querySelector('main');

function switchView(location, number) {

    switch(location){
        case '':
            header.innerHTML = `
            <div class="logo">
            <img src="assets/svg/logo.svg" alt="logo">
            </div>
            `;

            main.innerHTML = `
            <div class="main-container">
            <div class="change-type">
              <a href='#artists'>
                <div class="quiz-type">
                  <img src="img/203.jpg" alt="author picture" width="400" height="400">
                  <h2>Artist <span>quiz</span></h2>
                </div>
              </a>
              <a href="#paintings">
                <div class="quiz-type">
                  <img src="img/23.jpg" alt="author picture" width="400" height="400">
                  <h2>Paintings <span>quiz</span></h2>
                </div>
              </a>
            </div>  
            <button class="settings">settings</button>
          </div>
            `;
            break

        case 'paintings':
            header.innerHTML = `
            <div class="logo">
            <img src="assets/svg/logo.svg" alt="logo">
            </div>
            `
            categoryLayout.paintings();
            break   
        case 'artists':  
            header.innerHTML = `
            <div class="logo">
            <img src="assets/svg/logo.svg" alt="logo">
            </div>
            `
            categoryLayout.artists();
            break
        case 'paintingsPack':
          header.innerHTML = `
          <nav class = "quiz-header">
          <a href=''>
          <div class="main-button">Home</div>
          </a>
          <a href='#paintings'>
          <div class="category-button">Categories</div>
          </a>
          </nav>
          `
          main.innerHTML = `
          <div class="question-container">
          <div class="question">
          </div>
          <div class="answer-box">
          <div class="answer"></div>
          <div class="answer"></div>
          <div class="answer"></div>
          <div class="answer"></div>
          </div>
          </div>
          `
          quizConstructor.createQuestion(number);
          break        
    }

}


export default class {
    constructor(){

    }

    init() {
      addEventListener('hashchange', changeRoute);
      changeRoute();
  }

  route(){
     const route = getRoute()[0];
     return route;
  }
}
import category from "./category.js";
import { QuizConstructor } from "./painting-question.js";
import { ArtistQuizConstructor } from "./artist-question.js";
import score from "./score.js";

const categoryLayout = new category();
const quizConstructor = new QuizConstructor();
const artistQuizConstructor = new ArtistQuizConstructor();
const newScore = new score();

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
         <button class="settings"><a href="#settings">settings</a></button>
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
          <div class="bullet-container">
          <div class="bullet"></div>
          <div class="bullet"></div>
          <div class="bullet"></div>
          <div class="bullet"></div>
          <div class="bullet"></div>
          <div class="bullet"></div>
          <div class="bullet"></div>
          <div class="bullet"></div>
          <div class="bullet"></div>
          <div class="bullet"></div>
        </div>
          <section class="popup-screen">
          <div class="popup-container">
          <div class="result"></div>
          <div class='right-picture'></div>
          <p class="picture-name"></p>
          <p class="picture-author"></p>
          <p class="picture-year"></p>
          <button class="next-question">continue</button>
          </div>
          </section>
          <section class="popup-score">
          <div class="popup-container">
          <div class="congrats">Congratulations!</div>
          <div class="score"><span></span>/10</div>
          <div class="score-picture"></div>
          <div class="result-nav">
          <a href=''>
          <div class="main-button">Home</div>
          </a>
          <a href='#paintings'>
          <div class="category-button">Continue</div>
          </a>
          </div>
          </div>
          </section>
          `
          quizConstructor.createQuestion(number);
          break    
        case 'artistsPack': 
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
        Кто автор этой картины?
        </div>
        <div class="authors-painting"></div>
        <div class="author-answer-box">
        <div class="author-answer"></div>
        <div class="author-answer"></div>
        <div class="author-answer"></div>
        <div class="author-answer"></div>
        </div>
        </div>
        <div class="bullet-container">
        <div class="bullet"></div>
        <div class="bullet"></div>
        <div class="bullet"></div>
        <div class="bullet"></div>
        <div class="bullet"></div>
        <div class="bullet"></div>
        <div class="bullet"></div>
        <div class="bullet"></div>
        <div class="bullet"></div>
        <div class="bullet"></div>
      </div>
        <section class="popup-screen">
        <div class="popup-container">
        <div class="result"></div>
        <div class='right-picture'></div>
        <p class="picture-name"></p>
        <p class="picture-author"></p>
        <p class="picture-year"></p>
        <button class="next-question">continue</button>
        </div>
        </section>
        <section class="popup-score">
        <div class="popup-container">
        <div class="congrats">Congratulations!</div>
        <div class="score"><span></span>/10</div>
        <div class="score-picture"></div>
        <div class="result-nav">
        <a href=''>
        <div class="main-button">Home</div>
        </a>
        <a href='#artists'>
        <div class="category-button">Continue</div>
        </a>
        </div>
        </div>
        </section>
        `
        artistQuizConstructor.createQuestion(number);
        break;
      case 'paintingScore': 
        header.innerHTML = `<nav class = "quiz-header">
        <a href=''>
        <div class="main-button">Home</div>
        </a>
        <a href='#paintings'>
        <div class="category-button">Categories</div>
        </a>
        </nav>`
        main.innerHTML = ` <div class="score-container">
        </div>
        <div class="score-nav">
        <a href="#paintingScore-${+number - 1}"><div class="prev-score"></div></a>
          <div class="score-tracker">Paintings - ${number}/12</div>
          <a href="#paintingScore-${+number + 1}"><div class="next-score"></div></a>
        </div>
        <section class="info-popup">
        <div class="info-content">
        <p class="info-name"></p>
        <p class="info-author"></p>
        <p class="info-year"></p>
        <div class="next-question">Continue</div>
      </div>
      </section>`
        newScore.createScore(location, number);
        newScore.hideButtons(number);
        break;
      case 'artistScore':
        header.innerHTML = `<nav class = "quiz-header">
        <a href=''>
        <div class="main-button">Home</div>
        </a>
        <a href='#artists'>
        <div class="category-button">Categories</div>
        </a>
        </nav>`
        main.innerHTML = ` <div class="score-container">
        </div>
        <div class="score-nav">
          <a href="#artistScore-${+number - 1}"><div class="prev-score"></div></a>
          <div class="score-tracker">Artists - ${+number}/12</div>
          <a href="#artistScore-${+number + 1}"><div class="next-score"></div></a>
        </div>
        <section class="info-popup">
        <div class="info-content">
        <p class="info-name"></p>
        <p class="info-author"></p>
        <p class="info-year"></p>
        <div class="next-question">Continue</div>
      </div>
      </section>`
        newScore.createScore(location, number);
        newScore.hideButtons(number);
        break;
      case 'settings':
        main.innerHTML = `<a href=''>
        <div class="main-button">Home</div>
        </a>
        <div class='congrats'>Work in progress...</div>`  
        break;
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
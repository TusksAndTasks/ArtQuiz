import {images} from "./images.js";



function declareAnswers(){
    if(document.querySelectorAll('.answer')){
        const answers = document.querySelectorAll('.answer');
    return answers
    }
}


function declareScorePopup(){
    const scorePopup = document.querySelector('.popup-score');
    return scorePopup;
}


function declarePopup(){
  
        const popup = document.querySelector('.popup-screen');
        return popup;
    
}

function declareBullets(){
    const bullets = document.querySelectorAll('.bullet');
    return bullets;
}

function declarePopupProperties(){
    const result = document.querySelector('.result');
    const rightPicture = document.querySelector('.right-picture');
    const pictureName = document.querySelector('.picture-name');
    const author = document.querySelector('.picture-author');
    const year = document.querySelector('.picture-year');
    
    return [result, rightPicture, pictureName, author, year];
}

function insertResults(number, result){
   const properties = declarePopupProperties();
   if (result === true){
   properties[0].style.backgroundImage = `url(./assets/svg/Right.svg)`;
   } else{
   properties[0].style.backgroundImage = `url(./assets/svg/Wrong.svg)`;
   }
   properties[1].style.backgroundImage = `url(./img/${number}.jpg)`;
   properties[2].textContent = images[number].name;
   properties[3].textContent = images[number].author;
   properties[4].textContent = images[number].year;
}

function declareNextButton(){
    const nextButton = document.querySelector('.next-question')
    return nextButton;
}


function showPopUp(number, secondNumber, result){
    let popup = declarePopup();
    let nextButton = declareNextButton();
    let bullets = declareBullets();
    changeBullet(result, bullets);
    nextButton.addEventListener('click', function(){changeQuizView(number)});
    insertResults(secondNumber, result);
    popup.classList.add('active');
}

function hidePopUp(){
    let popup = declarePopup();
    popup.classList.remove('active');
}

function showScorePopup(number){
    let score = declareScorePopup();
    document.querySelector('.score span').textContent = number;
    score.classList.add('active');
}


function changeQuizView(number){
    if(clickNumber === 10){
       let score = setScore();
       showScorePopup(score);
    } else{
    changeQuestion(number);
    insertAnswers(number);
    hidePopUp();
    }
}

function setScore(){
    let pageNum = location.hash.split('-')[1];
    let score = countScore();
    localStorage.setItem(`pictures-${pageNum}`, score);
    return score;
}


function isCorrect(element, number){
    let answerClicked = element.style.backgroundImage;
    let correctAnswer = `url("./img/${number}.jpg")`;
    
    if (answerClicked === correctAnswer){
        localStorage.setItem(`${number}`, true);
        return true;
    } else {
        localStorage.setItem(`${number}`, false);
        return false;
    }
}


function changeBullet(result, elements){
    let currentNum = clickNumber;
    if(currentNum === 0){
        currentNum = 1;
    }

    if(result === true){
      elements[currentNum - 1].style.backgroundColor = 'green'
    } else{
      elements[currentNum - 1].style.backgroundColor = 'red'
    }
}


function countScore(){
    let bullets = declareBullets();
    let score = 0;
    bullets.forEach(function(bullet){
        if (bullet.style.backgroundColor === 'green'){
           score++;  
        }
    })
    return score;
}

function setListeners(number){
   const answers = declareAnswers();
   answers.forEach(function(answer){
       answer.addEventListener('click', function(){
           let nextNum = secondTracker(number);
           let currentNum = nextNum - 1;
           let result = isCorrect(answer, currentNum);
           showPopUp(nextNum, currentNum, result);
       })
   }
   )

}


function declareQuestion(){
    if(document.querySelector('.question')){
        const question = document.querySelector('.question');

        return question;
    }
}

//tracker

let clickNumber = 0;


function secondTracker(number){
    if(clickNumber < 10){
    clickNumber++
    } else{
        clickNumber = 0;
    }
    let currentNumber = number + clickNumber;
    return currentNumber;
}


function trackerInit(number){
    if(number > 0){
        const numberOfAuthor = 110 + (number * 10);
        return numberOfAuthor;
    }
    return 0;

}

async function changeQuestion(number){
    try{ 
        if(number > 0){
        const authorQuestion = declareQuestion();
        const author = images[number].author;
        authorQuestion.textContent = `Какую из этих картин написал ${author}?`
    } 
    } catch (err){
        throw err;
    }
}

async function findRightPic(number){
    try{
        const rightPic = images[number];
        return rightPic;
    } catch(err){
        throw err
    }
}

function createRandomNumber(min, max){
    return Math.floor(Math.random() * (max - min) + min);
}

async function createFalsePicArray(number){
    try{
        let falseNum 
        let rightPicture = await findRightPic(number);
        let falseArray = []   
        for(let i = 0; i < 4; i++){
            falseNum = createRandomNumber(0, 241);
            let falsePic = images[falseNum];
            if( rightPicture.author != falsePic.author){
            falseArray.push(falsePic);
            } else{
                falseArray = createFalsePicArray(number);
                return falseArray;
            }
        }
        return falseArray;
        
    } catch(err){
        throw err;
    }
}


async function insertAnswers(number){
   try{ 
       const answers = declareAnswers();
       const falsePics = await createFalsePicArray(number);
       for(let i = 0; i < answers.length; i++){
           answers[i].style.backgroundImage = `url(./img/${falsePics[i].imageNum}.jpg)`
       }
       insertRightAnswer(number);

   } catch (err){
       throw err
   }
}

async function insertRightAnswer(number){
   try{
      let randomAnswerSpot = createRandomNumber(0, 4);
      let rightPic =  await findRightPic(number);
      const answers = declareAnswers();
      
      answers[randomAnswerSpot].style.backgroundImage = `url(./img/${rightPic.imageNum}.jpg)`

   } catch (err){
       throw err
   }
}



export class QuizConstructor{
    constructor(){

    }

    createQuestion(number){
        let initNum = trackerInit(number)
        changeQuestion(initNum);
        insertAnswers(initNum);
        setListeners(initNum);
       }

    
}
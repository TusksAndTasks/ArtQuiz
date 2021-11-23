import {images} from "./images.js";


function declarePicture(){
    if(document.querySelector('.authors-painting')){
        const picture = document.querySelector('.authors-painting');
        return picture;
    }
}


function declareAnswers(){
    if(document.querySelectorAll('.author-answer')){
        const answers = document.querySelectorAll('.author-answer');
    return answers
    }
}

function declarePopup(){
  
    const popup = document.querySelector('.popup-screen');
    return popup;

}

function declareNextButton(){
    const nextButton = document.querySelector('.next-question')
    return nextButton;
}

function declareBullets(){
    const bullets = document.querySelectorAll('.bullet');
    return bullets;
}


function declareScorePopup(){
    const scorePopup = document.querySelector('.popup-score');
    return scorePopup;
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
    console.log(properties[0])
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

function changeBullet(result, elements){
    if(result === true){
      elements[clickNumber - 1].style.backgroundColor = 'green'
    } else{
      elements[clickNumber - 1].style.backgroundColor = 'red'
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

function setScore(){
    let pageNum = location.hash.split('-')[1];
    let score = countScore();
    localStorage.setItem(`artists-${pageNum}`, score);
    return score;
}

function showScorePopup(number){
    let score = declareScorePopup();
    document.querySelector('.score span').textContent = number;
    score.classList.add('active');
}

function trackerInit(number){
    if(number > 0){
        const numberOfPainting = (number - 1) * 10 ;
        return numberOfPainting;
    }
    return 0;

}

let clickNumber = 0;


function secondTracker(number){
    if(clickNumber <= 10){
    clickNumber++
    } else{
        clickNumber = 0;
    }
    let currentNumber = number + clickNumber;
    return currentNumber;
}


async function changePicture(number){
    try{ 
        const pictureQuestion = declarePicture();
        const pictureSource = `url(./full/${number}full.jpg)`;
        pictureQuestion.style.backgroundImage = pictureSource;
    } catch (err){
        throw err;
    }
}

async function findRightAuthor(number){
    try{
        const rightAuthor = images[number].author;
        return rightAuthor;
    } catch(err){
        throw err
    }
}

function createRandomNumber(min, max){
    return Math.floor(Math.random() * (max - min) + min);
}

async function createFalseAuthorArray(number){
    try{
        let falseNum 
        let rightAuthor = await findRightAuthor(number);
        let falseArray = []   
        for(let i = 0; i < 4; i++){
            falseNum = createRandomNumber(0, 241);
            let falseAuthor = images[falseNum].author;
            if( rightAuthor != falseAuthor){
            falseArray.push(falseAuthor);
            } else{
                falseArray = createFalseAuthorArray(number);
                return falseArray;
            }
        }
        return falseArray;
        
    } catch(err){
        throw err;
    }
}


async function insertRightAnswer(number){
    try{
       let randomAnswerSpot = createRandomNumber(0, 4);
       let rightAuthor =  await findRightAuthor(number);
       const answers = declareAnswers();
       
       answers[randomAnswerSpot].textContent = rightAuthor;
 
    } catch (err){
        throw err
    }
 }

 async function insertAnswers(number){
    try{ 
        const answers = declareAnswers();
        const falseAuthors = await createFalseAuthorArray(number);
        for(let i = 0; i < answers.length; i++){
            answers[i].textContent = falseAuthors[i]
        }
        insertRightAnswer(number);
 
    } catch (err){
        throw err
    }
 }


 function isCorrect(element, number){
    let answerClicked = element.textContent;
    let correctAnswer = images[number].author;
    
    if (answerClicked === correctAnswer){
        console.log(true);
        localStorage.setItem(`${number}`, true);
        return true;
    } else {
        console.log(false);
        localStorage.setItem(`${number}`, false);
        return false;
    }
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

 function changeQuizView(number){
    if(clickNumber === 10){
       let score = setScore();
       showScorePopup(score);
    } else{
    changePicture(number);
    insertAnswers(number);
    hidePopUp();
    }
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

export class ArtistQuizConstructor{
    constructor(){

    }

    createQuestion(number){
        let initNum = trackerInit(number)
        changePicture(initNum);
        insertAnswers(initNum);
        setListeners(initNum);
       }

    
}
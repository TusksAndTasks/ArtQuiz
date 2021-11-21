import {images} from "./images.js";



function declareAnswers(){
    if(document.querySelectorAll('.answer')){
        const answers = document.querySelectorAll('.answer');
    return answers
    }
}

function declareQuestion(){
    if(document.querySelector('.question')){
        const question = document.querySelector('.question');

        return question;
    }
}

//tracker


function trackerInit(number){
    if(number > 0){
        const numberOfAuthor = (110 + (number * 10)) - 1;
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
       }

    
}
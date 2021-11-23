import { paintingCategory } from './paintings-category.js';
import { artistCategory } from './artist-category.js';


const categoryList = document.querySelector('main');
let innerList = ` <div class="container-category">
<nav class = "category-nav">
  <a href=''><button class="main-button">Home</button></a>
  <a href='#score'><button class="score-button">Score</button></a>
</nav>
<div class="category-list">`

async function insertPaintingCategories(){
    try{
        const paintingList = await createPaintingsList();
                categoryList.innerHTML = paintingList;
                innerList = ` <div class="container-category">
                <nav class = "category-nav">
                  <a href=''><button class="main-button">Home</button></a>
                  <a href='#score'><button class="score-button">Score</button></a>
                </nav>
                <div class="category-list">`
                insertPaintingScore();
                changeUnansweredPics();
} catch (err) {
    throw err
}
}

async function insertArtistCategories(){
    try{
        const artistList = await createArtistsList();
                categoryList.innerHTML = artistList;
                innerList = ` <div class="container-category">
                <nav class = "category-nav">
                  <a href=''><button class="main-button">Home</button></a>
                  <a href='#score'><button class="score-button">Score</button></a>
                </nav>
                <div class="category-list">`
                insertArtistsScore();
                changeUnansweredPics();
} catch (err) {
    throw err
}
}


async function createPaintingsList(){
    try{
          for (let categoryNumber in paintingCategory){
            innerList = innerList + `<div class="category"><a href="#paintingsPack-${+categoryNumber + 1}">
            <div class="category-title">${paintingCategory[categoryNumber].title}</div>
            <img src="${paintingCategory[categoryNumber].source}" alt="first-picture" width="220" height="220">
            </a>
            <a href="#paintingScore-${+categoryNumber + 1}">
            <div class="category-score">Score <span class="current-score"></span> </div>
            </a></div>
            `
          }
          innerList = innerList + ` </div>
          </div>`
        return innerList;

    } catch(err){
        throw err
    }
}


async function createArtistsList(){
    try{
          for (let artistNumber in artistCategory){
            innerList = innerList + `<div class="category"><a href="#artistsPack-${+artistNumber + 1}">
            <div class="category-title">${artistCategory[artistNumber].title}</div>
            <img src="${artistCategory[artistNumber].source}" alt="first-picture" width="220" height="220">
            </a>
            <a href="#artistScore-${+artistNumber + 1}">
            <div class="category-score">Score <span class="current-score"></span> </div>
            </a>
            </div>`
          }
          innerList = innerList + ` </div>
          </div>`
        return innerList;

    } catch(err){
        throw err
    }
}

function insertArtistsScore(){
  for(let i = 0; i <= 11; i++){
    if(localStorage.getItem(`artists-${i + 1}`)){
  document.querySelectorAll('.current-score')[i].textContent = localStorage.getItem(`artists-${i + 1}`)
    }
  }
}


function insertPaintingScore(){
    for(let i = 0; i <= 11; i++){
      if(localStorage.getItem(`pictures-${i + 1}`)){
    document.querySelectorAll('.current-score')[i].textContent = localStorage.getItem(`pictures-${i + 1}`)
      }
    }
  }

function changeUnansweredPics(){
  for(let i = 0; i <= 11; i++){
    if(document.querySelectorAll('.current-score')[i].textContent === ''){
      document.querySelectorAll('.category img')[i].classList.add('non-answered');
    }
  }
}  

export default class {
    constructor(){

    }

    paintings(){
        insertPaintingCategories();
    }

    artists(){
        insertArtistCategories();
    }

}
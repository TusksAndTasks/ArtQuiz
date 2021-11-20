import category from "./category.js";
const categoryLayout = new category();


function getRoute(){
    const hash = location.hash ? location.hash.slice(1) : '';
    return hash
}


function changeRoute() {
   const route = getRoute(); 

    switchView(route);
}

const header = document.querySelector('header');
const main = document.querySelector('main');

function switchView(location) {

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
     const route = getRoute();
     return route;
  }
}
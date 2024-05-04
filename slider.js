let images = [{
    url: "./css/image/banner.png",
},
{
    url: "./css/image/banner2.png",
},
{
    url: "./css/image/banner3.png",
}
];

const slider = document.querySelector(".slider");
const sliderDots = document.querySelector(".slider__dots");

let currentSlideIndex = 0;
let dotsArr = [];

slider.style.backgroundImage = `url(${images[0].url})`;

function addDots() {
    let div = document.createElement('div');
    div.classList.add('slider__dots-item');
    sliderDots.appendChild(div);
    dotsArr.push(div);
}

function createDots() {
    images.forEach(addDots);
    dotsArr[currentSlideIndex].classList.add('active');
    dotsArr.forEach((dot, index) => {
        dot.addEventListener('click', () => moveSlider(index));
    });
}

createDots();

function addActiveDots() {
    dotsArr[currentSlideIndex].classList.add('active');
}

function removeActiveDots() {
    dotsArr[currentSlideIndex].classList.remove('active');
}

function moveSlider(moveIndex) {
    removeActiveDots();    
    currentSlideIndex = moveIndex;
    slider.style.backgroundImage = `url(${images[moveIndex].url})`;
    
    if (moveIndex >= images.length - 1) {
        moveIndex = 0;        
    } else {
        moveIndex++;
    }
    addActiveDots();
}

let counter = 0;

function incrementCounter() {
    if (counter >= images.length - 1) {
        counter = 0;
    } else {
        counter++;
    }
    moveSlider(counter);
}

setInterval(incrementCounter,5000);
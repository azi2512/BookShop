const shopBag = document.querySelector(".shop-bag");

let shopBagCount = 0;

function addActiveToShopBag() {
    let div = document.createElement('div');
    div.classList.add('shop-bag-active');
    shopBag.appendChild(div);
    div.innerHTML = shopBagCount;
}

const apiKey = 'AIzaSyBak8hxV9y8_3MrsC0_c-NcOoRyYkFU88c';

const bookImage = document.querySelectorAll(".books__card-image")
const autorContainer = document.querySelectorAll(".books__card-autor")
const nameContainer = document.querySelectorAll('.books__card-name');
const raitingContainer = document.querySelectorAll('.books__card-rating');

function getBooks(index) {
    let url = `https://www.googleapis.com/books/v1/volumes?q="subject:Business"&key=${apiKey}&printType=books&startIndex=${index}&maxResults=6&langRestrict=en`;
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);

    xhr.onload = () => {
        const res = JSON.parse(xhr.response);
        displayBooks(res.items);
    }

    xhr.send();
}

getBooks(0);

function displayBooks(books) {
    const booksContainer = document.querySelector('.books');
    if (books) {
        books.forEach((item) => {
            const price = item.saleInfo.retailPrice;
            const template = `<div class="books__card">
            <img class="books__card-image" src=${item.volumeInfo.imageLinks.thumbnail} alt="img">
            <div class="books__card-description">
                <div class="books__card-top">
                    <div class="books__card-autor">${item.volumeInfo.authors.join(', ')}</div>
                    <h2 class="books__card-name">${item.volumeInfo.title}</h2>
                    <div class="books__card-rating">
                        <p class="books__card-rating-stars_yellow">${item.volumeInfo.averageRating || ''}</p>
                        <p class="books__card-rating-reviews">${item.volumeInfo.ratingsCount || ''}</p>
                    </div>
                    <p class="books__card-text">${item.volumeInfo.description || ''}</p>
                </div>
                <div class="books__card-footer">
                    <p class="books__card-price">${price?.amount || ''} ${price ? 'rub' : ''}</p>
                    <button class="books__card-btn">buy now</button>
                </div>
            </div>
        </div>`;
            booksContainer.innerHTML += template; 
        })
    }

    const booksCardBtn = document.querySelectorAll(".books__card-btn");

    booksCardBtn.forEach((btn) => {
        btn.addEventListener('click', () => { 
            btn.classList.toggle('books__card-btn_active');
            if (btn.innerHTML == "in the cart") {
                btn.innerHTML = "buy now";
                shopBagCount--;            
                if (shopBagCount === 0) {
                    const ololo = document.querySelector('.shop-bag-active');
                    ololo.remove();
                }
            } else {
                btn.innerHTML = "in the cart";
                shopBagCount++;
            }
                
            addActiveToShopBag();            
        });
    })
}

const loadBtn = document.querySelector('.load-btn');

loadBtn.addEventListener('click', () => {
    const allCards = document.querySelectorAll('.books__card');
    getBooks(allCards.length);
})
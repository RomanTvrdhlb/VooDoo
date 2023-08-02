const productPerPage = 24;
let card = [];
const productListContainer = document.querySelector('.main-list');


async function fetchProducts(page) {
    const url = `https://voodoo-sandbox.myshopify.com/products.json?limit=${productPerPage}&page=${page}`;
    const response = await fetch(url);
    const data = await response.json();
    return data.products
}

function displayProducts(products) {
    
    productListContainer.innerHTML = '';
    products.forEach(function(product){
        const productCardWrapper = document.createElement('li');
        productCardWrapper.className = ('main-list__item');

        const productCard = document.createElement('div');
        productCard.className = ('main-card');
        productCard.innerHTML = `
            <div class='main-card__top'>
                <div class='main-card__id'>${product.id}</div>
                <div class='main-card__image'>${product.featured_image}</div>

            </div>

            <ul class='main-card__list'>
                <li class='main-card__item'>
                    <h2 class='main-card__title'>'Product name ${product.title}'</h2>
                    <span class='main-card__price'>${product.price}</span> 
                </li>
                <li class='main-card__item'>
                    <span class='main-card__name main-card__name--mode'>Condition</span>
                    <span class='main-card__name'>${product.aviable}</span>
                </li>
            </ul>
          
            <button class='main-button'>ADD TO CARD</button>
            `;

            productCardWrapper.appendChild(productCard);
            productListContainer.appendChild(productCardWrapper);
    })
}

async function loadInitialProducts(){
    const products = await fetchProducts();
    displayProducts(products);
    // displayPaginaton();
}

loadInitialProducts();



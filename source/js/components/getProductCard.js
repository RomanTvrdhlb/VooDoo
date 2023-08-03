const productListContainer = document.querySelector('.main-list');
const navPages = document.querySelector(".page-nav");
const productPerPage = '24';

function displayPaginaton(products) {
    let productOnPages = [];
    const countPages = Math.ceil(products.length / productPerPage);
    let productOnPage;

    for (let i = 0; i < countPages; i++){
        productOnPages[i] = products.slice((i*productPerPage), (i*productPerPage) + productPerPage);
    }
   
    productOnPages.forEach(function(productOnPage, index){
        pageItem = document.createElement('li');
        pageItem.className = ('page-nav__item');
        pageBtn = document.createElement('a');
        pageBtn.className = ('page-nav__link');
        pageBtn.innerHTML = ++index;
        pageItem.appendChild(pageBtn);
        navPages.appendChild(pageItem);
    
        pageBtn.setAttribute('data-id', index);
        const page = pageBtn.dataset.id;

        
        pageBtn.addEventListener('click', function(e){
            displayProducts(productOnPage);
        })
    })
}


async function fetchProducts(page) {
    const url = `https://voodoo-sandbox.myshopify.com/products.json?`;
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
        productCard.className = ('main-card flex flex-col gap-3 h-full');
        productCard.innerHTML = `
            <div class='main-card__top p-3 rounded border border-black border-solid'>
                <div class='w-12 p-2 bg-black text-xs rounded text-white font-normal'>${product.values}</div>
            </div>

            <ul class='flex justify-between gap-2 h-full'>
                <li class='flex-col flex'>
                    <h2 class='text-black text-sm font-bold'>Product name: ${product.title}</h2>

                    <span class='text-black text-sm font-bold'>${product.price}</span> 
                </li>
                <li class='flex-col flex items-end'>
                    <span class='text-black text-sm font-medium'>Condition</span>
                    <span class='text-black text-sm font-normal'>${product.position}</span>
                </li>
            </ul>
          
            <button class='main-button font-bold text-sm text-white gap-2.5 p-4 w-full rounded flex items-center justify-center'>ADD TO CARD</button>
            `;

            productCardWrapper.appendChild(productCard);
            productListContainer.appendChild(productCardWrapper);
    })
}






async function loadInitialProducts(){
    const products = await fetchProducts();
    displayProducts(products);
 
    displayPaginaton(products);
}

loadInitialProducts();



const productListContainer = document.querySelector('.main-list');
const productPerPage = '24';

// function displayPaginaton(allProducts,page) {

//     const countPages = Math.ceil(allProducts / productPerPage);

//     const navBtn = document.querySelector(".page-nav");
//     let page = "";

//     for (const i = 0; i < countPages; i++) {
//     page += "<span class='page-nav__link'>" + (i + 1) + "</span>";
//     }

//     navBtn.innerHTML = page;
// }


async function fetchProducts(page) {
    const url = `https://voodoo-sandbox.myshopify.com/products.json?limit=${productPerPage}&page=${page}`;
    const response = await fetch(url);
    const data = await response.json();
    return data.products
}


function displayProducts(products) {  

    const allProducts = products.all_products;  
    
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
 
    // displayPaginaton(products);
}

loadInitialProducts();



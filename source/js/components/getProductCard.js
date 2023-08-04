const productListContainer = document.querySelector(".main-list");
const navPages = document.querySelector(".page-nav");
const productPerPage = "24";
let productOnPages = [];

async function fetchProducts(page) {
  const url = `https://voodoo-sandbox.myshopify.com/products.json?`;
  const response = await fetch(url);
  const data = await response.json();
  return data.products;
}

function sliceProducts(allProducts, productOnPages) {
  const countPages = Math.ceil(allProducts.length / productPerPage);

  for (let i = 0; i < countPages; i++) {
    productOnPages[i] = allProducts.slice(
      i * productPerPage,
      i * productPerPage + productPerPage
    );
  }
  return productOnPages;
}

function displayPaginaton(productOnPages) {
  let productOnPage;

  productOnPages.forEach(function (productOnPage, index) {
    pageItem = document.createElement("li");
    pageItem.className = "page-nav__item";
    pageBtn = document.createElement("a");
    pageBtn.className = "page-nav__link";
    pageBtn.innerHTML = ++index;
    pageItem.appendChild(pageBtn);
    navPages.appendChild(pageItem);

    pageBtn.setAttribute("data-id", index);
    const page = pageBtn.dataset.id;

    pageBtn.addEventListener("click", function (e) {
      e.preventDefault();
      displayProducts(productOnPage);
    });
  });
}

function displayProducts(products) {
  productListContainer.innerHTML = "";
  products.forEach(function (product) {
    const productCardWrapper = document.createElement("li");
    productCardWrapper.className = "main-list__item";

    const productCard = document.createElement("div");
    productCard.className = "main-card flex flex-col gap-3 h-full";
    productCard.innerHTML = `
            <div class='main-card__top p-3 rounded border border-black border-solid'>
                <div class='w-12 p-2 bg-black text-xs rounded text-white font-normal'>${product.values}</div>
            </div>

            <ul class='flex justify-between gap-2 h-full'>
                <li class='flex-col flex'>
                    <h2 class='main-card__title text-black text-sm font-bold'>Product name: ${product.title}</h2>

                    <span class='text-black text-sm font-bold'>${product.price}</span> 
                </li>
                <li class='flex-col flex items-end'>
                    <span class='text-black text-sm font-medium'>Condition</span>
                    <span class='text-black text-sm font-normal'>${product.position}</span>
                </li>
            </ul>
          
            <button class='main-button font-bold text-sm text-white gap-2.5 p-4 w-full rounded flex items-center justify-center'>ADD TO CARD</button>
            `;

    productCard
      .querySelector(".main-card__title")
      .setAttribute("data-title", `${product.title}`);
    productCard
      .querySelector(".main-button")
      .setAttribute("data-id", `${product.id}`);

    productCardWrapper.appendChild(productCard);
    productListContainer.appendChild(productCardWrapper);
  });
}

function paginationAddClass() {
  const paginationBtns = document.querySelectorAll(".page-nav__link");

  paginationBtns.forEach(function (btn) {
    paginationBtns[0].classList.add("active");

    btn.addEventListener("click", function (e) {
      e.preventDefault();

      paginationBtns.forEach(function (btn) {
        btn.classList.remove("active");
      });

      btn.classList.add("active");
    });
  });
}

function getCartData() {
    return JSON.parse(localStorage.getItem("cart"));
  }

function setCartData(o) {
    localStorage.setItem("cart", JSON.stringify(o));
    return false;
}

function addEvent(elem, type, handler) {
    if (elem.addEventListener) {
      elem.addEventListener(type, handler, false);
    } else {
      elem.attachEvent("on" + type, function () {
        handler.call(elem);
      });
    }
    return false;
}

function addToCart(e) {
    this.disabled = true;
    var cartData = getCartData() || {},
      parentBox = this.parentNode,
      itemId = this.getAttribute("data-id"),
      itemTitle = parentBox
        .querySelector(".main-card__title")
        .getAttribute("data-title");
    itemCount = 1;

    if (cartData.hasOwnProperty(itemId)) {
      cartData[itemId][1] += 1;
    } else {
      cartData[itemId] = [itemTitle, itemCount];
    }

    if (!setCartData(cartData)) {
      this.disabled = false;
    }
    return false;
}

function openCart(e) {
    let cartData = getCartData(),
      totalItems = "";

    if (cartData !== null) {
      totalItems =
        '<ul class="basket-menu__list pt-12 flex flex-col gap-10 text-white">';
      for (var items in cartData) {
        totalItems += "<li>";
        totalItems += '<div class="basket-menu__product flex flex-row gap-5">';
        totalItems += '<div class="basket-menu__image">' + "</div>";
        totalItems += '<div class="basket-menu__info flex flex-col gap-3">';
        totalItems += "<span>" + cartData[items][0] + "</span>";

        totalItems += '<form class="number">';
        totalItems +=
          '<button class="number-minus focus:outline-none" type="button">' +
          "</button>";
        totalItems += '<label class="number__label">';
        totalItems +=
          '<span class="number-count">' + cartData[items][1] + "</span>";
        totalItems +=
          '<input class="number__input" type="number" min="0" value="1">' +
          "</input>";
        totalItems += "</label>";

        totalItems +=
          '<button class="number-plus focus:outline-none" type="button">' +
          "</button>";
        totalItems += "</form>";

        totalItems += "</div>";
        totalItems +=
          '<button class="basket-menu__delete focus:outline-none" data-btn>' +
          "</button>";
        totalItems += "</div>";
        totalItems += "</li>";
      }
      totalItems += "</ul>";

      cartCont.innerHTML = totalItems;
    } else {
      cartCont.innerHTML = "В корзине пусто!";
    }

    return false;
}

function addProductInBasket() {
  (itemBox = document.querySelectorAll(".main-card")),
    (cartCont = document.querySelector(".basket-menu__inner"));
  const basketBtn = document.querySelector(".order-button");

  for (let i = 0; i < itemBox.length; i++) {
    addEvent(itemBox[i].querySelector(".main-button"), "click", addToCart);
  }

  basketBtn.addEventListener("click", openCart);

  addEvent(document.getElementById("clear"), "click", function (e) {
    localStorage.removeItem("cart");
    cartCont.innerHTML = "Корзина очишена.";
  });
}

async function loadInitialProducts() {
  const products = await fetchProducts();

  sliceProducts(products, productOnPages);
  displayPaginaton(productOnPages);
  displayProducts(productOnPages[0]);
  paginationAddClass();
  addProductInBasket();
}

loadInitialProducts();
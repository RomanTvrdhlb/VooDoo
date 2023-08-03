const asideMenu = document.querySelector('.basket-menu');
const basketBtn = document.querySelector('.order-button');

function showAsideMenu(btn,menu){
    btn.addEventListener('click', function(e){
        e.preventDefault();
        menu.classList.add('active');       
    })
}

function hideAsideMenu(menu){
    const closeBtn =  menu.querySelector('.close');
        
    closeBtn.addEventListener('click', function(e){
        e.preventDefault();        
        menu.classList.remove('active');
    })
}

if(asideMenu){
    showAsideMenu(basketBtn,asideMenu);
    hideAsideMenu(asideMenu);
}




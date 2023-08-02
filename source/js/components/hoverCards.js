import vars from "../_vars";

import {
  addCustomClass,
  removeCustomClass,
  toggleCustomClass
  
} from "../functions/customFunctions";
const { mainCards } = vars;

function mouseHover (items, item){
    item.addEventListener('mouseover', function(){
        items.forEach(function(){
            if(items[1].classList.contains('active')){
                toggleCustomClass(items[1]);
            }
        })
        addCustomClass(item);    
     })
     item.addEventListener('mouseout', function(){
        removeCustomClass(item);
        items.forEach(function(){
            if(!items[1].classList.contains('active')){
                toggleCustomClass(items[1]);
            }
        })
     })
  }

mainCards.forEach(function(card){
mouseHover(mainCards, card);
})


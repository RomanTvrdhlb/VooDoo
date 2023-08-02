import { disableScroll } from "../functions/disable-scroll";
import { enableScroll } from "../functions/enable-scroll";
import vars from "../_vars";

import {
  addCustomClass,
  toggleCustomClass,
  removeCustomClass,
} from "../functions/customFunctions";
const { overlay, burger, mobileMenu, mainLinks, bodyEl, callBtn, activeMode } =
  vars;

const mobileMenuHandler = function (overlay, mobileMenu, btn) {
  btn.addEventListener("click", function () {
    toggleCustomClass(burger, "active");
    toggleCustomClass(mobileMenu, "active");
    toggleCustomClass(overlay, activeMode);

    if (!bodyEl.classList.contains("dis-scroll")) {
      disableScroll();
    } else {
      enableScroll('');
    }
  });
};

const hideMenuHandler = function (overlay, mobileMenu, burger) {
  removeCustomClass(mobileMenu, "active");
  removeCustomClass(burger, "active");
  removeCustomClass(overlay, activeMode);
  // enableScroll('');
};

if(burger) {
  mainLinks.map(function(item){
    item.addEventListener('click', function(){
      hideMenuHandler(overlay,mobileMenu,burger)
    });
  })

}

if (callBtn) {
  callBtn.addEventListener("click", function (e) {
    e.preventDefault;
    hideMenuHandler(overlay, mobileMenu, burger);
  });
}

if (overlay) {
  mobileMenuHandler(overlay, mobileMenu, burger);
  overlay.addEventListener("click", function (e) {
    if (e.target.classList.contains("overlay")) {
      hideMenuHandler(overlay, mobileMenu, burger);
    }
  });
}

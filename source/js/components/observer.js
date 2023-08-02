import {addCustomClass, removeCustomClass, removeClassInArray} from '../functions/customFunctions';
import vars from '../_vars';
import { enableScroll } from "../functions/enable-scroll";

const {header,mainLinks,observSections} = vars

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      mainLinks.forEach((link) =>{
        if (link.getAttribute('href').replace('#', '') == entry.target.id) {
          addCustomClass(link, 'active');
        } else {
          removeCustomClass(link, 'active');
        }
      })
    }
  });
}, {
  threshold: 0.4
});

observSections.forEach((section) => observer.observe(section))

mainLinks.map(function(link){
  link.addEventListener('click', function(e){
    e.preventDefault();    
    const id = e.target.getAttribute('href').replace('#', '');
    let headerHeight = header.clientHeight;

    enableScroll(document.getElementById(id).offsetTop - (headerHeight))

  })
})
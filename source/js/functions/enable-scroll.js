import vars from '../_vars';
const {bodyEl} = vars;

export const enableScroll = (position) => {
  const fixBlocks = document?.querySelectorAll('.fixed-block');
  const body = document.body;

  let pagePosition = parseInt(bodyEl.dataset.position, 10);
 
  fixBlocks.forEach(el => { el.style.paddingRight = '0px'; });
  bodyEl.style.paddingRight = '0px';

  bodyEl.style.top = 'auto';
  bodyEl.classList.remove('dis-scroll');
  window.scrollTo({
    top: position === '' ? pagePosition : position ,
    // left: 0,
    behavior: position === '' ? 'instant' : 'smooth',
  });
}
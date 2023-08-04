const btnMinus = document.querySelectorAll(".number-minus");
const btnPlus = document.querySelectorAll(".number-plus");

for (const btn of btnPlus) {
  btn.onclick = function (e) {
    console.log('123');
    const myForm = this.parentElement
    const myInput = myForm.querySelector('input');
    myInput.stepUp();
  };
}

for (const btn of btnMinus) {
  btn.onclick = function (e) {
    console.log('123');
    const myForm = this.parentElement
    const myInput = myForm.querySelector('input');
    myInput.stepDown();
  };
}
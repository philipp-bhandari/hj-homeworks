'use strict';

let dropdownDiv = document.getElementsByClassName('wrapper-dropdown');
for(let elem of dropdownDiv) {
    elem.addEventListener('click', ()=>{
        if(elem.classList.contains('active')) {
            elem.classList.remove('active');
        } else {
            elem.classList.add('active');
        }
    });
}

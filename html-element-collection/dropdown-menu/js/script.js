'use strict';

const dropdownDiv = document.getElementsByClassName('wrapper-dropdown');
for(let elem of dropdownDiv) {
    elem.addEventListener('click', ()=>{
        elem.classList.toggle('active');
    });
}

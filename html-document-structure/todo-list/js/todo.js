'use strict';

const inputs = document.querySelectorAll(".todo-list input[type='checkbox']");
const doneList = document.querySelector('.done');
const undoneList = document.querySelector('.undone');
function changeParent() {

    if(!this.checked) {
        undoneList.appendChild(this.parentElement);
    } else {
        doneList.appendChild(this.parentElement);
    }
}

for(let input of inputs) {
    input.addEventListener('click', changeParent);
}
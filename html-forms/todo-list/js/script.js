'use strict';

document.addEventListener('DOMContentLoaded', ()=>{
    const fieldset = document.querySelector('.list-block');
    const countTasks = document.querySelector('h3 output');
    function getCountChecks() {
        const inputs = fieldset.getElementsByTagName('input');
        let counter = 0;
        for(let input of inputs) {
            if(input.checked) {
                counter += 1;
            }
        }
        if(counter === inputs.length) {
            fieldset.classList.add('complete');
        } else {
            fieldset.classList.remove('complete');
        }
        return `${counter} из ${inputs.length}`;
    }
    function checkTask(e) {
        let target;
        if (e.target.tagName === 'INPUT') {
            target = e.target;
            countTasks.innerHTML = getCountChecks();
        }
    }

    fieldset.addEventListener('click', checkTask);
    countTasks.innerHTML = getCountChecks().toString();
});
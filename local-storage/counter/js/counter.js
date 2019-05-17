'use strict';

const counterblock = document.getElementById('counter'),
    incrementButton = document.getElementById('increment'),
    decrementButton = document.getElementById('decrement'),
    resetButton = document.getElementById('reset');


function changeCounter(e) {
    localStorage.counter
        = counterblock.textContent
        = save(e.target.id);
}

function save(operation){
    switch (operation) {
        case 'increment':
            return parseInt(counterblock.textContent) + 1;
        case 'decrement':
            return counterblock.textContent !== '0' ? parseInt(counterblock.textContent) - 1 : 0;
        case 'reset':
            return 0;
    }
}
counterblock.textContent = localStorage.counter || 0;

incrementButton.addEventListener('click', changeCounter);
decrementButton.addEventListener('click', changeCounter);
resetButton.addEventListener('click', changeCounter);
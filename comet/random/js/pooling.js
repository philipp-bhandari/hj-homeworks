'use strict';
const quickPooling = document.querySelector('.pooling');
const itemPooling = quickPooling.querySelectorAll('div');

function getNumber(event) {
    if (event.target.status === 200) {
        const response = event.target.responseText;

        Array.from(itemPooling)
            .forEach(card => {
                card.textContent === response.trim() ? card.classList.add('flip-it') : card.removeAttribute('class');
            });
    }
}

function init() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://neto-api.herokuapp.com/comet/pooling');
    xhr.addEventListener('load', getNumber);
    xhr.send();
}

setInterval(init, 5000);

'use strict';

const slowPooling = document.querySelector('.long-pooling');
const itemSlowPooling = slowPooling.querySelectorAll('div');

function getSlowPooling() {
    const request = new XMLHttpRequest();
    request.open('GET', 'https://neto-api.herokuapp.com/comet/long-pooling');
    request.addEventListener('load', getData);
    request.send();
}

function getData(event) {
    if (event.target.status >= 200 && event.target.status < 300) {
        if (event.target.responseText) {
            const response = event.target.responseText;

            Array.from(itemSlowPooling)
                .forEach(card => {
                    card.textContent === response.trim() ? card.classList.add('flip-it') : card.removeAttribute('class');
                });
        }
    }

    getSlowPooling();
}

getSlowPooling();

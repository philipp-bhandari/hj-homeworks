'use strict';
const queryWS = document.querySelector('.websocket');
const tagWS = queryWS.querySelectorAll('div');

const ws = new WebSocket('wss://neto-api.herokuapp.com/comet/websocket');

ws.addEventListener('message', (event) => {
    Array.from(tagWS)
        .forEach(card => {
            card.textContent === event.data.trim() ? card.classList.add('flip-it') : card.removeAttribute('class');
        });
});

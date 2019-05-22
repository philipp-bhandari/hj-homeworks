'use strict';

const counterSpan = document.querySelector('.counter'),
    errorsOutput = document.querySelector('.errors'),
    socket = new WebSocket('wss://neto-api.herokuapp.com/counter');

socket.addEventListener('open', ()=>{
    console.log('Соединение открыто');
});

socket.addEventListener('message', event => {
    const data = JSON.parse(event.data);
    counterSpan.innerHTML = data.connections;
    errorsOutput.innerHTML = data.errors;
});

window.addEventListener('beforeunload',()=>{
    socket.onclose = () => {
        console.log('Соединение закрыто');
    };
    socket.close(1000);
});
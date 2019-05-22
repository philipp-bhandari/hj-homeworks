'use strict';

const socket = new WebSocket('wss://neto-api.herokuapp.com/mouse');

showBubbles(socket);

socket.addEventListener('open', ()=>{
    console.log('Соединение открыто');
});

document.addEventListener('click', (e)=>{
    let obj = {
        x: e.pageX,
        y: e.pageY
    };

    obj = JSON.stringify(obj);
    socket.send(obj);
});

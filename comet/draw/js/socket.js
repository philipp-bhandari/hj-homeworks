'use strict';
const socket = new WebSocket('wss://neto-api.herokuapp.com/draw');

function sendData(event) {
    const events = document.getElementById(event.id);
    const ctx = canvas.getContext('2d');
    event.canvas.toBlob(blob => socket.send(blob));
}

socket.addEventListener('open', (event) => {
    editor.addEventListener('update', sendData);
});

socket.addEventListener('close', (event) => {
    editor.removeEventListener('update', sendData);
});

socket.addEventListener('error', (error) => {
    console.error(error.data);
});

window.addEventListener('beforeunload', () => {
    socket.close(1000, 'Сессия закрыта');
});

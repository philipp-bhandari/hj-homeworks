'use strict';
let secret = [];
const divSecret = document.getElementsByClassName('secret')[0];
const re = /Key/gi;

function viewMenu(e) {
    e.preventDefault();
    const nav = document.getElementsByTagName('nav')[0];
    if(e.code === 'KeyT' && e.ctrlKey && e.altKey) {
        nav.classList.toggle('visible');
    }
}
function secretWord(e) {
    secret.push(e.code);
    if(secret.length >= 9) {
        let secretString = secret.join('').replace(re, '');
        secretString = secretString.substr(-9);
        if(secretString === 'YTNJKJUBZ') {
            divSecret.classList.add('visible');
        }
    }
}

document.addEventListener('keydown', viewMenu);
document.addEventListener('keydown', secretWord);
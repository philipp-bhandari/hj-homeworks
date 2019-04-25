'use strict';

const drumButtons = document.getElementsByClassName('drum-kit__drum');
for (let button of drumButtons) {
    button.addEventListener('click', ()=>{
        button.getElementsByTagName('audio')[0].play();
    });
}
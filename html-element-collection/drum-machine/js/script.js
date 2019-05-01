'use strict';

const drumButtons = document.getElementsByClassName('drum-kit__drum');
for (let button of drumButtons) {
    button.addEventListener('click', ()=>{
        let audio = button.getElementsByTagName('audio')[0];
        audio.pause();
        audio.currentTime = 0;
        audio.play();
    });
}
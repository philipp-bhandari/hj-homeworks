'use strict';

function getFilename(str) {
    return str.split('/').pop();
}

function useKey(e) {
    const audio = e.target.getElementsByTagName('audio')[0];
    e.preventDefault();
    audio.pause();
    audio.currentTime = 0;

    let name = getFilename(audio.src);

    if(e.shiftKey) {
        audio.src = `sounds/lower/${name}`;
    } else if(e.altKey) {
        audio.src = `sounds/higher/${name}`;
    } else {
        audio.src = `sounds/middle/${name}`;
    }
    audio.play();
}

const  piano = document.getElementsByClassName('set')[0];
piano.addEventListener('click', useKey);
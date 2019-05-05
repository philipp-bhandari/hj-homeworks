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
    const classList = e.currentTarget.classList;

    if(e.shiftKey) {
        classList.remove(classList[1]);
        classList.add('lower');
        audio.src = `sounds/lower/${name}`;
    } else if(e.altKey) {
        classList.remove(classList[1]);
        classList.add('higher');
        audio.src = `sounds/higher/${name}`;
    } else {
        classList.remove(classList[1]);
        classList.add('middle');
        audio.src = `sounds/middle/${name}`;
    }
    audio.play();
}

const  piano = document.getElementsByClassName('set')[0];
piano.addEventListener('click', useKey);
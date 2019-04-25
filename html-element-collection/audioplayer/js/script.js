'use strict';

const playBtn = document.getElementsByClassName('playstate')[0];
const mediaplayer = document.getElementsByClassName('mediaplayer')[0];
const audio = document.getElementsByTagName('audio')[0];
const stopBtn = document.getElementsByClassName('stop')[0];
const song = document.getElementsByClassName('title')[0];
const songList = [
    "LA Chill Tour",
    "This is it band",
    "LA Fusion Jam"
];
const backBtn = document.getElementsByClassName('back')[0];
const nextBtn = document.getElementsByClassName('next')[0];
let counter = 0;

function changeSong(arr, elem, counter) {
    if (counter < 0) {
        counter = arr.length - 1;
    } else if (counter > arr.length - 1) {
        counter = 0;
    }

    elem.src = `mp3/${arr[counter]}.mp3`;

    song.title = arr[counter];
    return counter;
}

playBtn.addEventListener('click', ()=>{
    if (mediaplayer.classList.contains('play')) {
        mediaplayer.classList.remove('play');
        audio.pause();
    } else {
        mediaplayer.classList.add('play');
        audio.play();
    }
});

stopBtn.addEventListener('click', ()=>{
    mediaplayer.classList.remove('play');
    audio.pause();
    audio.currentTime = 0;
});

backBtn.addEventListener('click', ()=>{
    counter = changeSong(songList, audio, counter - 1);
    if (mediaplayer.classList.contains('play')) {
        audio.play();
    } else {
        audio.pause();
    }
});
nextBtn.addEventListener('click', ()=>{
    counter = changeSong(songList, audio, counter + 1);
    if (mediaplayer.classList.contains('play')) {
        audio.play();
    } else {
        audio.pause();
    }
});


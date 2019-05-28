'use strict';

const cnvs = document.querySelector('canvas');
const ctx = cnvs.getContext('2d');
const cnvsWidth = cnvs.width;
const cnvsHeight = cnvs.height;
const PI = Math.PI;
const colors = ['#ffffff', '#ffe9c4', '#d4fbff'];

cnvs.style.backgroundColor = '#000000';

cnvs.addEventListener('click', (e) => {
    const countStars = randomNumber(200, 400);

    ctx.clearRect(0, 0, cnvsWidth, cnvsHeight);

    for (let i = 0; i < countStars; i++) {
        const x = Math.round(Math.random() * cnvsWidth);
        const y = Math.round(Math.random() * cnvsHeight);
        drawStar(x, y);
    }
});

function randomNumber(min, max, float = false) {
    return float ? (min + (Math.random() * (max - min))).toFixed(1) : Math.floor(min + Math.random() * (max + 1 - min));
}

function drawStar(x, y) {
    const radius = randomNumber(0, 1.1, true);
    const color = colors[randomNumber(0, 2)];
    const opacity = randomNumber(0.8, 1, true);

    ctx.beginPath();
    ctx.globalAlpha = opacity;
    ctx.fillStyle = color;
    ctx.fillRect(x, y, radius, radius);
    ctx.closePath();
}
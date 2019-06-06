'use strict';
document.addEventListener('DOMContentLoaded', updateEyePos);
document.addEventListener('mousemove', onMouseMove);
document.addEventListener('scroll', updateEyePos);

document.addEventListener('DOMContentLoaded', (evt) => console.log(evt));
const eye = document.querySelector('.big-book__eye');
let eyePos;
let eyeOtherPos;

function updateEyePos() {
    eyePos = eye.getBoundingClientRect();
    eyeOtherPos = {x: (eyePos.left + eyePos.right) / 2, y: (eyePos.top + eyePos.bottom) / 2};
}

/**
 *
 * @param event
 */
function onMouseMove(event) {
    updateEyeParams({x: event.clientX, y: event.clientY}, eyeOtherPos);
}

/**
 *
 * @param mouseCoords
 * @param eyeCenterCoords
 */
function updateEyeParams(mouseCoords, eyeCenterCoords) {
    const offsetX = (mouseCoords.x - eyeCenterCoords.x) /
        ((mouseCoords.x > eyeCenterCoords.x) ? window.innerWidth - eyeCenterCoords.x : eyeCenterCoords.x);

    const offsetY = (mouseCoords.y - eyeCenterCoords.y) /
        ((mouseCoords.y > eyeCenterCoords.y) ? window.innerHeight - eyeCenterCoords.y : eyeCenterCoords.y);

    const pupil = document.querySelector('.big-book__pupil');
    pupil.style.setProperty('--pupil-size', Math.min(conversion(offsetX), conversion(offsetY)));
    pupil.style.setProperty('--pupil-x', getResult(offsetX));
    pupil.style.setProperty('--pupil-y', getResult(offsetY));
}

/**
 *
 * @param percent {number}
 * @returns {number}
 */
function conversion(percent) {
    percent = Math.abs(percent);
    if (percent < 0.33) {
        return 3;
    } else if (percent > 0.66) {
        return 1;
    }
    return 2;
}

/**
 *
 * @param percent {number}
 * @returns {string}
 */
function getResult(percent) {
    return `${Math.round(percent * 30)}px`; }

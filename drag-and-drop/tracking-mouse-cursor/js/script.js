'use strict';

const
    leftEye = document.querySelector('.cat_eye_left'),
    rightEye = document.querySelector('.cat_eye_right'),
    leftEyeArea = document.querySelector('.cat_position_for_left_eye'),
    rightEyeArea = document.querySelector('.cat_position_for_right_eye'),
    cat = document.querySelector('.cat');

document.addEventListener('mousemove', leftEyeMoving);
document.addEventListener('mousemove', rightEyeMoving);

function leftEyeMoving(event) {
    event.preventDefault();
    let minLeft = 0;
    let minTop = 0;
    let x = event.pageX - cat.offsetLeft - leftEyeArea.offsetLeft;
    let y = event.pageY - cat.offsetTop - leftEyeArea.offsetTop;
    if (x < 0) {
        x = minLeft;
    }
    if (x > leftEyeArea.offsetWidth - leftEye.offsetWidth) {
        x = leftEyeArea.offsetWidth - leftEye.offsetWidth;
    }
    if (y < 0) {
        y = minTop;
    }
    if (y > leftEyeArea.offsetWidth - leftEye.offsetWidth) {
        y = leftEyeArea.offsetWidth - leftEye.offsetWidth;
    }
    leftEye.style.left = `${x}px`;
    leftEye.style.top = `${y}px`;
}

function rightEyeMoving(event) {
    event.preventDefault();
    let minLeft = 0;
    let minTop = 0;
    let x = event.pageX - cat.offsetLeft - rightEyeArea.offsetLeft;
    let y = event.pageY - cat.offsetTop - rightEyeArea.offsetTop;
    if (x < 0) {
        x = minLeft;
    }
    if (x > rightEyeArea.offsetWidth - rightEye.offsetWidth) {
        x = rightEyeArea.offsetWidth - rightEye.offsetWidth;
    }
    if (y < 0) {
        y = minTop;
    }
    if (y > rightEyeArea.offsetWidth - rightEye.offsetWidth) {
        y = rightEyeArea.offsetWidth - rightEye.offsetWidth;
    }
    rightEye.style.left = `${x}px`;
    rightEye.style.top = `${y}px`;
}
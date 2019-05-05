'use strict';

function clickElem(e) {
    e.preventDefault();
    let className = 'gallery-current';
    const currentImg = document.getElementsByClassName(className)[0];
    const imgParent = e.target.parentElement;
    const bigImg = document.getElementById('view');

    currentImg.classList.remove(className);
    imgParent.classList.add(className);
    bigImg.src = imgParent.getAttribute('href');
}
let navigation = document.getElementById('nav');
navigation.addEventListener('click', clickElem);
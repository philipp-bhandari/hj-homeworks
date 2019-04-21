'use strict';

function changeImg(arr, elem, counter) {
    if (counter < 0) {
        counter = arr.length - 1;
    } else if (counter > arr.length - 1) {
        counter = 0;
    }

    elem.src = `i/${arr[counter]}`;
    return counter;
}

window.onload = ()=>{
    const img = document.getElementById('currentPhoto');
    const namesList = [
        'breuer-building.jpg',
        'guggenheim-museum.jpg',
        'headquarters.jpg',
        'IAC.jpg',
        'new-museum.jpg'
    ];
    let counter = 0;
    counter = changeImg(namesList, img, counter);

    const prevPhotoButton = document.getElementById('prevPhoto');
    const nextPhotoButton = document.getElementById('nextPhoto');

    prevPhotoButton.onclick = ()=>{
        counter = changeImg(namesList, img, counter + 1);
    };
    nextPhotoButton.onclick = ()=>{
        counter = changeImg(namesList, img, counter - 1);
    };
};


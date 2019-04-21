'use strict';

function changeImg(arr, elem, counter) {
    elem.src = `i/${arr[counter]}`;
}

window.onload = ()=>{
    const img = document.getElementById('slider');
    const namesList = [
        'airmax.png',
        'airmax-jump.png',
        'airmax-on-foot.png',
        'airmax-playground.png',
        'airmax-top-view.png'
    ];
    let counter = 0;
    changeImg(namesList, img, counter);

    setInterval(()=>{
        counter += 1;
        if (namesList[counter]) {
            changeImg(namesList, img, counter);
        } else {
            counter = 0;
            changeImg(namesList, img, counter);
        }
    }, 5000);
};


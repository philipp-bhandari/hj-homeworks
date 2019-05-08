'use strict';

document.addEventListener('DOMContentLoaded', ()=>{
    const xhr = new XMLHttpRequest();
    const contentBlock = document.getElementById('content');
    function onLoad() {
        const result = JSON.parse(this.responseText);
        for(let book of result) {
            let li = document.createElement('li');
            let img = document.createElement('img');
            img.src = book.cover['small'];
            li.appendChild(img);
            li.dataset.title = book.title;
            li.dataset.author = book.author['name'];
            li.dataset.info = book.info;
            li.dataset.price = book.price;
            contentBlock.appendChild(li);
        }
    }

    xhr.open('GET', 'https://neto-api.herokuapp.com/book/');
    xhr.addEventListener('load', onLoad);
    xhr.send();
});
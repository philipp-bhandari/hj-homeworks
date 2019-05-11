'use strict';
function onLoad() {
    const result = JSON.parse(this.responseText),
        contentBlock = document.getElementById('content');

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
document.addEventListener('DOMContentLoaded', ()=>{
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://neto-api.herokuapp.com/book/');
    xhr.addEventListener('load', onLoad);
    xhr.send();
});
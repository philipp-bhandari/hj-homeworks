'use strict';

const listItems = document.querySelector('.items-list');
function addItem(e) {
    if(e.target.classList.contains('add-to-cart')) {
        const obj = {
            title: e.target.dataset.title,
            price: e.target.dataset.price
        };

        addToCart(obj);
    }
}
listItems.addEventListener('click', addItem);

'use strict';

const cart = document.getElementById('cart-count');
const totalPrice = document.getElementById('cart-total-price');

function addToCart(e) {
    cart.innerHTML = parseInt(cart.innerHTML) + 1;
    totalPrice.innerHTML = parseInt(totalPrice.innerHTML) + parseInt(e.target.dataset.price);
}

const addButtons = document.getElementsByClassName('add');
for(let button of addButtons) {
    button.addEventListener('click', addToCart);
}
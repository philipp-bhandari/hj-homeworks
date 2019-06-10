'use strict';

const
    eyes = document.querySelector('.block'),
    message = document.querySelector('.message'),
    text = document.querySelector('.textarea');

text.addEventListener('focus', eyesMoving);
text.addEventListener('blur', eyesMoving);

text.addEventListener('keydown', debounce(() => {
    message.classList.add('view');
    eyes.classList.remove('active');
}, 2000));

text.addEventListener('keydown', () => {
    message.classList.remove('view');
    eyes.classList.add('active');
});

function saying() {
    //message.classList.remove('view');
    debounce(() => {
        message.classList.add('view');
        eyes.classList.remove('active');
    }, 2000);
}

function eyesMoving() {
    if (event.type === 'focus') {
        eyes.classList.add('active');
        message.classList.remove('view');
    }
    if (event.type === 'blur') {
        eyes.classList.remove('active');
        message.classList.remove('view');
    }
}

function debounce(callback, delay) {
    let timeout;
    return () => {
        clearTimeout(timeout);
        timeout = setTimeout(function() {
            timeout = null;
            callback();
        }, delay);
    };
};

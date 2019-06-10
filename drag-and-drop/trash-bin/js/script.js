'use strict';

const
    logos = document.querySelectorAll('.logo'),
    bin = document.getElementById('trash_bin');

let object = null;

for(let logo of logos) {
    logo.addEventListener('mousedown', clickMouse);
    document.addEventListener('mousemove', moveElement);
    document.addEventListener('mouseup', unclickMouse);
}

function clickMouse(event) {
    object = event.target;
    if (object) {
        event.preventDefault();
        object = event.target;
        object.style.left = `${event.pageX - object.width / 2}px`;
        object.style.top = `${event.pageY - object.height / 2}px`;
        object.classList.add('moving');
    }
}

function unclickMouse() {
    if (object) {
        if (document.elementFromPoint(event.clientX, event.clientY) === bin) {
            object.style.display = 'none';
        }
        object.classList.remove('moving');
        object = null;
    }
}

function moveElement(event) {
    if (object) {
        if (object.classList.contains('moving')) {
            object.style.left = `${event.pageX - object.width / 2}px`;
            object.style.top = `${event.pageY - object.height / 2}px`;
        }
    }
}

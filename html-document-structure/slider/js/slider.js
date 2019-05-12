'use strict';

class Slider {
    constructor() {
        this.status = 'init';
        this.slides = document.getElementsByClassName('slide');
        this.currentSlide = this.slides[0];
        this.nav = document.querySelector('.slider-nav');
        this.buttons = this.nav.children;
        this.currentSlideClass = 'slide-current';
    }
    init() {
        if(this.status === 'init') {
            this.currentSlide.classList.add(this.currentSlideClass);
            for(let button of this.buttons) {
                if(button.dataset.action === 'first' || button.dataset.action === 'prev') {
                    button.classList.add('disabled');
                }
            }
            this.status = 'init_done';
        } else {
            throw new Error('Слайдер уже был инициализирован');
        }
    }

    #enableButtons = (a, b) => {
        this.nav.querySelector(`[data-action='${b}']`).classList.remove('disabled');
        this.nav.querySelector(`[data-action='${a}']`).classList.remove('disabled');
    };
    #changeSlide = (el) => {
        this.currentSlide.classList.remove(this.currentSlideClass);
        this.currentSlide = el;
        this.currentSlide.classList.add(this.currentSlideClass);
    };

    next() {
        this.#enableButtons('prev', 'first');
        let nextElem = this.currentSlide.nextElementSibling;
        if(nextElem){
            this.#changeSlide(nextElem);
            return !!nextElem.nextElementSibling;
        }
    }
    last() {
        this.#enableButtons('prev', 'first');
        this.#changeSlide(this.slides[this.slides.length - 1]);
        return false;
    }
    prev() {
        this.#enableButtons('next', 'last');
        let prevElem = this.currentSlide.previousElementSibling;
        if(prevElem){
            this.#changeSlide(prevElem);
            return !!prevElem.previousElementSibling;
        }
    }
    first() {
        this.#enableButtons('next', 'last');
        this.#changeSlide(this.slides[0]);
        return false;
    }
}

document.addEventListener('DOMContentLoaded', ()=>{

    const slider = new Slider();
    slider.init();

    function onSlide(e) {
        if(e.target.classList.contains('disabled')) {
            return false;
        } else {
            let direction = e.target.dataset.action;
            if(!slider[direction]()) {
                if(direction === 'next' || direction === 'last') {
                    slider.nav.querySelector("[data-action='last']").classList.add('disabled');
                    slider.nav.querySelector("[data-action='next']").classList.add('disabled');
                } else {
                    slider.nav.querySelector("[data-action='first']").classList.add('disabled');
                    slider.nav.querySelector("[data-action='prev']").classList.add('disabled');
                }
            }
        }
    }

    document.querySelector('.slider-nav').addEventListener('click', onSlide);

});
'use strict';

document.addEventListener('DOMContentLoaded', ()=>{
    const contentDiv = document.getElementById('content'),
          preloader  = document.getElementById('preloader'),
          navigation = document.querySelector('.tabs nav');

    function onLoad() {
        contentDiv.innerHTML = this.responseText;
    }
    function togglePreloader() {
        preloader.classList.toggle('hidden');
    }
    function onTabClick(e) {
        e.preventDefault();
        const tabsLinks = e.currentTarget.getElementsByTagName('a');
        let filename = e.target.getAttribute('href').split('/').pop();

        for(let link of tabsLinks) {
            let name = link.getAttribute('href').split('/').pop();
            if(name === filename) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        }

        getTabContent(filename);
    }

    function getTabContent(filename) {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', `components/${filename}`);
        xhr.addEventListener('load', onLoad);
        xhr.addEventListener('loadstart', togglePreloader);
        xhr.addEventListener('loadend', togglePreloader);
        xhr.send();
    }

    getTabContent('email-tab.html');
    navigation.addEventListener('click', onTabClick);
});
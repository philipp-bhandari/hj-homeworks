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
        const targetHref = e.target.getAttribute('href');

        for(let link of tabsLinks) {
            let linkHref = link.getAttribute('href');
            if(linkHref === targetHref) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        }

        getTabContent(e.target);
    }

    function getTabContent(tab) {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', tab.getAttribute('href'));
        xhr.addEventListener('load', onLoad);
        xhr.addEventListener('loadstart', togglePreloader);
        xhr.addEventListener('loadend', togglePreloader);
        xhr.send();
    }

    getTabContent(document.querySelector('.active'));
    navigation.addEventListener('click', onTabClick);
});
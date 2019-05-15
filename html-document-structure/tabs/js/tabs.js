'use strict';

function cloneEl(el, title, icon) {
    let clone = el.cloneNode(true);
    clone.firstElementChild.classList.add(icon);
    clone.firstElementChild.textContent = title;
    return clone;
}

const tabsBlock = document.getElementById('tabs'),
    tabNav = tabsBlock.querySelector('.tabs-nav'),
    tab = tabNav.firstElementChild,
    articles = tabsBlock.querySelector('.tabs-content').children;

function changeTab(e) {
    const activeTab = tabNav.querySelector('.ui-tabs-active');
    e.target.parentElement.classList.add('ui-tabs-active');

    for(let article of articles) {
        if(article.classList.contains('hidden') && e.target.classList.contains(article.dataset.tabIcon)) {
            article.classList.remove('hidden');
        }
        else if(activeTab.firstElementChild !== e.target) {
            article.classList.add('hidden');
            activeTab.classList.remove('ui-tabs-active');
        }
    }

}

for(let article of articles) {
    article.classList.add('hidden');
    let clone = cloneEl(tab, article.dataset.tabTitle, article.dataset.tabIcon);
    tabNav.appendChild(clone);
}

tabNav.removeChild(tab);
tabNav.firstElementChild.classList.add('ui-tabs-active');
articles[0].classList.remove('hidden');
tabNav.addEventListener('click', changeTab);
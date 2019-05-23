'use strict';
const content = document.querySelector('.content');

function initProfile(data) {
    for (const key in data) {
        switch(key) {
            case 'id':
                loadData('createBadges', `https://neto-api.herokuapp.com/profile/${data[key]}/technologies`)
                    .then(content.removeAttribute('style'));
                break;
            case 'pic':
                document.querySelector(`[data-${key}]`).src = changeUrl(data[key]);
                break;
            default:
                document.querySelector(`[data-${key}]`).textContent = data[key];
        }
    }
}

function createBadges(data) {
    const listTechnology = document.querySelector('[data-technologies]');
    for (const key in data) {
        const icons = document.createElement('span');
        icons.classList.add('devicons', `devicons-${data[key]}`);
        listTechnology.appendChild(icons);
    }
}

function loadData(callbackName, url) {
    return new Promise((done, fail) => {
        const script = document.createElement('script');
        script.src = `${url}?callback=${callbackName}`;
        document.body.appendChild(script);
        window.callbackName = done;
    });
}

function changeUrl(url) {
    return url.replace(/:\d+?\//ig, '/');
}

loadData('initProfile', 'https://neto-api.herokuapp.com/profile/me');
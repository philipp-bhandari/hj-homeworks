'use strict';

function initData(data) {
    for (const key in data) {
        if (key === 'wallpaper' || key === 'pic') {
            document.querySelector(`[data-${key}]`).src = changeUrl(data[key]);
        } else {
            document.querySelector(`[data-${key}]`).textContent = data[key];
        }
    }
}

function loadData(url) {
    return new Promise((done, fail) => {
        const script = document.createElement('script');
        script.src = `${url}?callback=initData`;
        document.body.appendChild(script);

        window[initData] = done;
    });
}

function changeUrl(url) {
    return url.replace(/:\d+?\//ig, '/');
}

loadData('https://neto-api.herokuapp.com/twitter/jsonp');
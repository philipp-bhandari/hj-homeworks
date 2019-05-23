'use strict';
const [URL_RECEIPT, URL_RATING, URL_CONSUMERS] = ['receipt', 'rating', 'consumers'];
const dataArray = document.querySelector('.food');

function loadData(url, urlHandler) {
    const name = randName();

    if (typeof urlHandler === 'function') {
        return new Promise((done, fail) => {
            window[name] = urlHandler;

            const script = document.createElement('script');
            script.src = `${url}?jsonp=${name}`;
            document.body.appendChild(script);
        });
    }
}

function randName() {
    function init() {
        return 'func' + Math.round(Math.random() * 10000);
    }

    let funcName;

    while (!funcName || window[funcName]) {
        funcName = init();
    }

    return funcName;
}

function urlList(id = 1, type = URL_RECEIPT) {
    const baseUrl = 'https://neto-api.herokuapp.com/food/';

    switch (type) {
        case URL_RATING:
            return `${baseUrl}${id}/rating`;
        case URL_CONSUMERS:
            return `${baseUrl}${id}/consumers`;
        default:
            return `${baseUrl}${id}`;
    }
}

function updReceipt(receipt) {
    dataArray.querySelector('[data-title]').innerText = receipt.title;
    dataArray.querySelector('[data-ingredients]').innerText = receipt.ingredients.join(', ');
    dataArray.querySelector('[data-pic]').style.backgroundImage = `url(${receipt.pic})`;

    loadData(urlList(receipt.id, URL_RATING), (rating) => {
        dataArray.querySelector('[data-rating]').innerText = rating.rating.toFixed(2);
        dataArray.querySelector('[data-star]').style.width = `${rating.rating * 10}px`;
        dataArray.querySelector('[data-votes]').innerText = `(${rating.votes} оценок)`;
    });

    loadData(urlList(receipt.id, URL_CONSUMERS), (consumers) => {
        if (Array.isArray(consumers.consumers)) {
            let consumersArray = '';
            console.log(consumers);
            consumers.consumers.forEach(consumer => {
                consumersArray += `<img src="${consumer.pic}" title="${consumer.name}">`;
            });

            consumersArray += `<span>(+${consumers.total - consumers.consumers.length})</span>`;
            dataArray.querySelector('[data-consumers]').innerHTML = consumersArray;
        }
    });
}

loadData(urlList(42, URL_RECEIPT), updReceipt);
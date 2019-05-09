'use strict';

document.addEventListener('DOMContentLoaded', ()=>{
    const xhr = new XMLHttpRequest(),
        selectFrom = document.getElementById('from'),
        selectTo = document.getElementById('to'),
        source = document.getElementById('source'),
        content = document.getElementById('content'),
        preloader = document.getElementById('loader'),
        result = document.getElementById('result');

    preloader.classList.remove('hidden');

    function calculate() {
        let amount = parseFloat(source.value),
            from = parseFloat(selectFrom.value),
            to = parseFloat(selectTo.value),
            res = amount * from / to;

        if(isNaN(res)){
            result.innerHTML = "<strong style='color:red'>Ввод некорректен</strong>";
        } else {
            result.innerHTML = res.toString();
        }

    }
    function onLoad() {
        preloader.classList.add('hidden');
        content.classList.remove('hidden');

        const currencyObj = JSON.parse(this.responseText);
        for(let currency of currencyObj) {
            const optionFrom = document.createElement('option'),
                optionTo =  document.createElement('option');

            optionFrom.innerHTML = currency.code;
            optionFrom.value = currency.value;

            optionTo.innerHTML = currency.code;
            optionTo.value = currency.value;

            selectFrom.appendChild(optionFrom);
            selectTo.appendChild(optionTo);
        }
        calculate();
    }
    function onChange(e) {
        const target = e.target;
        if(target.tagName === 'SELECT') {
            calculate();
        }
    }
    function onInput(e) {
        calculate();
    }

    content.addEventListener('change', onChange);
    source.addEventListener('input', onInput);
    
    xhr.open('GET', 'https://neto-api.herokuapp.com/currency');
    xhr.addEventListener('load', onLoad);
    xhr.send();
});
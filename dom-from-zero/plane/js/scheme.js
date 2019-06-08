'use strict';

const selectId = document.getElementById('acSelect'); // Выбор id самолёта
const btnSeatMap = document.getElementById('btnSeatMap'); // Кнопка отображения схемы
const btnSetFull = document.getElementById('btnSetFull'); // Кнопка обозначения всех мест в самолете занятыми
const btnSetEmpty = document.getElementById('btnSetEmpty'); // Кнопка обозначения всех мест в самолете свободными
const seatMapTitle = document.getElementById('seatMapTitle'); // Информация о выбранном самолете и количестве пассажиров
const seatMapDiv = document.getElementById('seatMapDiv'); // Схема мест в самолете
const totalPax = document.getElementById('totalPax'); // Общее количество занятых мест
const totalAdult = document.getElementById('totalAdult'); // Общее количество мест с полной стоимостью
const totalHalf = document.getElementById('totalHalf'); // Общее количество детских мест

btnSetFull.disabled = true;
btnSetEmpty.disabled = true;

function takeData(value) {

    //Получаем данные, вставляем title

    fetch(`https://neto-api.herokuapp.com/plane/${value}`)
        .then(response => {
            if (200 <= response.status && response.status < 300) {
                return response;
            }
            throw new Error(response.statusText);
        })
        .then(result => result.json())
        .then(data => {
            seatMapTitle.textContent = `${data.title} (${data.passengers} пассажиров)`;
            btnShowMap(data);
        });
}

function btnShowMap(data) {

    // При клике обнуляем количество мест

    btnSeatMap.addEventListener('click', (e) => {
        e.preventDefault();
        totalPax.textContent = totalAdult.textContent = totalHalf.textContent = 0;
        generateMap(data);
    });
}

function generateMap(data) {
    btnSetFull.disabled = false;
    btnSetEmpty.disabled = false;

    while (seatMapDiv.firstChild) {
        seatMapDiv.removeChild(seatMapDiv.firstChild);
    }

    // Обновляем блок схемы мест, создаем новые элементы

    data.scheme.forEach((item, i) => {
        const letters = item === 4 ? [].concat('', data.letters4, '') : ((item === 6) ? data.letters6 : []);
        const row = newEl('div', {class: 'row seating-row text-center'}, [
            newEl('div', {class: 'col-xs-1 row-number'}, [
                newEl('h2', null, `${i + 1}`)
            ])
        ]);
        const colLeft = newEl('div', {class: 'col-xs-5'});
        const colRight = newEl('div', {class: 'col-xs-5'});

        letters.forEach((letter, i) => {
            if (i <= 2) {
                colLeft.appendChild(generateSeat(letter));
            } else {
                colRight.appendChild(generateSeat(letter));
            }
        });

        row.appendChild(colLeft);
        row.appendChild(colRight);

        seatMapDiv.appendChild(row);
    });
}

function generateSeat(value) {
    if (value !== '') {
        const seat = newEl('div', {class: 'col-xs-4 seat'}, [
            newEl('span', {class: 'seat-label'}, value)
        ]);

        seat.addEventListener('click', pickOneSeat);

        return seat;
    } else {
        return newEl('div', {class: 'col-xs-4 no-seat'});
    }
}

function cntOfSeat(type) {
    const seats = seatMapDiv.querySelectorAll('.seat');
    Array.from(seats).forEach(item => {
        if(type === 'add') {
            if(parseInt(totalPax.textContent) === seats.length){
                return
            }
            if (item.classList.contains('adult')) {
                totalAdult.textContent = (parseInt(totalAdult.textContent) < seats.length) ? parseInt(totalAdult.textContent) + 1 : seats.length;
            }
            totalPax.textContent = parseInt(totalAdult.textContent) + parseInt(totalHalf.textContent);
        } else {
            totalPax.textContent = totalHalf.textContent = totalAdult.textContent = 0;
        }

    });
}

function checkSeat(type) {
    const seatList = seatMapDiv.querySelectorAll('.seat');

    // Добавляем или удаляем классы

    Array.from(seatList).forEach(item => {
        if (!item.classList.contains('adult') && type === 'add' && !item.classList.contains('half')) {
            item.classList.add('adult');
        } else if ((item.classList.contains('adult') || item.classList.contains('half')) && type === 'remove') {
            item.classList.remove('adult', 'half');
        }
    });

    cntOfSeat(type);
}

function pickOneSeat(event) {
    const target = event.currentTarget;

    // Добавляем выбор сидения
    if (!target.classList.contains('half') && event.altKey) {
        target.classList.add('half');
        totalPax.textContent = parseInt(totalPax.textContent) + 1;
        totalHalf.textContent = parseInt(totalHalf.textContent) + 1;

    } else if (target.classList.contains('half') && event.altKey) {
        target.classList.remove('half', 'adult');
        totalPax.textContent = parseInt(totalPax.textContent) - 1;
        totalHalf.textContent = parseInt(totalHalf.textContent) - 1;
        return;
    }

    if (!target.classList.contains('adult') && !target.classList.contains('half')) {
        target.classList.add('adult');
        totalPax.textContent = parseInt(totalPax.textContent) + 1;
        totalAdult.textContent = parseInt(totalAdult.textContent) + 1;

    } else if (target.classList.contains('adult')){
        target.classList.remove('adult');
        totalPax.textContent = parseInt(totalPax.textContent) - 1;
        totalAdult.textContent = parseInt(totalAdult.textContent) - 1;
    }


}

function newEl(tagName, attrs, childs) {
    const el = document.createElement(tagName);

    // Функция создания тега с атрибутами и потомками

    if (typeof attrs === 'object' && attrs !== null) {
        Object.keys(attrs).forEach(attr => el.setAttribute(attr, attrs[attr]));
    }

    if (typeof childs === 'string') {
        el.textContent = childs;
    } else if (childs instanceof Array) {
        childs.forEach(child => el.appendChild(child));
    }

    return el;
}

selectId.addEventListener('change', event => takeData(event.target.value));

document.addEventListener('DOMContetLoaded', takeData(selectId.value));

btnSetFull.addEventListener('click', (e) => {
    e.preventDefault();
    checkSeat('add');
});

btnSetEmpty.addEventListener('click', (e) => {
    e.preventDefault();
    checkSeat('remove');
});

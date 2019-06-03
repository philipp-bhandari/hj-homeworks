'use strict';


function commentWorker(list) {

    // Обрабатываем список объектов коментариев
    // Для каждого вызываем функцию addComm, результат добавляем в Div .comments

    const commentsSelector = document.querySelector('.comments');
    const newComm = list.map(addComm);
    newComm.forEach(item => commentsSelector.appendChild(item));
}

function tagElement(tagName, attributes, children) {
    const element = document.createElement(tagName);

    // Создаем элементы, присваиваем атрибуты, добавляем потомков родителю

    if (typeof attributes === 'object') {
        Object.keys(attributes).forEach(i => element.setAttribute(i, attributes[i]));
    }

    if (typeof children === 'string') {
        element.textContent = children;
    } else if (children instanceof Array) {
        children.forEach(child => element.appendChild(child));
    }

    return element;
}

function addComm(comment) {
    const textList = comment.text.split('\n');

    // Получаем в массив текста из сообщений
    // Создаем структуру комментариев

    return tagElement('div', {class: 'comment-wrap'}, [
        tagElement('div', {class: 'photo', title: comment.author.name}, [
            tagElement('div', {class: 'avatar', style: `background-image: url('${comment.author.pic}')`})
        ]),
        tagElement('div', {class: 'comment-block'}, [
            tagElement('p', {class: 'comment-text'}, textList.map(item => {
                const br = tagElement('br');
                const span = tagElement('span');
                span.textContent = item;
                span.appendChild(br);
                return span;
            })),
            tagElement('div', {class: 'bottom-comment'}, [
                tagElement('div', {class: 'comment-date'}, new Date(comment.date).toLocaleString('ru-Ru')),
                tagElement('ul', {class: 'comment-actions'}, [
                    tagElement('li', {class: 'complain'}, 'Пожаловаться'),
                    tagElement('li', {class: 'reply'}, 'Ответить')
                ])
            ])
        ])
    ]);
}

fetch('https://neto-api.herokuapp.com/comments')
    .then(res => res.json())
    .then(commentWorker);

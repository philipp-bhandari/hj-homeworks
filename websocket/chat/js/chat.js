'use strict';
const socket = new WebSocket('wss://neto-api.herokuapp.com/chat');

const chat = document.querySelector('.chat'),
    status = chat.querySelector('.chat-status'),
    submitButton = chat.querySelector('.message-submit'),
    content = chat.querySelector('.messages-content');

/* Прокрутка при большом кол-ве сообщений */
document.querySelector('.messages').style.overflowY = 'auto';
content.style.height = '100%';

const [MESSAGE_OTHER, MESSAGE_PERSONAL, MESSAGE_NOTICE, MESSAGE_LOADING] = ['other', 'personal', 'notice', 'loading'];

socket.addEventListener('open', onConnect);
socket.addEventListener('message', onMessage);
socket.addEventListener('close', onClose);

window.addEventListener('beforeunload', () => {
    socket.close(1000, 'Соединение закрыто');
});
submitButton.addEventListener('click', submitClick);

function onConnect() {
    // Подключаемся
    status.innerText = status.dataset.online;
    addMessage('Пользователь появился в сети', MESSAGE_NOTICE);
    submitButton.disabled = false;
}

function onMessage(event) {
    // Получаем сообщение
    if (event.data !== '...' ) {
        const loadingMessage = content.querySelector('.message.loading');

        if (loadingMessage) {
            loadingMessage.parentNode.removeChild(loadingMessage);
        }

        addMessage(event.data, MESSAGE_OTHER);
    } else {
        addMessage(event.data, MESSAGE_LOADING);
    }
}

function onClose() {
    // Закрываем соединение
    status.innerText = status.dataset.offline;
    addMessage('Пользователь не в сети', MESSAGE_NOTICE);
    submitButton.disabled = true;
}


function submitClick(event) {
    // при нажатии Отправить сообщение или Enter
    event.preventDefault();
    const messageInput = chat.querySelector('.message-input');
    const message = messageInput.value;

    if (message !== '') {
        addMessage(message, MESSAGE_PERSONAL);
        console.log(getCurrentTime());
        socket.send(message);

        messageInput.value = '';
    }
}

function getCurrentTime() {
    // возвращает текущее время в формате HH:MM
    const now = new Date();
    return now.toLocaleTimeString('ru-RU', { hour12: false }).substring(0, 5);
}

function addMessage(message = '', messageType = MESSAGE_SELF, time = getCurrentTime()) {
    // добавляет сообщение в чат
    const messageTemplate = getMessageTemplate(messageType);

    console.log(messageTemplate, messageType);
    messageTemplate.querySelector('.message-text').innerText = message;

    if (messageType !== MESSAGE_NOTICE) {
        messageTemplate.querySelector('.timestamp').innerText = time;
    }

    content.appendChild(messageTemplate);
}

function getMessageTemplate(messageType = MESSAGE_OTHER) {
    //возвращает шаблон сообщения
    const templates = chat.querySelector('.messages-templates');

    switch (messageType) {
        case MESSAGE_PERSONAL:
            return templates.querySelector('.message.message-personal').cloneNode(true);
        case MESSAGE_NOTICE:
            return templates.querySelector('.message.message-status').cloneNode(true);
        case MESSAGE_LOADING:
            return templates.querySelector('.message.loading').cloneNode(true);
        default:
            return Array.from(templates.querySelectorAll('.message')).find(template => {
                if (template.classList.length === 1) return template;
            }).cloneNode(true);
    }
}
'use strict';

const contactsList = document.querySelector('.contacts-list');
contactsList.innerHTML = '';

const contacts = JSON.parse(loadContacts());
for(let contact of contacts) {
    let newLi = document.createElement('li');
    newLi.dataset.email = contact.email;
    newLi.dataset.phone = contact.phone;
    newLi.innerHTML = `<strong>${contact.name}</strong>`;
    contactsList.appendChild(newLi);
}
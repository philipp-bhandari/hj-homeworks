'use strict';

document.addEventListener('DOMContentLoaded', ()=>{

    const zipInput = document.querySelector("[name='zip']"),
        form = document.querySelector('.contentform'),
        sendButton = document.querySelector("[type='submit'].button-contact"),
        changeButton = document.querySelector('#output .button-contact'),
        output = document.getElementById('output'),
        formFields = Array.from(form.querySelectorAll('input')),
        formTextarea = Array.from(form.querySelectorAll('textarea'));

    formFields.push(formTextarea[0]);

    zipInput.setAttribute('type', 'number');

    function isFilled(el) {
        return el.value;
    }
    function checkForm() {
        if(formFields.every(isFilled)) {
            sendButton.removeAttribute('disabled');
        }
        else {
            sendButton.setAttribute('disabled', '');
        }
    }
    function onSubmit(e) {
        e.preventDefault();
        for(let field of formFields) {
            try {
                document.getElementById(field.name).innerHTML = field.value;
            } catch {
                continue;
            }
        }
        form.classList.toggle('hidden');
        output.classList.toggle('hidden');
    }
    function changeForm(e) {
        form.classList.toggle('hidden');
        output.classList.toggle('hidden');
    }

    form.addEventListener('keyup', checkForm);
    form.addEventListener('submit', onSubmit);
    changeButton.addEventListener('click', changeForm);

});
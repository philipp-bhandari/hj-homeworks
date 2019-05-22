'use strict';

const signUpForm = document.querySelector('.sign-up-htm'),
    signInForm = document.querySelector('.sign-in-htm'),
    errorUp = signUpForm.querySelector('.error-message'),
    errorIn = signInForm.querySelector('.error-message');

// Создаем обработчик отправки формы
function submitForm(e) {
    e.preventDefault();
    let formData = new FormData(this);


    //Превращаем FormData в объект для отправки
    const sendObj = {};
    for (const [k, v] of formData) {
        sendObj[k] = v;
    }

    // Ставим флаг что за форма
    let link = this === signUpForm ? 'signup' : 'signin';

    const promise = fetch(`https://neto-api.herokuapp.com/${link}`, {
        method: 'POST',
        body: JSON.stringify(sendObj),
        headers: {'Content-Type': 'application/json'}
    });

    promise.then((res) => {
        if (200 <= res.status && res.status < 300) {
            return res;
        }
        throw new Error(res.statusText);
    }).then((res)=>{
        return res.json();
    }).then((data)=>{
        if(data.error) {

            // Пишем сообщение об ошибке в зависимости от формы
            if(link === 'signup') {
                errorUp.textContent = data.message;
            } else {
                errorIn.textContent = data.message;
            }
        } else {


            // Пишем результат в зависимости от формы
            if(link === 'signup') {
                errorUp.textContent = `Пользователь ${data.name} успешно авторизован`;
            } else {
                errorIn.textContent = `Пользователь ${data.name} успешно зарегистрирован`;
            }
        }
    }).catch((err) => {
        console.log('network error');
    });
}

signUpForm.addEventListener('submit', submitForm);
signInForm.addEventListener('submit', submitForm);
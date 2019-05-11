function  onLoad() {
    if(this.status === 200) {
        const response = JSON.parse(this.responseText);
        setData(response);
    }
}

const request = new XMLHttpRequest();
request.addEventListener('load', onLoad);
request.open('GET', 'https://neto-api.herokuapp.com/weather');
request.send();
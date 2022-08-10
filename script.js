const api_key = 'PUwBTbX3OoBfsQRuyaQstmkJUMwF7zthjIUC76qB';

async function changeImage(date) {

    const request = `https://api.nasa.gov/planetary/apod?api_key=${api_key}&date=${date}`;

    const response = await fetch(request);
    const imageData = await response.json();
    console.log(imageData);

    const image = document.querySelector('#picture-of-the-day');
    image.src = imageData.url;

    const explanation = document.querySelector('#explanation');
    explanation.innerHTML = imageData.explanation;

    return false;
}

document.addEventListener('DOMContentLoaded', function() {
    const dateForm = document.forms['date-form'];
    dateForm.onsubmit = function() {
        changeImage(form.elements['date'].value);
        
        return false;
    }

    changeImage('2022-08-03');
});
const api_key = 'PUwBTbX3OoBfsQRuyaQstmkJUMwF7zthjIUC76qB';

async function changeImage() {

    const request = `https://api.nasa.gov/planetary/apod?api_key=${api_key}`;
    let response = await fetch(request);
    let imageData = await response.json();
    console.log(imageData);

    let image = document.querySelector('img');
    image.src = imageData.url;
}
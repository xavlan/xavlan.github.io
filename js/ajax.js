function ajaxRequest(type, url, callback, data = null){
    let xhr = new XMLHttpRequest();
    xhr.open(type, url);
    xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
    xhr.onload = () => {
        switch (xhr.status) {
            case 200:
            case 201: console.log(xhr.responseText);
            callback(JSON.parse(xhr.responseText));
            break;
        default: console.log('HTTP error: ' + xhr.status);
            httpErrors(xhr.status);
        }
    };
    xhr.send(data);
}

function httpErrors(error){
    let errorSection = document.getElementById('errors').style.display = 'block';
    errorSection.innerHTML = errors;
}
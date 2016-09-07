
const API_URL = 'http://vps.sirikon.me:3000/api';

function getPictures() {
    return fetch(API_URL + '/pictures')
        .then((response) => response.json());
}

function uploadPicture(picturePath, latlng) {
    return new Promise((resolve, reject) => {

        var xhr = new XMLHttpRequest();

        var picture = {
            uri: picturePath,
            type: 'image/jpeg',
            name: 'picture.jpg'
        };

        var location = latlng.latitude + ',' + latlng.longitude;
        
        var body = new FormData();
        body.append('picture', picture);
        body.append('location', location);

        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                resolve();
            }
        };
        
        xhr.open('POST', API_URL + '/pictures');
        xhr.send(body);

    });
}

module.exports = {
    getPictures: getPictures,
    uploadPicture: uploadPicture
};
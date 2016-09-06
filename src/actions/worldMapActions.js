import worldMapStore from '../stores/worldMapStore';

function geolocate() {
    navigator.geolocation.getCurrentPosition(geolocationSuccess, geolocationError,
    {enableHighAccuracy: false, timeout: 20000, maximumAge: 1000});
}

function geolocationSuccess(position) {
    var region = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
    };
    setRegion(region);
}

function geolocationError(error) {
    alert('There was an error while trying to get the geolocation... sorry :(');
    console.error(error);
}

function setRegion(region) {
    worldMapStore.dispatch({
        type: 'SET_REGION',
        region: region
    });
}

function takePictureAndUpload(camera) {
    camera.capture()
        .then((data) => {
            var currentRegion = worldMapStore.getState().region;
            var location = currentRegion.latitude + ',' + currentRegion.longitude;
            uploadPicture(data.path, location);
        })
        .catch(err => console.error(err));
}

function uploadPicture(picturePath, location) {

    setCameraActive(false);
    setLoading(true);
    var xhr = new XMLHttpRequest();

    var picture = {
        uri: picturePath,
        type: 'image/jpeg',
        name: 'picture.jpg'
    };
    
    var body = new FormData();
    body.append('picture', picture);
    body.append('location', location);

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            getPictures();
            setLoading(false);
        }
    };
    
    xhr.open('POST', 'http://vps.sirikon.me:3000/api/pictures');
    xhr.send(body);
}

function getPictures() {
    return fetch('http://vps.sirikon.me:3000/api/pictures')
        .then((response) => response.json())
        .then((responseJson) => {
            setPictures(responseJson);
        })
        .catch((error) => {
            console.error(error);
        });
}

function setPictures(pictures) {
    worldMapStore.dispatch({
        type: 'SET_PICTURES',
        pictures: pictures
    });
}

function setCameraActive(active) {
    worldMapStore.dispatch({
        type: 'SET_CAMERA_ACTIVE',
        cameraActive: active
    });
}

function setLoading(loading) {
    worldMapStore.dispatch({
        type: 'SET_LOADING',
        loading: loading
    });
}

module.exports = {
    geolocate: geolocate,
    setRegion: setRegion,
    takePictureAndUpload: takePictureAndUpload,
    getPictures: getPictures,
    setCameraActive: setCameraActive
};
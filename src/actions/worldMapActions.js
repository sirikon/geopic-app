import worldMapStore from '../stores/worldMapStore';
import pictureService from '../services/pictureService';

function geolocate() {
    navigator.geolocation.getCurrentPosition(geolocationSuccess, geolocationError,
    {enableHighAccuracy: false, timeout: 20000, maximumAge: 1000});
}

function geolocationSuccess(position) {
    setLatLng(position.coords)
}

function geolocationError(error) {
    alert('There was an error while trying to get the geolocation... sorry :(');
}

function setLatLng(latLng) {
    var currentRegion = worldMapStore.getState().region;
    setRegion({
        latitude: latLng.latitude,
        longitude: latLng.longitude,
        latitudeDelta: currentRegion.latitudeDelta,
        longitudeDelta: currentRegion.longitudeDelta,
    });
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
            setCameraActive(false);
            setLoading(true);
            var currentRegion = worldMapStore.getState().region;
            return pictureService.uploadPicture(data.path, currentRegion);
        })
        .then(() => {
            return pictureService.getPictures();
        })
        .then((pictures) => {
            setPictures(pictures);
            setLoading(false);
        })
        .catch(err => {
            setLoading(false);
            //console.error(err)
        });
}

function getPictures() {
    pictureService.getPictures()
        .then(setPictures);
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

function setVisiblePicture(picture) {
    worldMapStore.dispatch({
        type: 'SET_VISIBLE_PICTURE',
        picture: picture
    });
}

module.exports = {
    geolocate: geolocate,
    setRegion: setRegion,
    takePictureAndUpload: takePictureAndUpload,
    getPictures: getPictures,
    setCameraActive: setCameraActive,
    setVisiblePicture: setVisiblePicture,
    setLatLng: setLatLng
};
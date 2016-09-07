import worldMapReducer from '../reducers/worldMapReducer';
import pictureService from '../services/pictureService';

function geolocate() {
    navigator.geolocation.getCurrentPosition((position) => {
        setLatLng(position.coords);
    }, () => {
        alert('There was an error while trying to get the geolocation... sorry :(');
    }, {enableHighAccuracy: false, timeout: 20000, maximumAge: 1000});
}

function setLatLng(latLng) {
    var currentRegion = worldMapReducer.getState().region;
    setRegion({
        latitude: latLng.latitude,
        longitude: latLng.longitude,
        latitudeDelta: currentRegion.latitudeDelta,
        longitudeDelta: currentRegion.longitudeDelta,
    });
}

function setRegion(region) {
    worldMapReducer.dispatch({
        type: 'SET_REGION',
        region: region
    });
}

function takePictureAndUpload(camera) {
    camera.capture()
        .then((data) => {
            setCameraActive(false);
            setLoading(true);
            var currentRegion = worldMapReducer.getState().region;
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
    worldMapReducer.dispatch({
        type: 'SET_PICTURES',
        pictures: pictures
    });
}

function setCameraActive(active) {
    worldMapReducer.dispatch({
        type: 'SET_CAMERA_ACTIVE',
        cameraActive: active
    });
}

function setVisiblePicture(picture) {
    worldMapReducer.dispatch({
        type: 'SET_VISIBLE_PICTURE',
        picture: picture
    });
}

function setLoading(loading) {
    worldMapReducer.dispatch({
        type: 'SET_LOADING',
        loading: loading
    });
}

module.exports = {
    geolocate: geolocate,
    setLatLng: setLatLng,    
    setRegion: setRegion,
    takePictureAndUpload: takePictureAndUpload,
    getPictures: getPictures,
    setPictures: setPictures,
    setCameraActive: setCameraActive,
    setVisiblePicture: setVisiblePicture,
    setLoading: setLoading
};

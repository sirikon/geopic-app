import { createStore } from 'redux';

function worldMapReducer(state, action) {
    switch(action.type) {
        case '@@redux/INIT':
            return createInitialState();
        case 'SET_REGION':
            return setRegion(state, action.region);
        case 'SET_CAMERA_ACTIVE':
            return setCameraActive(state, action.cameraActive);
        case 'SET_LOADING':
            return setLoading(state, action.loading);
        case 'SET_PICTURES':
            return setPictures(state, action.pictures);
        case 'SET_VISIBLE_PICTURE':
            return setVisiblePicture(state, action.picture);
        default:
            console.error('Unknown action ' + action.type);
            return state;
    }
}

function createInitialState() {
    return {
        cameraActive: false,
        loading: false,
        pictures: [],
        visiblePicture: null,
        region: {
            latitude: 0,
            longitude: 0,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        }
    }
}

function setRegion(state, region) {
    state.region = region;
    return state;
}

function setCameraActive(state, value) {
    state.cameraActive = value;
    return state;
}

function setLoading(state, value) {
    state.loading = value;
    return state;
}

function setPictures(state, pictures) {
    state.pictures = pictures;
    return state;
}

function setVisiblePicture(state, picture) {
    state.visiblePicture = picture;
    return state;
}

module.exports = createStore(worldMapReducer);

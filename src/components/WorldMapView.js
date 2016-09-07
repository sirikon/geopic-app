import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Geolocation,
  Dimensions
} from 'react-native';

import Icon from 'react-native-vector-icons/EvilIcons';
import Camera from 'react-native-camera';

import MapLayer from './MapLayer';
import CameraPreview from './CameraPreview';
import CameraControls from './CameraControls';
import PictureViewer from './PictureViewer';

import worldMapReducer from '../reducers/worldMapReducer';
import worldMapActions from '../actions/worldMapActions';

class WorldMapView extends Component {
    constructor() {
        super()
        worldMapReducer.subscribe(() => this.worldMapReducerChange());
        this.state = worldMapReducer.getState();
        worldMapActions.geolocate();
        worldMapActions.getPictures();
    }
    worldMapReducerChange() {
        this.setState(worldMapReducer.getState());
    }
    onRegionChange(region) {
        worldMapActions.setRegion(region);
    }
    camRef() {
        return (cam) => {
            this.cam = cam;
        }
    }
    takePicture() {
        worldMapActions.takePictureAndUpload(this.cam);
    }
    onCameraPress() {
        if (this.state.loading) return;
        if (this.state.cameraActive) {
            this.takePicture();
        } else {
            worldMapActions.setCameraActive(true);
        }
    }
    onCameraCancel() {
        worldMapActions.setCameraActive(false);
    }
    render() {
        var pictureViewer = null;
        if (this.state.visiblePicture) {
            pictureViewer = (<PictureViewer picture={this.state.visiblePicture} />);
        }
        return (
            <View style={styles.mainContainer}>
                <MapLayer
                    region={this.state.region}
                    pictures={this.state.pictures}
                    onRegionChange={this.onRegionChange}
                />
                <CameraPreview
                    camRef={this.camRef()}
                    active={this.state.cameraActive}
                />
                <CameraControls
                    active={this.state.cameraActive}
                    loading={this.state.loading}
                    onPress={this.onCameraPress.bind(this)}
                    onCancel={this.onCameraCancel.bind(this)}
                />
                {pictureViewer}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    photoBrowser: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    },
    mainContainer: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: 60
    }
});

module.exports = WorldMapView;
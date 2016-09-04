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
import CameraButton from './CameraButton';

class WorldMapView extends Component {
    constructor() {
        super()
        this.state = {
            cameraActive: false,
            region: {
                latitude: 0,
                longitude: 0,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }
        };
        this.geolocate();
    }
    geolocate() {
        navigator.geolocation.getCurrentPosition((position) => {
            this.setState({region: {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421
            }});
        }, (error) => { alert(JSON.stringify(error)) },
        {enableHighAccuracy: false, timeout: 20000, maximumAge: 1000});
    }
    onRegionChange(region) {
        return () => {
            this.setState({ region: region });
        }
    }
    onCameraPress() {
        return () => {
            this.setState({ cameraActive: !this.state.cameraActive });
        }
    }
    render() {
        return (
            <View style={styles.mainContainer}>
                <MapLayer
                    region={this.state.region}
                    onRegionChange={this.onRegionChange()}
                />
                <CameraPreview
                    active={this.state.cameraActive}
                />
                <CameraButton
                    active={this.state.cameraActive}
                    onPress={this.onCameraPress()}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
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
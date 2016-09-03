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
import MapView from 'react-native-maps';
import Icon from 'react-native-vector-icons/EvilIcons';
import Camera from 'react-native-camera';

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
        }, (error) => { alert('There was an error getting your geolocation') },
        {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000});
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

        var camera = null;
        if (this.state.cameraActive) {
            camera = <Camera
                        ref={(cam) => {
                            this.camera = cam;
                        }}
                        style={styles.cameraPreview}
                        aspect={Camera.constants.Aspect.fill}>
                    </Camera>;
        }

        return (
            <View style={styles.map}>
                <MapView
                    style={styles.map}
                    region={this.state.region}
                    onRegionChange={this.onRegionChange()}
                />
                <View style={styles.cameraButtonContainer}>
                    
                    {camera}
                    <TouchableOpacity activeOpacity={0.8} onPress={this.onCameraPress()}>
                        <View style={this.state.cameraActive ? styles.cameraButtonActive : styles.cameraButton}>
                            <Icon style={styles.cameraIcon} name="camera" />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
    },
    cameraButtonContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: 60
    },
    cameraButton: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: '#8e44ad',
        overflow: 'hidden'
    },
    cameraButtonActive: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: '#c0392b',
        overflow: 'hidden'
    },
    cameraIcon: {
        position: 'absolute',
        color: '#FFF',
        top: 13,
        left: 8,
        fontSize: 54
    },
    cameraPreview: {
        width: Dimensions.get('window').width - 50,
        height: Dimensions.get('window').height - 70 - 80 - 45,
        marginBottom: 20,
        borderRadius: 10
    }
});

module.exports = WorldMapView;
import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Dimensions
} from 'react-native';

import Camera from 'react-native-camera';

class CameraPreview extends Component {
    render() {
        if (!this.props.active) return null;
        return (
            <Camera
                ref={this.props.camRef}
                style={styles.cameraPreview}
                aspect={Camera.constants.Aspect.fill}>
            </Camera>
        );
    }
}

const styles = StyleSheet.create({
    cameraPreview: {
        width: Dimensions.get('window').width - 50,
        height: Dimensions.get('window').height - 70 - 80 - 45,
        marginBottom: 20,
        borderRadius: 10,
        overflow: 'hidden'
    }
});

module.exports = CameraPreview;
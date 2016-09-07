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
            <View style={styles.container}>
                <Camera
                    ref={this.props.camRef}
                    style={styles.cameraPreview}
                    aspect={Camera.constants.Aspect.fill}>
                </Camera>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width - 40,
        flex: 1,
        marginBottom: 20,
        marginTop: 20,
        borderRadius: 10,
        overflow: 'hidden'
    },
    cameraPreview: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
    }
});

module.exports = CameraPreview;
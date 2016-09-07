import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';

import Icon from 'react-native-vector-icons/EvilIcons';

/*
 * Class CameraControls
 * 'Shot' button and 'Cancel' button used below the CameraPreview
 * */
class CameraControls extends Component {
    render() {
        var shotButtonStyles = [styles.button, this.props.active ? styles.buttonActive : {}];
        var shotButtonIconStyles = [styles.icon, this.props.active ? styles.iconActive : {}];

        var cancelButton = null;
        if (this.props.active) {
            cancelButton = (
                <TouchableOpacity activeOpacity={0.8} onPress={this.props.onCancel}>
                    <View style={[styles.button, styles.cancelButton]}>
                        <Icon style={[styles.icon, styles.cancelIcon]} name="close" />
                    </View>
                </TouchableOpacity>
            );
        }

        var shotButtonIcon = this.props.loading ? 
            (<ActivityIndicator style={styles.loading} animating={true} size="large" color="white" />) :
            (<Icon style={styles.icon} name="camera" />);

        return (
            <View style={styles.wrapper}>
                <View style={styles.container}>
                    <TouchableOpacity activeOpacity={0.8} onPress={this.props.onPress}>
                        <View style={styles.button}>
                            {shotButtonIcon}
                        </View>
                    </TouchableOpacity>
                    {cancelButton}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    button: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: '#8e44ad',
        overflow: 'hidden'
    },
    cancelButton: {
        marginLeft: 10,
        backgroundColor: '#FFFFFF',
        borderWidth: 2,
        borderColor: '#c0392b'
    },
    icon: {
        position: 'absolute',
        color: '#FFF',
        top: 13,
        left: 8,
        fontSize: 54
    },
    cancelIcon: {
        top: 12,
        left: 7,
        color: '#c0392b'
    },
    loading: {
        marginTop: 16
    }
});

module.exports = CameraControls;
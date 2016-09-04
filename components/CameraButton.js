import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';


class CameraButton extends Component {
    render() {
        var buttonStyle = this.props.active ? styles.buttonActive : styles.button
        return (
            <TouchableOpacity activeOpacity={0.8} onPress={this.props.onPress}>
                <View style={buttonStyle}>
                    <Icon style={styles.icon} name="camera" />
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: '#8e44ad',
        overflow: 'hidden'
    },
    buttonActive: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: '#c0392b',
        overflow: 'hidden'
    },
    icon: {
        position: 'absolute',
        color: '#FFF',
        top: 13,
        left: 8,
        fontSize: 54
    }
});

module.exports = CameraButton;
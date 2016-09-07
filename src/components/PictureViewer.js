import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Image,
    Dimensions,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';

import Camera from 'react-native-camera';
import worldMapActions from '../actions/worldMapActions';

class PictureViewer extends Component {
    constructor() {
        super()
        this.state = {
            loading: false
        };
    }
    onPressImage() {
        worldMapActions.setVisiblePicture(null);
    }
    onLoadStart() {
        this.setState({loading: true});
    }
    onLoadEnd() {
        this.setState({loading: false});
    }
    render() {
        var activityIndicator = null;
        if (this.state.loading) {
            activityIndicator = (<ActivityIndicator style={styles.activityIndicator} animating={true} size="large" />);
        }
        return (
            <View style={styles.view}>
                <TouchableOpacity onPress={this.onPressImage.bind(this)} activeOpacity={0.8}>
                    {activityIndicator}
                    <Image
                        source={{uri: this.props.picture.url}}
                        style={styles.image}
                        onLoadStart={this.onLoadStart.bind(this)}
                        onLoadEnd={this.onLoadEnd.bind(this)} />
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    image: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    },
    activityIndicator: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    },
    view: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: 'black',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    }
});

module.exports = PictureViewer;
import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  Text,
  View,
  ActivityIndicator
} from 'react-native';

import MapView from 'react-native-maps';
import worldMapActions from '../actions/worldMapActions';

class PictureMarker extends Component {
    constructor() {
        super()
        this.state = {
            loading: false
        };
    }
    markerPress() {
        worldMapActions.setVisiblePicture(this.props.picture);
        worldMapActions.setLatLng({latitude: this.props.picture.latitude, longitude: this.props.picture.longitude});
    }
    render() {
        return (
            <MapView.Marker
                coordinate={{latitude: this.props.picture.latitude, longitude: this.props.picture.longitude}}
                centerOffset={{x: 0, y: 100}}
                onPress={this.markerPress.bind(this)}>
            </MapView.Marker>
        );
    }
}

const styles = StyleSheet.create({
    loading: {

    },
});

module.exports = PictureMarker;
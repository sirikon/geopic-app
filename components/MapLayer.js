import React, { Component } from 'react';
import {
  StyleSheet
} from 'react-native';

import MapView from 'react-native-maps';

class MapLayer extends Component {
    render() {
        return (
            <MapView
                style={styles.map}
                region={this.props.region}
                onRegionChange={this.props.onRegionChange}
            />
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
});

module.exports = MapLayer;
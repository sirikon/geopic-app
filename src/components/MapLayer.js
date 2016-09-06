import React, { Component } from 'react';
import {
  StyleSheet,
  Image
} from 'react-native';

import MapView from 'react-native-maps';

class MapLayer extends Component {
    render() {
        var picture = this.props.pictures[0];
        if (!picture) return null;
        return (
            <MapView
                style={styles.map}
                region={this.props.region}
                onRegionChange={this.props.onRegionChange}>

                {this.props.pictures.map(picture => (
                    <MapView.Marker key={picture.id} coordinate={{latitude: picture.latitude, longitude: picture.longitude}}>
                        
                    </MapView.Marker>
                ))}

            </MapView>
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
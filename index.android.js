/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry
} from 'react-native';
import LandingView from './components/LandingView';
import WorldMapView from './components/WorldMapView';

class geopic extends Component {
  render() {
    return (
      <WorldMapView />
    );
  }
}

AppRegistry.registerComponent('geopic', () => geopic);

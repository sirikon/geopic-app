/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native';

class geopic extends Component {
  _onPressButton() {
    alert("Work in progress :)");
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          GeoPic
        </Text>
        <Text style={styles.instructions}>
          Tag pictures on your actual geolocation.
        </Text>
        <Text style={styles.instructions}>
          Give it a try
        </Text>
        <TouchableHighlight onPress={this._onPressButton}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>
              Start
            </Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 30,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  },
  button: {
    marginTop: 10,
    backgroundColor: 'lightblue',
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 12,
    paddingRight: 12,
    borderRadius: 5
  },
  buttonText: {
    fontSize: 20
  }
});

AppRegistry.registerComponent('geopic', () => geopic);

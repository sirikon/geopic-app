import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert
} from 'react-native';

class LandingView extends Component {
  _onPressButton() {
    Alert.alert('Work in progress', 'Available soon...', [{text: 'Ok! :D'}]);
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
        <TouchableOpacity onPress={this._onPressButton}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>
              Start
            </Text>
          </View>
        </TouchableOpacity>
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

module.exports = LandingView

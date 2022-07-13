/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, Text, View, TextInput, Button} from 'react-native';

import SInfo from 'react-native-sensitive-info';
import AppStateExample from './Closing';
import Postrequest from './PostRequest';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  button: {
    backgroundColor: 'lightskyblue',
    padding: 10,
    borderRadius: 3,
    margin: 5,
  },
});

export default class FirstConnection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      number: '',
      SSID: '',
      PASS: '',
    };
  }
  componentDidMount() {
    console.log('Component Did Mount ----> ')
    this.GET();
  }

  GET() {
    SInfo.getItem('ssid', {
      sharedPreferencesName: 'mySharedPrefs',
      keychainService: 'myKeychain',
    }).then(value => {
      console.log('ssid', value); //value1
      this.setState({SSID: value});
    });

    SInfo.getItem('pass', {
      sharedPreferencesName: 'mySharedPrefs',
      keychainService: 'myKeychain',
    }).then(value => {
      console.log('pass', value); //value2
      this.setState({PASS: value});
    });
  }
  RUN() {
    SInfo.setItem('ssid', this.state.text, {
      sharedPreferencesName: 'mySharedPrefs',
      keychainService: 'myKeychain',
    });

    SInfo.setItem('pass', this.state.number, {
      sharedPreferencesName: 'mySharedPrefs',
      keychainService: 'myKeychain',
    });
    this.GET();
    // console.log('sssid', this.state.text);
  }

  render() {
    return (
      <View>
        {!this.state.PASS ? (
          <View>
            <TextInput
              style={{backgroundColor: 'red', color: 'black'}}
              onChangeText={text => this.setState({text})}
              value={this.state.text}
            />
            <TextInput
              style={{backgroundColor: 'yellow', color: 'black'}}
              onChangeText={number => this.setState({number})}
              value={this.state.number}
              placeholder="useless placeholder"
              // keyboardType="numeric"
            />

            <Text>{this.state.text}</Text>

            <Text>{this.state.number}</Text>
            <Button title="SET" onPress={() => this.RUN()} />
            {/* <Button title="GET" onPress={() => this.GET()} />  */}
          </View>
        ) : (
          <>
            <AppStateExample pass={this.state.PASS} _ssid={this.state.SSID} />
            <Postrequest />
          </>
        )}
      </View>
    );
  }
}

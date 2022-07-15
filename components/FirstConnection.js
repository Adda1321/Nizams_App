/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
} from 'react-native';

import SInfo from 'react-native-sensitive-info';
import AppStateExample from './Closing';
import Postrequest from './PostRequest';

export default class FirstConnection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      number: '',
      SSID: '',
      PASS: '',
      ssidError: '',
      passError: '',
    };
  }
  componentDidMount() {
    console.log('Component Did Mount ----> ');
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
    !this.state.text ? this.setState({ssidError: 'Enter ssid'}):this.setState({ssidError: ''});
    !this.state.number ? this.setState({passError: 'Enter password'}):this.setState({passError: ''});
    // console.log('sssid', this.state.text);
  }

  errorHandle = () => {
    console.log('----------------------------------> handle error');
    this.setState({PASS: ''});
    this.setState({SSID: ''});
    SInfo.setItem('ssid', '', {
      sharedPreferencesName: 'mySharedPrefs',
      keychainService: 'myKeychain',
    });

    SInfo.setItem('pass', '', {
      sharedPreferencesName: 'mySharedPrefs',
      keychainService: 'myKeychain',
    });
  };
  render() {
    return (
      <View>
        {this.state.PASS && this.state.SSID ? (
          <>
            <AppStateExample
              pass={this.state.PASS}
              _ssid={this.state.SSID}
              firstFlag={true}
              errorHandle={this.errorHandle}
            />
          </>
        ) : (
          <View style={styles.container}>
            <TextInput
              style={[styles.input, styles.inputCard]}
              onChangeText={text => this.setState({text})}
              value={this.state.text}
              placeholder="testap"
              autoCapitalize="none"
              placeholderTextColor="black"
            />
            <Text style={styles.error}>
              <Text style={styles.redError}>
                {this.state.ssidError && `Error:`}
              </Text>
              <Text style={{marginLeft:2}}>

              {this.state.ssidError && ` ${this.state.ssidError}`}
              </Text>
            </Text>
            <TextInput
              style={[styles.input, styles.inputCard]}
              onChangeText={number => this.setState({number})}
              value={this.state.number}
              placeholder="35225265"
              autoCapitalize="none"
              placeholderTextColor="black"
            />

            <Text style={styles.error}>
              <Text style={styles.redError}>
                {this.state.passError && `Error:`}
              </Text>
              <Text style={{marginLeft:2}}>

              {this.state.passError && ` ${this.state.passError}`}
              </Text>
            </Text>
        
            <TouchableOpacity
              style={[styles.btn, styles.inputCard, {}]}
              onPress={() => this.RUN()}>
              <Text
                style={{textAlign: 'center', fontSize: 20, fontWeight: '600' , color:'#fff'}}>
                Connect
              </Text>
            </TouchableOpacity>
            {/* <Button title="GET" onPress={() => this.GET()} />  */}
          </View>
        )}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    height: '100%',
    backgroundColor: '#926FCB', //#555555
  },
  input: {
    backgroundColor: '#fff',
    color: 'black',
    marginVertical: 5,
    marginHorizontal: 15,
    paddingHorizontal: 10,
    borderRadius: 4,
  },
  inputCard: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.53,
    shadowRadius: 13.97,

    elevation: 21,
  },
  btn: {
    marginTop: 30,
    backgroundColor: '#643187',
    paddingVertical: 10,
    marginHorizontal: 15,
    borderRadius: 4,
  },
  error: {
    color: '#fff',
    marginHorizontal: 15,
    fontWeight: '700',
  },
  redError: {
    color: 'red',
    fontWeight: 'bold',
    letterSpacing: 2,
    backgroundColor: 'white',
    
  },
});

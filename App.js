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
  Alert,
  TouchableOpacity,
  Platform,
  AppState,
  DeviceEventEmitter,
  Button,
  TextInput,
} from 'react-native';

import SInfo from 'react-native-sensitive-info';
//  const [text, onChangeText] = React.useState("Useless Text");
//  const [number, onChangeNumber] = React.useState(null);

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

export default class App extends Component {
  constructor(props) {
    super(props);
    //  this.handleStateChange = this.handleStateChange.bind(this);
    //  this.handleAuthFeedback = this.handleAuthFeedback.bind(this);
    this.state = {
      //  helpText: '',
      text: '',
      number: '',
    };
  }

  GET() {
    SInfo.getItem('ssid', {
      sharedPreferencesName: 'mySharedPrefs',
      keychainService: 'myKeychain',
    }).then(value => {
      console.log('ssid', value); //value1
    });

    SInfo.getItem('pass', {
      sharedPreferencesName: 'mySharedPrefs',
      keychainService: 'myKeychain',
    }).then(value => {
      console.log('pass', value); //value2
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
    // console.log('sssid', this.state.text);
  }

  render() {
    return (
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
        <Button title="GET" onPress={() => this.GET()} />
        {/* <Text>{this.state.helpText}</Text>
         <TouchableOpacity
           style={styles.button}
           onPress={() => this.setTouchIDItem()}
           title="set touchID item"
           accessibilityLabel="set touchID item"
           >
           <Text>set touchID item</Text>
         </TouchableOpacity>
         <TouchableOpacity
           style={styles.button}
           onPress={() => this.getTouchIDItem()}
           accessibilityLabel="get touchID item"
         >
           <Text>get touchID item</Text>
         </TouchableOpacity> */}
      </View>
    );
  }
}


// import React, {useState} from 'react';
// import {View, Text, StyleSheet, Button} from 'react-native';
// import YourComponent from './components/Connection';
// import MyStack from './Navigation/MealsNavigator';
// import styles from './Styles/AppStyle';
// import AppStateExample from './components/Closing';
// import Disconnect from './components/Disconnect';
// import Reborn from './components/Reborn';
// import Fetch from './components/Fetch';
// import Github from './components/GitHub';
// import Request from './components/Request';
// import Postrequest from './components/PostRequest';
// function App() {
//   return (
//     <View>
//       <Text>asd</Text>
//        <Text>
//       {/* <Github/> */}
//       <AppStateExample/>
//         {/* <Request /> */}
//       </Text> 
//       <Text>
//         <Postrequest/>
//       </Text>
//     </View>
//   );
// }
// export default App;

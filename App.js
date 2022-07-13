
import React, {useState} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import YourComponent from './components/Connection';
import MyStack from './Navigation/MealsNavigator';
import styles from './Styles/AppStyle';
import AppStateExample from './components/Closing';
import Disconnect from './components/Disconnect';
import Reborn from './components/Reborn';
import Fetch from './components/Fetch';
import Github from './components/GitHub';
import Request from './components/Request';
import Postrequest from './components/PostRequest';
import FirstConnection from './components/FirstConnection';
function App() {
  return (
    <View>
     
      <FirstConnection/>
     
    </View>
  );
}
export default App;

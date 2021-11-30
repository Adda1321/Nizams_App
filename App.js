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
function App() {
  return (
    <View>
      <Text>asd</Text>
      <Text>
        <Request />
      </Text>

      {/* <Text>
        <Reborn/>
      </Text> */}
      {/* <Text>
        <Disconnect />
      </Text> */}
      {/* <Text>
        <Github/>
      </Text> */}
      {/* <Fetch /> */}

      {/* <Text>
        <AppStateExample />
      </Text> */}
      {/*
      <Text>
        <YourComponent />
      </Text> */}
    </View>
  );
}
export default App;
//<MyStack /> ;
// (
//   <View>
//     <Text>asd</Text>

//   </View>
// );

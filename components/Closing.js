import React, {useRef, useState, useEffect } from 'react';
import {StyleSheet, View, AppState, Text , PermissionsAndroid , Button} from 'react-native';
import styles from '../Styles/AppStyle';
// import Github from './GitHub';
import WifiManager, { connectionStatus } from 'react-native-wifi-reborn';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';

const AppStateExample = () => {
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setappStateVisible] = useState(appState.current);
  const [recent, setrecent] = useState('');
  const [ssid, setssid] = useState('431d');
  const [pass, setpass] = useState('35225265');

  useEffect(() => {
    const subscription = AppState.addEventListener(
      'change',
      _handleAppStateChange,
    );

    return () => {
      subscription.remove();
    };
  }, []);



  
  const onConnect = () => {
    console.log('in on connect')
    // WifiManager.setEnabled(true);
    // WifiManager.disconnect();
    //WifiManager.forceWifiUsage(true);
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'aaaaa',
        message: '',
        buttonNegative: '',
        buttonPositive: '',
      },
    ).then(granted => {
      //console.log(granted);
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        //console.log("granted");
        RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
          interval: 10000,
          fastInterval: 5000,
        })
          .then(data => {
            WifiManager.connectToProtectedSSID(ssid, pass, false).then(
              () => {
                console.log('connectToProtectedSSID successfully!');
              },
              reason => {
                console.log('connectToProtectedSSID failed!');
                console.log(reason);
              },
            );
            console.log('location enabled');
            //WifiManager.connectToProtectedSSID("", "", false)
            WifiManager.getCurrentWifiSSID().then(
              ssid => {
                if (ssid == 'YourSSIDName') {
                } else {
                }
                console.log('Your current connected wifi SSID is ' + ssid);
              },
              () => {
                console.log('Cannot get current SSID!');
              },
            );
          })
          .catch(err => {
            console.log('not permitted to enable location');
          });
      } else {
        console.log('not granted');
        // Permission denied
      }
      // expected output: "Success!"
    });
  };

  const _handleAppStateChange = nextAppState => {
    // if (
    //   appState.current.match(/inactive|background/) &&
    //   nextAppState === 'active'
    // ) {

    //   // WifiManager.connectToSSID('431d');
    //   // WifiManager
      
    //   console.log('App has come to the foreground!');
    //   onConnect()

    // }
    
    
    appState.current = nextAppState;
    setrecent(nextAppState);
    setappStateVisible(appState.current);
    
    
    console.log('AppState: ', appState.current);
   
    if(appState.current === 'active' ){
      console.log('CONNECTION')
      onConnect();
      
    }
    if(appState.current === 'background' | 'inactive'){
  
        WifiManager.disconnect();
        console.log('in background should disconnect')
      }


    

  };
const statusState = 'ISactive'
  // return <Github status={appStateVisible} />
   return(
     <View>
      <Text>
        hello
      </Text>
     </View>
   )
    
};


export default AppStateExample;

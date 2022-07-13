import React, {useRef, useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  AppState,
  Text,
  PermissionsAndroid,
  Button,
} from 'react-native';
import styles from '../Styles/AppStyle';
// import Github from './GitHub';
import WifiManager, {connectionStatus} from 'react-native-wifi-reborn';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';

const AppStateExample = (props) => {
  const {_ssid ,pass} = props
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setappStateVisible] = useState(appState.current);
  const [recent, setrecent] = useState('');
  // const [_ssid, setssid] = useState('testap');
  // const [pass, setpass] = useState('35225265');
  const joinOnce = true;
  const isWep = false;
  // useEffect(() => {
  //   console.log('In useEffect----')
  //   const subscription = AppState.addEventListener(
  //     'change',
  //     _handleAppStateChange,
  //   );
  //   return () => {
  //     subscription.remove();
  //   };
  // }, []);

  

  const onConnect = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Location permission is required for WiFi connections',
        message:
          'This app needs location permission as this is required  ' +
          'to scan for wifi networks.',
        buttonNegative: 'DENY',
        buttonPositive: 'ALLOW',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('Loc Permission Successfull');
      try {
        const data = await WifiManager.connectToProtectedSSID(
          _ssid,
          pass,
          isWep,
      
        );
        console.log('Connected successfully!', {data});
      } catch (error) {
        console.log('Connection failed!', {error});
      }

      try {
        const ssid = await WifiManager.getCurrentWifiSSID();
        // setSsid(ssid);
        console.log('Your current connected wifi SSID is ' + ssid);
      } catch (error) {
        console.log('Cannot get current SSID!', {error});
      }
    } else {
      console.log('Loc Permission Denied');
    }
  };

  // const onConnect = () => {
  //   console.log('in on connect')

  //   PermissionsAndroid.request(
  //     PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  //     {
  //       title: 'Location permission is required for WiFi connections',
  //       message:
  //         'This app needs location permission as this is required  ' +
  //         'to scan for wifi networks.',
  //       buttonNegative: 'DENY',
  //       buttonPositive: 'ALLOW',
  //     },
  //   )
  //   .then(granted => {
  //     //console.log(granted);
  //     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //       //console.log("granted");
  //       // RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
  //       //   interval: 10000,
  //       //   fastInterval: 5000,
  //       // })

  //         // .then(data => {
  //           // console.log('location enabled');

  //           WifiManager.connectToProtectedSSID(_ssid, pass, false).then(
  //             () => {
  //               console.log('connectToProtectedSSID successfully!');
  //             },
  //             reason => {
  //               console.log('connectToProtectedSSID failed!', _ssid , pass);
  //               console.log(reason);
  //             },
  //           );
  //           //WifiManager.connectToProtectedSSID("", "", false)
  //           WifiManager.getCurrentWifiSSID().then(
  //             ssid => {
  //               if (ssid == 'YourSSIDName') {
  //               } else {
  //               }
  //               console.log('Your current connected wifi SSID is ' + ssid);
  //             },
  //             () => {
  //               console.log('Cannot get current SSID!');
  //             },
  //           );
  //         // })
  //         // .catch(err => {
  //         //   console.log('not permitted to enable location',err);
  //         // });
  //     } else {
  //       console.log('Permission not granted');
  //       // Permission denied
  //     }
  //     // expected output: "Success!"
  //   });
  // };

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

    if (appState.current === 'active') {
      console.log('CONNECTION-----------------------------');
      onConnect();
    }
    if ((appState.current === 'background') | 'inactive') {
      // WifiManager.disconnect();
      console.log('in background should disconnect');
    }
  };
  const onDisconnect = () => {
    WifiManager.disconnect();
  };
  const statusState = 'ISactive';
  // return <Github status={appStateVisible} />
  return (
    <View>
      <Text>
        {/* Test Button Connect/Disconnect */}
        <Button title="ONConnet" onPress={onConnect} />
        <Button title="ONDisConnet" onPress={onDisconnect} />
      </Text>
    </View>
  );
};

export default AppStateExample;

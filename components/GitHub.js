import React, {useEffect, useState} from 'react';
import {
  View,
  Button,
  StyleSheet,
  Text,
  ToastAndroid,
  PermissionsAndroid,
} from 'react-native';
import WifiManager from 'react-native-wifi-reborn';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';

const Github = ({status}) => {
  useEffect(() => {
    console.log(`the STATUS : ${status}`);
    if (status === 'background') {
      // () => {
      setTimeout(() => {
        console.log('disconnected!!!!');
        WifiManager.disconnect();
      }, 0);

      //};
    } else {
      console.log('NOT DISCONNECTING!!!');
      setTimeout(() => {
        onConnect();
      }, 1000);
    }
  }, [status]);

  const [ssid, setssid] = useState('ESPap');
  const [pass, setpass] = useState('');
  const Disconnect = () => {
    WifiManager.disconnect();
  };

  const onConnect = () => {
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
  return (
    <View>
      <Button title="Connect to HOTSPOT" onPress={onConnect} />
      <Button title="Disconnect" onPress={Disconnect} />
    </View>
  );
};

const styles = StyleSheet.create({});

export default Github;

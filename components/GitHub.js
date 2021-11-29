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

const Github = () => {
    const [ssid, setssid] = useState('Nabeel Mughal');
    const [pass, setpass] = useState('1234567890');

const onDisconnect = () =>{
    console.log("disconnected!!!!")
    WifiManager.disconnect();
}

const onConnect =()=>{
    // WifiManager.setEnabled(true);
    // WifiManager.disconnect();
    //WifiManager.forceWifiUsage(true);
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'aaaaa',
        message:'',
        buttonNegative: '',
        buttonPositive: '',
      },
      ).then((granted) => {
        
        //console.log(granted);
        if (granted === PermissionsAndroid.RESULTS.GRANTED) 
        {
            //console.log("granted");        
            RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({interval: 10000, fastInterval: 5000})
            .then(data => {
              WifiManager.connectToProtectedSSID(ssid, pass, false)
              .then(
                () => {
                  console.log("connectToProtectedSSID successfully!");
                    },
                (reason) => {
                console.log("connectToProtectedSSID failed!");
                console.log(reason);
            }
            );
                console.log("location enabled");
                //WifiManager.connectToProtectedSSID("", "", false)
             WifiManager.getCurrentWifiSSID().then(
              ssid => {
                if(ssid =="YourSSIDName"){
                }
                 else {
                }
                console.log("Your current connected wifi SSID is " + ssid);
              },
              () => {
                console.log("Cannot get current SSID!");
              }
            );
            }).catch(err => {
              console.log("not permitted to enable location");
            });
        } 
        else 
        {
    console.log("not granted");
    // Permission denied
        }
        // expected output: "Success!"
      });
  }
    return (
        <View>
            <Button title="Connect to HOTSPOT" onPress={onConnect} />
            <Button title="Connect to HOTSPOT" onPress={onDisconnect} />
            
        </View>
    );
}

const styles = StyleSheet.create({})

export default Github;

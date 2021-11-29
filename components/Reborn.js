import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Button, PermissionsAndroid} from 'react-native';
import WifiManager from 'react-native-wifi-reborn';

const Reborn = () => {
    const [EnableStatus, setEnableStatus] = useState(null);
  useEffect(() => {
//     const enabled =  WifiManager.isEnabled();
//     setEnableStatus(enabled);
//     console.log(enabled);
},[])

    const askUserPermission =async () => {
        console.log('inside ')
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Wifi networks',
              message: 'We need your permission in order to find wifi networks',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('Permission Granted');
          } else {
            console.log(
              'You will not able to retrieve wifi available networks list',
            );
          }
        } catch (err) {
          console.warn(err);
        }
      };
 
  const connectToWifi = () => {
    WifiManager.getCurrentWifiSSID().then(
      ssid => {
        console.log('Your current connected wifi SSID is ' + ssid);
      },
      () => {
        console.log('Cannot get current SSID!');
      },
    );
  };

  const Disabled  = async() =>  {
//       const adil= WifiManager.disconnect()
// console.log(adil);
WifiManager.setEnabled(false);
const enabled = await WifiManager.isEnabled();
setEnableStatus(enabled);
console.log(enabled)
};

const EnableFalse = () =>{
   WifiManager.setEnabled(true);
  
}
  return (
    <View>
      <Button title="GRANT Permission" onPress={askUserPermission} />
      <Button title="connectToWifi" onPress={connectToWifi} />
      <Button title="Check Enable" onPress={Disabled}/>
      <Button title="Turn Wifi Off" onPress={EnableFalse}/>
      <Text>
          {EnableStatus}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Reborn;

import React, {useEffect, useState} from 'react';
import {
  View,
  Button,
  StyleSheet,
  Text,
  ToastAndroid,
  PermissionsAndroid,
} from 'react-native';
import wifi from 'react-native-android-wifi';

const Disconnect = () => {
  const [state, setstate] = useState(0);
  const [ssid, setssid] = useState('Kashif Malik');
  const [pass, setpass] = useState('1234567890');

  useEffect(() => {
    wifi.isEnabled(isEnabled => {
      if (isEnabled) {
        console.log('wifi service enabled');
      } else {
        console.log('wifi service is disabled');
      }
    });
    wifi.connectionStatus(isConnected => {
      if (isConnected) {
        console.log('is connected');
        wifi.disconnect();
      } else {
        console.log('is not connected');
      }
    });
  }, [state]);
  const askUserPermission = async () => {
    console.log('inside ');
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Wifi networks',
          message: 'We need your permission in order to find wifi networks',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Thank you for your permission! :)');
      } else {
        console.log(
          'You will not able to retrieve wifi available networks list',
        );
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const disconnecttoPress = () => {
    wifi.disconnect();
    ToastAndroid.show('Disconnedted', ToastAndroid.SHORT);

    wifi.getSSID(ssid => {
      console.log(ssid);
    });
  };
  const onConnected = () => {
    //found returns true if ssid is in the range
    wifi.findAndConnect(ssid, pass, found => {
      if (found) {
        console.log('wifi is in range');
        //ToastAndroid.show('Connedted', ToastAndroid.SHORT);
      } else {
        console.log('wifi is not in range');
        //ToastAndroid.show('Failed', ToastAndroid.SHORT);
      }
    });
  };
  const showWifiList = () => {
    wifi.loadWifiList(
      wifiStringList => {
        var wifiArray = JSON.parse(wifiStringList);
        console.log(wifiArray);
      },
      error => {
        console.log(error);
      },
    );
  };
  return (
    <View>
      <Button title="Press askforPermission" onPress={askUserPermission} />
      <Button title="Press Disconnect" onPress={disconnecttoPress} />
      <Button title="Connect to HOTSPOT" onPress={onConnected} />
      <Button title="show WIFI List" onPress={showWifiList} />
      <Button title="Press useEffect" onPress={e => setstate(e + 1)} />
    </View>
  );
};

const styles = StyleSheet.create({});

export default Disconnect;

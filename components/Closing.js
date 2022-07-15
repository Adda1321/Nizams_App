import React, {useRef, useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  AppState,
  Alert,
  Text,
  PermissionsAndroid,
  Button,
  TouchableOpacity,
} from 'react-native';
// import styles from '../Styles/AppStyle';
// import Github from './GitHub';
import WifiManager, {connectionStatus} from 'react-native-wifi-reborn';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import Postrequest from './PostRequest';

const AppStateExample = props => {
  const {_ssid, pass, firstFlag, errorHandle} = props;
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setappStateVisible] = useState(appState.current);
  const [recent, setrecent] = useState('');
  const [isConnected, setisConnected] = useState(false);
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
  useEffect(() => {
    console.log('firstFlag->', firstFlag);
    firstFlag && onConnect();
  }, [firstFlag]);
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
        setisConnected(true);
      } catch (error) {
        console.log('Connection failed!', {error});
        setisConnected(false);
        Alert.alert(
          'Something went wrong ....',
          'Enter Correct ssid and password',
          [{text: 'OK'}],
          {cancelable: true},
        );
        errorHandle();
      }

      // try {
      //   const ssid = await WifiManager.getCurrentWifiSSID();
      //   // setSsid(ssid);
      //   console.log('Your current connected wifi SSID is ' + ssid);
      // } catch (error) {
      //   console.log('Cannot get current SSID!', {error});
      // }
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
    <View style={{height: '100%', width: '100%', backgroundColor: '#884090'}}>
      <View>
        {isConnected && (
          <View style={{}}>
            <View style={{width: '100%', height: '67%', marginTop: 70}}>
              <Postrequest />
            </View>
            <View style={styles.container}>
              <TouchableOpacity  style={[styles.btn,styles.btnShadow]} onPress={onConnect}>
                <Text  style={{textAlign:'center' , fontWeight:'700' , color:'#fff'}}>Connect Gate</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.btn,styles.btnShadow]} onPress={onDisconnect}>
                <Text style={{textAlign:'center' , fontWeight:'700' ,color:'#fff'}}>DisConnect Gate</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    height: 100,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginVertical: 10,
    flexWrap: 'wrap',
  
  },
  btn: {
    borderWidth:1,
    borderColor:'rgba(0,0,0,0.2)',
    alignItems:'center',
    justifyContent:'center',
    width:100,
    height:100,
    backgroundColor:'#643187',
    borderRadius:50,
    marginVertical: 60,
    
  },
  btnShadow:{
    shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 3,
},
shadowOpacity: 0.29,
shadowRadius: 4.65,

elevation: 7,
  }
});
export default AppStateExample;

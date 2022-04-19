// import {useNetInfo} from '@react-native-community/netinfo';
// import NetInfo from '@react-native-community/netinfo';
// import React, {useState, useEffect} from 'react';
// import {View, Text,Button} from 'react-native';
// import styles from '../Styles/AppStyle';
// export default YourComponent = () => {
//   const [netInfo, setNetInfo] = useState('');
//   const [state, setstate] = useState(0);
//   useEffect(() => {
  
//     const unsubscribe = NetInfo.addEventListener(state => {
//       setNetInfo(
//         `Connection type: ${state.type}
//       Is connected?: ${state.isConnected}
//       IS Reachable ${state.isInternetReachable} `,
//       );
//     });
//     return () => {
//       // Unsubscribe to network state updates
//       unsubscribe();
//     };
//   }, [state]);
//   console.log(netInfo);
//   return (
//     <View style={styles.screen}>
//       <Text style={styles.textStyle}>Connected: {netInfo}</Text>
//       <Button title="Press useEffect connection"  onPress={(e)=>setstate(e+1)} />
//     </View>
//   );
// };

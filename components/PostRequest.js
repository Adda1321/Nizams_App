import React, {useEffect, useState} from 'react';
import {
  View,
  Button,
  StyleSheet,
  Text,
  ToastAndroid,
  PermissionsAndroid,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';

const Postrequest = () => {
  const [posts, setposts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  // const [Data, setData] = useState('');

  const Connect = Data => {
    console.log(`http://192.168.4.1${Data}`);

    axios
      .get(`http://192.168.4.1${Data}`)
      .then(res => {
        console.log(`Data to be Posted: ${Data}`);
        console.log(res);
        // setposts(res);
      })
      .catch(err => {
        console.log(err);
      })
      .then(function () {
        // always executed
      });
  };
  // }, [Data]);

  if (error || !Array.isArray(posts)) {
    return <p>There was an error loading your data!</p>;
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.btn,styles.btnShadow]}
        onPress={() => Connect('/activate?func=both')}>
        <Text style={styles.btnText}>BOTH</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.btn,styles.btnShadow]}
        onPress={() => Connect('/activate?func=stop')}>
        <Text style={styles.btnText}>STOP</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.btn,styles.btnShadow]}
        onPress={() => Connect('/activate?func=master')}>
        <Text style={styles.btnText}>MASTER</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.btn,styles.btnShadow]}
        onPress={() => Connect('/activate?func=slave')}>
        <Text style={styles.btnText}>SLAVE</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.btn,styles.btnShadow]}
        onPress={() => Connect('/activate?func=doorlock')}>
        <Text style={styles.btnText}>DoorLock</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // marginVertical: 10,
    flex: 1,
    // marginTop: 20,

    marginHorizontal: 30,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    // alignSelf:'center',
    // alignContent:'center'

  },
  btn: {
  
    backgroundColor:'#926FCB',
    height:70,
    borderRadius:5,

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
  },
  btnText: {
    // textAlignVertical:'center',
    textAlign: 'center',
color:'#fff',
    fontSize: 20,
    fontWeight: '600',
    marginVertical:20
  },
});

export default Postrequest;

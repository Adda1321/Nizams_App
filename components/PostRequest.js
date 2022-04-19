import React, {useEffect, useState} from 'react';
import {
  View,
  Button,
  StyleSheet,
  Text,
  ToastAndroid,
  PermissionsAndroid,
} from 'react-native';
import axios from 'axios';

const Postrequest = () => {
  const [posts, setposts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  // const [Data, setData] = useState('');

  const Connect = (Data) => {
    console.log(`http://192.168.4.1/${Data}`);

    axios.get(`http://192.168.4.1/${Data}`)
        .then(res => {
          console.log(`Data to be Posted: ${Data.key}`)
        console.log(res);
        // setposts(res);
      })
      .catch(err => {
        console.log(err);
      })
      .then(function () {
        // always executed
      });
    }
  // }, [Data]);

  if (error || !Array.isArray(posts)) {
    return <p>There was an error loading your data!</p>;
  }

  return (
    <View>
      <Button  title=' BOTH' onPress={()=>Connect('both')} />
       <Button  title=' STOP' onPress={()=>Connect('stop')}/>
       <Button  title=' MASTER' onPress={()=>Connect('master')}/>
       <Button  title=' SLAVE' onPress={()=>Connect('slave')}/>
      <Button  title=' DoorLock' onPress={()=>Connect('doorlock')}/>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Postrequest;

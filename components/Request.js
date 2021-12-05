import React, {useEffect, useState} from 'react';
import {
  View,
  Button,
  StyleSheet,
  Text,
  ToastAndroid,
  PermissionsAndroid,
} from 'react-native';

const Request = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch('http://192.168.4.1')
      .then(res => res.json())
      .then(result => {
        console.log(result);
        setIsLoaded(true);
        setItems(result);
      })

      .catch(error => {
        setIsLoaded(true);
        setError(error);
      });
  }, []);
  if (error) {
    return (
      <View>
        <Text> Error: {error.message} </Text>
      </View>
    );
  } else if (!isLoaded) {
    return (
      <View>
        <Text> Loading.... </Text>
      </View>
    );
  } else {
    return (
      <View>
        <Text>
          {items.key}
        </Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({});

export default Request;

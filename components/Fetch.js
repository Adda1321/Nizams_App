import React, {useState, useEffect} from 'react';
import {View, Button, StyleSheet, Text} from 'react-native';
function Fetch() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [state, setstate] = useState(0);
  useEffect(() => {
 fetch('https://jsonplaceholder.typicode.com/posts/1')
    .then(res => res.json())
    .then(result => {
      
      setIsLoaded(true);
      setItems(result);
      console.log(items.title)
    })
    .catch(error => {
      setIsLoaded(true);
      setError(error);
    });

    }, [state]);

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
        <Text>{items.title}</Text>
        <Text>FETCHED</Text>
        <Button title="FETCH ReLoad" onPress={()=>setstate(state+1)}/>
      </View>
    );
  }
}

export default Fetch;

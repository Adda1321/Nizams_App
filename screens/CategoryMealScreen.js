import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import styles from '../Styles/AppStyle';
function CategoryMealScreen({navigation}) {
  return (
    <View style={styles.screen}>
      <Text style={{fontFamily: 'OpenSans-Bold'}}>
        it is a Category Mean Screen!!
      </Text>

      <Text style={{fontFamily: 'OpenSans-Regular'}}>
        it is a Category Mean Screen!!
      </Text>
      <Button title="Meal Detail screen" onPress={()=>{
   navigation.navigate('MealDetail');
}} />

      <Button
        title="Go Back"
        onPress={() => {
          navigation.pop();
        }}
      />
    </View>
  );
}

export default CategoryMealScreen;

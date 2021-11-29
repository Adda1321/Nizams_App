import React from 'react'
import {View,Text,StyleSheet,Button} from 'react-native'
import styles from '../Styles/AppStyle';
function MealDetailScreen ({navigation}) {
    return (
      <View style={styles.screen}>
          <Text>
              it is a Meal Detail Screen!!
          </Text>
          <Button
        title="Go Back TO MAIN"
        onPress={() => {
          navigation.popToTop();
        }}
      />
      </View>
    );
}


export default MealDetailScreen 

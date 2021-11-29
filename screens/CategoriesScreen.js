import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import styles from '../Styles/AppStyle';
import {CATEGORIES} from '../data/dummy-data';

function CategoriesScreen({navigation}) {
  const renderGridITem = itemData => {
    return (
      <TouchableOpacity
      style={styles.gridItem}
        onPress={() => {
          navigation.navigate('CategoryMeal');
        }}>
        <View style={styles.gridItem}>
          <Text>{itemData.item.title}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
     <FlatList data={CATEGORIES} renderItem={renderGridITem} numColumns={2} />
   
    // <View style={styles.screen}>
    //   <Text>it is a Categories Screen!!</Text>
    //   <Button
    //     title="Meal screen"
    //     onPress={() => {
    //       navigation.navigate('CategoryMeal');
    //     }}
    //   />
    // </View>
  );
}
//CategoriesScreen.
export default CategoriesScreen;

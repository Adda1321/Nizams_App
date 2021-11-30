import React, {useRef, useState, useEffect} from 'react';
import {StyleSheet, View, AppState, Text} from 'react-native';
import styles from '../Styles/AppStyle';
import Github from './GitHub';


const AppStateExample = () => {
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setappStateVisible] = useState(appState.current);
  const [recent, setrecent] = useState('');

  useEffect(() => {
    const subscription = AppState.addEventListener(
      'change',
      _handleAppStateChange,
    );
    return () => {
      subscription.remove();
    };
  }, []);

  const _handleAppStateChange = nextAppState => {
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      console.log('App has come to the foreground!');
    }
    appState.current = nextAppState;
    setrecent(nextAppState);
    setappStateVisible(appState.current);
    console.log('AppState: ', appState.current);
  };
const statusState = 'ISactive'
  return <Github status={appStateVisible}/>
   
    
};


export default AppStateExample;

import React from 'react';

import {StyleSheet} from 'react-native';

import BeerNavigator from './navigation/BeerNavigator';
import NavigationContainer from './navigation/NavigationContainer';

const App = () => {
  return <NavigationContainer />;
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: 'white',
  },
});

export default App;

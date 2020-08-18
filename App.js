import React from 'react';

import {StyleSheet} from 'react-native';

import BeerNavigator from './navigation/BeerNavigator';

const App = () => {
  return <BeerNavigator />;
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: 'white',
  },
});

export default App;

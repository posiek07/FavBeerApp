import React from 'react';
import {useSelector, useDispatch} from 'react-redux';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Button,
  Text,
  StatusBar,
} from 'react-native';
// import BeerNavigator from './navigation/BeerNavigator';
import {enableScreens} from 'react-native-screens';

import * as actions from './store/actions/actions';
import BeerNavigator from './navigation/BeerNavigator';

// enableScreens();

const App = () => {
  // const beers = useSelector((state) => state.beers.beers);

  // const dispatch = useDispatch();

  // const fetchData = () => {
  //   dispatch(actions.fetchBeers());
  // };

  // const beerTitles = beers.map((beer) => (
  //   <Text key={beer.id}>{beer.name}</Text>
  // ));

  return (
    <BeerNavigator />
    // <>
    //   <StatusBar barStyle="dark-content" />
    //   <SafeAreaView>
    //     <ScrollView
    //       contentInsetAdjustmentBehavior="automatic"
    //       style={styles.scrollView}>
    //       <View>
    //         <Button title="Button" onPress={() => fetchData()} />

    //         {beerTitles}
    //       </View>
    //     </ScrollView>
    //   </SafeAreaView>
    // </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: 'white',
  },
});

export default App;

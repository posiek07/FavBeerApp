import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {useSelector} from 'react-redux';

const BeerDetails = (props) => {
  const avalibleBeers = useSelector((state) => state.beers.beers);
  const beerId = props.navigation.getParam('beerId');

  const selectedBeer = avalibleBeers.find((beer) => beer.id === beerId);

  return (
    <View style={styles.container}>
      <View style={styles.imageWrapper}>
        <Image source={{uri: selectedBeer.image_url}} style={styles.image} />
      </View>
      <View style={styles.description}>
        <Text>{selectedBeer.description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imageWrapper: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  image: {
    height: '100%',
    resizeMode: 'contain',
  },
  description: {
    flex: 2,
  },
});

export default BeerDetails;

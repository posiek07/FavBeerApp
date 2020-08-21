import React from 'react';
import {useSelector} from 'react-redux';
import {StyleSheet, Text, View} from 'react-native';

const BeerIngredients = (props) => {
  const beerId = props.navigation.getParam('beerId');
  const avalibleBeers = useSelector((state) => state.beers.beers);

  const beer = avalibleBeers.find((beer) => beer.id === beerId);

  return (
    <View>
      <Text>{beer.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default BeerIngredients;

import React from 'react';
import {useSelector} from 'react-redux';
import {StyleSheet, Text, View} from 'react-native';
import Card from '../components/Card';

const BeerIngredients = (props) => {
  const beerId = props.navigation.getParam('beerId');
  const avalibleBeers = useSelector((state) => state.beers.beers);

  const beer = avalibleBeers.find((beer) => beer.id === beerId);

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Secret Ingredients</Text>
      <Card>
        <View>
          <Text>Fermentables</Text>
          <Text>{beer.ingredients.malt[0].name}</Text>
        </View>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
  },

  title: {
    fontFamily: 'Frijole-Regular',
    fontSize: 33,
    margin: 20,
    textAlign: 'center',
  },
});

export default BeerIngredients;

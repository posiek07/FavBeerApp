import React from 'react';
import {StyleSheet, Text, View, Image, Dimensions} from 'react-native';
import {useSelector} from 'react-redux';
import Colors from '../constants/Colors';
import Icon from 'react-native-vector-icons/Ionicons';
import {ScrollView} from 'react-native-gesture-handler';
import DefaultText from '../components/DefaultText';

const dimensions = Dimensions.get('screen');

const BeerDetails = (props) => {
  const avalibleBeers = useSelector((state) => state.beers.beers);
  const beerId = props.navigation.getParam('beerId');

  const selectedBeer = avalibleBeers.find((beer) => beer.id === beerId);

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.imageWrapper}>
          <Image source={{uri: selectedBeer.image_url}} style={styles.image} />
        </View>
        <View style={styles.descriptionWrapper}>
          <Text style={styles.name}>{selectedBeer.name}</Text>
          <Text style={styles.tagline}>"{selectedBeer.tagline}"</Text>
          <DefaultText myStyle={styles.bigDetailsTitle}>ABV:</DefaultText>
          <Text style={styles.bigDetailsValue}>
            <Icon
              title="flash"
              name="flash-outline"
              color={Colors.primary}
              size={35}
            />
            {selectedBeer.abv}%
          </Text>
          <DefaultText myStyle={styles.bigDetailsTitle}>
            First Brewed:
          </DefaultText>
          <DefaultText myStyle={styles.bigDetailsValue}>
            <Icon
              title="today"
              name="today-outline"
              color={Colors.primary}
              size={35}
            />
            {selectedBeer.first_brewed}
          </DefaultText>
          <DefaultText>{selectedBeer.description}</DefaultText>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imageWrapper: {
    maxHeight: dimensions.height / 1.4,
    flex: 1,
    justifyContent: 'flex-start',
    padding: 10,
  },
  image: {
    height: '100%',
    alignItems: 'flex-start',
    resizeMode: 'contain',
  },
  descriptionWrapper: {
    flex: 2,
  },
  name: {
    fontFamily: 'Frijole-Regular',
    fontWeight: 'normal',
    fontSize: 24,
    textAlign: 'center',
    padding: 8,
  },
  tagline: {
    fontFamily: 'Roboto-Italic',
    fontWeight: 'normal',
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 15,
    color: Colors.grey,
  },
  bigDetailsValue: {
    textAlign: 'center',
    fontSize: 35,

    marginBottom: 20,
  },
  bigDetailsTitle: {
    fontSize: 20,
  },
  description: {},
});

BeerDetails.navigationOptions = (navigationData) => {
  const beerTitle = navigationData.navigation.getParam('beerTitle');

  return {
    headerTitle: beerTitle,
  };
};

export default BeerDetails;

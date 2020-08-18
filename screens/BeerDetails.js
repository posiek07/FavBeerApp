import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import Colors from '../constants/Colors';
import Icon from 'react-native-vector-icons/Ionicons';
import DefaultText from '../components/DefaultText';
import {Rating} from 'react-native-elements';
import {updateRateFav} from '../store/actions/actions';

const dimensions = Dimensions.get('screen');

const BeerDetails = (props) => {
  const dispatch = useDispatch();

  const avalibleBeers = useSelector((state) => state.beers.beers);
  const rateFavBeers = useSelector((state) => state.beers.beersFavRate);

  console.log(rateFavBeers);

  const beerId = props.navigation.getParam('beerId');

  const selectedBeer = avalibleBeers.find((beer) => beer.id === beerId);

  const selectedFavRate = rateFavBeers.find((object) => object.id === beerId);

  const [rating, setRating] = useState(
    selectedFavRate ? selectedFavRate.rating : null,
  );

  const [favorite, setFavorite] = useState(
    selectedFavRate ? selectedFavRate.favorite : null,
  );

  const toggleBeerFav = (status) => {
    setFavorite((prevState) => !prevState);
    dispatch(
      updateRateFav({
        id: selectedBeer.id,
        favorite: status,
      }),
    );
  };

  const toggleBeerRate = (score) => {
    setRating(score);
    dispatch(
      updateRateFav({
        id: selectedBeer.id,
        rating: score,
      }),
    );
  };

  console.log('hello from details');
  return (
    <View>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.imageWrapper}>
            <Image
              source={{uri: selectedBeer.image_url}}
              style={styles.image}
            />
          </View>
          <View style={styles.descriptionWrapper}>
            <Text style={styles.name}>{selectedBeer.name}</Text>
            <Text style={styles.tagline}>"{selectedBeer.tagline}"</Text>
            <View>
              <Rating
                showRating
                onFinishRating={(score) => toggleBeerRate(score)}
                fractions={1}
                startingValue={rating}
                ratingBackgroundColor="#fcfcfc"
                type="custom"
                // tintColor="#d6d6d6"
              />
            </View>
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
      <TouchableOpacity
        activeOpacity={0.1}
        style={styles.TouchableOpacityStyle}>
        {!favorite ? (
          <Icon
            title="heart"
            name="heart-outline"
            color="salmon"
            size={35}
            style={styles.FloatingButtonStyle}
            onPress={() => toggleBeerFav(!favorite)}
          />
        ) : (
          <Icon
            title="heart"
            name="heart"
            color="salmon"
            size={35}
            style={styles.FloatingButtonStyle}
            onPress={() => toggleBeerFav(!favorite)}
          />
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fcfcfc',
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
    paddingTop: 15,
  },
  description: {},
  MainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },

  TouchableOpacityStyle: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 5,
    top: 5,
  },

  FloatingButtonStyle: {
    width: 32,
    height: 50,
    opacity: 0.7,
    //backgroundColor:'black'
  },
});

BeerDetails.navigationOptions = (navigationData) => {
  const beerTitle = navigationData.navigation.getParam('beerTitle');

  return {
    headerTitle: beerTitle,
  };
};

export default BeerDetails;

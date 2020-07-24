import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet, Pressable, Dimensions} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import * as actions from '../store/actions/actions';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import CustomHeaderButton from '../components/CustomHeaderButton';
import {FlatList} from 'react-native-gesture-handler';
import ListItem from '../components/ListItem';

const dimensions = Dimensions.get('screen');

const RatedBeers = (props) => {
  const beers = useSelector((state) => state.beers.filteredBeers);
  const dispatch = useDispatch();

  const beersFavRate = useSelector((state) => state.beers.beersFavRate);

  const ratedResult = beersFavRate
    .map((object) => object)
    .filter((object) => Number.isFinite(object.rating))
    .map((object) => object.id);

  console.log(ratedResult);

  const ratedBeers = beers.filter((beer) => {
    if (ratedResult.includes(beer.id)) {
      return beer;
    }
  });

  const fetchData = () => {
    dispatch(actions.fetchBeers());
  };

  useEffect(() => {
    fetchData();
  }, []);

  const cards = (itemData) => (
    // <View style={styles.cardWrapper}>
    <Pressable
      onPress={() => {
        props.navigation.navigate({
          routeName: 'BeerDetails',
          params: {
            beerId: itemData.item.id,
            beerTitle: itemData.item.name,
            // isFav: isFavorite,
          },
        });
      }}>
      <ListItem item={itemData.item} />
    </Pressable>
    // </View>
  );

  return (
    <>
      <SafeAreaView>
        <FlatList
          style={{margin: 3}}
          data={ratedBeers}
          numColumns={1}
          keyExtractor={(item) => item.id.toString()}
          renderItem={cards}
          initialNumToRender={2}
          // columnWrapperStyle={styles.columnWrapper}
        />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({});

RatedBeers.navigationOptions = (navData) => {
  return {
    headerTitle: 'Rated Beers',
    headerStyle: {
      backgroundColor: '#F9B222',
    },
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Menu"
          iconName="menu-outline"
          color="white"
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
  };
};

export default RatedBeers;

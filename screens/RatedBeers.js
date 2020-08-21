import React, {useEffect, useCallback} from 'react';
import {SafeAreaView, Pressable, Dimensions} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import * as actions from '../store/actions/actions';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import CustomHeaderButton from '../components/CustomHeaderButton';
import {FlatList} from 'react-native-gesture-handler';
import ListItem from '../components/ListItem';
import {NavigationActions} from 'react-navigation';

const dimensions = Dimensions.get('screen');

const RatedBeers = (props) => {
  const beers = useSelector((state) => state.beers.beers);
  const dispatch = useDispatch();

  const beersFavRate = useSelector((state) => state.beers.beersFavRate);

  const ratedResult = beersFavRate.filter((object) =>
    Number.isFinite(object.rating),
  );
  // .map((object) => object.id);

  const result = [];

  for (let i = 0; i < beersFavRate.length; i++) {
    result.push({
      ...beersFavRate[i],
      ...beers.find((beer) => beer.id === beersFavRate[i].id),
    });
  }

  result.sort((a, b) => b.rating - a.rating);

  const ratedBeers = beers.filter((beer) => {
    const rateRes = beersFavRate.find((object) => {
      object.id === beer.id;
      return object;
    });
    if (rateRes.id === beer.id) {
      return {...beer, rating: rateRes.rating};
    }
  });

  const fetchData = () => {
    dispatch(actions.fetchData());
  };

  useEffect(() => {
    fetchData();
  }, []);

  const navigationDetails = (id, name) => {
    props.navigation.navigate({
      routeName: 'Beers',
      action: NavigationActions.navigate({
        routeName: 'BeerDetails',
        params: {
          beerId: id,
          beerTitle: name,
        },
      }),
    });
  };

  const navigateToBeerDetails = useCallback(
    (id, name) => {
      navigationDetails(id, name);
    },
    [navigationDetails],
  );

  return (
    <>
      <SafeAreaView>
        <FlatList
          style={{margin: 3}}
          data={result}
          numColumns={1}
          keyExtractor={(item) => item.id.toString()}
          renderItem={(itemData) => (
            <ListItem
              navigation={() =>
                navigateToBeerDetails(itemData.item.id, itemData.item.name)
              }
              item={itemData.item}
            />
          )}
          initialNumToRender={2}
        />
      </SafeAreaView>
    </>
  );
};

RatedBeers.navigationOptions = (navData) => {
  return {
    headerTitle: null,
    // headerStyle: {
    //   backgroundColor: '#F9B222',
    // },
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Menu"
          iconName="menu-outline"
          color="black"
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
  };
};

export default RatedBeers;

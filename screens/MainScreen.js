import React, {useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  Pressable,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import * as actions from '../store/actions/actions';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import CustomHeaderButton from '../components/CustomHeaderButton';
import {Card} from 'react-native-elements';
import {FlatList} from 'react-native-gesture-handler';
import BeerHeader from '../components/BeerHeader';

const mainScreen = (props) => {
  const beers = useSelector((state) => state.beers.filteredBeers);
  const dispatch = useDispatch();

  const fetchData = () => {
    dispatch(actions.fetchBeers());
  };

  useEffect(() => {
    fetchData();
  }, []);

  const cards = (itemData) => (
    <View style={styles.cardWrapper}>
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
        <Card
          containerStyle={{
            padding: 3,
            margin: 5,
            flex: 1,
            flexDirection: 'column',
          }}
          key={itemData.item.id}
          title={itemData.item.name}
          titleStyle={styles.cardTitle}
          titleNumberOfLines={3}>
          <View style={styles.imageWrap}>
            <Image
              resizeMode="contain"
              source={{uri: itemData.item.image_url}}
              style={styles.image}
            />
          </View>
          <View style={{marginTop: 20}}>
            <Text style={{fontFamily: 'Roboto-Italic'}}>
              {itemData.item.tagline}
            </Text>
          </View>
        </Card>
      </Pressable>
    </View>
  );

  return (
    <>
      <SafeAreaView>
        <FlatList
          ListHeaderComponent={BeerHeader}
          style={{margin: 3}}
          data={beers}
          numColumns={2}
          keyExtractor={(item) => item.id}
          renderItem={cards}
          initialNumToRender={2}
          columnWrapperStyle={styles.columnWrapper}
        />
      </SafeAreaView>
    </>
  );
};

mainScreen.navigationOptions = (navData) => {
  return {
    headerTitle: 'Beer Categories',
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

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: 'white',
  },
  imageWrap: {
    flex: 1,
    justifyContent: 'flex-start',
    height: 200,
    width: '100%',
  },
  cardWrapper: {
    flex: 0.5,
    justifyContent: 'flex-start',
    margin: 0,
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  cardTitle: {
    fontFamily: 'Frijole-Regular',
    fontWeight: 'normal',
    fontSize: 15,
    minHeight: 65,
  },
  columnWrapper: {
    minHeight: 300,
  },
});

export default mainScreen;

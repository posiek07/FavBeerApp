import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Button,
  Text,
  Image,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import * as actions from '../store/actions/actions';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import CustomHeaderButton from '../components/CustomHeaderButton';
import Icon from 'react-native-vector-icons/Ionicons';
import {Card} from 'react-native-elements';
import {FlatList} from 'react-native-gesture-handler';

const mainScreen = () => {
  const myIcon = <Icon name="rocket" size={30} color="#900" />;

  const beers = useSelector((state) => state.beers.beers);
  const dispatch = useDispatch();

  const fetchData = () => {
    dispatch(actions.fetchBeers());
  };

  const cards = (itemData) => (
    <Card key={itemData.item.id} title={itemData.item.name}>
      <View style={styles.imageWrap}>
        <Image
          resizeMode="contain"
          source={{uri: itemData.item.image_url}}
          style={styles.image}
        />
      </View>
      {/* <Text numberOfLines={5} style={{marginBottom: 10}}>
        {itemData.item.description}
      </Text> */}
      <Text>{itemData.item.tagline}</Text>
      <Text>{itemData.item.method.fermentation.temp.value}</Text>
      <Button
        icon={<Icon name="code" color="#ffffff" />}
        buttonStyle={{
          borderRadius: 0,
          marginLeft: 0,
          marginRight: 0,
          marginBottom: 0,
        }}
        title="VIEW NOW"
      />
    </Card>
  );

  return (
    <>
      <SafeAreaView>
        <Button title="Show beers" onPress={() => fetchData()} />
        <FlatList
          style={{margin: 3}}
          data={beers}
          numColumns={2}
          keyExtractor={(item) => item.id}
          renderItem={cards}
          columnWrapperStyle={styles.cardWrapper}
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
    justifyContent: 'center',
    height: 120,
    width: '100%',
  },
  cardWrapper: {
    flex: 0.5,
    justifyContent: 'space-between',
    width: '50%',
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});

export default mainScreen;

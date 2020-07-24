import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import MainScreen from '../screens/MainScreen';
import BeerDetails from '../screens/BeerDetails';
import {Text, Platform} from 'react-native';
import Colors from '../constants/Colors';
import RatedBeers from '../screens/RatedBeers';
import React from 'react';
import FavouritesScreen from '../screens/FavoriteScreen';
import Icon from 'react-native-vector-icons/Ionicons';

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primary : null,
  },
  headerTitleStyle: {
    fontFamily: 'open-sans-bold',
  },
  headerBackTitleStyle: {
    fontfamily: 'open-sans',
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
};

const BeersNavigator = createStackNavigator(
  {
    Categories: {
      screen: MainScreen,
      navigationOptions: {
        headerTitle: 'All Beers',
      },
    },
    BeerDetails: BeerDetails,
  },
  {
    // initialRouteName: "Categories",
    defaultNavigationOptions: defaultNavOptions,
  },
);

const RateNavigator = createStackNavigator(
  {
    RatedBeers: RatedBeers,
    BeerDetails: BeerDetails,
  },
  {
    defaultNavigationOptions: defaultNavOptions,
  },
);

const tabScreenConfig = {
    Beers: {
      screen: BeersNavigator,
      navigationOptions: {
        tabBarIcon: (tabInfo) => {
          return (
            <Icon title="Menu" name="beer-outline" color="white" size={25} />
          );
        },
        tabBarColor: Colors.primary,
        tabBarLabel:
          Platform.OS === 'android' ? (
            <Text style={{fontFamily: 'open-sans-bold'}}>Bears</Text>
          ) : (
            'Beers'
          ),
      },
    },
    RatedBeers: {
      screen: RateNavigator,
      navigationOptions: {
        tabBarIcon: (tabInfo) => {
          return (
            <Icon title="Menu" name="star-outline" color="white" size={25} />
          );
        },
        tabBarLabel: 'RatedBeers!',
        tabBarColor: Colors.accent,
        tabBarLabel:
          Platform.OS === 'android' ? (
            <Text style={{fontFamily: 'open-sans-bold'}}>Rated Beers</Text>
          ) : (
            'Rated Beers'
          ),
      },
    },
  },
  BottomNavigator =
    Platform.OS === 'android'
      ? createMaterialBottomTabNavigator(tabScreenConfig, {
          activeColor: 'white',
          shifting: true,
        })
      : createBottomTabNavigator(tabScreenConfig, {
          tabBarOptions: {
            labelStyle: {
              fontFamily: 'open-sans-bold',
            },
            activeTintColor: Colors.accent,
          },
        });

const FavouritesNavigator = createStackNavigator(
  {
    Favourites: FavouritesScreen,
    BeerDetails: BeerDetails,
  },
  {
    navigationOptions: {
      drawerLabel: 'Favorites',
    },
    defaultNavigationOptions: defaultNavOptions,
  },
);

const MainNavigator = createDrawerNavigator(
  {
    Beers: BottomNavigator,
    Favourites: FavouritesNavigator,
  },
  {
    contentOptions: {
      activeTintColor: Colors.danger,
      labelStyle: {
        fontSize: 25,
        padding: 20,
      },
    },
  },
);

export default createAppContainer(MainNavigator);

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import MainScreen from '../screens/MainScreen';
import OtherScreen from '../screens/OtherScreen';
import BeerDetails from '../screens/BeerDetails';
import {Text, Platform} from 'react-native';
import Colors from '../constants/Colors';
import OtherScreen3 from '../screens/OtherScreen3';
import React from 'react';
import OtherScreen4 from '../screens/OtherScreen4';
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
        headerTitle: 'Main Screen',
      },
    },
    CategoryBeers: {
      screen: OtherScreen,
    },
    BeerDetails: BeerDetails,
  },
  {
    // initialRouteName: "Categories",
    defaultNavigationOptions: defaultNavOptions,
  },
);

const FavNavigator = createStackNavigator(
  {
    Favorites: OtherScreen3,
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
    Favorites: {
      screen: FavNavigator,
      navigationOptions: {
        tabBarIcon: (tabInfo) => {
          return (
            <Icon title="Menu" name="star-outline" color="white" size={25} />
          );
        },
        tabBarLabel: 'Favorites!',
        tabBarColor: Colors.accent,
        tabBarLabel:
          Platform.OS === 'android' ? (
            <Text style={{fontFamily: 'open-sans-bold'}}>Favorites</Text>
          ) : (
            'Favorites'
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

const FiltersNavigator = createStackNavigator(
  {
    Filters: OtherScreen4,
  },
  {
    navigationOptions: {
      drawerLabel: 'Search',
    },
    defaultNavigationOptions: defaultNavOptions,
  },
);

const MainNavigator = createDrawerNavigator(
  {
    Beers: BottomNavigator,
    Filters: FiltersNavigator,
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

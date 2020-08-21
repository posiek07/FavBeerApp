import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {
  createDrawerNavigator,
  DrawerNavigatorItems,
} from 'react-navigation-drawer';
import {useDispatch} from 'react-redux';
import * as authActions from '../store/actions/auth';

import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import MainScreen from '../screens/MainScreen';
import BeerDetails from '../screens/BeerDetails';
import {Text, Platform, SafeAreaView, Button, View} from 'react-native';
import Colors from '../constants/Colors';
import RatedBeers from '../screens/RatedBeers';
import React from 'react';

import FavouritesScreen from '../screens/FavoriteScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import AuthScreen from '../screens/AuthScreen';
import StartupScreen from '../screens/StartScreen';
import BeerIngredients from '../screens/BeerIngredients';

const defaultNavOptions = {
  headerTitle: null,
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primary : null,
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
  headerTransparent: true,
};

const BeersNavigator = createStackNavigator(
  {
    Categories: {
      screen: MainScreen,
    },
    BeerDetails: BeerDetails,
    BeerIngredients: BeerIngredients,
    //BeerComments: BeerComments
  },
  {
    defaultNavigationOptions: defaultNavOptions,
  },
);

const RateNavigator = createStackNavigator(
  {
    RatedBeers: RatedBeers,
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
          navigationOptions: {
            drawerLabel: 'Brewdog Collection',
            drawerIcon: (drawerConfig) => (
              <Icon
                title="Menu"
                name="beer-outline"
                color={Colors.primary}
                size={25}
              />
            ),
          },
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
      drawerIcon: (drawerConfig) => (
        <Icon
          title="Menu"
          name="heart-outline"
          color={drawerConfig.tintColor}
          size={25}
        />
      ),
    },
    defaultNavigationOptions: defaultNavOptions,
  },
);

const AuthNavigator = createStackNavigator(
  {
    Auth: AuthScreen,
  },
  {
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
      drawerBackgroundColor: 'red',
      activeTintColor: Colors.primary,
      labelStyle: {
        fontSize: 25,
        padding: 20,
      },
    },
    contentComponent: (props) => {
      const dispatch = useDispatch();
      return (
        <View style={{flex: 1, padding: 20}}>
          <SafeAreaView
            forceInset={{top: 'always', horizontal: 'never'}}
            style={{
              height: '100%',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}>
            <DrawerNavigatorItems {...props} />
            <Button
              title="Logout"
              color={Colors.primary}
              onPress={() => {
                dispatch(authActions.logout());
                // props.navigation.navigate("Auth");
              }}
            />
          </SafeAreaView>
        </View>
      );
    },
  },
);

const StartNavigation = createSwitchNavigator({
  Startup: StartupScreen,
  Auth: AuthNavigator,
  Main: MainNavigator,
});

export default createAppContainer(StartNavigation);

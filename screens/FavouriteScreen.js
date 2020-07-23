import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import CustomHeaderButton from '../components/CustomHeaderButton';
import Icon from 'react-native-vector-icons/Ionicons';

const otherScreen4 = () => {
  return (
    <View>
      <Text>Favorites</Text>
    </View>
  );
};

otherScreen4.navigationOptions = (navData) => {
  return {
    headerTitle: 'Favorites',
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

const styles = StyleSheet.create({});

export default otherScreen4;

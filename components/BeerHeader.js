import React, {useState, useEffect, useCallback} from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import FilterSwitch from '../components/FilterSwitch';
import {useDispatch} from 'react-redux';
import {setFilters} from '../store/actions/actions';
import {Slider, SearchBar} from 'react-native-elements';
import Colors from '../constants/Colors';

const BeerHeader = (props) => {
  const dispatch = useDispatch();
  //   const {navigation} = props;

  const [abv, setAbv] = useState(10);
  const [search, setSearch] = useState('');

  const saveFilters = useCallback(() => {
    const appliedFilters = {
      abv: abv,
      search: search,
    };
    dispatch(setFilters(appliedFilters));
  }, [abv, search, dispatch]);

  updateSearch = (search) => {
    setSearch(search);
    saveFilters();
  };
  // useEffect(() => {
  //   saveFilters();
  // }, []);

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>How strong beer would you like?</Text>
      <View
        style={{
          flex: 1,
          width: 200,
          alignItems: 'stretch',
          justifyContent: 'center',
        }}>
        <Slider
          value={abv}
          onValueChange={(value) => setAbv(value)}
          minimumValue={0}
          maximumValue={15}
          step={0.5}
          thumbTintColor={Colors.primary}
        />
        <Text>Max ABV: {abv}%</Text>
        <Button color={Colors.primary} title="Apply" onPress={saveFilters} />
      </View>
      <SearchBar
        placeholder="Type Here..."
        onChangeText={updateSearch}
        value={search}
        containerStyle={{width: '100%'}}
        lightTheme={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
  },

  title: {
    fontFamily: 'Frijole-Regular',
    fontSize: 22,
    margin: 20,
    textAlign: 'center',
  },
});

export default BeerHeader;

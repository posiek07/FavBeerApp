import axios from 'axios';
import * as actionTypes from './actionTypes';

export const fetchBeersStart = () => {
  return {
    type: actionTypes.FETCH_BEERS_START,
  };
};

export const fetchBeersSuccess = (beers) => {
  return {
    type: actionTypes.FETCH_BEERS_SUCCESS,
    beers: beers,
  };
};

export const fetchBeersFail = (error) => {
  return {
    type: actionTypes.FETCH_BEERS_FAIL,
    error: error,
  };
};

export const setFilters = (filtersSettings) => {
  return {
    type: actionTypes.SET_FILTERS,
    filters: filtersSettings,
  };
};

export const updateRateFav = (beerFavRate) => {
  return async (dispatch) => {
    const response = await fetch(
      `https://rn-shop-app-e9c4d.firebaseio.com/favrate/${beerFavRate.id}.json`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: beerFavRate.id,
          favorite:
            beerFavRate.favorite !== 'undefined' ? beerFavRate.favorite : null,
          rating:
            beerFavRate.rating !== 'undefinded' ? beerFavRate.rating : null,
        }),
      },
    );

    const resData = await response.json();

    const updatedBeerFavRate = {
      id: beerFavRate.id,
      favorite:
        beerFavRate.favorite !== 'undefined' ? beerFavRate.favorite : null,
      rating: beerFavRate.rating !== 'undefinded' ? beerFavRate.rating : null,
    };

    dispatch({
      type: actionTypes.TOGGLE_FAVORITE,
      beerFavRate: updatedBeerFavRate,
    });
  };
};

export const fetchBeers = () => {
  return (dispatch) => {
    dispatch(fetchBeersStart());
    (async () => {
      const [res1, res2, res3, res4, res5, res6] = await Promise.all([
        axios.get(' https://api.punkapi.com/v2/beers?page=1&per_page=80'),
        axios.get('https://api.punkapi.com/v2/beers?page=2&per_page=80'),
        axios.get('https://api.punkapi.com/v2/beers?page=3&per_page=80'),
        axios.get('https://api.punkapi.com/v2/beers?page=4&per_page=80'),
        axios.get('https://api.punkapi.com/v2/beers?page=5&per_page=80'),
        axios.get('https://rn-shop-app-e9c4d.firebaseio.com/favrate.json'),
      ]);

      const favRate = res6.data;

      const favRateArray = Object.values(favRate);

      const fetchedBeers = {
        beers: [
          ...res1.data,
          ...res2.data,
          ...res3.data,
          ...res4.data,
          ...res5.data,
        ],
        favRate: favRateArray ? favRateArray : [],
      };

      dispatch(fetchBeersSuccess(fetchedBeers));
    })();
    // (async () => {
    //   const res = axios
    //     .get('https://rn-shop-app-e9c4d.firebaseio.com/favrate.json')
    //     .then((res) => console.log(res.data));

    //   // dispatch(fetchBeersSuccess(fetchedBeers));
    // })();
  };
};

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
  return {type: actionTypes.TOGGLE_FAVORITE, beerFavRate: beerFavRate};
};

export const fetchBeers = () => {
  return (dispatch) => {
    dispatch(fetchBeersStart());
    axios
      .get(' https://api.punkapi.com/v2/beers?page=1&per_page=80')
      .then((res) => {
        dispatch(fetchBeersSuccess(res.data));
      })
      .catch((err) => {
        dispatch(fetchBeersFail(err));
      });
  };
};

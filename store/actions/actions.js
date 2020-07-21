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

export const fetchBeers = () => {
  return (dispatch) => {
    dispatch(fetchBeersStart());
    axios
      .get('https://api.punkapi.com/v2/beers')
      .then((res) => {
        dispatch(fetchBeersSuccess(res.data));
      })
      .catch((err) => {
        dispatch(fetchBeersFail(err));
      });
  };
};

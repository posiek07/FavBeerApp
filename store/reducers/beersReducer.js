import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../shared/utility';

const initialState = {
  beers: [],
  loading: false,
};

const fetchBeersStart = (state, action) => {
  return updateObject(state, {loading: true});
};

const fetchBeersSuccess = (state, action) => {
  return updateObject(state, {loading: false, beers: action.beers});
};

const fetchBeersFail = (state, action) => {
  return updateObject(state, {loading: false});
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_BEERS_START:
      return fetchBeersStart(state, action);
    case actionTypes.FETCH_BEERS_SUCCESS:
      return fetchBeersSuccess(state, action);
    case actionTypes.FETCH_BEERS_FAIL:
      return fetchBeersFail(state, action);
    default:
      return state;
  }
};

export default reducer;

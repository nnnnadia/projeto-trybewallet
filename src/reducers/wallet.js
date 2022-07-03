import {
  REQUEST_CURRENCIES_INITIALS,
  RECEIVE_CURRENCIES_INITIALS,
} from '../actions/actionTypes';

const INITIAL_STATE = {
  currencies: [],
  isFetching: false,
};

const wallet = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case REQUEST_CURRENCIES_INITIALS:
    return {
      ...state,
      isFetching: true,
    };
  case RECEIVE_CURRENCIES_INITIALS:
    return {
      currencies: payload.currencies,
      isFetching: false,
    };
  default:
    return state;
  }
};

export default wallet;

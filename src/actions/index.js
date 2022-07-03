import {
  SAVE_USER_EMAIL,
  REQUEST_CURRENCIES_INITIALS,
  RECEIVE_CURRENCIES_INITIALS,
} from './actionTypes';

export const actSaveUserEmail = (email) => ({
  type: SAVE_USER_EMAIL,
  payload: {
    email,
  },
});

const actRequestCurrenciesInitials = () => ({
  type: REQUEST_CURRENCIES_INITIALS,
});

const actReceiveCurrenciesInitials = (currencies) => ({
  type: RECEIVE_CURRENCIES_INITIALS,
  payload: {
    currencies,
  },
});

export const fetchCurrenciesInitials = () => async (dispatch) => {
  dispatch(actRequestCurrenciesInitials());
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const rawCurrencies = await response.json();
  const currencies = Object.keys(rawCurrencies)
    .filter((currCode) => currCode !== 'USDT');
  return dispatch(actReceiveCurrenciesInitials(currencies));
};

import {
  SAVE_USER_EMAIL,
  REQUEST_CURRENCIES_INITIALS,
  RECEIVE_CURRENCIES_INITIALS,
  SAVE_EXPENSE,
  REQUEST_EXCHANGE_RATES,
  RECEIVE_EXCHANGE_RATES,
  UPDATE_TOTAL_EXPENSES,
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

export const actSaveExpense = (expense) => ({
  type: SAVE_EXPENSE,
  payload: {
    expense,
  },
});

const actRequestExchangeRates = () => ({
  type: REQUEST_EXCHANGE_RATES,
});

const actReceiveExchangeRates = (exchangeRates) => ({
  type: RECEIVE_EXCHANGE_RATES,
  payload: {
    exchangeRates,
  },
});

const actUpdateTotalExpenses = () => ({
  type: UPDATE_TOTAL_EXPENSES,
});

export const fetchExchangeRates = () => async (dispatch) => {
  dispatch(actRequestExchangeRates());
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const exchangeRates = await response.json();
  dispatch(actReceiveExchangeRates(exchangeRates));
  return dispatch(actUpdateTotalExpenses());
};

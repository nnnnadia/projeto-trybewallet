import {
  REQUEST_CURRENCIES_INITIALS,
  RECEIVE_CURRENCIES_INITIALS,
  SAVE_EXPENSE,
  RECEIVE_EXCHANGE_RATES,
  UPDATE_TOTAL_EXPENSES,
} from '../actions/actionTypes';

const INITIAL_STATE = {
  currencies: [],
  isFetching: false,
  expenses: [],
  currentExchangeRate: {},
  totalExpenses: 0,
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
      ...state,
      currencies: payload.currencies,
      isFetching: false,
    };
  case SAVE_EXPENSE:
    return {
      ...state,
      expenses: [
        ...state.expenses,
        payload.expense,
      ],
    };
  case RECEIVE_EXCHANGE_RATES:
    return {
      ...state,
      expenses: [
        ...state.expenses
          .filter((expense) => expense.id !== state.expenses.length - 1),
        {
          ...state.expenses
            .find((expense) => expense.id === state.expenses.length - 1),
          exchangeRates: payload.exchangeRates,
        },
      ],
    };
  case UPDATE_TOTAL_EXPENSES: {
    const total = state.expenses
      .map((expObj) => expObj.value * expObj.exchangeRates[expObj.currency].ask)
      .reduce((acc, curr) => acc + curr);
    // const roundedTotal = (Math.round(rawTotal * 100) / 100).toFixed(2);
    return {
      ...state,
      totalExpenses: total.toFixed(2),
    };
  }
  default:
    return state;
  }
};

export default wallet;

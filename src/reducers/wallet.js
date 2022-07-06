import {
  REQUEST_CURRENCIES_INITIALS,
  RECEIVE_CURRENCIES_INITIALS,
  SAVE_EXPENSE,
  RECEIVE_EXCHANGE_RATES,
  UPDATE_TOTAL_EXPENSES,
  DELETE_EXPENSE,
} from '../actions/actionTypes';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  currentExchangeRate: {},
  totalExpenses: 0,
};

const wallet = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case REQUEST_CURRENCIES_INITIALS:
    return {
      ...state,
    };
  case RECEIVE_CURRENCIES_INITIALS:
    return {
      ...state,
      currencies: payload.currencies,
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
    const total = state.expenses.length > 0 ? state.expenses
      .map((expObj) => expObj.value * expObj.exchangeRates[expObj.currency].ask)
      .reduce((acc, curr) => acc + curr)
      : 0;
    return {
      ...state,
      totalExpenses: total.toFixed(2),
    };
  }
  case DELETE_EXPENSE: {
    return {
      ...state,
      expenses: state.expenses.filter((expense) => expense.id !== payload.id),
    };
  }
  default:
    return state;
  }
};

export default wallet;

import SAVE_USER_EMAIL from '../actions/actionTypes';

const INITIAL_STATE = {
  email: '',
};

const user = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case SAVE_USER_EMAIL:
    return {
      email: payload.email,
    };
  default:
    return state;
  }
};

export default user;

import SAVE_USER_EMAIL from './actionTypes';

const actSaveUserEmail = (email) => ({
  type: SAVE_USER_EMAIL,
  payload: {
    email,
  },
});

export default actSaveUserEmail;

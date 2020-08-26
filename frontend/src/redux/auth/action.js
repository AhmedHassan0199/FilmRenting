import axios from 'axios';
import { ACCOUNT_SERVICE_URI } from '../../utils';

export const types = {
  REGISTER: 'REGISTER',
  REGISTER_FAILURE: 'REGISTER_FAILURE',
};

export const register = (values) => async (dispatch) => {
  console.log('values', values);

  axios
    .post(`${ACCOUNT_SERVICE_URI}/users/register`, values)
    .then((response) => dispatch({ type: types.REGISTER, payload: response.data }))
    .catch((err) => dispatch({ type: types.REGISTER_FAILURE, payload: 'Something went wrong!' }));
};

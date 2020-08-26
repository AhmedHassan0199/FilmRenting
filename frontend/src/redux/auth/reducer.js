import { types } from './action';

const initState = {
  isAuthenticated: false,
  user: {},
  register: {
    data: null,
    successMsg: null,
    errorMsg: null,
  },
};

export default function auth(state = initState, action) {
  switch (action.type) {
    default:
      return state;
  }
}

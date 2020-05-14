import * as constants from './constants';

export default {
  [constants.SET_ACCESS_TOKEN](state, accessToken) {
    state.accessToken = accessToken;
    localStorage.setItem('accessToken', accessToken);
  },
  [constants.REMOVE_ACCESS_TOKEN](state) {
    state.accessToken = null;
    localStorage.removeItem('accessToken');
  },
  [constants.SET_USER](state, data) {
    state.user = data;
  },
  [constants.SET_LOADING](state, isLoading) {
    state.isLoading = isLoading;
  }
};

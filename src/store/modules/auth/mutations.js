export default {
  setUser(state, payload) {
    state.userDetails = payload;
    // state.didAutoLogout = false;
  },
  authenticationStatus(state, payload) {
    state.isAuthenticated = payload;
  },
  loginError(state, payload) {
    state.loginError = payload.loginError;
    state.loginErrorMessage = payload.loginErrorMessage;
  },
  // setAutoLogout(state) {
  //   state.didAutoLogout = true;
  // },
};

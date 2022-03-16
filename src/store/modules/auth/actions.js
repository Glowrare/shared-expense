export default {
  async login(context, payload) {
    context.commit('loginError', {
      loginError: false,
      loginErrorMessage: '',
    });

    const response = await fetch(`api/users/${payload.username}`);
    const responseData = await response.json();
    if (response.ok && payload.password === responseData.password) {
      context.commit('authenticationStatus', true);
      context.commit('setUser', responseData);
    } else {
      context.commit('loginError', {
        loginError: true,
        loginErrorMessage: 'Incorrect details',
      });
    }
    if (!response.ok) {
      context.commit('loginError', {
        loginError: true,
        loginErrorMessage: 'User does not exist',
      });
      const error = new Error(responseData.message || 'User does not exist');
      throw error;
    }
  },
  // logout(context) {
  //   localStorage.removeItem("token");
  //   localStorage.removeItem("userId");
  //   localStorage.removeItem("tokenExpiration");

  //   clearTimeout(timer);

  //   context.commit("setUser", {
  //     userId: null,
  //     token: null,
  //   });
  // },
};

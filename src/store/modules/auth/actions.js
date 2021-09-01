export default {
  // async login(context, payload) {
  async login(context, payload) {
    // const response = await fetch("http://localhost:3000/users", {
    //   method: "POST",
    //   headers: {
    //     "Content-type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     username: payload.username,
    //     password: payload.password,
    //     // username: "aladejubeloea",
    //     // password: "passwordSample@1",
    //     // returnSecureToken: true
    //   }),
    // });

    context.commit("loginError", {
      loginError: false,
      loginErrorMessage: "",
    });

    const response = await fetch(
      `http://localhost:3000/users/${payload.username}`
    );
    const responseData = await response.json();
    console.log(responseData);
    if (response.ok && payload.password === responseData.password) {
      console.log("Successful Login");
      context.commit("authenticationStatus", true);
      context.commit("setUser", responseData);
    } else {
      console.log("Incorrect details");
      context.commit("loginError", {
        loginError: true,
        loginErrorMessage: "Incorrect details",
      });
    }
    if (!response.ok) {
      context.commit("loginError", {
        loginError: true,
        loginErrorMessage: "User does not exist",
      });
      const error = new Error(responseData.message || "User does not exist");
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
  // }
};

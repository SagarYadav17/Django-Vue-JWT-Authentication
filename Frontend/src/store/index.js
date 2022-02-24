import { createStore } from "vuex";

export default createStore({
  state: {
    authToken: "",
    refreshToken: "",
    username: "",
    isAuthenticated: false,
  },
  mutations: {
    initializeStore(state) {
      // Check if the token is in the local storage
      if (localStorage.getItem("authToken")) {
        state.authToken = localStorage.getItem("authToken");

        state.username = JSON.parse(
          window.atob(state.authToken.split(".")[1])
        ).username;

        state.isAuthenticated = true;
      } else {
        state.authToken = "";
        state.refreshToken = "";
        state.username = "";
        state.isAuthenticated = false;
      }

      if (localStorage.getItem("refreshToken")) {
        state.refreshToken = localStorage.getItem("refreshToken");
      } else {
        state.refreshToken = "";
      }
    },

    setAuthToken(state, authToken, refreshToken) {
      state.authToken = authToken;
      state.refreshToken = refreshToken;

      var decodedToken = JSON.parse(window.atob(authToken.split(".")[1]));
      state.username = decodedToken.username;

      localStorage.setItem("authToken", "Bearer " + authToken);
      localStorage.setItem("refreshToken", refreshToken);
      state.isAuthenticated = true;
    },

    removeAuthToken(state) {
      state.authToken = "";
      state.username = null;
      localStorage.removeItem("authToken");
      state.isAuthenticated = false;
    },

    setRefreshToken(state, refreshToken) {
      state.refreshToken = refreshToken;
      localStorage.setItem("refreshToken", refreshToken);
    },

    removeRefreshToken(state) {
      state.refreshToken = "";
      localStorage.removeItem("refreshToken");
    },
  },
  actions: {},
  modules: {},
});

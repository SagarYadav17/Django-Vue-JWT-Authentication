<template>
  <div class="w-full max-w-xs">
    <form
      class="bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 mb-4"
      method="post"
      @submit.prevent="submitForm"
    >
      <div class="mb-4">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="username"
        >
          Username
        </label>
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-600"
          id="username"
          type="text"
          required
          placeholder="Username"
          v-model="username"
        />
      </div>
      <div class="mb-6">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="password"
        >
          Password
        </label>
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-600"
          id="password"
          type="password"
          required
          placeholder="******************"
          v-model="password"
        />
        <div v-for="error in errors" v-bind:key="error">
          <p class="text-red-500 text-xs italic">{{ error.detail }}</p>
        </div>
      </div>
      <div class="flex items-center justify-between">
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Sign In
        </button>
        <a
          class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
          href="/signup"
        >
          Wanna sign up?
        </a>
      </div>
    </form>
    <p class="text-center text-gray-300 text-xs">
      Sagar Yadav | No rights reserved.
    </p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
      errors: [],
    };
  },
  methods: {
    async submitForm() {
      const formData = {
        username: this.username,
        password: this.password,
      };

      await axios
        .post("/auth/login/", formData)
        .then((response) => {
          const authToken = response.data.access;
          const refreshToken = response.data.refresh;

          this.$store.commit("setAuthToken", authToken);
          this.$store.commit("setRefreshToken", refreshToken);

          axios.defaults.headers.common["Authorization"] =
            "Bearer " + authToken;

          this.$router.push("/");
        })
        .catch((error) => {
          this.errors.pop();
          this.errors.push(error.response.data);
        });
    },
  },
  beforeCreate() {
    // Remove Tokens from local storage
    this.$store.commit("removeAuthToken");
    this.$store.commit("removeRefreshToken");
  },
};
</script>

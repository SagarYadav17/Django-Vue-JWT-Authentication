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
          placeholder="someone"
          v-model="username"
        />
        <p class="text-red-500 text-xs italic">
          {{ errors?.username?.toString() }}
        </p>
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
          E-mail
        </label>
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-600"
          id="email"
          type="email"
          required
          placeholder="someone@mail.com"
          v-model="email"
        />
        <p class="text-red-500 text-xs italic">
          {{ errors?.email?.toString() }}
        </p>
      </div>
      <div class="mb-4">
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
          placeholder="someone@1234"
          v-model="password"
        />
      </div>
      <div class="mb-6">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="password2"
        >
          Repeat Password
        </label>
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-600"
          id="password"
          type="password"
          required
          placeholder="someone@1234"
          v-model="password2"
        />
        <p class="text-red-500 text-xs italic">
          {{ errors?.password?.toString() }}
        </p>
      </div>
      <div class="flex items-center justify-between">
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Sign up
        </button>
        <a
          class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
          href="/login"
        >
          have an account?
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
      errors: null,
    };
  },
  methods: {
    async submitForm() {
      const formData = {
        username: this.username,
        email: this.email,
        password: this.password,
        password2: this.password2,
      };

      await axios
        .post("/auth/register/", formData)
        .then((response) => {
          console.log(response);
          this.$router.push("/login");
        })
        .catch((error) => {
          this.errors = error.response.data;
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

<template>
  <div class="home">
    <p class="text-white text-2xl">Hello! {{ this.$store.state.username }}</p>
    <a class="text-blue-500 text-center" href="/logout">logout here</a>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {},
  beforeCreate() {
    if (!this.$store.state.isAuthenticated) {
      this.$router.push("/login");
    }
  },
};
</script>

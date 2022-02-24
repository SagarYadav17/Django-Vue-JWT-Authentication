<template>
  <div class="flex flex-col items-center justify-center h-screen bg-gray-800">
    <router-view />
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  beforeCreate() {
    this.$store.commit("initializeStore");
  },
};
</script>

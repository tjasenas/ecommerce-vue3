<template>
  <header class="header">
    <div class="container">
      <div class="logo">
        <router-link to="/" class="logo-link"><h1>Unite Demo</h1></router-link>
        <p class="logo-text">Page made with Vue.js</p>
      </div>
      <the-search></the-search>
    </div>
  </header>
</template>

<script>
import TheSearch from "./TheSearch.vue";

export default {
  components: {
    TheSearch,
  },
};
</script>

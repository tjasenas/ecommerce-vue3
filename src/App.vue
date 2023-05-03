<template>

    <the-header></the-header>
    <the-navigation></the-navigation>
    <main class="container">
      <router-view />
    </main>
    <the-footer></the-footer>

</template>

<script>
import TheHeader from "./components/TheHeader.vue";
import TheFooter from "./components/TheFooter.vue";
import TheNavigation from "./components/TheNavigation.vue";
export default {
  components: { TheHeader, TheNavigation, TheFooter },
};
</script>



<template>
  <nav class="nav">
    <div class="container">
      <ul class="main-navi">
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/blog">Blog</router-link></li>
        <li><router-link to="/gallery">Gallery</router-link></li>
        <li><router-link to="/about">About</router-link></li>
        <li><router-link to="/contact">Contact</router-link></li>
      </ul>
      <teleport to="body">
        <div v-if="isOpen" class="overlay" @click="ToggleNavi"></div>
        <ul class="mobile-navi" :class="{ active: isOpen }">
          <li><router-link @click="ToggleNavi" to="/">Home</router-link></li>
          <li><router-link @click="ToggleNavi" to="/blog">Blog</router-link></li>
          <li><router-link @click="ToggleNavi" to="/gallery">Gallery</router-link></li>
          <li><router-link @click="ToggleNavi" to="/about">About</router-link></li>
          <li><router-link @click="ToggleNavi" to="/contact">Contact</router-link></li>
          <li class="close-navi" @click="ToggleNavi" :class="{ active: isOpen }"></li>
        </ul>
      </teleport>
      <div class="toggle-navi" @click="ToggleNavi" :class="{ active: isOpen }">
        <div class="line"></div>
        <div class="line"></div>
        <div class="line"></div>
      </div>
      <the-mini-cart></the-mini-cart>
    </div>
  </nav>
</template>

<script>
import TheMiniCart from "./TheMiniCart.vue";
export default {
  components: {
    TheMiniCart,
  },
  data() {
    return {
      isOpen: false,
      isCartOpen: false,
    };
  },
  methods: {
    ToggleNavi() {
      this.isOpen = !this.isOpen;
    },
    close() {
      this.isOpen = !this.isOpen;
    },
    toggleCart() {
      this.isCartOpen = !this.isCartOpen;
    },
  },
};
</script>

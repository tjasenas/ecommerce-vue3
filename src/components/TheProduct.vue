<template>
  <li class="product">
    <router-link :to="`/product/${product.id}`">
      <img class="product__img" :src="product.thumbnail" alt="" />
    </router-link>
    <router-link :to="`/product/${product.id}`">
      <h3 class="product__title">{{ product.title }}</h3>
    </router-link>
    <div class="product__rating"></div>
    <p class="product__price">{{ product.price }}eur</p>
    <button class="product__btn regular-btn" @click="addToCart($event, product)">Add to cart</button>
  </li>
</template>

<script>
export default {
  props: ["product"],

  methods: {
    addToCart(event, product) {
      this.$store.dispatch("cartAction", product);
      event.target.textContent = "Added to cart";
      event.target.classList.add("added-to-cart");

      setTimeout(function () {
        event.target.textContent = "Add to cart";
        event.target.classList.remove("added-to-cart");
      }, 2000);
    },
  },
};
</script>

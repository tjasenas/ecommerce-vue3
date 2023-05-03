<template v-if="product.length > 0">
  <div class="single-product">
    <h2 class="single-product__title">{{ product.title }}</h2>
    <div class="single-product__img">
      <img :src="product.thumbnail" alt="" />
    </div>

    <div class="summary">
      <h2 class="summary__title">{{ product.title }}</h2>
      <p class="summary__price">{{ product.price }}eur</p>
      <button class="product__btn regular-btn" @click="addToCart($event, product)">Add to cart</button>
    </div>
  </div>

  <h3>Description</h3>
  <p>{{ product.description }}</p>
</template>

<script>
export default {
  data() {
    return {
      product: [],
    };
  },

  computed: {
    storeProduct() {
      return this.$store.getters.getProducts;
    },
  },

  watch: {
    storeProduct(newProduct) {
      const getProductPath = this.$route.params.id;
      this.product = newProduct.find((item) => item.id === +getProductPath);
    },
  },

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
  created() {
    if (this.$store.getters.getProducts.length === 0) {
      this.$store.dispatch("fetchProducts");
    } else {
      const getProductPath = this.$route.params.id;
      this.product = this.storeProduct.find((item) => item.id === +getProductPath);
    }
    

    if (localStorage.getItem("cart")) {
      const cart = JSON.parse(localStorage.getItem("cart"));
      this.$store.dispatch("fetchCart", cart);
    }
  },
};
</script>

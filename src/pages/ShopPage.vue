<template>
  <h2 class="page-title">Shop</h2>

  <the-toolbar :active-page="activePage" :items-per-page="itemsPerPage" @change-sorting="changeSorting" />

  <p v-if="error === null && this.sortedProducts.length === 0">Loading products</p>
  <p v-else-if="error !== null">{{ error }}</p>
  <ul v-else class="products">
    <the-product v-for="product in sortedProducts" :key="product.id" :product="product" />
  </ul>

  <the-pagination :pages="pages" :active-page="activePage" @update-page="updateContent" />
</template>

<script>
import TheProduct from "../components/TheProduct.vue";
import ThePagination from "../components/ThePagination.vue";
import TheToolbar from "../components/TheToolbar.vue";

export default {
  components: {
    TheProduct,
    ThePagination,
    TheToolbar,
  },

  data() {
    return {
      sortBy: "none",
      sortedProducts: [],
      activePage: 0,
      itemsPerPage: 12,
      error: null,
    };
  },

  computed: {
    storeProducts() {
      return this.$store.getters.getProducts;
    },
    pages() {
      return this.$store.getters.getPages;
    },
    storeError() {
      return this.$store.getters.getError;
    },
  },

  watch: {
    $route() {
      this.updateContent();
    },
    storeProducts() {
      this.updateContent();
    },
    storeError() {
      this.error = this.storeError;
    },
  },

  methods: {
    changeSorting(sortBy) {
      this.sortBy = sortBy;
      this.updateContent();
    },

    updateContent() {
      let start = 0;
      this.activePage = 1;

      if (this.$route.params.id) {
        this.activePage = +this.$route.params.id;
        start = (this.$route.params.id - 1) * this.itemsPerPage;
      }
      const end = +this.$route.params.id === this.pages ? this.$store.getters.getProducts.length : start + this.itemsPerPage;

      if (this.sortBy === "lowToHeight") {
        this.sortedProducts = [...this.storeProducts].sort((a, b) => (a.price > b.price ? 1 : -1)).slice(start, end);
      } else if (this.sortBy === "heightToLow") {
        this.sortedProducts = [...this.storeProducts].sort((a, b) => (a.price < b.price ? 1 : -1)).slice(start, end);
      } else {
        this.sortedProducts = [...this.storeProducts].slice(start, end);
      }
    },
  },

  created() {
    if (this.$store.getters.getProducts.length === 0) {
      this.$store.dispatch("fetchProducts");
    } else {
      this.updateContent();
    }
    if (localStorage.getItem("cart")) {
      const cart = JSON.parse(localStorage.getItem("cart"));
      this.$store.dispatch("fetchCart", cart);
    }
  },
};
</script>

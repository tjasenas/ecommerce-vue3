<template>
  <div class="search-block">
    <input class="search-input" type="text" v-model="input" placeholder="Search products..." />

    <div class="search-results" v-if="filteredItems.length > 0 && input.length > 0">
      <div class="inner">
        <div class="item" v-for="item in filteredItems" :key="item.id">
          <router-link @click="resetForm" :to="'/product/' + item.id">{{ item.title }}</router-link>
        </div>
      </div>
    </div>

    <div class="search-results" v-if="filteredItems.length === 0 && input.length > 0">
      <p>No items found</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: "",
      filteredItems: [],
    };
  },

  computed: {
    products() {
      return this.$store.getters.getProducts;
    },
  },
  watch: {
    input(newText) {
      if (newText.length > 0) {
        this.filteredItems = this.products.filter((item) => item.title.toLowerCase().includes(newText.toLowerCase()));
      } else {
        this.filteredItems = [];
      }
    },
  },
  methods: {
    resetForm() {
      this.filteredItems = [];
      this.input = "";
    },
  },
};
</script>

<style scoped>
.search-block {
  position: relative;
  max-width: 350px;
  width: 100%;
}
.search-input {
  width: 100%;
}
.search-results {
  width: 100%;
  overflow: auto;
  position: absolute;
  top: 110%;
  max-height: 300px;
  background: #fff;
  z-index: 999;
  padding: 1rem 1.5rem;
  border: 2px solid #55397e;
  border-radius: 0.3rem;
}
.search-results .inner {
  overflow-y: auto;
}
.search-results .item a {
  padding: 0.3rem 0;
  display: block;
  border-bottom: 1px dashed #ccc;
  color: #4c4a48;
}
.search-results .item a:hover {
  color: #55397e;
  border-bottom: 1px dashed #55397e;
}
</style>

<template>
  <div class="page-toolbar">
    <div class="displayed-items">Showing {{ resluts }} of {{ storeProducts.length }} results</div>
    <select name="sort" v-model="sortBy" id="sort-items">
      <option value="none">Default sorting</option>
      <option value="lowToHeight">Sort by price: low to high</option>
      <option value="heightToLow">Sort by price: high to low</option>
    </select>
  </div>
</template>

<script>
export default {
  props: ["activePage", "itemsPerPage"],
  data() {
    return {
      sortBy: "none",
    };
  },
  watch: {
    sortBy(newSorting) {
      this.$emit("changeSorting", newSorting);
    },
  },

  computed: {
    storeProducts() {
      return this.$store.getters.getProducts;
    },
    resluts() {
      const productsQty = this.storeProducts.length;
      const calcNrFrom = (this.activePage - 1) * this.itemsPerPage;
      const nrFrom = calcNrFrom === 0 ? 1 : calcNrFrom;
      const calcNrTo = this.activePage * this.itemsPerPage;
      const nrTo = productsQty < calcNrTo ? productsQty : calcNrTo;

      return `${nrFrom} - ${nrTo}`;
    },
  },
};
</script>

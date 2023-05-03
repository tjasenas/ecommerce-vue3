<template>
  <ul class="pagination">
    <li v-for="page in pages" :key="page" @click="$emit('updatePage')">
      <router-link v-if="page !== activePage" :to="`/page/${page}`">{{ page }}</router-link>
      <span v-else class="active">{{ page }}</span>
    </li>
  </ul>
</template>

<script>
export default {
  props: ["pages", "activePage"],
};
</script>

<template>
  <div class="mini-cart" :class="{ active: isCartOpen }">
    <div class="mini-cart__totals" @click="toggleCart">{{ itemsQty }} items - {{ cartTotals }}eur</div>
    <div class="mini-cart-dropdown" :class="{ active: isCartOpen }">
      <div v-if="itemsQty > 0" class="mini-cart__items">
        <div class="cart-item" v-for="item in cart.cartItems" :key="item.id">
          <img class="cart-item__img" :src="item.thumbnail" alt="" />
          <div class="cart-item__desc">
            <h5>{{ item.title }}</h5>
            <div class="item-quantity">kiekis: {{ item.qty }}</div>
            <div class="item-quantity">Price: {{ item.price }}eur</div>
          </div>
          <button class="remove-btn" @click="romoveItem(item)">Remove</button>
        </div>
      </div>
      <p v-else class="cart-empty">Cart is empty</p>
      <div v-if="itemsQty > 0" class="cart-btn">
        <router-link @click="toggleCart" to="/cart">Cart</router-link>
        <router-link @click="toggleCart" to="/checkout">Checkout</router-link>
      </div>
    </div>
  </div>
  <teleport v-if="isCartOpen" to="body">
    <div class="overlay" @click="toggleCart"></div>
  </teleport>
</template>

<script>
export default {
  data() {
    return {
      isCartOpen: false,
    };
  },
  computed: {
    cart() {
      return this.$store.getters.getCart;
    },
    itemsQty() {
      return this.$store.getters.getItemsQty;
    },
    cartTotals() {
      return this.$store.getters.getCartTotal;
    },
  },
  methods: {
    ToggleNavi() {
      this.isOpen = !this.isOpen;
      console.log(this.cart());
    },
    close() {
      this.isOpen = !this.isOpen;
    },
    toggleCart() {
      this.isCartOpen = !this.isCartOpen;
    },
    romoveItem(item) {
      this.$store.dispatch("removeCartItem", item);
    },
  },
};
</script>

import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: {
    products: [],
    cart: { cartItems: [], itemsQty: 0, total: 0 },
    itemsPerPage: 12,
    pages: 0,
    error: null,
  },
  getters: {
    getProducts(state) {
      return state.products;
    },
    getCart(state) {
      return state.cart;
    },
    getItemsQty(state) {
      return state.cart.itemsQty;
    },
    getCartTotal(state) {
      return state.cart.total;
    },
    getPages(state) {
      return state.pages;
    },
    getError(state) {
      return state.error;
    },
  },
  mutations: {
    addToCart(state, payload) {
      console.log(payload);
      payload.qty = 1;
      state.cart.total = +(state.cart.total + payload.price).toFixed(2);
      state.cart.cartItems.push(payload);
      state.cart.itemsQty += 1;
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },

    repeatedItem(state, payload) {
      const item = state.cart.cartItems.find((e) => e.id === payload.id);
      state.cart.total = +(state.cart.total + item.price).toFixed(2);
      item.qty += 1;
      state.cart.itemsQty += 1;
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },

    removeCartItem(state, payload) {
      state.cart.cartItems = state.cart.cartItems.filter((e) => e.id !== payload.id);
      state.cart.total = +(state.cart.total - payload.price * payload.qty).toFixed(2);
      state.cart.itemsQty -= payload.qty;
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },

    AddProducts(state, payload) {
      state.products = payload;
    },
    AddPages(state, payload) {
      state.pages = payload;
    },
    addError(state, payload) {
      state.error = payload;
    },
    updateCart(state, payload) {
      state.cart = payload;
    },
  },
  actions: {
    cartAction(context, payload) {
      const cartItems = context.state.cart.cartItems;
      const cartHasItem = cartItems.find((e) => e.id === payload.id);

      if (cartHasItem) {
        context.commit("repeatedItem", payload);
        return;
      }

      context.commit("addToCart", payload);
    },

    removeCartItem(context, payload) {
      context.commit("removeCartItem", payload);
    },

    fetchProducts(context) {
      axios
        .get("https://dummyjson.com/products?limit=100")
        .then((res) => {
          const pages = Math.ceil(res.data.products.length / context.state.itemsPerPage);
          context.commit("AddProducts", res.data.products);
          context.commit("AddPages", pages);
        })
        .catch((error) => {
          // console.log(error);
          const errorText = error.message + ". Please try again later";
          context.commit("addError", errorText);
        });
    },

    fetchCart(context, payload) {
      context.commit("updateCart", payload);
    },
  },
  modules: {},
});

import { createRouter, createWebHistory} from "vue-router";
import ShopPage from "../pages/ShopPage.vue";
import BlogPage from "../pages/BlogPage.vue";
import GalleryPage from "../pages/GalleryPage.vue";
import AboutPage from "../pages/AboutPage.vue";
import ContactPage from "../pages/ContactPage.vue";
import ShopCart from "../pages/cart/ShopCart.vue";
import SingleProduct from "../pages/product/SingleProduct.vue";
// import PaginationPage from "../pages/PaginationPage.vue"; 
import NotFound from "../pages/NotFound.vue"; 

const routes = [
  {
    path: "/",
    name: "Home",
    component: ShopPage,
  },
  {
    path: "/product/:id",
    component: SingleProduct,
  },
  {
    path: "/blog",
    name: "Blog",
    component: BlogPage,
  },
  {
    path: "/gallery",
    name: "Gallery",
    component: GalleryPage,
  },
  {
    path: "/about",
    name: "About",
    component: AboutPage,
  },
  {
    path: "/contact",
    name: "Contact",
    component: ContactPage,
  },
  {
    path: "/cart",
    name: "Cart",
    component: ShopCart,
  },
  {
    path: "/page/:id",
    name: "Page",
    component: ShopPage,
  },
  {
    path: "/:notFound(.*)",
    name: "Not Found",
    component: NotFound,
  },
];



const router = createRouter({
  history: createWebHistory('/ecommerce-vue3/'),
  // base: "/ecommerce-vue3/",
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
});



export default router;

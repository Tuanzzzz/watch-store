import { createRouter, createWebHistory } from 'vue-router';
import HomeWatch from '../components/Home-watch.vue';
import ProductDetail from '../components/product-detail.vue';
import ProductList from '../components/product-list.vue';
import Cart from '../components/Cart.vue';
import Login from '@/components/Login.vue';
import BlogList from '@/components/blog-list.vue';
const routes = [
  { path: '/', component: HomeWatch },
  { path: '/product', component: ProductDetail },
  { path: '/productList', component: ProductList },
  { path: '/cart', component: Cart },
  { path: '/login', component: Login },
  { path: '/blogList', component: BlogList }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
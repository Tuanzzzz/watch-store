import { createRouter, createWebHistory } from 'vue-router';
import HomeWatch from '../components/Home-watch.vue';
import ProductDetail from '../components/product-detail.vue';
import ProductList from '../components/product-list.vue';
import Cart from '../components/Cart.vue';
import Login from '@/components/Login.vue';
import BlogList from '@/components/blog-list.vue';
import Admin from '@/components/admin/HomeAdmin.vue';
import ManageProduct from '@/components/admin/Manage-product.vue';
import ManageBlogs from '@/components/admin/Manage-blogs.vue';
import ManageUsers from '@/components/admin/Manage-users.vue';
const routes = [
  { path: '/', component: HomeWatch },
  { path: '/product', component: ProductDetail },
  { path: '/productList', component: ProductList },
  { path: '/cart', component: Cart },
  { path: '/login', component: Login },
  { path: '/blogList', component: BlogList },
  { path: '/admin' ,component: Admin,
    children:[
      { path: '/admin/product' ,component: ManageProduct},
      { path: '/admin/blogs' ,component: ManageBlogs},
      { path: '/admin/users' ,component: ManageUsers},
    ]
  },
  

];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
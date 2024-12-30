import { createRouter, createWebHistory } from 'vue-router';
import HomeWatch from '@/components/Home-watch.vue';
import ProductDetail from '@/components/product-detail.vue';
import ProductList from '@/components/product-list.vue';
import Cart from '@/components/Cart.vue';
import Login from '@/components/Login.vue';
import BlogList from '@/components/blog-list.vue';
import Admin from '@/components/admin/HomeAdmin.vue';
import blogDetail from '@/components/blog-detail.vue';

import ManageProduct from '@/components/admin/Manage-product.vue';
import ManageBlogs from '@/components/admin/Manage-blogs.vue';
import ManageUsers from '@/components/admin/Manage-users.vue';
import ManageCategories from '@/components/admin/Manage-category.vue';
import ManageOrder from '@/components/admin/Manage-order.vue';
import ManageComment from '@/components/admin/Manage-comment.vue';
import axios from 'axios';

const routes = [
  { path: '/', component: HomeWatch
    
  },
  { path: '/product', component: ProductDetail },
  { path: '/productList', component: ProductList },
  { path: '/cart', component: Cart },
  { path: '/blogList', component: BlogList },
  {
    path: '/products/:id',
    name: 'ProductDetail',
    component: ProductDetail,
    props: true, // Truyền id dưới dạng props
  },
  {
    path: '/blogs/:id',
    name: 'blogDetail',
    component: blogDetail,
    props: true, // Truyền id dưới dạng props
  },

  { path: '/login', component: Login },
  { path: '/user', component: HomeWatch,
    children: [
      { path: '/user/product', component: ProductDetail },
      { path: '/user/productList', component: ProductList },
      { path: '/user/cart', component: Cart },
      { path: '/user/blogList', component: BlogList },
    ],
    beforeEnter: (to, from, next) => {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Bạn phải đăng nhập để truy cập!');
        return next('/login');
      }

      // Kiểm tra vai trò qua introspect bằng axios
      axios.post('http://localhost:8388/auth/introspect', { token })
        .then(response => {
          const roles = response.data.result.roles; // roles có thể là mảng ['USER', 'ADMIN']
          if (response.data.result.valid && roles.includes('USER')) {
            next();
          } else {
            alert('Bạn không có quyền truy cập!');
            next('/login');
          }
        })
        .catch(() => {
          alert('Lỗi xác thực. Vui lòng đăng nhập lại.');
          next('/login');
        });
    },
  },
  { path: '/admin', component: Admin,
    children: [
      { path: '/admin/product', component: ManageProduct },
      { path: '/admin/blogs', component: ManageBlogs },
      { path: '/admin/users', component: ManageUsers },
      { path: '/admin/categorys', component: ManageCategories },
      { path: '/admin/orders', component: ManageOrder },
      { path: '/admin/comments', component: ManageComment },
    ],
    beforeEnter: (to, from, next) => {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Bạn phải đăng nhập để truy cập!');
        return next('/login');
      }

      // Kiểm tra vai trò qua introspect bằng axios
      axios.post('http://localhost:8388/auth/introspect', { token })
        .then(response => {
          const roles = response.data.result.roles; // roles có thể là mảng ['ADMIN']
          if (response.data.result.valid && roles.includes('ADMIN')) {
            next();
          } else {
            alert('Bạn không có quyền truy cập!');
            next('/login');
          }
        })
        .catch(() => {
          alert('Lỗi xác thực. Vui lòng đăng nhập lại.');
          next('/login');
        });
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;

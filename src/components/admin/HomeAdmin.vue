<template>
  <div class="admin-dashboard">
    <!-- Sidebar with overlay for mobile -->
    <div v-if="isSidebar" class="overlay" @click="toggleSidebar"></div>

    <!-- Sidebar that shows or hides based on screen size and toggle state -->
    <div class="sidebar" :class="{ 'show-sidebar': isSidebar }">
      <div class="sidebar-header mb-5">
        <h2>Dashboard</h2>
      </div>
      <nav class="sidebar-nav">
        <ul>
          <li><a href="/admin/product">Sản phẩm</a></li>
          <li><a href="/admin/users">Người dùng</a></li>
          <li><a href="/admin/blogs">Blogs</a></li>
          <li><a href="/admin/orders">Đơn hàng</a></li>
          <li><a href="/admin/categorys">Category</a></li>
          <li><a href="/admin/comments">Comment</a></li>
          <li><a href="/" @click="logout">Logout</a></li>
        </ul>
      </nav>
    </div>

    <div class="main-content">
      <header class="header d-flex justify-content-between align-items-center p-3">
        <div class="menu">
          <!-- Button only visible on mobile to toggle sidebar -->
          <button class="btn btn-primary" @click="toggleSidebar">☰ Menu</button>
          <input type="text" class="form-control" placeholder="Tìm kiếm...">
        </div>
        <div class="admin-info d-flex align-items-center">
          
          <span class="ml-2">Admin</span>
        </div>
      </header>

      <section class="content p-3">
        <router-view></router-view>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeAdmin',
  data() {
    return {
      isSidebar: false
    }
  },
  methods: {
    toggleSidebar() {
      this.isSidebar = !this.isSidebar;
    },
    logout() {
      // Log out logic here, maybe remove token or redirect
      localStorage.removeItem('token');
      this.$router.push('/login');
    }
  },
}
</script>

<style scoped>
.admin-dashboard {
  display: flex;
  height: 100vh;
  background-color: #f4f4f9;
  color: #333;
  position: relative;
  margin: 0;
}

.sidebar {
  width: 260px;
  background-color: #4CAF50; /* Sử dụng màu tươi sáng */
  padding: 20px;
  transition: transform 0.3s ease;
  transform: translateX(-100%);
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  z-index: 1000;
  border-right: 1px solid #ddd;
}

.show-sidebar {
  transform: translateX(0);
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  z-index: 999;
}

.main-content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  transition: margin-left 0.3s ease;
  padding-left: 20px;
}

.sidebar-nav li {
  list-style: none;
  margin: 15px 0;
}

.sidebar-nav li a {
  display: block;
  padding: 12px;
  text-decoration: none;
  color: #fff;
  background-color: #66bb6a;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.sidebar-nav li a:hover {
  background-color: #388e3c;
}

.menu {
  display: flex;
  align-items: center;
}

.menu button {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
}

.menu button:hover {
  background-color: #388e3c;
}

.header {
  background-color: #ffffff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.admin-info {
  display: flex;
  align-items: center;
}

.admin-info img {
  border-radius: 50%;
}

.admin-info span {
  font-weight: bold;
  color: #4CAF50;
}

.form-control {
  width: 250px;
  border-radius: 4px;
}

@media (min-width: 768px) {
  .menu button {
    display: none;
  }

  .sidebar {
    transform: translateX(0);
    position: static;
  }

  .overlay {
    display: none;
  }

  
}

@media (max-width: 768px) {
  .main-content {
    width: 100%;
  }

  .sidebar-nav li a {
    font-size: 14px;
  }

  .container-fluid {
    width: 100%;
    margin: 0;
    padding: 0;
  }
}

</style>

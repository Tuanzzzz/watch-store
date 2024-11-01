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
          <li><a href="/admin/product">Danh sách sản phẩm</a></li>
          <li><a href="/admin/users">Danh sách Users</a></li>
          <li><a href="/admin/blogs">Danh sách Blogs</a></li>
          <li><a href="/admin/">Quản lý đơn hàng</a></li>
          <li><a href="/admin/">Phân tích</a></li>
          <li><a href="/">Logout</a></li>
        </ul>
      </nav>
    </div>

    <div class="main-content">
      <header class="header d-flex justify-content-between align-items-center p-3">
        <div class="menu">
          <!-- Button only visible on mobile to toggle sidebar -->
          <button class="btn btn-secondary" @click="toggleSidebar">Menu</button>
          <input type="text" class="form-control" placeholder="Search...">
        </div>
        <div class="admin-info d-flex align-items-center">
          <img src="https://via.placeholder.com/40" alt="Admin" class="rounded-circle">
          <span class="ml-2">Admin Name</span>
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
    }
  },
}
</script>

<style scoped>
.admin-dashboard {
  display: flex;
  height: 100vh;
  background-color: #ffff;
  color: black;
  position: relative;
}

.sidebar {
  width: 300px;
  background-color: #2c2c3e;
  padding: 20px;
  transition: transform 0.3s ease;
  transform: translateX(-100%);
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  z-index: 1000;
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
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
}

.main-content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  transition: margin-left 0.3s ease;
}

/* Sidebar navigation items */
.sidebar-nav li {
  display: flex;
  background-color: #ffffff;
  justify-content: flex-start;
  align-items: center;
  position: relative;
  width: 100%;
  text-align: left;
  margin: 10px 0;
}

.sidebar-nav li a {
  padding: 10px 20px;
}

.menu {
  display: flex;
  align-items: center;
}

@media (min-width: 768px) {
  
  .menu button {
    display: none;
  }
  /* Sidebar always visible on larger screens */
  .sidebar {
    transform: translateX(0);
    position: static;
  }
  .overlay {
    display: none;
  }
}
@media (max-width: 768px) {
  .main-content{
    width: 100%;
  }
  .container-fluid {
    width: 100%;
    margin: 0;
    padding: 0;
  }
 
}

</style>

<template>
    <div class="container-fluid">
        <div class="container">
            <div class="navbar-left">
                <a href="/">
                    <div class="shop-name">ShopName</div>
                </a>
            </div>
            <div class="navbar-center">
                <div class="search-container">
                    <input type="text" class="search-bar" placeholder="Search for products...">
                    <i class="fas fa-search search-icon"></i>
                </div>
               
            </div>
            
            <div class="cart-container" @mouseover="showCart = true" @mouseleave="showCart = false">
                <a href="/cart"><i class="fas fa-shopping-cart"></i></a>
                <div v-if="showCart" class="cart-hover">
                <CartHover/>
                </div>
            </div>
            <div class="auth">
                <a href="/login">Login</a>
            </div>
        </div>
    </div>
  </template>
  
  <script>
  import CartHover from './CartHover.vue';
  
  export default {
    name: 'NavbarItem',
    components: {
      CartHover,
    },
    data() {
      return {
        showCart: false
      };
    }
  }
  </script>
  
  <style scoped>
  body {
    margin: 0;
    font-family: Arial, sans-serif;
  }
  .container-fluid{
    background-color: #333;
  }
  .container {
    display: flex;
    text-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    
    color: #fff;
  }
  
  .navbar-left, .navbar-right {
    display: flex;
    align-items: center;
    }
.catalog{
    display: flex;
}
.navbar-item {
  padding: 5px 10px;
  background-color: #fff;
  margin-right: 20px;
}

.shop-name {
  font-size: 24px;
  font-weight: bold;
}

.search-container {
  position: relative;
}
.search-bar {
  width: 300px;
  padding: 5px 10px 5px 30px; /* Adjust padding to make space for the icon */
  border: none;
  border-radius: 4px;
}

.search-icon {
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #aaa;
}
  .menu a, .auth a, .cart-container a {
    color: #fff;
    text-decoration: none;
    margin: 0 10px;
  }
  
  .menu a:hover, .auth a:hover, .cart-container a:hover {
    color: #ddd;
  }
  
  .cart-container {
    position: relative;
  }
  
  .cart-hover {
    position: absolute;
    top: 100%;
    right: 0;
    width: 400px;
    background-color: #fff;
    color: #000;
    border: 1px solid #ddd;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    padding: 10px;
    max-height: 500px;
    
  }
  .total {
    position: fixed;
    margin-top: 20px;
    padding-top: 10px;
    border-top: 1px solid #333;
    }
@media(max-width:768px){
    
}
  </style>
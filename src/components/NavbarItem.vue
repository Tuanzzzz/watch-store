<template>
    <div class="navbar">
        <div class="navbar-left">
            <a href="/">
                <div class="shop-name">ShopName</div>
            </a>
        </div>
        <div class="navbar-center">
            <div class="navbar-item" >
                <a href="trend">Trend 2024</a>
            </div>
            <div class="navbar-item" >
                <a href="nam">Nam</a>
            </div>
            <div class="navbar-item" >
                <a href="nu">Nu</a>
            </div>
            <div class="navbar-item" >
                <a href="luxury">Luxury</a>
            </div>
            <div class="search-container">
                <input type="text" class="search-bar" placeholder="Search for products...">
                <i class="fas fa-search search-icon"></i>
            </div>
        </div>
        <div class="navbar-right">
            <div class="cart">
                <a href="cart"><i class="fas fa-shopping-cart"></i></a>
            </div>
            <div class="menu">
                <a href="#"><i class="fas fa-bars"></i></a>
            </div>
            <div class="auth">
                <a href="login">Login</a>
                <a href="login">Register</a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'NavbarItem'
}
</script>

<style scoped>

body {
    margin: 0;
    font-family: Arial, sans-serif;
}

.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    background-color: #333;
    color: white;
    overflow-x: auto;
}

.navbar-left, .navbar-center, .navbar-right {
    display: flex;
    align-items: center;
}
.navbar-item{
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

.navbar-right {
    display: flex;
    align-items: center;
}

.cart, .menu {
    margin-left: 20px;
}

.cart a, .menu a {
    color: white;
    text-decoration: none;
    font-size: 20px;
}

.auth a {
    margin-left: 20px;
    color: white;
    text-decoration: none;
}

.auth a:hover, .cart a:hover, .menu a:hover {
    text-decoration: underline;
}
</style>
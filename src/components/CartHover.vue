<template>
    <div class="cart">
      <h3>Your Cart</h3>
      <div v-if="cartItems.length === 0">
        <p>Your cart is empty.</p>
      </div>
      <div v-else class="cart-body">
        <ul class="cart-content">
          <li v-for="(item, index) in cartItems" :key="index">
            {{ item.name }} - ${{ item.price }} x {{ item.quantity }}
        
          </li>
        </ul>
        <div class="total">
            <p>Total: ${{ cartTotal }}</p>
            <a href="/cart">Show Cart</a>
        </div>
        
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'CartHoverComponent',
    data() {
      return {
        cartItems: []
      };
    },
    computed: {
      cartTotal() {
        return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
      }
    },
    methods: {
      
      saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.cartItems));
      },
      loadCart() {
        const cart = localStorage.getItem('cart');
        if (cart) {
          this.cartItems = JSON.parse(cart);
        }
      }
    },
    created() {
      this.loadCart();
    }
  }
  </script>
  
<style scoped>
.cart {
    text-align: left;
    margin: 10px;
    display: flex;
    flex-direction: column;
    height: 100%;
 }
.cart-body {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
}
 .cart-content{
    flex-grow: 1;
    max-height: 350px;
    overflow-y: auto;
 }
  .total{
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin: 0;
    margin-top: auto;
    border-top: 1px solid #333;
  }
  .total p{
    margin: 0;
  flex-grow: 1; /* Ensure p takes up available space */
  text-align: center; /* Center text horizontally */
  }
  .total a{
    margin-left: 10px;
    display: inline-block;
    padding: 5px 10px;
    background-color: red;
    color: #fff
  }
</style>
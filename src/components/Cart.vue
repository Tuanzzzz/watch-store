<template>
  <div class="cart">
    <h2>Your Cart</h2>
    <div v-if="cartItems.length === 0">
      <p>Your cart is empty.</p>
    </div>
    <div v-else>
      <ul>
        <li v-for="(item, index) in cartItems" :key="index">
          {{ item.name }} - ${{ item.price }} x {{ item.quantity }}
          <button @click="removeFromCart(index)">Remove</button>
        </li>
      </ul>
      <p>Total: ${{ cartTotal }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CartComponent',
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
    removeFromCart(index) {
      this.cartItems.splice(index, 1);
      this.saveCart();
    },
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
  margin: 20px;
}
button {
  background-color: #ff0000;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
}
button:hover {
  background-color: #cc0000;
}
</style>
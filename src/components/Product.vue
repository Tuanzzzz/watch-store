<template>
    <div class="user/product">
      <h2>
        Products
      </h2>
      <div v-for="(product, index) in products" :key="index" class="product-item">
        <h3>
          {{ product.name }}
        </h3>
        <p>
          Price: ${{ product.price }}
        </p>
        <button @click="addToCart(product)">
          Add to Cart
        </button>
      </div>
    </div>
  </template>
  <script>
    export
  default {
      name:
      'ProductItem',
      // Tên mới gồm nhiều từ
      data() {
        return {
          products: [{
            name: 'Watch A',
            price: 100
          },
          {
            name: 'Watch B',
            price: 200
          },
          {
            name: 'Watch C',
            price: 300
          }]
        };
      },
      methods: {
        addToCart(product) {
          this.$emit('add-to-cart', product);
        }
      }
    }
  </script>
    
  <style scoped>
      .product {
          text-align: left;
          margin: 20px;
      }
      .product-item {
          border: 1px solid #ddd;
          padding: 10px;
          margin: 10px 0;
      }
      button {
          background-color: #007bff;
          color: white;
          border: none;
          padding: 5px 10px;
          cursor: pointer;
      }
      button:hover {
          background-color: #0056b3;
      }
  </style>
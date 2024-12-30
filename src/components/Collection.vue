<template>
    <div class="container">
        <h2>BỘ SƯU TẬP HÀNG LUXURY</h2>
      <div class="row">
        <!-- Product 1 -->
        <div class="col-6 col-md-6" v-if="products[0]">
          <div class="product-card row">
            <div class="col-md-6">
              <img :src="products[0].image" :alt="products[0].name">
            </div>
            <div class="col-md-6">
              <p class="name">{{ products[0].name }}</p>
              <p>{{ formatPrice(products[0].price) }}</p>
              <router-link :to="`/products/${products[0].id}`">
                <button>mua ngay</button>
              </router-link>
            </div>
          </div>
        </div>
        <!-- Product 2 -->
        <div class="col-6 col-md-6" v-if="products[1]">
          <div class="product-card row">
            <div class="col-md-6">
              <img :src="products[1].image" :alt="products[1].name">
            </div>
            <div class="col-md-6">
              <p class="name">{{ products[1].name }}</p>
              <p>{{ formatPrice(products[1].price) }}</p>
              <router-link :to="`/products/${products[1].id}`">
                <button>mua ngay</button>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'Collection',
    data() {
      return {
        products: [],
      };
    },
    async created() {
      try {
        const response = await axios.get('http://localhost:8388/products');
        if (response.data && response.data.length > 0) {
          // Lấy 2 sản phẩm ngẫu nhiên
          this.products = this.getRandomProducts(response.data, 2);
        } else {
          console.error('No products found');
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    },
    methods: {
      getRandomProducts(products, count) {
        const shuffled = products.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
      },
      formatPrice(price) {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
      }
    }
  };
  </script>
  
  <style scoped>
  .product-card {
    border: 1px solid #ddd;
    padding: 15px;
    text-align: left;
    background-color: #fff;
    border-radius: 5px;
    margin-bottom: 20px;
  }
  
  .product-card img {
    width: 100%;
    height: auto;
    border-radius: 5px;
  }
  
  .name {
    font-size: 1.2em;
    font-weight: bold;
    margin-bottom: 10px;
  }
  
  button {
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  </style>
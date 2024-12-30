<template>
  <NavbarItem />
  <div class="container">
    <h1>Chi tiết sản phẩm</h1>
    <div v-if="product">
      <div class="row product-detail">
        <div class="col-12 col-md-6">
          <img :src="product.image" class="img-fluid" alt="product image" />
        </div>
        <div class="col-12 col-md-6 infomation">
          <h2>{{ product.name }}</h2>
          <p class="price_current">{{ formatPrice(product.price) }}</p>
          <p v-if="product.oldPrice" class="price_old">{{ formatPrice(product.oldPrice) }}</p>
          <p v-if="product.discount" class="discount">Giảm giá: {{ product.discount }}%</p>
          <p>{{ product.description }}</p>
          <button class="btn btn-primary" @click="addToCart">Thêm vào giỏ hàng</button>
        </div>
      </div>
    </div>
    <div v-else>
      <p>Đang tải thông tin sản phẩm...</p>
    </div>
    <UserComment :productId="product?.id" />
  </div>
  <Footer />
</template>

<script>
import axios from 'axios';
import NavbarItem from './NavbarItem.vue';
import Footer from './footer.vue';
import UserComment from './User-Comment.vue';
export default {
  name: 'ProductDetail',
  props: ['id'], // Nhận id từ router
  components: { NavbarItem, Footer , UserComment},

  data() {
    return {
      product: null, // Dữ liệu sản phẩm
    };
  },
  methods: {
    async fetchProduct() {
      try {
        const response = await axios.get(`http://localhost:8388/products/${this.id}`);
        this.product = response.data;
      } catch (error) {
        console.error('Lỗi khi lấy sản phẩm:', error);
      }
    },
    formatPrice(price) {
      return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
      }).format(price);
    },
    addToCart() {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      const existingProduct = cart.find(item => item.id === this.product.id);
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        cart.push({ ...this.product, quantity: 1 });
      }
      localStorage.setItem('cart', JSON.stringify(cart));
      alert('Đã thêm sản phẩm vào giỏ hàng!');
    },
  },
  watch: {
    id: 'fetchProduct', // Gọi lại fetchProduct nếu id thay đổi
  },
  created() {
    this.fetchProduct();
  },
};
</script>

<style scoped>
.container {
  margin-top: 20px;
}
.price_current {
  font-size: 24px;
  color: red;
  font-weight: bold;
}
.price_old {
  font-size: 18px;
  text-decoration: line-through;
  color: gray;
}
.discount {
  color: green;
  font-size: 16px;
}
.comments {
    text-align: left;
}
</style>

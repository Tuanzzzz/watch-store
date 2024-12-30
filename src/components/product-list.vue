<template>
  <div>
    <NavbarItem />
    <div class="container">
      <quangcao />
      <div class="row">
        <div
          v-for="(item, index) in currentPageItems"
          :key="index"
          class="col-6 col-md-3"
        >
          <div class="product-card">
            <ProductItem
              :imgSrc="item.image"
              :name="item.name"
              :price="item.price"
              :oldPrice="item.oldPrice"
              :discount="item.discount"
              :rating="item.rating"
            />
          </div>
        </div>
      </div>
      <div class="pagination">
        <button @click="previousPage" :disabled="currentPage === 1">Previous</button>
        <span>{{ currentPage }} / {{ totalPages }}</span>
        <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import NavbarItem from './NavbarItem.vue';
import ProductItem from './product-item.vue';
import Footer from './footer.vue';
import quangcao from './quangcao.vue';
import axios from 'axios';

export default {
  name: 'ProductList',
  components: {
    NavbarItem,
    Footer,
    quangcao,
    ProductItem
  },
  data() {
    return {
      products: [], // Dữ liệu sản phẩm lấy từ API
      currentPage: 1,
      itemsPerPage: 16, // Số lượng sản phẩm mỗi trang
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.products.length / this.itemsPerPage);
    },
    currentPageItems() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.products.slice(startIndex, endIndex);
    },
  },
  created() {
    this.fetchProducts(); // Gọi API để lấy sản phẩm khi component được tạo
  },
  methods: {
    async fetchProducts() {
      try {
        const response = await axios.get('http://localhost:8388/products'); // Địa chỉ API của bạn
        this.products = response.data; // Gán dữ liệu sản phẩm vào mảng products
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    },
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
  },
};
</script>

<style scoped>
.product-card {
  border: 1px solid #ddd;
  padding: 15px;
  text-align: center;
  background-color: #fff;
  border-radius: 5px;
  position: relative;
  margin-bottom: 20px;
}

.product-img {
  width: 100%;
  height: auto;
  max-height: 150px;
  object-fit: cover;
  border-radius: 5px;
}

.product-details {
  margin-top: 10px;
}

.product-name {
  font-size: 16px;
  font-weight: bold;
}

.price {
  color: red;
  font-weight: bold;
}

.old-price {
  text-decoration: line-through;
  color: #999;
}

.discount {
  color: red;
  font-weight: bold;
}

.rating {
  color: orange;
}

.pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.pagination button {
  padding: 10px 15px;
  margin: 0 10px;
  border: none;
  background-color: #007bff;
  color: white;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
}

.pagination button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.pagination span {
  font-size: 16px;
  align-self: center;
}
</style>
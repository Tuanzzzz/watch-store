<template>
  <div class="container">
    <div :id="carouselId" class="carousel slide" data-ride="carousel">
      <div class="carousel-inner">
        <div
          v-for="(group, groupIndex) in groupedItems"
          :key="groupIndex"
          :class="['carousel-item', { active: groupIndex === 0 }]"
        >
          <div class="row">
            <ProductItem
              v-for="(item, index) in group"
              :key="index"
              :id="item.id"
              :imgSrc="item.image"
              :name="item.name"
              :price="item.price"
              :oldPrice="item.oldPrice"
              :discount="item.discount"
              :rating="item.rating"
              class="col-6 col-md-3"
            >
              <!-- Bọc sản phẩm trong một router-link -->
              <router-link :to="`/products/${item.id}`" class="stretched-link"></router-link>
            </ProductItem>
          </div>
        </div>
      </div>
      <a class="carousel-control-prev" :href="'#' + carouselId" role="button" data-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
      </a>
      <a class="carousel-control-next" :href="'#' + carouselId" role="button" data-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
      </a>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import ProductItem from './product-item.vue';

export default {
  name: 'ProductBox',
  components: {
    ProductItem,
  },
  props: {
    carouselId: {
      type: String,
      required: true,
    },
    startIndex: {
      type: Number,
      required: true,
    },
    endIndex: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      items: [], // Dữ liệu sản phẩm sẽ được lấy từ API
    };
  },
  computed: {
    groupedItems() {
      const chunkSize = 4; // Mỗi nhóm sẽ chứa 4 sản phẩm
      const groups = [];
      for (let i = 0; i < this.items.length; i += chunkSize) {
        groups.push(this.items.slice(i, i + chunkSize));
      }
      return groups;
    },
  },
  created() {
    this.fetchProducts(); // Gọi API khi component được tạo
  },
  methods: {
    async fetchProducts() {
      try {
        const response = await axios.get('http://localhost:8388/products'); // Địa chỉ API để lấy sản phẩm
        this.items = response.data.slice(this.startIndex, this.endIndex); // Lấy sản phẩm từ startIndex đến endIndex
      } catch (error) {
        console.error('Error fetching products:', error);
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
  position: relative;
  background-color: #fff;
  border-radius: 5px;
  margin-bottom: 20px;
}

.product-card img {
  width: 100%;
  height: auto;
  height: 150px;
  border-radius: 5px;
  margin-bottom: 10px;
}

.price {
  color: red;
  font-weight: bold;
  margin-top: 10px;
}

.old-price {
  text-decoration: line-through;
  color: #999;
  margin-top: 5px;
}

.discount {
  color: red;
  font-weight: bold;
  margin-top: 5px;
}

.stock-info {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: #ff0000;
  color: #fff;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 12px;
}

.stars {
  color: orange;
  margin-top: 10px;
}

.carousel-control-prev,
.carousel-control-next {
  background-color: #333;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  opacity: 1; /* Đảm bảo nút không bị mờ */
  top: 50%;
}
</style>
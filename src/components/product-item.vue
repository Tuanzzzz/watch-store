<template>
  <div class="product-item">
    <router-link :to="`/products/${id}`">
      <div class="product-card">
        <img :src="imgSrc" alt="Product">
        <p class="name">{{ name }}</p>
        <p class="price">{{ formatPrice(price) }}</p>
        <div class="price-origin">
          <p class="old-price" v-if="oldPrice">{{ formatPrice(oldPrice) }}</p>
          <p class="discount" v-if="discount">{{ discount }}</p>
        </div>
        <div class="stars">
          <span v-for="(filled, index) in getStars(rating)" :key="index" class="fa fa-star" :class="{'checked': filled}"></span>
        </div>
        <button class="addCart" @click.stop="addToCart">Thêm vào giỏ hàng</button>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'ProductItem',
  props: {
    id: {
      type: String,
      required: true,
    },
    imgSrc: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    oldPrice: {
      type: String,
      required: false,
    },
    discount: {
      type: String,
      required: false,
    },
    rating: {
      type: Number,
      required: false,
    },
  },
  methods: {
    getStars(rating) {
      return Array.from({ length: 5 }, (_, index) => index < rating);
    },
    addToCart() {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      const existingProduct = cart.find(item => item.id === this.id);
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        cart.push({
          id: this.id,
          name: this.name,
          price: this.price,
          imgSrc: this.imgSrc,
          quantity: 1,
        });
      }
      localStorage.setItem('cart', JSON.stringify(cart));
      alert('Đã thêm vào giỏ hàng!');
    },
    formatPrice(price) {
      return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
      }).format(price);
    },
  },
};
</script>

<style scoped>
.product-card {
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 5px;
  text-align: center;
  justify-items: center;
  transition: transform 0.3s, box-shadow 0.3s;
}

.product-card:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.product-card p {
  text-decoration: none;
}

.product-card img {
  width: 200px;
  height: 200px;
  border-radius: 5px;
}

.name {
  font-weight: bold;
  margin: 10px 0;
}

.price {
  color: #333;
}

.price-origin {
  display: flex;
  justify-content: center;
  align-items: center;
}

.price-origin .old-price {
  margin-right: 5px;
  text-decoration: line-through;
  color: #999;
}

.price-origin .discount {
  color: red;
}

.stars {
  display: flex;
  align-items: center;
  justify-content: center;
}

.fa-star {
  color: #ccc; /* Màu sao mặc định */
}

.checked {
  color: orange; /* Màu sao khi được đánh giá */
}

.addCart {
  margin-top: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
}

.addCart:hover {
  background-color: #0056b3;
}
</style>

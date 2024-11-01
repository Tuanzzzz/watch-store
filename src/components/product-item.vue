<template>
  <div class="product-item">
    <a href="product">
      <div class="product-card">
        <img :src="imgSrc" alt="Product">
        <p class="name">{{ name }}</p>
        <p class="price">{{ price }}</p>
        <div class="price-origin">
          <p class="old-price">{{ oldPrice }}</p>
          <p class="discount">{{ discount }}</p>
        </div>
        <div class="stars">
          <span v-for="(filled, index) in getStars(rating)" :key="index" class="fa fa-star" :class="{'checked': filled}"></span>
        </div>
        <button class="addCart" @click="addToCart" >Add Cart</button>
      </div>
    </a>
  </div>
</template>

<script>
export default {
  name: 'ProductItem',
  props: {
    imgSrc: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    price: {
      type: String,
      required: true
    },
    oldPrice: {
      type: String,
      required: false
    },
    discount: {
      type: String,
      required: false
    },
    rating: {
      type: Number,
      required: false
    }
  },
  methods: {
    getStars(rating) {
      return Array.from({ length: 5 }, (_, index) => index < rating);
    },
    addToCart() {
      const product = {
        id: 'FC-310MS5B6',
        name: 'Frederique Constant ',
        price: 32793000,
        brand: 'Frederique',
        quantity: 1
      };
      localStorage.setItem('cart', JSON.stringify(product));
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


.product-card {
  
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 5px;
  text-align: center;
  justify-items: center;
}
.product-card p{
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
.addCart{
  margin-top: 10px;
}

</style>


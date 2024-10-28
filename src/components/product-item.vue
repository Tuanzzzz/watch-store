<template>
    <div class="product-item">
        <a href="product">
                <div class="product-card">
                <img :src="imgSrc" alt="Product">
                <p class="name">{{ name }}</p>
                <p class="price">{{price}}</p>
                <p class="old-price">{{ oldPrice }}</p>
                <p class="discount">{{ discount }}</p>
                
                <div class="stars">{{rating}}</div>
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
    }
  }
  </script>

<style>
</style>
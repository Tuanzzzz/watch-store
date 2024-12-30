<template>
    <div class="container my-4">
    <h2 class="text-center mb-4">CHỌN ĐỒNG HỒ PHÙ HỢP</h2>
    <div class="row">
        <!-- Product 1 -->
        
        <div class="col-6 col-md-3">
            <a href="/productList">
                <div class="product-card">
                    <img src="https://www.watchstore.vn/images/collections_home/2024/09/06/resized/small-web-banner-xu-huong-2024_1725589299.jpg" alt="Product 1">
                    <p class="name">Xu hướng 2024</p>
                
                </div>
            </a>
        </div>
        <div class="col-6 col-md-3">
            <a href="/productList">
                <div class="product-card">
                    <img src="https://www.watchstore.vn/images/collections_home/2024/09/06/resized/small-web-banner-baby-g_1725596682.jpg" alt="Product 1">
                    <p class="name">Baby cá tính</p>
                
                </div>
            </a>
        </div>
        <div class="col-6 col-md-3">
            <a href="/productList">
                <div class="product-card">
                    <img src="https://www.watchstore.vn/images/collections_home/2024/09/06/resized/small-web-banner-g-shock_1725589299.jpg" alt="Product 1">
                    <p class="name">G-Shock thể thao</p>
                
                </div>
            </a>
        </div>
        <div class="col-6 col-md-3">
            <a href="/productList">
                <div class="product-card">
                    <img src="https://www.watchstore.vn/images/collections_home/2024/09/06/resized/small-web-banner-quan-doi_1725598290.jpg" alt="Product 1">
                    <p class="name">Quân đội</p>
                
                </div>
            </a>
        </div>  
        <div class="col-6 col-md-3">
            <a href="/productList">
                <div class="product-card">
                    <img src="https://www.watchstore.vn/images/collections_home/2024/09/06/resized/small-web-banner-tissot_1725589299.jpg" alt="Product 1">
                    <p class="name">Tissot sang trọng</p>
                
                </div>
            </a>
        </div>
        <div class="col-6 col-md-3">
            <a href="/productList">
                <div class="product-card">
                    <img src="https://www.watchstore.vn/images/collections_home/2024/09/06/resized/small-web-banner-casio-ltp_1725589299.jpg" alt="Product 1">
                    <p class="name">Casio nữ tính</p>
                
                </div>
            </a>
        </div>
        <div class="col-6 col-md-3">
            <a href="/productList">
                <div class="product-card">
                    <img src="https://www.watchstore.vn/images/collections_home/2024/09/06/resized/small-web-banner-casio-mtp_1725589299.jpg" alt="Product 1">
                    <p class="name">Casio thanh lịch</p>
                
                </div>
            </a>
        </div>
        <div class="col-6 col-md-3">
            <a href="/productList">
                <div class="product-card">
                    <img src="https://www.watchstore.vn/images/collections_home/2024/09/06/resized/small-web-banner-giong-rolex_1725589710.jpg" alt="Product 1">
                    <p class="name">Giống Rolex</p>
                
                </div>
            </a>
        </div>    
    </div>
   
   
</div>

</template>

<script>

export default {
  name: 'trend',
  props: {
    
  },
  components: {
   
  },
  data() {
    return {
        items: [
          
          
        ]
    }
  },
  methods: {
   
   
  }
}
</script>
<style >
.product-card {
    /* border: 1px solid #ddd; */
    padding: 10px;
    text-align: center;
    position: relative;
    background-color: #fff;
    border-radius: 5px;
    /* margin-bottom: 20px; */
}
.product-card img {
    width: 100%;
    height: 150px;
    border-radius: 5px;
    margin-bottom: 10px;
}
@media (max-width: 768px) {
  .row {
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto; /* Horizontal scroll */
    scroll-snap-type: x mandatory; /* Smooth scrolling with snapping */
  }

  .col-6 {
    flex: 0 0 calc(50% - 10px); /* Each item takes 50% of the width minus the gap */
    margin: 5px;
    scroll-snap-align: start; /* Snapping point for each item */
  }
}
</style>
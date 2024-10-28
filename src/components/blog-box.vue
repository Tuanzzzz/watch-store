<template>
    <div class="container">
      <div class="row">
        <div class="col-12 col-md-6 item1">
          <img src="blog1.webp" alt="blog1">
          <p>4h sang la gio gi </p>
        </div>
        <div class="col-12 col-md-6 item2">
          <div class="blog-item">
            <div>
              <img src="blog2.webp" alt="blog2">
            </div>
            <div>
              <p>4h sang la gio gi </p>
              <p>dang boi</p>
              <p>ban chua biet</p>
            </div>
            
          </div>
          <div class="blog-item">
            <div>
              <img src="blog2.webp" alt="blog2">
            </div>
            <div>
              <p>4h sang la gio gi </p>
              <p>dang boi</p>
              <p>ban chua biet</p>
            </div>
            
          </div><div class="blog-item">
            <div>
              <img src="blog2.webp" alt="blog2">
            </div>
            <div>
              <p>4h sang la gio gi </p>
              <p>dang boi</p>
              <p>ban chua biet</p>
            </div>
            
          </div><div class="blog-item">
            <div>
              <img src="blog2.webp" alt="blog2">
            </div>
            <div>
              <p>4h sang la gio gi </p>
              <p>dang boi</p>
              <p>ban chua biet</p>
            </div>
            
          </div>
        </div>
      </div>
      
    </div>
    <div class="text-center mt-4 viewAll">
      <a href="blogList">Xem tất cả</a>
    </div>
  </template>
  
  <script>
  export default {
    name: 'BlogBox',
    data() {
      return {
        blogs: [
         
        ]
      }
    },
    methods: {
     
    }
  }
  </script>
  
  <style scoped>


.container {
  height: auto; /* Bỏ giới hạn chiều cao để tự động thích ứng */
  display: flex;
  align-items: stretch; /* Đảm bảo các phần tử có chiều cao bằng nhau */
  margin-bottom: 40px;
}

.item1, .item2 {
  display: flex;
  flex-direction: column;
}

.item1 img, .item2 img {
  max-width: 100%;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.item1 img {
  height: 100%; /* Chiều cao hình ảnh của item1 chiếm toàn bộ */
}

.item2 img {
  max-height: 105px; /* Điều chỉnh kích thước ảnh cho item2 */
  object-fit: cover; /* Đảm bảo ảnh không bị méo */
}

.blog-item {
  display: flex;
  align-items: flex-start;
  margin-top: 10px;
}

.item2 .blog-item {
  margin-bottom: 10px;
}

p {
  margin: 5px 0;
  font-size: 16px;
}
.viewAll a{
  padding: 10px 20px;
  background-color: #fff;
  margin-bottom: 40px;
}



  </style>
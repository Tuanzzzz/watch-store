<template>
    <div class="container-fluid">
      <h2>Danh sách Bình luận</h2>
      
      <table class="table table-striped">
        <thead>
          <tr>
            <th>STT</th>
            <th>Tên người dùng</th>
            <th>Sản phẩm</th>
            <th>Số sao</th>
            <th>Bình luận</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(comment, index) in comments" :key="comment.commentId">
            <td>{{ index + 1 }}</td>
            <td>{{ comment.userName }}</td>
            <td>{{ comment.productName }}</td>
            <td>
              <span v-for="n in comment.stars" :key="n" class="star">⭐</span>
            </td>
            <td>{{ comment.detail }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  export default {
    name: "CommentList",
    data() {
      return {
        comments: [
          { commentId: 1, userName: "Nguyen Van A", productName: "Sản phẩm 1", stars: 5, detail: "Sản phẩm rất tốt, tôi rất hài lòng!" },
          { commentId: 2, userName: "Tran Thi B", productName: "Sản phẩm 2", stars: 4, detail: "Sản phẩm ổn nhưng giao hàng hơi chậm." },
          { commentId: 3, userName: "Le Van C", productName: "Sản phẩm 3", stars: 3, detail: "Sản phẩm bình thường, không có gì đặc biệt." },
          { commentId: 4, userName: "Pham Thi D", productName: "Sản phẩm 4", stars: 2, detail: "Chất lượng chưa tốt, cần cải thiện thêm." },
          { commentId: 5, userName: "Nguyen Van E", productName: "Sản phẩm 5", stars: 1, detail: "Rất thất vọng với sản phẩm này!" },
          { commentId: 6, userName: "Tran Thi F", productName: "Sản phẩm 6", stars: 5, detail: "Giao hàng nhanh, sản phẩm như mô tả." },
          { commentId: 7, userName: "Le Van G", productName: "Sản phẩm 7", stars: 4, detail: "Đóng gói tốt, hàng hóa chất lượng." },
          { commentId: 8, userName: "Pham Thi H", productName: "Sản phẩm 8", stars: 3, detail: "Tạm ổn nhưng giá hơi cao." },
          { commentId: 9, userName: "Nguyen Van I", productName: "Sản phẩm 9", stars: 5, detail: "Sẽ ủng hộ thêm lần sau, rất hài lòng!" },
          { commentId: 10, userName: "Tran Thi J", productName: "Sản phẩm 10", stars: 2, detail: "Chưa đạt kỳ vọng, cần cải thiện." }
        ]
      };
    }
  };
  </script>
  
  <style scoped>
  .table {
    margin-top: 20px;
  }
  
  .star {
    color: gold;
  }
  </style>
  
<template>
    <div class="container-fluid">
      <h2>Quản lý Đơn hàng</h2>
      
      <table class="table table-striped">
        <thead>
          <tr>
            <th>STT</th>
            <th>Tên người dùng</th>
            <th>Sản phẩm</th>
            <th>Số lượng</th>
            <th>Giá tiền</th>
            <th>Trạng thái</th>
            <th>Ngày đặt</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(order, index) in orders" :key="order.orderId">
            <td>{{ index + 1 }}</td>
            <td>{{ order.userName }}</td>
            <td>{{ order.productName }}</td>
            <td>{{ order.quantity }}</td>
            <td>{{ order.price }}</td>
            <td>{{ order.status }}</td>
            <td>{{ order.orderDate }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>

  
  export default {
    name: 'ManageOrder',
    data() {
      return {
        orders: [
            { "orderId": 1, "userName": "Nguyen Van A", "productName": "Sản phẩm 1", "quantity": 2, "price": 500000, "status": "Đang xử lý", "orderDate": "01/10/2023 10:00" },
            { "orderId": 2, "userName": "Tran Thi B", "productName": "Sản phẩm 2", "quantity": 1, "price": 300000, "status": "Hoàn thành", "orderDate": "02/10/2023 11:00" },
            { "orderId": 3, "userName": "Le Van C", "productName": "Sản phẩm 3", "quantity": 3, "price": 450000, "status": "Đang xử lý", "orderDate": "03/10/2023 12:00" },
            { "orderId": 4, "userName": "Pham Thi D", "productName": "Sản phẩm 4", "quantity": 1, "price": 200000, "status": "Đang xử lý", "orderDate": "04/10/2023 13:00" },
            { "orderId": 5, "userName": "Nguyen Van E", "productName": "Sản phẩm 5", "quantity": 2, "price": 600000, "status": "Hoàn thành", "orderDate": "05/10/2023 14:00" },
            { "orderId": 6, "userName": "Tran Thi F", "productName": "Sản phẩm 6", "quantity": 1, "price": 350000, "status": "Đang xử lý", "orderDate": "06/10/2023 15:00" },
            { "orderId": 7, "userName": "Le Van G", "productName": "Sản phẩm 7", "quantity": 3, "price": 700000, "status": "Hoàn thành", "orderDate": "07/10/2023 16:00" },
            { "orderId": 8, "userName": "Pham Thi H", "productName": "Sản phẩm 8", "quantity": 1, "price": 250000, "status": "Đang xử lý", "orderDate": "08/10/2023 17:00" },
            { "orderId": 9, "userName": "Nguyen Van I", "productName": "Sản phẩm 9", "quantity": 2, "price": 550000, "status": "Hoàn thành", "orderDate": "09/10/2023 18:00" },
            { "orderId": 10, "userName": "Tran Thi J", "productName": "Sản phẩm 10", "quantity": 1, "price": 400000, "status": "Đang xử lý", "orderDate": "10/10/2023 19:00" },
            { "orderId": 11, "userName": "Le Van K", "productName": "Sản phẩm 11", "quantity": 3, "price": 750000, "status": "Hoàn thành", "orderDate": "11/10/2023 20:00" },
            { "orderId": 12, "userName": "Pham Thi L", "productName": "Sản phẩm 12", "quantity": 1, "price": 300000, "status": "Đang xử lý", "orderDate": "12/10/2023 21:00" },
            { "orderId": 13, "userName": "Nguyen Van M", "productName": "Sản phẩm 13", "quantity": 2, "price": 650000, "status": "Hoàn thành", "orderDate": "13/10/2023 22:00" },
            { "orderId": 14, "userName": "Tran Thi N", "productName": "Sản phẩm 14", "quantity": 1, "price": 450000, "status": "Đang xử lý", "orderDate": "14/10/2023 23:00" },
            { "orderId": 15, "userName": "Le Van O", "productName": "Sản phẩm 15", "quantity": 3, "price": 800000, "status": "Hoàn thành", "orderDate": "15/10/2023 00:00" }
            ]

      };
    },
    methods: {
      
    }
  };
  </script>
  
  <style scoped>
  .table {
    margin-top: 20px;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  .btn-sm {
    margin-right: 5px;
  }
  </style>
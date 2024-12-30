<template>
  <NavbarItem />
  <div class="cart">
    <h2>Your Cart</h2>
    <div v-if="cartItems.length === 0">
      <p>Your cart is empty.</p>
      <div>
        <a href="/">Continue shopping</a>
      </div>
    </div>
    <div v-else>
      <table>
        <thead>
          <tr>
            <th>Image</th> <!-- Cột ảnh -->
            <th>Product</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Total</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in cartItems" :key="index">
            <td>
              <img :src="item.image" alt="Product Image" class="product-image" /> <!-- Ảnh sản phẩm -->
            </td>
            <td>{{ item.name }}</td>
            <td>
              <input 
                type="number" 
                v-model="item.quantity" 
                :min="1" 
                @change="updateCartTotal"
              />
            </td>
            <td>${{ item.price }}</td>
            <td>${{ item.price * item.quantity }}</td>
            <td>
              <button @click="removeFromCart(index)">Remove</button>
            </td>
          </tr>
        </tbody>
      </table>
      <div>
        <a href="/">Continue shopping</a>
      </div>
      <div class="cart-summary">
        <p>Total: ${{ cartTotal }}</p>
        <button @click="initiatePayment">Thanh toán</button>
      </div>
    </div>
  </div>

</template>

<script>
import axios from 'axios';
import NavbarItem from './NavbarItem.vue';
import Footer from './footer.vue';
export default {
  name: 'CartComponent',
  components: {
    NavbarItem,
    Footer
  },
  data() {
    return {
      cartItems: []
    };
  },
  computed: {
    cartTotal() {
      return this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    }
  },
  methods: {
    loadCart() {
      const cart = localStorage.getItem('cart');
      if (cart) {
        try {
          const parsedCart = JSON.parse(cart);
          if (Array.isArray(parsedCart)) {
            this.cartItems = parsedCart;
          } else {
            this.cartItems = [];
          }
        } catch (error) {
          console.error('Error parsing cart data:', error);
          this.cartItems = [];
        }
      }
    },
    async initiatePayment() {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          alert('Bạn cần đăng nhập để thực hiện thanh toán');
          window.location.href = '/login';  // Hoặc URL của trang đăng nhập của bạn
          return; // Dừng lại, không gọi API nữa
        }

        const totalAmount = this.cartTotal * 100; // Vì tổng tiền của bạn đang ở dạng USD, bạn cần nhân với 100 để chuyển sang VND.

        const response = await axios.get('http://localhost:8388/payment/create_payment', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          params: {
            amount: totalAmount,  // Truyền tổng tiền vào API
          }
        });

        // Dữ liệu trả về từ API
        const data = response.data;

        if (data.status === 'ok') {
          // Lưu URL thanh toán
          this.paymentUrl = data.url;
          // Mở thanh toán trong tab mới
          window.open(this.paymentUrl, '_blank');

          this.cartItems = [];
          this.saveCart();  // Lưu lại giỏ hàng đã được làm sạch

          // Hiển thị thông báo thành công
          alert('Thanh toán thành công! Cảm ơn bạn đã mua hàng.');
        } else {
          // Xử lý khi API trả về trạng thái khác "ok"
          alert('Có lỗi xảy ra trong quá trình thanh toán');
        }
      } catch (error) {
        // Xử lý lỗi nếu API call thất bại
        console.error('Lỗi khi gọi API thanh toán:', error);
        alert('Có lỗi xảy ra, vui lòng thử lại');
      }
    },


    saveCart() {
      localStorage.setItem('cart', JSON.stringify(this.cartItems));
    },
    removeFromCart(index) {
      this.cartItems.splice(index, 1);
      this.saveCart();
    },
    updateCartTotal() {
      this.saveCart();
    },
    proceedToCheckout() {
      // Xử lý chuyển hướng đến trang thanh toán hoặc giỏ hàng.
      alert("Proceeding to checkout...");
    }
  },
  created() {
    this.loadCart();
  },
  watch: {
    cartItems: {
      handler() {
        this.saveCart();
      },
      deep: true
    }
  }
};
</script>

<style scoped>
.cart {
  text-align: left;
  margin: 20px;
}
table {
  width: 100%;
  border-collapse: collapse;
}
table th, table td {
  padding: 10px;
  border: 1px solid #ddd;
  text-align: center;
}
input[type="number"] {
  width: 60px;
  padding: 5px;
  text-align: center;
}
button {
  background-color: #ff0000;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
}
button:hover {
  background-color: #cc0000;
}
.cart-summary {
  margin-top: 20px;
  text-align: right;
}
.cart-summary button {
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
}
.cart-summary button:hover {
  background-color: #45a049;
}

/* Style cho ảnh sản phẩm */
.product-image {
  width: 50px; /* Điều chỉnh kích thước ảnh */
  height: 50px; /* Điều chỉnh kích thước ảnh */
  object-fit: cover; /* Giữ tỷ lệ ảnh */
  border-radius: 5px; /* Tạo góc bo tròn cho ảnh */
}
</style>
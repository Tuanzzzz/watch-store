<template>
  <div class="container-fluid">
    <h2 v-if="isLoginMode">Đăng nhập</h2>
    <h2 v-else>Tạo tài khoản</h2>

    <!-- Login Form -->
    <div class="modal fade show" tabindex="-1" role="dialog" style="display: block;">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ isLoginMode ? "Đăng nhập" : "Tạo tài khoản" }}</h5>
            <button type="button" class="close" @click="toggleLoginForm" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="isLoginMode ? login() : register()">
              <!-- Đăng nhập -->
              <div v-if="isLoginMode">
                <div class="form-group">
                  <label for="username">Tên đăng nhập:</label>
                  <input type="text" v-model="loginData.username" id="username" class="form-control" required>
                </div>
                <div class="form-group">
                  <label for="password">Mật khẩu:</label>
                  <input type="password" v-model="loginData.password" id="password" class="form-control" required>
                </div>
              </div>

              <!-- Tạo tài khoản -->
              <div v-else>
                <div class="form-group">
                  <label for="username">Tên đăng nhập:</label>
                  <input type="text" v-model="registerData.username" id="username" class="form-control" required>
                </div>
                <div class="form-group">
                  <label for="password">Mật khẩu:</label>
                  <input type="password" v-model="registerData.password" id="password" class="form-control" required>
                </div>
                <div class="form-group">
                  <label for="ten">Tên:</label>
                  <input type="text" v-model="registerData.ten" id="ten" class="form-control" required>
                </div>
                <div class="form-group">
                  <label for="gioiTinh">Giới tính:</label>
                  <select v-model="registerData.gioiTinh" id="gioiTinh" class="form-control">
                    <option value="Nam">Nam</option>
                    <option value="Nữ">Nữ</option>
                  </select>
                </div>
                <div class="form-group">
                  <label for="diaChi">Địa chỉ:</label>
                  <input type="text" v-model="registerData.diaChi" id="diaChi" class="form-control" required>
                </div>
                <div class="form-group">
                  <label for="ngaySinh">Ngày sinh:</label>
                  <input type="date" v-model="registerData.ngaySinh" id="ngaySinh" class="form-control" required>
                </div>
                <div class="form-group">
                  <label for="sdt">Số điện thoại:</label>
                  <input type="text" v-model="registerData.sdt" id="sdt" class="form-control" required>
                </div>
                <div class="form-group">
                  <label for="email">Email:</label>
                  <input type="email" v-model="registerData.email" id="email" class="form-control" required>
                </div>
              </div>

              <button type="submit" class="btn btn-primary">{{ isLoginMode ? "Đăng nhập" : "Tạo tài khoản" }}</button>
              <div v-if="errorMessage" class="alert alert-danger mt-3">{{ errorMessage }}</div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-link" @click="toggleMode">
              {{ isLoginMode ? "Chưa có tài khoản? Tạo tài khoản" : "Đã có tài khoản? Đăng nhập" }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="showLoginForm" class="modal-backdrop fade show"></div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Login",
  data() {
    return {
      isLoginMode: true, // Chuyển đổi giữa Đăng nhập và Tạo tài khoản
      showLoginForm: true,
      loginData: {
        username: "",
        password: ""
      },
      registerData: {
        username: "",
        password: "",
        ten: "",
        gioiTinh: "Nam",
        diaChi: "",
        ngaySinh: "",
        sdt: "",
        email: ""
      },
      errorMessage: ""
    };
  },
  methods: {
    toggleMode() {
      this.isLoginMode = !this.isLoginMode;
    },
    toggleLoginForm() {
      this.showLoginForm = !this.showLoginForm;
    },
    async login() {
      try {
        const response = await axios.post("http://localhost:8388/auth/token", this.loginData);

        if (response.status !== 200) throw new Error("Đăng nhập không thành công.");

        const token = response.data.result.token;
        localStorage.setItem("token", token);

        const introspectResponse = await axios.post("http://localhost:8388/auth/introspect", { token });
        if (!introspectResponse.data.result.valid) throw new Error("Token không hợp lệ.");

        const roles = introspectResponse.data.result.roles;
        if (roles.includes("ADMIN")) this.$router.push("/admin");
        else if (roles.includes("USER")) this.$router.push("/user");
        else throw new Error("Sai tài khoản.");
      } catch (error) {
        this.errorMessage = error.message || "Đã có lỗi xảy ra.";
      }
    },
    async register() {
      try {
        const response = await axios.post("http://localhost:8388/users", this.registerData);

        if (response.status !== 201) throw new Error("Tạo tài khoản không thành công.");

        const token = response.data.result.token;
        localStorage.setItem("token", token);
        this.isLoginMode = true; // Quay về form đăng nhập
      } catch (error) {
        this.errorMessage = error.message || "Đã có lỗi xảy ra.";
      }
    }
  }
};
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1040;
}
.modal-content {
  max-width: 400px;
  max-height: calc(80vh - 40px); /* Để khoảng trống phía trên và dưới */
  overflow-y: auto; /* Cho phép cuộn nếu nội dung vượt quá chiều cao */
  margin: 20px auto; /* Khoảng cách phía trên và dưới modal */
}
</style>

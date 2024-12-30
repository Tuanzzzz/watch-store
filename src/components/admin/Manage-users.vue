<template>
  <div class="container-fluid">
    <h2>Quản lý người dùng</h2>
    
    <input type="text" v-model="searchQuery" @input="searchUsers" class="form-control mb-3" placeholder="Tìm kiếm người dùng...">

    <table class="table table-striped">
      <thead>
        <tr>
          <th>STT</th>
          <th>Username</th>
          <th>Tên</th>
          <th>Giới tính</th>
          <th>Địa chỉ</th>
          <th>Ngày sinh</th>
          <th>Số điện thoại</th>
          <th>Email</th>
          <th>Hành động</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, index) in paginatedUsers" :key="user.id">
          <td>{{ (currentPage - 1) * perPage + index + 1 }}</td>
          <td>{{ user.username }}</td>
          <td>{{ user.ten }}</td>
          <td>{{ user.gioiTinh }}</td>
          <td>{{ user.diaChi }}</td>
          <td>{{ user.ngaySinh }}</td>
          <td>{{ user.sdt }}</td>
          <td>{{ user.email }}</td>
          <td>
            <button @click="confirmDeleteUser(index)" class="btn btn-danger btn-sm">Xóa</button>
          </td>
        </tr>
      </tbody>
    </table>

    <paginate
      v-if="totalPages > 1"
      :page-count="totalPages"
      :click-handler="changePage"
      :prev-text="'Trước'"
      :next-text="'Sau'"
      :container-class="'pagination'"
      :page-class="'page-item'"
      :page-link-class="'page-link'"
      :prev-class="'page-item'"
      :prev-link-class="'page-link'"
      :next-class="'page-item'"
      :next-link-class="'page-link'"
      :active-class="'active'"
    />

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal" class="modal fade show" tabindex="-1" role="dialog" style="display: block;">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Xác nhận xóa</h5>
            <button type="button" class="close" @click="closeDeleteModal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            Bạn có chắc chắn muốn xóa người dùng này không?
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeDeleteModal">Hủy</button>
            <button type="button" class="btn btn-danger" @click="deleteUser">Xóa</button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="showDeleteModal" class="modal-backdrop fade show"></div>
  </div>
</template>

<script>
import axios from 'axios';
import Paginate from 'vuejs-paginate-next';

export default {
  name: 'ManageUsers',
  components: {
    Paginate
  },
  data() {
    return {
      users: [],
      showDeleteModal: false,
      deleteUserIndex: null,
      currentPage: 1,
      perPage: 5,
      searchQuery: ''
    };
  },
  computed: {
    paginatedUsers() {
      const start = (this.currentPage - 1) * this.perPage;
      const end = start + this.perPage;
      return this.filteredUsers.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.filteredUsers.length / this.perPage);
    },
    filteredUsers() {
      if (this.searchQuery) {
        return this.users.filter(user =>
          user.username.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          user.ten.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          user.email.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }
      return this.users;
    }
  },
  methods: {
    async fetchUsers() {
      try {
        const token = localStorage.getItem('token');

        const response = await axios.get('http://localhost:8388/users', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        this.users = response.data.result;
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    },
    confirmDeleteUser(index) {
      this.deleteUserIndex = index + (this.currentPage - 1) * this.perPage;
      this.showDeleteModal = true;
    },
    async deleteUser() {
      try {
        const userId = this.users[this.deleteUserIndex].id;
        const token = localStorage.getItem('token'); // Lấy token từ localStorage

        // Gửi yêu cầu xóa người dùng với token trong header
        await axios.delete(`http://localhost:8388/users/${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        // Sau khi xóa thành công, loại bỏ người dùng khỏi danh sách
        this.users.splice(this.deleteUserIndex, 1);
        this.showDeleteModal = false;
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    },
    closeDeleteModal() {
      this.showDeleteModal = false;
    },
    changePage(page) {
      this.currentPage = page;
    },
    searchUsers() {
      this.currentPage = 1;
    }
  },
  created() {
    this.fetchUsers();
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
  max-width: 800px;
  max-height: 80vh; /* Set a maximum height for the modal */
  display: flex;
  flex-direction: column;
}

.modal-body {
  overflow-y: auto; /* Make the modal body scrollable */
  flex-grow: 1; /* Allow the modal body to grow and take available space */
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  padding: 10px;
  background-color: #f1f1f1;
  border-top: 1px solid #ddd;
}
</style>
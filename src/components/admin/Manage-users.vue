<template>
    <div class="container-fluid">
      <h2>Quản lý Users</h2>
      <button @click="toggleAddUserForm" class="btn btn-primary mb-3">Thêm User</button>
      
      <!-- Add User Modal -->
      <div v-if="showAddUserForm" class="modal fade show" tabindex="-1" role="dialog" style="display: block;">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Thêm User</h5>
              <button type="button" class="close" @click="toggleAddUserForm" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form @submit.prevent="addUser">
                <div class="form-group">
                  <label for="userName">Tên User:</label>
                  <input type="text" v-model="newUser.name" id="userName" class="form-control" required>
                </div>
                <div class="form-group">
                  <label for="userEmail">Email:</label>
                  <input type="email" v-model="newUser.email" id="userEmail" class="form-control" required>
                </div>
                <button type="submit" class="btn btn-success">Thêm User</button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div v-if="showAddUserForm" class="modal-backdrop fade show"></div>
  
      <table class="table table-striped">
        <thead>
          <tr>
            <th>Tên User</th>
            <th>Email</th>
            <th>Sửa</th>
            <th>Xóa</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in users" :key="index">
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td>
              <button @click="editUser(index)" class="btn btn-warning btn-sm mr-2">Sửa</button>
            </td>
            <td>
              <button @click="confirmDeleteUser(index)" class="btn btn-danger btn-sm">Xóa</button>
            </td>
          </tr>
        </tbody>
      </table>
  
      <!-- Edit User Modal -->
      <div v-if="showEditUserForm" class="modal fade show" tabindex="-1" role="dialog" style="display: block;">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Cập nhật User</h5>
              <button type="button" class="close" @click="toggleEditUserForm" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form @submit.prevent="updateUser">
                <div class="form-group">
                  <label for="editUserName">Tên User:</label>
                  <input type="text" v-model="editUserData.name" id="editUserName" class="form-control" required>
                </div>
                <div class="form-group">
                  <label for="editUserEmail">Email:</label>
                  <input type="email" v-model="editUserData.email" id="editUserEmail" class="form-control" required>
                </div>
                <button type="submit" class="btn btn-success">Cập nhật User</button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div v-if="showEditUserForm" class="modal-backdrop fade show"></div>
  
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
              Bạn có chắc chắn muốn xóa user này không?
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
  export default {
    name: 'ManageUsers',
    data() {
      return {
        users: [
          {
            name: 'User 1',
            email: 'user1@example.com'
          },
          {
            name: 'User 2',
            email: 'user2@example.com'
          },
          {
            name: 'User 3',
            email: 'user3@example.com'
          }
        ],
        showAddUserForm: false,
        showEditUserForm: false,
        showDeleteModal: false,
        newUser: {
          name: '',
          email: ''
        },
        editUserData: {
          name: '',
          email: ''
        },
        editUserIndex: null,
        deleteUserIndex: null
      };
    },
    methods: {
      toggleAddUserForm() {
        this.showAddUserForm = !this.showAddUserForm;
      },
      addUser() {
        this.users.push({ ...this.newUser });
        this.newUser.name = '';
        this.newUser.email = '';
        this.showAddUserForm = false;
      },
      toggleEditUserForm() {
        this.showEditUserForm = !this.showEditUserForm;
      },
      editUser(index) {
        this.editUserIndex = index;
        this.editUserData = { ...this.users[index] };
        this.showEditUserForm = true;
      },
      updateUser() {
        this.$set(this.users, this.editUserIndex, { ...this.editUserData });
        this.editUserData.name = '';
        this.editUserData.email = '';
        this.showEditUserForm = false;
      },
      confirmDeleteUser(index) {
        this.deleteUserIndex = index;
        this.showDeleteModal = true;
      },
      deleteUser() {
        this.users.splice(this.deleteUserIndex, 1);
        this.showDeleteModal = false;
      },
      closeDeleteModal() {
        this.showDeleteModal = false;
      }
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
  </style>
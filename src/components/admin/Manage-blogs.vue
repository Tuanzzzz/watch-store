<template>
    <div class="container-fluid">
      <h2>Quản lý Blogs</h2>
      <button @click="toggleAddBlogForm" class="btn btn-primary mb-3">Thêm Blog</button>
      
      <!-- Add Blog Modal -->
      <div v-if="showAddBlogForm" class="modal fade show" tabindex="-1" role="dialog" style="display: block;">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Thêm Blog</h5>
              <button type="button" class="close" @click="toggleAddBlogForm" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form @submit.prevent="addBlog">
                <div class="form-group">
                  <label for="blogTitle">Tiêu đề Blog:</label>
                  <input type="text" v-model="newBlog.title" id="blogTitle" class="form-control" required>
                </div>
                <div class="form-group">
                  <label for="blogContent">Nội dung Blog:</label>
                  <textarea v-model="newBlog.content" id="blogContent" class="form-control" required></textarea>
                </div>
                <button type="submit" class="btn btn-success">Thêm Blog</button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div v-if="showAddBlogForm" class="modal-backdrop fade show"></div>
  
      <table class="table table-striped">
        <thead>
          <tr>
            <th>Tiêu đề Blog</th>
            <th>Nội dung</th>
            <th>Sửa</th>
            <th>Xóa</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(blog, index) in blogs" :key="index">
            <td>{{ blog.title }}</td>
            <td>{{ blog.content }}</td>
            <td>
              <button @click="editBlog(index)" class="btn btn-warning btn-sm mr-2">Sửa</button>
            </td>
            <td>
              <button @click="confirmDeleteBlog(index)" class="btn btn-danger btn-sm">Xóa</button>
            </td>
          </tr>
        </tbody>
      </table>
  
      <!-- Edit Blog Modal -->
      <div v-if="showEditBlogForm" class="modal fade show" tabindex="-1" role="dialog" style="display: block;">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Cập nhật Blog</h5>
              <button type="button" class="close" @click="toggleEditBlogForm" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form @submit.prevent="updateBlog">
                <div class="form-group">
                  <label for="editBlogTitle">Tiêu đề Blog:</label>
                  <input type="text" v-model="editBlogData.title" id="editBlogTitle" class="form-control" required>
                </div>
                <div class="form-group">
                  <label for="editBlogContent">Nội dung Blog:</label>
                  <textarea v-model="editBlogData.content" id="editBlogContent" class="form-control" required></textarea>
                </div>
                <button type="submit" class="btn btn-success">Cập nhật Blog</button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div v-if="showEditBlogForm" class="modal-backdrop fade show"></div>
  
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
              Bạn có chắc chắn muốn xóa blog này không?
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" @click="closeDeleteModal">Hủy</button>
              <button type="button" class="btn btn-danger" @click="deleteBlog">Xóa</button>
            </div>
          </div>
        </div>
      </div>
      <div v-if="showDeleteModal" class="modal-backdrop fade show"></div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ManageBlogs',
    data() {
      return {
        blogs: [
          {
            title: 'Blog 1',
            content: 'Content 1'
          },
          {
            title: 'Blog 2',
            content: 'Content 2'
          },
          {
            title: 'Blog 3',
            content: 'Content 3'
          }
        ],
        showAddBlogForm: false,
        showEditBlogForm: false,
        showDeleteModal: false,
        newBlog: {
          title: '',
          content: ''
        },
        editBlogData: {
          title: '',
          content: ''
        },
        editBlogIndex: null,
        deleteBlogIndex: null
      };
    },
    methods: {
      toggleAddBlogForm() {
        this.showAddBlogForm = !this.showAddBlogForm;
      },
      addBlog() {
        this.blogs.push({ ...this.newBlog });
        this.newBlog.title = '';
        this.newBlog.content = '';
        this.showAddBlogForm = false;
      },
      toggleEditBlogForm() {
        this.showEditBlogForm = !this.showEditBlogForm;
      },
      editBlog(index) {
        this.editBlogIndex = index;
        this.editBlogData = { ...this.blogs[index] };
        this.showEditBlogForm = true;
      },
      updateBlog() {
        this.$set(this.blogs, this.editBlogIndex, { ...this.editBlogData });
        this.editBlogData.title = '';
        this.editBlogData.content = '';
        this.showEditBlogForm = false;
      },
      confirmDeleteBlog(index) {
        this.deleteBlogIndex = index;
        this.showDeleteModal = true;
      },
      deleteBlog() {
        this.blogs.splice(this.deleteBlogIndex, 1);
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
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
                <label for="blogId">ID Blog:</label>
                <input type="number" v-model="newBlog.blogId" id="blogId" class="form-control" required>
              </div>
              <div class="form-group">
                <label for="blogTitle">Tiêu đề Blog:</label>
                <input type="text" v-model="newBlog.title" id="blogTitle" class="form-control" required>
              </div>
              <div class="form-group">
                <label for="blogImage">Hình ảnh:</label>
                <input type="text" v-model="newBlog.hinhAnh" id="blogImage" class="form-control" required>
              </div>
              <div class="form-group">
                <label for="blogExcept">Tóm tắt Blog:</label>
                <input type="text" v-model="newBlog.exceptBlog" id="blogExcept" class="form-control" required>
              </div>
              <div class="form-group">
                <label for="blogDescription">Mô tả:</label>
                <textarea v-model="newBlog.decription" id="blogDescription" class="form-control"></textarea>
              </div>
              <button type="submit" class="btn btn-success">Thêm Blog</button>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div v-if="showAddBlogForm" class="modal-backdrop fade show"></div>

    <input type="text" v-model="searchQuery" @input="searchBlogs" class="form-control mb-3" placeholder="Tìm kiếm Blog...">

    <table class="table table-striped">
      <thead>
        <tr>
          <th>STT</th>
          
          <th>Tiêu đề Blog</th>
          <th>Hình ảnh</th>
          <th>Tóm tắt</th>
          <th>Ngày tạo</th>
          <th>Hành động</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(blog, index) in paginatedBlogs" :key="blog.blogId">
          <td>{{ (currentPage - 1) * perPage + index + 1 }}</td>
          
          <td>{{ blog.title }}</td>
          <td><img :src="blog.hinhAnh" alt="Blog Image" style="width: 50px; height: auto;"></td>
          <td>{{ blog.exceptBlog }}</td>
          <td>{{ formatDate(blog.createDate) }}</td>
          <td>
            <button @click="editBlog(index)" class="btn btn-warning btn-sm mr-2">Cập nhật</button>
            <button @click="confirmDeleteBlog(index)" class="btn btn-danger btn-sm">Xóa</button>
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
                <label for="editBlogId">ID Blog:</label>
                <input type="number" v-model="editBlogData.blogId" id="editBlogId" class="form-control" required>
              </div>
              <div class="form-group">
                <label for="editBlogTitle">Tiêu đề Blog:</label>
                <input type="text" v-model="editBlogData.title" id="editBlogTitle" class="form-control" required>
              </div>
              <div class="form-group">
                <label for="editBlogImage">Hình ảnh:</label>
                <input type="text" v-model="editBlogData.hinhAnh" id="editBlogImage" class="form-control" required>
              </div>
              <div class="form-group">
                <label for="editBlogExcept">Tóm tắt Blog:</label>
                <input type="text" v-model="editBlogData.exceptBlog" id="editBlogExcept" class="form-control" required>
              </div>
              <div class="form-group">
                <label for="editBlogDescription">Mô tả:</label>
                <textarea v-model="editBlogData.decription" id="editBlogDescription" class="form-control"></textarea>
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
import axios from 'axios';
import Paginate from 'vuejs-paginate-next';

export default {
  name: 'ManageBlogs',
  components: {
    Paginate
  },
  data() {
    return {
      blogs: [],
      showAddBlogForm: false,
      showEditBlogForm: false,
      showDeleteModal: false,
      newBlog: {
        blogId: '',
        title: '',
        hinhAnh: '',
        exceptBlog: '',
        decription: '',
        createDate: ''
      },
      editBlogData: {
        blogId: '',
        title: '',
        hinhAnh: '',
        exceptBlog: '',
        decription: '',
        createDate: ''
      },
      editBlogIndex: null,
      deleteBlogIndex: null,
      currentPage: 1,
      perPage: 5,
      searchQuery: ''
    };
  },
  computed: {
    paginatedBlogs() {
      const start = (this.currentPage - 1) * this.perPage;
      const end = start + this.perPage;
      return this.filteredBlogs.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.filteredBlogs.length / this.perPage);
    },
    filteredBlogs() {
      if (this.searchQuery) {
        return this.blogs.filter(blog =>
          blog.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          blog.exceptBlog.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }
      return this.blogs;
    }
  },
  methods: {
    toggleAddBlogForm() {
      this.showAddBlogForm = !this.showAddBlogForm;
    },
    async addBlog() {
      try {
        const token = localStorage.getItem('token');
        this.newBlog.createDate = new Date().toISOString();
        const response = await axios.post('http://localhost:8388/blogs', this.newBlog, {
          headers: {
             'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        this.blogs.push(response.data);
        this.resetForm();
        this.toggleAddBlogForm();
      } catch (error) {
        console.error('Error adding blog:', error);
      }
    },
    toggleEditBlogForm() {
      this.showEditBlogForm = !this.showEditBlogForm;
    },
    async editBlog(index) {
      this.editBlogIndex = index + (this.currentPage - 1) * this.perPage;
      this.editBlogData = { ...this.blogs[this.editBlogIndex] };
      this.showEditBlogForm = true;
    },
    async updateBlog() {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.put(`http://localhost:8388/blogs/${this.editBlogData.blogId}`, this.editBlogData, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        this.blogs.splice(this.editBlogIndex, 1, response.data);
        this.resetForm();
        this.toggleEditBlogForm();
      } catch (error) {
        console.error('Error updating blog:', error);
      }
    },
    confirmDeleteBlog(index) {
      this.deleteBlogIndex = index + (this.currentPage - 1) * this.perPage;
      console.log('deleteBlogIndex',this.deleteBlogIndex);
      this.showDeleteModal = true;
    },
    async deleteBlog() {
      try {
        const token = localStorage.getItem('token');

        console.log('blogId',this.blogId);
        await axios.delete(`http://localhost:8388/blogs/${this.deleteBlogIndex }`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        this.blogs.splice(this.deleteBlogIndex, 1);
        this.showDeleteModal = false;
      } catch (error) {
        console.error('Error deleting blog:', error);
      }
    },
    closeDeleteModal() {
      this.showDeleteModal = false;
    },
    changePage(page) {
      this.currentPage = page;
    },
    searchBlogs() {
      this.currentPage = 1;
    },
    resetForm() {
      this.newBlog = {
        blogId: '',
        title: '',
        hinhAnh: '',
        exceptBlog: '',
        decription: '',
        createDate: ''
      };
      this.editBlogData = {
        blogId: '',
        title: '',
        hinhAnh: '',
        exceptBlog: '',
        decription: '',
        createDate: ''
      };
    },
    async fetchBlogs() {
      try {
        const token = localStorage.getItem('token'); // Lấy token từ localStorage hoặc nơi bạn lưu trữ token

        const response = await axios.get('http://localhost:8388/blogs', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        this.blogs = response.data;
        console.log('Blogs:', this.blogs);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    },
    formatDate(date) {
      const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
      return new Date(date).toLocaleDateString('vi-VN', options);
    }
  },
  created() {
    this.fetchBlogs();
  },
  
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

.text-truncate {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3; /* number of lines to show */
  -webkit-box-orient: vertical;
}
</style>
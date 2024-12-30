<template>
    <div class="container-fluid">
      <h2>Quản lý Category</h2>
      <button @click="toggleAddCategoryForm" class="btn btn-primary mb-3">Thêm Category</button>
      
      <!-- Add Category Modal -->
      <div v-if="showAddCategoryForm" class="modal fade show" tabindex="-1" role="dialog" style="display: block;">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Thêm Category</h5>
              <button type="button" class="close" @click="toggleAddCategoryForm" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form @submit.prevent="addCategory">
                <div class="form-group">
                  <label for="categoryName">Tên Category:</label>
                  <input type="text" v-model="newCategory.name" id="categoryName" class="form-control" required>
                </div>
                <div class="form-group">
                  <label for="categoryDescription">Mô tả:</label>
                  <textarea v-model="newCategory.description" id="categoryDescription" class="form-control"></textarea>
                </div>
                <button type="submit" class="btn btn-success">Thêm Category</button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div v-if="showAddCategoryForm" class="modal-backdrop fade show"></div>
  
      <input type="text" v-model="searchQuery" @input="searchCategories" class="form-control mb-3" placeholder="Tìm kiếm Category...">
  
      <table class="table table-striped">
        <thead>
          <tr>
            <th>STT</th>
            <th>Tên Category</th>
            <th>Mô tả</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(category, index) in paginatedCategories" :key="category.categoryId">
            <td>{{ (currentPage - 1) * perPage + index + 1 }}</td>
            <td>{{ category.name }}</td>
            <td>{{ category.description }}</td>
            <td>
              <button @click="editCategory(index)" class="btn btn-warning btn-sm mr-2">Cập nhật</button>
              <button @click="confirmDeleteCategory(index)" class="btn btn-danger btn-sm">Xóa</button>
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
  
      <!-- Edit Category Modal -->
      <div v-if="showEditCategoryForm" class="modal fade show" tabindex="-1" role="dialog" style="display: block;">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Cập nhật Category</h5>
              <button type="button" class="close" @click="toggleEditCategoryForm" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form @submit.prevent="updateCategory">
                <div class="form-group">
                  <label for="editCategoryName">Tên Category:</label>
                  <input type="text" v-model="editCategoryData.name" id="editCategoryName" class="form-control" required>
                </div>
                <div class="form-group">
                  <label for="editCategoryDescription">Mô tả:</label>
                  <textarea v-model="editCategoryData.description" id="editCategoryDescription" class="form-control"></textarea>
                </div>
                <button type="submit" class="btn btn-success">Cập nhật Category</button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div v-if="showEditCategoryForm" class="modal-backdrop fade show"></div>
  
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
              Bạn có chắc chắn muốn xóa category này không?
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" @click="closeDeleteModal">Hủy</button>
              <button type="button" class="btn btn-danger" @click="deleteCategory">Xóa</button>
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
    name: 'ManageCategories',
    components: {
      Paginate
    },
    data() {
      return {
        categories: [],
        showAddCategoryForm: false,
        showEditCategoryForm: false,
        showDeleteModal: false,
        newCategory: {
          name: '',
          description: ''
        },
        editCategoryData: {
          name: '',
          description: ''
        },
        editCategoryIndex: null,
        deleteCategoryIndex: null,
        currentPage: 1,
        perPage: 5,
        searchQuery: ''
      };
    },
    computed: {
      paginatedCategories() {
        const start = (this.currentPage - 1) * this.perPage;
        const end = start + this.perPage;
        return this.filteredCategories.slice(start, end);
      },
      totalPages() {
        return Math.ceil(this.filteredCategories.length / this.perPage);
      },
      filteredCategories() {
        if (this.searchQuery) {
          return this.categories.filter(category =>
            category.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
            category.description.toLowerCase().includes(this.searchQuery.toLowerCase())
          );
        }
        return this.categories;
      }
    },
    methods: {
      toggleAddCategoryForm() {
        this.showAddCategoryForm = !this.showAddCategoryForm;
      },
      async addCategory() {
        try {
          const token = localStorage.getItem('token');
          const response = await axios.post('http://localhost:8388/categories', this.newCategory, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          });
          this.categories.push(response.data);
          this.resetForm();
          this.toggleAddCategoryForm();
        } catch (error) {
          console.error('Error adding category:', error);
        }
      },
      toggleEditCategoryForm() {
        this.showEditCategoryForm = !this.showEditCategoryForm;
      },
      async editCategory(index) {
        this.editCategoryIndex = index + (this.currentPage - 1) * this.perPage;
        this.editCategoryData = { ...this.categories[this.editCategoryIndex] };
        this.showEditCategoryForm = true;
      },
      async updateCategory() {
        try {
          const token = localStorage.getItem('token');
          const response = await axios.put(`http://localhost:8388/categories/${this.editCategoryData.id}`, this.editCategoryData, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          });
          this.categories.splice(this.editCategoryIndex, 1, response.data);
          this.resetForm();
          this.toggleEditCategoryForm();
        } catch (error) {
          console.error('Error updating category:', error);
        }
      },
      confirmDeleteCategory(index) {
        this.deleteCategoryIndex = index + (this.currentPage - 1) * this.perPage;
        this.showDeleteModal = true;
      },
      closeDeleteModal() {
        this.showDeleteModal = false;
      },
      async deleteCategory() {
        try {
          const token = localStorage.getItem('token');
          await axios.delete(`http://localhost:8388/categories/${this.categories[this.deleteCategoryIndex].id}`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          this.categories.splice(this.deleteCategoryIndex, 1);
          this.showDeleteModal = false;
        } catch (error) {
          console.error('Error deleting category:', error);
        }
      },
      searchCategories() {
        this.currentPage = 1;
      },
      changePage(page) {
        this.currentPage = page;
      },
      resetForm() {
        this.newCategory.name = '';
        this.newCategory.description = '';
        this.editCategoryData.name = '';
        this.editCategoryData.description = '';
      }
    },
    async mounted() {
      try {
        const response = await axios.get('http://localhost:8388/categories');
        this.categories = response.data;
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    }
  };
  </script>
  <style scoped>
  .modal-backdrop {
    z-index: 1040 !important;
  }
  
  .modal {
    z-index: 1050;
  }
  </style>
  
  
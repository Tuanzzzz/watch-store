<template>
  <div class="container-fluid">
    <h2>Quản lý sản phẩm</h2>
    <button @click="toggleAddProductForm" class="btn btn-primary mb-3">Thêm sản phẩm</button>
    
    <!-- Add Product Modal -->
    <div v-if="showAddProductForm" class="modal fade show" tabindex="-1" role="dialog" style="display: block;">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Thêm sản phẩm</h5>
            <button type="button" class="close" @click="toggleAddProductForm" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="addProduct">
              <div class="form-group">
                <label for="productName">Tên sản phẩm:</label>
                <input type="text" v-model="newProduct.name" id="productName" class="form-control" required>
              </div>
              <div class="form-group">
                <label for="productImage">Hình ảnh:</label>
                <input type="text" v-model="newProduct.image" id="productImage" class="form-control" required>
              </div>
              <div class="form-group">
                <label for="productDescription">Mô tả:</label>
                <textarea v-model="newProduct.description" id="productDescription" class="form-control"></textarea>
              </div>
              <div class="form-group">
                <label for="productPrice">Giá:</label>
                <input type="number" v-model="newProduct.price" id="productPrice" class="form-control" required>
              </div>
              <div class="form-group">
                <label for="productRating">Đánh giá:</label>
                <input type="number" step="0.1" v-model="newProduct.rating" id="productRating" class="form-control" required>
              </div>
              <div class="form-group">
                <label for="productQuantity">Số lượng:</label>
                <input type="number" v-model="newProduct.quantity" id="productQuantity" class="form-control" required>
              </div>
              <button type="submit" class="btn btn-success">Thêm sản phẩm</button>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div v-if="showAddProductForm" class="modal-backdrop fade show"></div>

    <input type="text" v-model="searchQuery" @input="searchProducts" class="form-control mb-3" placeholder="Tìm kiếm sản phẩm...">

    <table class="table table-striped">
      <thead>
        <tr>
          <th>ID</th>
          <th>Tên sản phẩm</th>
          <th>Hình ảnh</th>
          <th>Giá</th>
          <th>Đánh giá</th>
          <th>Số lượng</th>
          <th>Hành động</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(product, index) in paginatedProducts" :key="product.id">
          <td>{{ product.id }}</td>
          <td>{{ product.name }}</td>
          <td><img :src="product.image" alt="Product Image" style="width: 50px; height: auto;"></td>
          <td>{{ product.price }}</td>
          <td>{{ product.rating }}</td>
          <td>{{ product.quantity }}</td>
          <td>
            <button @click="editProduct(index)" class="btn btn-warning btn-sm mr-2">Cập nhật</button>
            <button @click="confirmDeleteProduct(index)" class="btn btn-danger btn-sm">Xóa</button>
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

    <!-- Edit Product Modal -->
    <div v-if="showEditProductForm" class="modal fade show" tabindex="-1" role="dialog" style="display: block;">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Cập nhật sản phẩm</h5>
            <button type="button" class="close" @click="toggleEditProductForm" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="updateProduct">
              <div class="form-group">
                <label for="editProductName">Tên sản phẩm:</label>
                <input type="text" v-model="editProductData.name" id="editProductName" class="form-control">
              </div>
              <div class="form-group">
                <label for="editProductImage">Hình ảnh:</label>
                <input type="text" v-model="editProductData.image" id="editProductImage" class="form-control">
              </div>
              <div class="form-group">
                <label for="editProductDescription">Mô tả:</label>
                <textarea v-model="editProductData.description" id="editProductDescription" class="form-control"></textarea>
              </div>
              <div class="form-group">
                <label for="editProductPrice">Giá:</label>
                <input type="number" v-model="editProductData.price" id="editProductPrice" class="form-control">
              </div>
              <div class="form-group">
                <label for="editProductRating">Đánh giá:</label>
                <input type="number" step="0.1" v-model="editProductData.rating" id="editProductRating" class="form-control">
              </div>
              <div class="form-group">
                <label for="editProductQuantity">Số lượng:</label>
                <input type="number" v-model="editProductData.quantity" id="editProductQuantity" class="form-control">
              </div>
              <button type="submit" class="btn btn-success">Cập nhật sản phẩm</button>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div v-if="showEditProductForm" class="modal-backdrop fade show"></div>

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
            Bạn có chắc chắn muốn xóa sản phẩm này không?
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeDeleteModal">Hủy</button>
            <button type="button" class="btn btn-danger" @click="deleteProduct">Xóa</button>
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
  name: 'ManageProduct',
  components: {
    Paginate
  },
  data() {
    return {
      products: [],
      showAddProductForm: false,
      showEditProductForm: false,
      showDeleteModal: false,
      newProduct: {
        name: '',
        image: '',
        description: '',
        price: 0,
        rating: 0,
        quantity: 0
      },
      editProductData: {
        id: '',
        name: '',
        image: '',
        description: '',
        price: 0,
        rating: 0,
        quantity: 0
      },
      editProductIndex: null,
      deleteProductIndex: null,
      currentPage: 1,
      perPage: 5,
      searchQuery: ''
    };
  },
  computed: {
    paginatedProducts() {
      const start = (this.currentPage - 1) * this.perPage;
      const end = start + this.perPage;
      return this.filteredProducts.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.filteredProducts.length / this.perPage);
    },
    filteredProducts() {
      if (this.searchQuery) {
        return this.products.filter(product =>
          product.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }
      return this.products;
    }
  },
  methods: {
    toggleAddProductForm() {
      this.showAddProductForm = !this.showAddProductForm;
    },
    async addProduct() {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.post('http://localhost:8388/products', this.newProduct, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        this.products.push(response.data.result);
        this.resetForm();
        this.toggleAddProductForm();
      } catch (error) {
        console.error('Error adding product:', error);
      }
    },
    toggleEditProductForm() {
      this.showEditProductForm = !this.showEditProductForm;
    },
    async editProduct(index) {
      this.editProductIndex = index + (this.currentPage - 1) * this.perPage;
      this.editProductData = { ...this.products[this.editProductIndex] };
      this.showEditProductForm = true;
    },
    async updateProduct() {
      try {
        const token = localStorage.getItem('token');
        const updatedProduct = { ...this.products[this.editProductIndex], ...this.editProductData };
        const response = await axios.put(`http://localhost:8388/products/${this.editProductData.id}`, updatedProduct, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        this.products.splice(this.editProductIndex, 1, response.data);
        this.resetForm();
        this.toggleEditProductForm();
      } catch (error) {
        console.error('Error updating product:', error);
      }
    },
    confirmDeleteProduct(index) {
      this.deleteProductIndex = index + (this.currentPage - 1) * this.perPage;
      this.showDeleteModal = true;
    },
    async deleteProduct() {
      try {
        const token = localStorage.getItem('token');
        const productId = this.products[this.deleteProductIndex].id;
        await axios.delete(`http://localhost:8388/products/${productId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        this.products.splice(this.deleteProductIndex, 1);
        this.showDeleteModal = false;
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    },
    closeDeleteModal() {
      this.showDeleteModal = false;
    },
    changePage(page) {
      this.currentPage = page;
    },
    searchProducts() {
      this.currentPage = 1;
    },
    resetForm() {
      this.newProduct = {
        name: '',
        image: '',
        description: '',
        price: 0,
        rating: 0,
        quantity: 0
      };
      this.editProductData = {
        id: '',
        name: '',
        image: '',
        description: '',
        price: 0,
        rating: 0,
        quantity: 0
      };
    },
    async fetchProducts() {
      try {
        const response = await axios.get('http://localhost:8388/products');
        this.products = response.data;
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }
  },
  created() {
    this.fetchProducts();
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
</style>
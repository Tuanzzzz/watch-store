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
                <label for="productPrice">Giá sản phẩm:</label>
                <input type="number" v-model="newProduct.price" id="productPrice" class="form-control" required>
              </div>
              <div class="form-group">
                <label for="productDescription">Mô tả sản phẩm:</label>
                <textarea v-model="newProduct.description" id="productDescription" class="form-control" required></textarea>
              </div>
              <button type="submit" class="btn btn-success">Thêm sản phẩm</button>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div v-if="showAddProductForm" class="modal-backdrop fade show"></div>

    <table class="table table-striped">
      <thead>
        <tr>
          <th>Tên sản phẩm</th>
          <th>Giá</th>
          <th>Mô tả</th>
          <th>Hành động</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(product, index) in paginatedProducts" :key="index">
          <td>{{ product.name }}</td>
          <td>{{ product.price }}</td>
          <td>{{ product.description }}</td>
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
                <input type="text" v-model="editProductData.name" id="editProductName" class="form-control" required>
              </div>
              <div class="form-group">
                <label for="editProductPrice">Giá sản phẩm:</label>
                <input type="number" v-model="editProductData.price" id="editProductPrice" class="form-control" required>
              </div>
              <div class="form-group">
                <label for="editProductDescription">Mô tả sản phẩm:</label>
                <textarea v-model="editProductData.description" id="editProductDescription" class="form-control" required></textarea>
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
import Paginate from 'vuejs-paginate-next';

export default {
  name: 'ManageProduct',
  components: {
    Paginate
  },
  data() {
    return {
      products: [
        {
          name: 'Product 1',
          price: 1000,
          description: 'Description 1'
        },
        {
          name: 'Product 2',
          price: 2000,
          description: 'Description 2'
        },
        {
          name: 'Product 3',
          price: 3000,
          description: 'Description 3'
        },
        {
          name: 'Product 4',
          price: 4000,
          description: 'Description 4'
        },
        {
          name: 'Product 5',
          price: 5000,
          description: 'Description 5'
        },
        {
          name: 'Product 6',
          price: 6000,
          description: 'Description 6'
        },
        {
          name: 'Product 7',
          price: 7000,
          description: 'Description 7'
        },
        {
          name: 'Product 8',
          price: 8000,
          description: 'Description 8'
        },
        {
          name: 'Product 9',
          price: 9000,
          description: 'Description 9'
        },
        {
          name: 'Product 10',
          price: 10000,
          description: 'Description 10'
        },
        {
          name: 'Product 11',
          price: 11000,
          description: 'Description 11'
        },
        {
          name: 'Product 12',
          price: 12000,
          description: 'Description 12'
        }
      ],
      showAddProductForm: false,
      showEditProductForm: false,
      showDeleteModal: false,
      newProduct: {
        name: '',
        price: '',
        description: ''
      },
      editProductData: {
        name: '',
        price: '',
        description: ''
      },
      editProductIndex: null,
      deleteProductIndex: null,
      currentPage: 1,
      perPage: 5
    };
  },
  computed: {
    paginatedProducts() {
      const start = (this.currentPage - 1) * this.perPage;
      const end = start + this.perPage;
      return this.products.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.products.length / this.perPage);
    }
  },
  methods: {
    toggleAddProductForm() {
      this.showAddProductForm = !this.showAddProductForm;
    },
    addProduct() {
      this.products.push({ ...this.newProduct });
      this.newProduct.name = '';
      this.newProduct.price = '';
      this.newProduct.description = '';
      this.showAddProductForm = false;
    },
    toggleEditProductForm() {
      this.showEditProductForm = !this.showEditProductForm;
    },
    editProduct(index) {
      this.editProductIndex = index + (this.currentPage - 1) * this.perPage;
      this.editProductData = { ...this.products[this.editProductIndex] };
      this.showEditProductForm = true;
    },
    updateProduct() {
      this.$set(this.products, this.editProductIndex, { ...this.editProductData });
      this.editProductData.name = '';
      this.editProductData.price = '';
      this.editProductData.description = '';
      this.showEditProductForm = false;
    },
    confirmDeleteProduct(index) {
      this.deleteProductIndex = index + (this.currentPage - 1) * this.perPage;
      this.showDeleteModal = true;
    },
    deleteProduct() {
      this.products.splice(this.deleteProductIndex, 1);
      this.showDeleteModal = false;
    },
    closeDeleteModal() {
      this.showDeleteModal = false;
    },
    changePage(page) {
      this.currentPage = page;
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
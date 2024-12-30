<template>
   <NavbarItem />
  <div class="blog-list">
   
    <div class="container">
      <h1>Kiến thức đồng hồ</h1>
      <div class="blogs">
      
        <div class="row">
        <div class="col-lg-8">
          <BlogItem
          v-for="(blog, index) in paginatedBlogs" 
          :key="index" 
          :id="blog.blogId"
          :imgSrc="blog.hinhAnh" 
          :title="blog.title" 
          :description="blog.exceptBlog"
          :createdAt="formatDate(blog.createDate)"
          />
        </div>
      </div>
      </div>
      <div class="pagination">
        <button 
          @click="currentPage--" 
          :disabled="currentPage === 1"
        >
          Trước
        </button>
        <span>Trang {{ currentPage }} / {{ totalPages }}</span>
        <button 
          @click="currentPage++" 
          :disabled="currentPage === totalPages"
        >
          Tiếp
        </button>
      </div>
    </div>
    
  </div>
  <Footer />
</template>

<script>
import NavbarItem from './NavbarItem.vue';
import BlogItem from './blog-item.vue';
import Footer from './footer.vue';

export default {
  name: 'BlogList',
  components: { NavbarItem, BlogItem, Footer },
  data() {
    return {
      blogs: [],
      currentPage: 1,
      blogsPerPage: 7,
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.blogs.length / this.blogsPerPage);
    },
    paginatedBlogs() {
      const start = (this.currentPage - 1) * this.blogsPerPage;
      return this.blogs.slice(start, start + this.blogsPerPage);
    }
  },
  async created() {
    try {
      const response = await fetch('http://localhost:8388/blogs');
      if (response.ok) {
        this.blogs = await response.json();
      } else {
        console.error('Failed to fetch blogs:', response.status);
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  },
  methods: {
    formatDate(date) {
      const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
      return new Date(date).toLocaleDateString('vi-VN', options);
    }
  }
};
</script>

<style scoped>
.blog-list {
  width: 1024px;
  margin: 0 auto;
}

.blogs {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.pagination button {
  padding: 5px 10px;
  margin: 0 5px;
  border: 1px solid #ccc;
  background: #fff;
  cursor: pointer;
}

.pagination button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.pagination span {
  font-size: 1.2em;
}
</style>
<template>
  <div class="blog-box">
    <div class="container">
      <h2>KIẾN THỨC ĐỒNG HỒ</h2>
      <div class="row">
        <div class="col-lg-8">
          <BlogItem
            v-for="(blog, index) in blogs.slice(0, 4)" 
            :key="index" 
            :imgSrc="blog.hinhAnh" 
            :title="blog.title" 
            :description="blog.exceptBlog"
            :createdAt="formatDate(blog.createDate)"
          />
        </div>
      </div>
    </div>
    <div class="view-all-container">
      <router-link to="/blogList">
        <button class="view-all-button">View All</button>
      </router-link>
    </div>
  </div>
</template>

<script>
import BlogItem from './blog-item.vue';

export default {
  name: 'BlogBox',
  components: { BlogItem },
  data() {
    return {
      blogs: [],
    };
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
.container {
  margin-top: 20px;
}

.blog-box {
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  margin-bottom: 20px;
  font-size: 2em;
  color: #333;
}

.row {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.col-lg-8 {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.view-all-container {
  text-align: center;
  margin-top: 20px;
}

.view-all-button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.view-all-button:hover {
  background-color: #0056b3;
}
</style>
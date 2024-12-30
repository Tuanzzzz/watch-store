<template>
    <div class="container">
      <h1>Chi tiết bài viết</h1>
      <div v-if="blog">
        <div class="row blog-detail">
          <div class="col-12 col-md-6">
            <img :src="blog.hinhAnh" class="img-fluid" alt="Blog image" />
          </div>
          <div class="col-12 col-md-6 information">
            <h2>{{ blog.title }}</h2>
            <p class="created-at">{{ formatDate(blog.createDate) }}</p>
            <p>{{ blog.decription }}</p>
          </div>
        </div>
      </div>
      <div v-else>
        <p>Đang tải thông tin bài viết...</p>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'BlogDetail',
    props: ['id'], // Get blog ID from the router
    data() {
      return {
        blog: null, // Blog data
      };
    },
    methods: {
      async fetchBlog() {
        try {
          const response = await axios.get(`http://localhost:8388/blogs/${this.id}`);
          this.blog = response.data;
        } catch (error) {
          console.error('Lỗi khi lấy bài viết:', error);
        }
      },
      formatDate(date) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(date).toLocaleDateString('vi-VN', options);
      },
    },
    watch: {
      id: 'fetchBlog', // Re-fetch blog if the id changes
    },
    created() {
      this.fetchBlog();
    },
  };
  </script>
  
  <style scoped>
  .container {
    margin-top: 20px;
  }
  .created-at {
    font-size: 16px;
    color: gray;
    margin-bottom: 20px;
  }
  </style>
  
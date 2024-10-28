<template>
    <NavbarItem />
    <div class="container">
      <div class="row">
        <div class="col-12 col-md-10 ">
            <h1>Kien thuc dong ho</h1>
          <blogItem
            v-for="(blog, index) in blogs"
            :key="index"
            :imgSrc="blog.imgSrc"
            :title="blog.title"
            :author="blog.author"
            :description="blog.description"
          />
        </div>
      </div>
    </div>
    <Footer />
  </template>
  
  <script>
  import NavbarItem from './NavbarItem.vue';
  import blogItem from './blog-item.vue';
  import Footer from './footer.vue';
  export default {
    name : 'BlogList',
    components: {
        blogItem,
        NavbarItem,
        Footer
    },
    data() {
      return {
        blogs: [
          {
            imgSrc: 'blog1.webp',
            title: 'Blog Title 1',
            author: 'Author 1',
            description: 'Description for blog 1'
          },
          {
            imgSrc: 'blog2.webp',
            title: 'Blog Title 2',
            author: 'Author 2',
            description: 'Description for blog 2'
          },
          {
            imgSrc: 'blog1.webp',
            title: 'Blog Title 1',
            author: 'Author 1',
            description: 'Description for blog 1'
          },
          {
            imgSrc: 'blog2.webp',
            title: 'Blog Title 2',
            author: 'Author 2',
            description: 'Description for blog 2'
          },
          {
            imgSrc: 'blog1.webp',
            title: 'Blog Title 1',
            author: 'Author 1',
            description: 'Description for blog 1'
          },
          {
            imgSrc: 'blog2.webp',
            title: 'Blog Title 2',
            author: 'Author 2',
            description: 'Description for blog 2'
          },
          {
            imgSrc: 'blog1.webp',
            title: 'Blog Title 1',
            author: 'Author 1',
            description: 'Description for blog 1'
          },
          {
            imgSrc: 'blog2.webp',
            title: 'Blog Title 2',
            author: 'Author 2',
            description: 'Description for blog 2'
          }
          
        ]
      };
    }
  };
  </script>
  
<style>
.container {
  width: 1024px;
}

.blog-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 5px;
  background-color: #f9f9f9;
  width: 100%;
}

.image-container {
  flex-shrink: 0;
  margin-right: 20px;
}

.image-container .image {
  width: 165px; /* Adjust the width to your preference */
  height: auto; /* Keep the aspect ratio */
  border-radius: 5px;
  object-fit: cover; /* Ensures the image covers the space while maintaining aspect ratio */
}

.content {
  flex-grow: 1;
  text-align: left;
}

.title {
  font-size: 1.2em;
  font-weight: bold;
  margin-bottom: 10px;
}

.author {
  font-size: 0.9em;
  color: #555;
  margin-bottom: 10px;
}

.description {
  font-size: 1em;
  color: #333;
}

  </style>
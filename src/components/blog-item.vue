<template>
    <div class="blog-item">
        <div class="image-container">
            <img class="image" :src="imgSrc" alt="blog image">
        </div>
        <div class="content">
            <p class="title">{{ title }}</p>
            <p class="author">{{ author }}</p>
            <p class="description">{{ description }}</p>
        </div>
    </div>
</template>
  
  <script>
  export default {
    name: 'BlogItem',
    props: {
      imgSrc: {
        type: String,
        required: true
      },
      title: {
        type: String,
        required: true
      },
      author: {
        type: String,
      },
      description: {
        type: String,
      }
    }
  }
  </script>

<style scoped>
</style>
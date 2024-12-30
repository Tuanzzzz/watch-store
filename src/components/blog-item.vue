<template>
  <div class="blog-item">
    <router-link :to="`/blogs/${id}`" class="blog-link">
      <div class="image-container">
        <img class="image" :src="imgSrc" alt="Blog image">
      </div>
      <div class="content">
        <p class="title">{{ title }}</p>
        <p class="createdat">{{ createdAt }}</p>
        <p class="description">{{ description }}</p>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'BlogItem',
  props: {
    id: {
      type: String,
      required: true,
    },
    imgSrc: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    createdAt: {
      type: String,
      required: true
    }
  }
};
</script>

<style scoped>
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

.blog-link {
  display: flex;
  text-decoration: none;
  color: inherit;
}

.image-container {
  flex-shrink: 0;
  margin-right: 20px;
}

.image-container .image {
  width: 165px;
  height: auto;
  border-radius: 5px;
  object-fit: cover;
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

.createdat {
  font-size: 0.9em;
  color: #666;
  margin-bottom: 10px;
}

.description {
  font-size: 1em;
  color: #333;
}
</style>
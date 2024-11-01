<template>
  <div class="container-fluid">
    <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
      <ol class="carousel-indicators">
        <li v-for="(slide, index) in banners" :key="index" :data-target="'#carouselExampleIndicators'" :data-slide-to="index" :class="{ active: index === 0 }"></li>
      </ol>
      <div class="carousel-inner">
        <div v-for="(slide, index) in banners" :key="index" :class="['carousel-item', { active: index === 0 }]">
          <img class="d-block w-100" :src="slide.imgSrc" :alt="`Slide ${index + 1}`">
        </div>
      </div>
      <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
      </a>
      <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
      </a>
    </div>
  </div>
  </template>
  
  <script>
  export default {
    name: 'QuangCao',
    data() {
      return {
        banners: [
          { id: 1, imgSrc: 'banner1.webp' },
          { id: 2, imgSrc: 'banner2.webp' },
          { id: 3, imgSrc: 'banner3.webp' }
        ]
      };
    }
  }
  </script>
  
  <style scoped>
  .carousel-item img {
    max-height: 550px; /* Adjust the height as needed */
    object-fit: cover;
  }
  </style>
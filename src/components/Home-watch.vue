<template>
    <div>
      <NavbarItem/>
      <QuangCao/>
      <div class="container">
        <StrengthBlock />
        <div class="sale1">
          <div>
            <img src="sale1.webp" alt="sale">
          </div>
          <div class="time_event">
            <div id="sale-dow-hotdeal" class="timeproducts_event" data-time="Oct 22 2024 23:59:00">
              <span class="textt texttt">Chỉ còn:  </span>
              <div class="time_itm">
                <span id="day_h" class="time_1 day_time time">2n</span>
              </div>
              :
              <div class="time_itm">
                <span id="hours_h" class="time_1 hour_time time">01g</span>
              </div>
              :
              <div class="time_itm">
                <span id="min_h" class="time_1 minute_time time">05p</span>
              </div>
            </div>
          </div>
          <div>
            <ProductBox carouselId="carousel1"/>
            <div class="text-center mt-4 viewList">
              <a href="productList">Khám phá xu hướng 2024</a>
            </div>
          </div>
          
          <trend/>

          <Collection/>
          <h1>ĐỒNG HỒ CAO CẤP</h1>
          <ProductBox carouselId="carousel2"/>
          <Brand/>
          <h1>BỘ SƯU TẬP THEO MÙA</h1>
          <ProductBox carouselId="carousel3"/>
        </div>     
        <BlogBox />
        </div>
      <Footer />
    </div>
</template>
  
<script>
import NavbarItem from './NavbarItem.vue';
import StrengthBlock from './strength-block.vue';
import ProductBox from './Product-box.vue';
import BlogBox from './blog-box.vue';
import QuangCao from './quangcao.vue';
import trend from './trend.vue';
import Collection from './Collection.vue';
import Brand from './brand.vue';
import Footer from './footer.vue';
  export default {
    name: 'HomeWatch',
    components: {
      NavbarItem,
      QuangCao,
      StrengthBlock,
      ProductBox,
      BlogBox,
      trend,
      Collection,
      Brand,
      Footer
    }
  }
  </script>

<style scoped>
  .container{
    width: 1024px;
  }
  .viewList a{
    padding: 10px 20px;
    background-color: aliceblue;
  }
</style>
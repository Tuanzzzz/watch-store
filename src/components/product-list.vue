<template>
    <NavbarItem />
    <div class="container">
        <quangcao />
        <ProductBox />
        <ProductBox />
        <ProductBox />
    </div>
    <Footer />
</template>

<script>
import NavbarItem from './NavbarItem.vue';
import Footer from './footer.vue';
import ProductBox from './Product-box.vue';
import quangcao from './quangcao.vue';
export default {
  name: 'ProductList',
  props: {
    
  },
  components: {
    NavbarItem,
    Footer,
    ProductBox,
    quangcao
  },
  data() {
    return {
        items: [
          
          
        ]
    }
  },
  methods: {
   
    
  }
}
</script>
<style scoped>
</style>
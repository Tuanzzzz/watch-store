<template>
  <NavbarItem />
  <div class="container">
    
    
    <div class="row product-detail">
      <div class="col-12 col-md-6">
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
      <div class="col-12 col-md-6 infomation">
        <div class="title">
          <h3>Frederique Constant FC-310MS5B6</h3>
        </div>
        <div class="price-par text-center">
          <div class='price_current' id="price" content="32793000">
            32.793.000₫	
          </div>
          <div class='price_old' id="price_old">39.040.000₫</div>
          <div class='discount' id="discount">-16%</div>
        </div>
        
        <div class="price_text">Giá trên chỉ là giá tham khảo, liên hệ để có giá tốt nhất</div>
        <span class="cate_name">Chính hãng từ: <strong>Frederique Constant</strong></span> - <span class="text_ext">Xuất xứ: <strong>Thụy Sỹ</strong></span>
        <div class="button_nb">
          <button class="btn btn-secondary" @click="addToCart">Thêm vào giỏ hàng</button>
          <button class="btn btn-primary">Mua ngay</button>
        </div>
        <div class="tab-title-charact cls">
          <div class="cat-title-main2" id="characteristic-label">
            <h2>
              Thông số sản phẩm - Frederique Constant FC-310MS5B6
            </h2>
          </div>
        </div>
        <div class='tab_content_characteristic'>
          <div class='characteristic_content'>
            <table class='charactestic_table' bordercolor="#EEE" cellpadding="7" width="100%">
              <tbody class="body_table">
                <tr class="item">
                  <td class="manufactory_name tr-0 itemt">
                    <b class='title_charactestic'>Thương hiệu:</b>
                    <span class='content_charactestic'>
                      <a href="" title="Frederique Constant">Frederique Constant</a>
                    </span>
                  </td>
                  <td class="tr-0 itemt">
                    <b class='title_charactestic'>Xuất xứ:</b>
                    <span class='content_charactestic'>Thụy Sỹ</span>
                  </td>
                </tr>
                <tr class="item">
                  <td class="tr-1 itemt">
                    <b class='title_charactestic'>Đối tượng:</b>
                    <span class='content_charactestic'>
                      <a href="/dong-ho-nam-chinh-hang-c1" title="Nam">Nam</a>
                    </span>
                  </td>
                  <td class="tr-0 itemt">
                    <b class='title_charactestic'>Kháng nước:</b>
                    <span class='content_charactestic'>5atm</span>
                  </td>
                </tr>
                <tr class="item">
                  <td class="tr-1 itemt">
                    <b class='title_charactestic'>Loại máy:</b>
                    <span class='content_charactestic'>Cơ tự động</span>
                  </td>
                  <td class="tr-0 itemt">
                    <b class='title_charactestic'>Chất liệu kính:</b>
                    <span class='content_charactestic'>Kính Sapphire</span>
                  </td>
                </tr>
                <tr class="item">
                  <td class="tr-1 itemt">
                    <b class='title_charactestic'>Chất liệu dây:</b>
                    <span class='content_charactestic'>Dây Da</span>
                  </td>
                  <td class="tr-0 itemt">
                    <b class='title_charactestic'>Size mặt:</b>
                    <span class='content_charactestic'>40mm</span>
                  </td>
                </tr>
                <tr class="item">
                  <td class="tr-1 itemt">
                    <b class='title_charactestic'>Độ dày:</b>
                    <span class='content_charactestic'>10.20mm</span>
                  </td>
                  <td class="tr-0 itemt">
                    <b class='title_charactestic'>Khoảng trữ cót:</b>
                    <span class='content_charactestic'>38 tiếng</span>
                  </td>
                </tr>
                <tr class="item">
                  <td class="tr-1 itemt">
                    <b class='title_charactestic'>Tiện ích:</b>
                    <span class='content_charactestic'>Giờ, phút, giây</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <UserComment />
    
  </div>
  <Footer />
</template>

<script>
import NavbarItem from './NavbarItem.vue';
import UserComment from './User-Comment.vue';
import Footer from './footer.vue';
export default {
  name: 'ProductDetail',
  components: {
    NavbarItem,
    UserComment,
    Footer
  },
  data() {
    return {
      banners: [
        { imgSrc: '1.jpeg' },
        { imgSrc: '2.jpeg' },
        { imgSrc: '3.jpeg' }
      ],
      cartItems: []
    };
  },
  methods: {
    addToCart() {
      const product = {
        id: 'FC-310MS5B6',
        name: 'Frederique Constant FC-310MS5B6',
        price: 32793000,
        brand: 'Frederique Constant',
        quantity: 1
      };
      this.cartItems.push(product);
      this.saveCart();
    },
    saveCart() {
      localStorage.setItem('cart', JSON.stringify(this.cartItems));
    },
    loadCart() {
      const cart = localStorage.getItem('cart');
      if (cart) {
        this.cartItems = JSON.parse(cart);
      }
    }
  },
  created() {
    this.loadCart();
  }
}
</script>

<style scoped>
.container {
  padding-top: 40px;
}
.comments{
  text-align: left;
}
.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.product-detail {
  display: flex;
  flex-wrap: wrap;
}
.infomation{
  text-align: left;
}
.price-par{
  display: flex;
}
.price-par div{
  margin-right: 10px;
}
.price_current {
  font-size: 24px;
  font-weight: bold;
  color: red;
  margin-bottom: 10px;
}
.price_old {
  font-size: 20px;
  text-decoration: line-through;
  color: gray;
  margin-bottom: 10px;
}
.discount {
  font-size: 18px;
  color: green;
  margin-bottom: 10px;
}
.price_text {
  font-size: 14px;
  color: #555;
  margin-bottom: 10px;
}
.cate_name, .text_ext {
  font-size: 14px;
  color: #333;
}
.tab-title-charact {
  margin-top: 20px;
}
.cat-title-main2 h2 {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}
.charactestic_table {
  width: 100%;
  border-collapse: collapse;
}
.charactestic_table .item {
  border-bottom: 1px solid #eee;
}
.charactestic_table .title_charactestic {
  font-weight: bold;
  color: #333;
}
.charactestic_table .content_charactestic {
  color: #555;
}
.tab_content_characteristic {
  margin-top: 30px;
}
.button_nb {
  margin-top: 30px;
}
.button_nb button{
  margin-right: 20px;
}
</style>
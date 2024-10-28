<template>
    <div class="container my-4">
      <div :id="carouselId" class="carousel slide" data-ride="carousel">
        <div class="carousel-inner">
          <div
            v-for="(group, groupIndex) in groupedItems"
            :key="groupIndex"
            :class="['carousel-item', { active: groupIndex === 0 }]"
          >
            <div class="row">
              <ProductItem
                v-for="(item, index) in group"
                :key="index"
                :imgSrc="item.imgSrc"
                :name="item.name"
                :price="item.price"
                :oldPrice="item.oldPrice"
                :discount="item.discount"
                :rating="item.rating"
                class="col-6 col-md-3"
              />
            </div>
          </div>
        </div>
        <a class="carousel-control-prev" :href="'#' + carouselId" role="button" data-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
        </a>
        <a class="carousel-control-next" :href="'#' + carouselId" role="button" data-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
        </a>
      </div>
    </div>
  </template>
  
  
  <script>
  import ProductItem from './product-item.vue';
  
  export default {
    name: 'ProductBox',
    components: {
      ProductItem
    },
    props:{
        carouselId:{
            type: String,
            required: true
        }
    },
    data() {
      return {
        items: [
          {
            imgSrc: '1.jpeg',
            name: 'Product 1',
            price: '100.000',
            oldPrice: '200.000',
            discount: '50%',
            rating: 4
          },
          {
            imgSrc: '2.jpeg',
            name: 'Product 2',
            price: '200.000',
            oldPrice: '300.000',
            discount: '30%',
            rating: 3
          },
          {
            imgSrc: '3.jpeg',
            name: 'Product 3',
            price: '300.000',
            oldPrice: '400.000',
            discount: '25%',
            rating: 5
          },
          {
            imgSrc: '4.jpeg',
            name: 'Product 4',
            price: '400.000',
            oldPrice: '500.000',
            discount: '20%',
            rating: 2
          },
          {
            imgSrc: '5.jpeg',
            name: 'Product 5',
            price: '500.000',
            oldPrice: '600.000',
            discount: '15%',
            rating: 4
          },
          {
            imgSrc: '6.jpeg',
            name: 'Product 6',
            price: '600.000',
            oldPrice: '700.000',
            discount: '10%',
            rating: 3
          },
          {
            imgSrc: '7.jpeg',
            name: 'Product 7',
            price: '700.000',
            oldPrice: '800.000',
            discount: '5%',
            rating: 5
          },
          {
            imgSrc: '8.jpeg',
            name: 'Product 8',
            price: '800.000',
            oldPrice: '900.000',
            discount: '2%',
            rating: 2
          }
        ]
      };
    },
    computed: {
      groupedItems() {
        const chunkSize = 4;
        const groups = [];
        for (let i = 0; i < this.items.length; i += chunkSize) {
          groups.push(this.items.slice(i, i + chunkSize));
        }
        return groups;
      }
    }
  };
  </script>
  
<style>
.product-card {
  border: 1px solid #ddd;
  padding: 15px;
  text-align: center;
  position: relative;
  background-color: #fff;
  border-radius: 5px;
  margin-bottom: 20px;
}

.product-card img {
  width: 100%;
  height: auto;
  height: 150px;
  border-radius: 5px;
  margin-bottom: 10px;
}

.price {
  color: red;
  font-weight: bold;
  margin-top: 10px;
}

.old-price {
  text-decoration: line-through;
  color: #999;
  margin-top: 5px;
}

.discount {
  color: red;
  font-weight: bold;
  margin-top: 5px;
}

.stock-info {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: #ff0000;
  color: #fff;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 12px;
}

.stars {
  color: orange;
  margin-top: 10px;
}
.carousel-control-prev,
.carousel-control-next {
  background-color: #333;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  opacity: 1; /* Đảm bảo nút không bị mờ */
  top: 50%;
}

  </style>
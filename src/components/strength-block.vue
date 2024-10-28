<template>
    <div class="strength-block">
      <div class="item" v-for="(item, index) in items" :key="index">
        <div class="svg"></div>
        <div class="content-right">
          <div class="title_ctn">{{ item.title }}</div>
          <p>{{ item.description }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'StrengthBlock',
    data() {
      return {
        items: [
          { title: 'Mẫu mã đa dạng nhất', description: 'Hoàn tiền nếu phát hiện bán hàng giả' },
          { title: 'Mẫu mã đa dạng nhất', description: 'Hoàn tiền nếu phát hiện bán hàng giả' },
          { title: 'Mẫu mã đa dạng nhất', description: 'Hoàn tiền nếu phát hiện bán hàng giả' },
          { title: 'Mẫu mã đa dạng nhất', description: 'Hoàn tiền nếu phát hiện bán hàng giả' },
          { title: 'Mẫu mã đa dạng nhất', description: 'Hoàn tiền nếu phát hiện bán hàng giả' }
        ]
      };
    }
  };
  </script>
  
  <style scoped>
  .strength-block {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-bottom: 20px;
  }
  
  .item {
    width: calc(20% - 10px);
    background: #fdaf17;
    align-items: center;
    border-radius: 8px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin: 5px;
  }
  
  .item .svg {
    width: 17%;
    position: relative;
    height: 64px;
  }
  
  /* Mobile View */
  @media (max-width: 768px) {
    .strength-block {
      display: flex;
      flex-wrap: nowrap;
      overflow-x: auto; /* Horizontal scroll */
      scroll-snap-type: x mandatory; /* Smooth scrolling with snapping */
    }
  
    .item {
      flex: 0 0 calc(50% - 10px); /* Each item takes 50% of the width minus the gap */
      margin: 5px;
      scroll-snap-align: start; /* Snapping point for each item */
    }
  }
  </style>
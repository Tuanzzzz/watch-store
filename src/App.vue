<template>
  <div id="app">
    <router-view />
  </div>
</template>


<script>


export default {
  name: 'App',
  components: {
    
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
#app .container{
  margin: 0px auto;
    max-width: 100%;
  width: 1200px !important;
}
.sale1 img{
  transform: scale(1) !important;
    width: 100%;
    height: auto;
    display: block;
    vertical-align: middle;
}
#sale-dow-hotdeal {
    width: 350px;
    margin: 0px auto;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px 10px;
    background-color: #555;
    border-radius: 50px;
    margin-bottom: 10px;
    max-width: 100%;
    font-size: 16px;
    color: #fff;
}
</style>

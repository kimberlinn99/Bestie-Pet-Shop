<template>
  <div class="grid-container">
    <v-card tile flat 
      v-for="product in productList" 
      :key="product._id"
      class="px-5 py-2 mb-5 text-center"
    >
      <product-card :product="product"/>
    </v-card>
  </div>
</template>

<script>
import ProductCard from './ProductCard'

export default {
  props: ['productList'],
  components: {
    ProductCard
  }  
}
</script>

<style lang="scss" scoped>
.grid-container{
  display: grid;
  grid-template-columns: repeat(5, 200px);
}
@media only screen and (max-width: 1200px){
  .grid-container{
    grid-template-columns: repeat(4, 1fr);
    margin: 0 auto;
  }
}
@media only screen and (max-width: 900px){
  .grid-container{
    grid-template-columns: repeat(3, 1fr);
  }
}
@media only screen and (max-width: 700px){
  .grid-container{
    grid-template-columns: repeat(2, 1fr);
  }
}
@media only screen and (max-width: 600px){
  .grid-container{
    width: 70%;
    grid-template-columns: 1fr;
  }
}
@media only screen and (max-width: 320px){
  .grid-container{
    margin-left: 25px;
  }
}
</style>
<template>
  <v-card tile flat class="pa-5">
    <div class="grid-container">
      <div class="image">
         <img
            :src="getProductImage(product.productImage)"
            :alt="product.name"
            loading="lazy"
          />
      </div>
      <div>  
        <product-info :product="product" />
        <nuxt-link :to="`/products/animals/${product.animal}/${product.name}`">
          <div class="view-more-details">
            View More Details
          </div>
        </nuxt-link>
      </div>
    </div>
  </v-card>
</template>

<script>
import ProductInfo from './ProductInfo'

export default {
  props: ['product'],
  components: {
    ProductInfo
  },
  methods: {
    getProductImage(url){
      return `http://localhost:8080/${url}`
    }
  }
}
</script>

<style lang="scss" scoped>
.grid-container{
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 20px;
}
.image img{
  width: 100%;
}
.view-more-details{
  font-size: 0.6rem;
  text-decoration: underline;
  margin: 10px 0;
}
</style>
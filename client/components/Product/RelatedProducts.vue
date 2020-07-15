<template>
  <div class="related-products">
    <h3>Related Products</h3>
    <v-slide-group show-arrows>
      <v-slide-item
        v-for="product in otherProducts"
        :key="product._id"
        class="slide-image"
      >
        <product-card :product="product" />
      </v-slide-item>
    </v-slide-group>
  </div>
</template>

<script>
import ProductCard from './ProductCard'

export default {
  components: {
    ProductCard
  },
  computed: {
    otherProducts(){
      return this.$store.state.product.otherProducts
    }
  }
}
</script>

<style lang="scss" scoped>
.related-products{
  margin-bottom: 50px;
}
.related-products h3{
  color: var(--primary-color);
  text-align: center;
  margin-bottom: 30px;
}
.slide-image{
  width: 130px;
  margin: 0 15px;
}
@media only screen and (max-width: 700px){
  .slide-image{
    width: 250px !important;
    margin-left: 0;
    margin-right: 20px;
  }
}
</style>
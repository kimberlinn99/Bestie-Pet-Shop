<template>
  <div class="wide-container">
    <h1>Our Pets' Choice</h1>
    <div class="product-container">
      <product-card-container :productList="products"/>
    </div>
    <div class="text-center mb-5">
      <home-page-button 
        title="Shop All" 
        linkTo="products/shop-all"
      />
    </div>
  </div>
</template>

<script>
import ProductCardContainer from '@/components/Product/ProductCardContainer'
import HomePageButton from './HomePageButton'

export default {
  components: {
    ProductCardContainer,
    HomePageButton
  },
  created() {
    this.$store.dispatch('product/getLimitedProducts', 5)
  },
  computed: {
    products () {
      return this.$store.state.product.products
    }
  }
}
</script>

<style lang="scss" scoped>
h1{
  color: var(--primary-color);
  text-align: center;
  margin: 50px;
}
.product-container{
  margin-left: 20px;
}
@media only screen and (max-width: 700px){
  .product-container{
    margin-left: 0;
    padding-right: 140px;
  }
}
</style>
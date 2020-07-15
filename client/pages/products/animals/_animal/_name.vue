<template>
  <div class="narrow-container">
    <div class="nav-bar text-capitalize text-caption my-5 pt-5">
      <nuxt-link to="/">Home</nuxt-link> /
      <nuxt-link :to="`/products/animals/${animal}`">
        {{ animal }}
      </nuxt-link> /
      <span>{{ name }}</span>
    </div>
    <div class="grid-container">
      <div class="image">
        <img
          :src="getProductImage(product.productImage)"
          :alt="product.name"
          loading="lazy"
        />
      </div>
      <product-info :product="product" />
      <div class="product-description">
        <!-- Product description should be dynamic -->
        <p class="text-caption">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis numquam illum accusantium deserunt suscipit, aspernatur nulla quisquam minima obcaecati delectus hic dolorum, repudiandae eum explicabo odit et modi quia, excepturi a eligendi sequi labore soluta ad quam. Commodi, ullam est?
        </p>
      </div>
      <div class="panel-section mr-5 pr-5">
        <v-expansion-panels flat class="mt-5">
          <v-expansion-panel v-for="header in panelHeader" :key="header">
            <v-expansion-panel-header 
              expand-icon="mdi-menu-down" 
              class="pa-0 text-uppercase font-weight-bold panel-header"
            >
              {{ header }}
            </v-expansion-panel-header>
            <v-expansion-panel-content class="panel-content">
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita ab illo ducimus sit minus quas, doloribus labore ipsa natus harum, consequatur deleniti fugit, vel rem. Vitae doloribus odio, quae ducimus ab ipsa ut quidem dolore, quas doloremque dolorem perferendis nobis.</p>
            </v-expansion-panel-content>
            <v-divider></v-divider>
          </v-expansion-panel>
        </v-expansion-panels>
      </div>
    </div>
    <related-products />
  </div>
</template>

<script>
import AddToCartButton from '@/components/AddToCartButton'
import RelatedProducts from '@/components/Product/RelatedProducts'
import ProductInfo from '@/components/Product/ProductInfo'

export default {
  components: {
    AddToCartButton,
    RelatedProducts,
    ProductInfo
  },
  data() {
    return {
      animal: this.$route.params.animal,
      name: this.$route.params.name,
      panelHeader: ['product info', 'return & refund policy', 'shipping info']
    }
  },
  created() {
    this.$store.dispatch('product/getSingleAnimalProduct', {
      animalType: this.animal,
      name: this.name
    })
  },
  computed: {
    product(){
      return this.$store.state.product.oneProduct
    }
  },
  methods: {
    getProductImage(url){
      return `http://localhost:8080/${url}`
    } 
  },
  head() {
    return{
      title: this.name
    }
  }
}
</script>

<style lang="scss" scoped>
.grid-container{
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(3, min-content);
  column-gap: 30px;
  margin-top: 50px;
}
.image{
  grid-row: 1/3;
}
.image img{
  width: 100%;
}
.product-description{
  grid-row: 3/5;
}
.product-description p{
  margin-top: 16px;
  margin-bottom: 100px;
}
.panel-section{
  grid-row: 2/5;
}
.panel-content p{
  margin: 0;
}
::v-deep{
  .v-expansion-panel-content__wrap{
    padding: 0;
    padding-bottom: 10px;
  }
}
@media only screen and (max-width: 768px){
  .narrow-container{
    width: 90%;
  }
}
@media only screen and (max-width: 500px){
  .narrow-container{
    width: 85%;
  }
  .grid-container{
    display: block;
  }
  .product-description p{
    margin-top: 25px;
    margin-bottom: 16px;
  }
  .panel-section{
    margin-bottom: 30px;
    padding-right: 0 !important;
    width: 100%;
  }
}
</style>
<template>
  <div>
    <!-- Image -->
      <div class="image">
        <nuxt-link :to="`/products/animals/${product.animal}/${product.name}`">
          <img
            :src="getProductImage(product.productImage)"
            :alt="product.name"
            loading="lazy"
          />
        </nuxt-link>
        <!-- Dialog -->
        <div class="quick-view">
          <v-dialog
            v-model="dialog"
            width="700"
          >
            <template v-slot:activator="{ on, attrs }">
              <div class="overlay" v-bind="attrs" v-on="on">
                <p>Quick view</p>
              </div>
            </template>
            <product-dialog :product="product" />
          </v-dialog>
        </div>
        <div v-if="product.isOnSales" class="sale-tag">
          <span>Sale</span>
        </div>
      </div>

    <!-- Name -->
    <p class="font-weight-bold my-1">{{ product.name }}</p>
    
    <!-- Price -->
    <p class="text-caption">
      <span v-if="product.previousPrice != 0" class="previous-price">
        ${{ product.previousPrice }}
      </span>
      &nbsp;${{ product.currentPrice }}
    </p>

    <!-- Quantity input -->
    <div class="input-quantity">
      <v-icon 
        small 
        color="black" 
        id="minus"
        aria-label="minus"
        @click="quantity--; checkMinQuantity();"
      >
        mdi-minus
      </v-icon>
      <span class="text-center">{{ quantity }}</span>
      <v-icon 
        small 
        color="black" 
        id="plus"
        aria-label="plus"
        @click="quantity++"  
      >
        mdi-plus
      </v-icon>
    </div>

    <!-- Add cart  -->
    <add-to-cart-button :product="product" :quantity="quantity" />
  </div>
</template>

<script>
import AddToCartButton from '@/components/AddToCartButton'
import ProductDialog from './ProductDialog'

export default {
  props: ['product'],
  components: {
    AddToCartButton,
    ProductDialog
  },
  data() {
    return {
      quantity: 1,
      dialog: false
    }
  },
  methods: {
    updateOrder(quantity, product){
      this.$store.commit('sessionStorage/updateOrder', {quantity, product})
      this.$store.commit('sessionStorage/computeSubTotal')
    },
    getProductImage(url){
      return `http://localhost:8080/${url}`
    },
    checkMinQuantity(){
      if(this.quantity < 1)
        this.quantity = 1
    }
  }
}
</script>

<style lang="scss" scoped>
.input-quantity{
  display: block;
  border: 2px solid black;
}
.input-quantity .v-icon{
  padding: 5px;
}
.input-quantity #minus{
  float: left;
}
.input-quantity #plus{
  float: right;
}
.previous-price{
  text-decoration: line-through;
  color: grey;
}
.sale-tag{
  background-color: var(--secondary-color);
  color: white;
  font-size: 0.6rem;
  padding: 3px 15px;
  position: absolute;
  top: 0;
}
img{
  width: 100%;
}
.image{
  position: relative;
  cursor: pointer;
}
.image:hover .overlay {
  height: 20%;
}
.image .overlay{
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color:white;
  opacity: 0.5;
  overflow: hidden;
  width: 100%;
  height: 0;
  transition: .5s ease;
}
.overlay p{
  font-size: 0.7rem;
  color: black;
  padding-top: 5px;
}
@media only screen and (max-width: 1100px){
  .quick-view{
    display: none;
  }
}
@media only screen and (max-width: 700px){
  img{
    width: 250px;
    height: 200px;
  }
}
</style>
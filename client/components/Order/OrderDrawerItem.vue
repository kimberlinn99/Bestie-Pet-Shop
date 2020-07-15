<template>
  <div class="grid-container">
    <div>
      <img
        :src="getProductImage(order.productImage)"
        :alt="order.name"
        loading="lazy"
      />
    </div>
    <div class="product-info">
      <h5>{{ order.name }}</h5>
      <p>
        <span v-if="order.previousPrice != 0" class="previous-price">
          ${{ order.previousPrice }}&nbsp;
        </span>
        ${{ order.currentPrice }}
      </p>
      <div class="input-quantity">
        <v-icon 
          small 
          color="black" 
          id="minus"
          aria-label="minus"
          @click="newQuantity--; updateOrderQuantity(order); "
        >
          mdi-minus
        </v-icon>
        <span class="pl-1">{{ newQuantity || 1 }}</span>
        <v-icon 
          small 
          color="black" 
          id="plus"
          aria-label="plus"
          @click="newQuantity++; updateOrderQuantity(order); "  
        >
          mdi-plus
        </v-icon>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['order'],
  data(){
    return {
      newQuantity: 0
    }
  },
  methods: {
    getProductImage(url){
      return `http://localhost:8080/${url}`
    },
    updateOrderQuantity(order){
      if(this.newQuantity >= 1){
        this.$store.commit('sessionStorage/updateOrderQuantity', {
          order, 
          quantity: this.newQuantity 
        })
      } else if(this.newQuantity < 0){
        this.newQuantity = 1
        this.$store.commit('sessionStorage/updateOrderQuantity', { 
          order, 
          quantity: this.newQuantity 
        })
      }
      this.$store.commit('sessionStorage/computeSubTotal')
    }
  },
  mounted() {
    this.newQuantity = this.order.quantity
  }
}
</script>

<style lang="scss" scoped>
.grid-container{
  display: grid;
  grid-template-columns: 80px 90px;
  column-gap: 5px;
}
.product-info h5{
  font-size: 0.85rem;
  font-weight: 300;
}
.product-info p{
  font-size: 0.8rem;
  font-weight: 600;
  margin-top: 3px;
  margin-bottom: 5px;
}
.previous-price{
  text-decoration: line-through;
  color: grey;
}
img{
  width: 70px;
  height: 70px;
}
.input-quantity{
  border: 1px solid black;
  width: 70%;
  margin-bottom: 10px;
  font-size: 0.8rem;
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
.mdi-minus::before, .mdi-plus::before{
  font-size: 10px;
}
@media only screen and (max-width: 700px){
  .grid-container{
    column-gap: 10px;
  }
  .input-quantity{
    width: 18%;
  }
}
</style>
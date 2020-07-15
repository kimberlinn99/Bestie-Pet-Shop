<template>
  <div class="info-section mr-5 pr-5">
    <h3>{{ product.name }}</h3>
    <h4 class="price-section">
      <span v-if="product.previousPrice != 0" class="previous-price">
        ${{product.previousPrice}} &nbsp;
      </span>
      ${{ product.currentPrice }}
    </h4>
    <div class="quantity-section">
      <p class="text-body-2 mt-5 mb-1">Quantity</p>
      <input type="number" name="quantity" min="1" value="" v-model="quantity" @change="checkMinQuantity">
      <add-to-cart-button :product="product" :quantity="quantity" class="add-btn"/>
    </div>
  </div>
</template>

<script>
export default {
  props: ['product'],
  data() {
    return{
      quantity: 1,
    }
  },
  methods: {
    checkMinQuantity(){
      if(this.quantity < 1)
        this.quantity = 1
    }
  }
}
</script>

<style lang="scss" scoped>
.info-section h3{
  color: var(--primary-color);
  font-weight: 700;
  text-transform: capitalize;
}
.info-section .price-section{
  color: gray;
  margin-top: 20px;
}
.previous-price{
  text-decoration: line-through;
  color: rgb(165, 165, 165) !important;
  font-weight: 500;
}
input[type=number]{
  width: 70px;
  border: 2px solid rgb(190, 190, 190);
  border-radius: 3px;
  padding: 3px 7px;
  margin-top: 5px;
  outline: none;
}
.quantity-section .add-btn{
  height: 32px !important;
  font-weight: 500 !important;
  margin-top: 20px !important;
}
@media only screen and (max-width: 700px){
  .info-section{
    margin-top: 16px;
    margin-bottom: 30px;
    padding-right: 0 !important;
    width: 100%;
  }
  .price-section{
    margin: 0 !important;
  }
}
</style>
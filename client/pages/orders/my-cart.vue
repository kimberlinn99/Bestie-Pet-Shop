<template>
  <div class="narrow-container">
    <!-- Empty Cart -->
    <div v-if="myCart.length == 0" class="empty-cart">
      <h4>My Cart</h4>
      <v-divider></v-divider>
      <div class="box">
        <p>Cart is empty!</p>
        <nuxt-link to="/products/shop-all">Continue Shopping</nuxt-link>
      </div>
    </div>

    <!-- Not Empty Cart -->
    <div class="grid-container" v-if="myCart != null && myCart.length > 0">
      <div class="my-cart">
        <h4>My Cart</h4>
        <v-divider></v-divider>
        <div v-if="myCart != null">
          <v-card tile flat
            v-for="order in myCart"
            :key="order._id"
            class="my-5"
          >
            <v-icon class="close-icon" @click="removeOrder(order)">
              mdi-close
            </v-icon>
            <order-list :order="order" />
            <v-divider class="mt-3"></v-divider>
          </v-card>
        </div>
        <promo-code @applyCode="applyPromoCode" />
      </div>
      <div class="order-summary">
        <h4>Order Summary</h4>
        <v-divider></v-divider>
        <order-summary :promoCode="promoCode" />
      </div>
    </div>
  </div>
</template>

<script>
import OrderList from '@/components/Order/OrderList'
import OrderSummary from '@/components/Order/OrderSummary'
import PromoCode from '@/components/Order/PromoCode'

export default {
  head: {
    title: 'My Cart'
  },
  data(){
    return{
      promoCode: ''
    }
  },
  components: {
    OrderList,
    OrderSummary,
    PromoCode
  },
  methods: {
    removeOrder(order){
      this.$store.commit('sessionStorage/removeOrder', order)
      this.$store.commit('sessionStorage/computeSubTotal')
    },
    applyPromoCode(code){
      this.promoCode = code
    }
  },
  computed: {
    myCart(){
      return this.$store.state.sessionStorage.orders || null
    }
  }
}
</script>

<style lang="scss" scoped>
.grid-container{
  display: grid;
  grid-template-columns: 2fr 1fr;
  column-gap: 30px;
  margin-top: 50px;
}
.empty-cart{
  margin-top: 50px;
}
.box{
  width: 100%;
  height: 300px;
  text-align: center;
  padding-top: 100px;
}
.box p{
  margin-bottom: 5px;
}
.box a{
  text-decoration: underline;
}
h4{
  color: var(--secondary-color);
  margin-bottom: 10px;
}
.close-icon{
  float: right;
  font-size: 20px;
}
@media only screen and (max-width: 700px){
  .narrow-container{
    width: 80%;
  }
  .grid-container{
    grid-template-columns: 1fr;
    margin-top: 30px;
  }
}
</style>
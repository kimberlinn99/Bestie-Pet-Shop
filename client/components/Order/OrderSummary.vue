<template>
  <div class="order-summary">
    <div class="my-5">
      <p>Subtotal <span>${{ subTotal || 0 }}</span></p>
      <p>Shipping <span>FREE</span></p>
      <p v-if="promoCode != ''">Promo Code <span>{{ promoCode }}</span></p>
    </div>
    <v-divider></v-divider>
    <div class="total-price mt-5">
      <p>Total <span>${{ subTotal || 0 }}</span></p>
    </div>
    <v-btn block text tile class="checkout-btn" @click="checkoutOrder">
      <v-icon color="white" small class="mr-1">
        mdi-shopping
      </v-icon>
      Checkout
    </v-btn>
  </div>
</template>

<script>
export default {
  props: ['promoCode'],
  computed: {
    subTotal(){
      return this.$store.state.sessionStorage.subTotal
    }
  },
  methods: {
    async checkoutOrder(){
      const user = this.$store.state.sessionStorage.user
      if(Object.keys(user).length){
        const response = (await this.$axios.$post(`/user/new/order/${user.id}`, {
          orders: this.$store.state.sessionStorage.orders,
          totalPrice: this.$store.state.sessionStorage.subTotal
        }))
      } else{
        const response = (await this.$axios.$post('/new/order', {
          orders: this.$store.state.sessionStorage.orders,
          totalPrice: this.$store.state.sessionStorage.subTotal
        }))
      }
      alert('Thank you for your order')
      this.$store.commit('sessionStorage/clearOrders')
    }
  }
}
</script>

<style lang="scss" scoped>
.order-summary{
  margin-bottom: 50px;
}
p, span, .checkout-btn{
  font-size: 0.8rem;
}
p{
  margin-bottom: 5px;
}
span{
  float: right;
}
.total-price p, .total-price span{
  font-size: 1rem;
}
.checkout-btn{
  background-color: var(--primary-color) !important;
  color: white;
  text-transform: capitalize;
  font-weight: 400;
  margin-top: 20px;
}
.success-msg{
  font-size: 0.7rem;
}
@media only screen and (max-width: 700px){
  .checkout-btn{
    margin-bottom: 50px;
  }
}
</style>
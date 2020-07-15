<template>
  <v-btn tile depressed block
    height="25"
    class="text-center my-2 text-capitalize text-caption white--text font-weight-light"
    @click="updateOrder(quantity, product)"  
  >
    Add To Cart
  </v-btn>
</template>

<script>

export default {
  props: ['product', 'quantity'],
  methods: {
    updateOrder(quantity, product){
      this.$store.commit('sessionStorage/updateOrder', {quantity, product})
      this.$store.commit('sessionStorage/computeSubTotal')
      this.$store.commit('product/updateDrawerStatus')
    }
  }
}
</script>

<style lang="scss" scoped>
.v-btn{
  background-color: var(--primary-color) !important;
}
@media only screen and (max-width: 700px) {
  .nav-drawer{
    width: 470px !important;
  }
}
</style>
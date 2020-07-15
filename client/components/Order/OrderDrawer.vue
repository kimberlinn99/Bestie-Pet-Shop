<template>
  <v-navigation-drawer
    :value="drawer"
    fixed
    temporary
    right
    class="nav-drawer"
  >
    <div class="drawer-header">
      <v-icon @click="updateDrawerStatus" color="white">
        mdi-chevron-right
      </v-icon>
      <span>Cart</span>
    </div>
    <div v-if="orders.length > 0">
      <div class="pa-5 list-of-orders">
        <v-card tile flat
          class="my-3"
          v-for="order in orders"
          :key="order._id"
        >
          <v-icon class="close-icon" @click="removeOrder(order)">
            mdi-close
          </v-icon>
          <order-drawer-item :order="order" />
          <v-divider></v-divider>
        </v-card> 
      </div>
      <div class="px-5 pt-1 pb-0 font-weight-light sub-total">
        <p class="mb-1">Subtotal</p>
        <p>${{ subTotal || 0 }}</p>
      </div>
      <v-divider></v-divider>
      <div>
        <HomePageButton title="View Cart" linkTo="/orders/my-cart" class="view-cart" />
      </div>
    </div>
    <div v-else>
      <p class="text-center mt-5 pt-5">Cart is empty!</p>
    </div>
  </v-navigation-drawer>
</template>

<script>
import OrderDrawerItem from './OrderDrawerItem'
import HomePageButton from '@/components/HomePage/HomePageButton'
import { mapGetters } from 'vuex'

export default {
  components: {
    OrderDrawerItem,
    HomePageButton
  },
  computed: {
    subTotal(){
      return this.$store.state.sessionStorage.subTotal
    },
    orders(){
      return this.$store.state.sessionStorage.orders
    },
    drawer(){
      return this.$store.state.product.drawer || false
    }
  },
  methods: {
    removeOrder(order){
      this.$store.commit('sessionStorage/removeOrder', order)
      this.$store.commit('sessionStorage/computeSubTotal')
    },
    updateDrawerStatus(){
      this.$store.commit('product/updateDrawerStatus')
    }
  }
}
</script>

<style lang="scss" scoped>
.nav-drawer{
  overflow: hidden;
}
.drawer-header{
  padding: 15px 10px;
  background-color: black;
  color: white;
  text-align: center !important;
}
.drawer-header .v-icon{
  float: left;
}
.close-icon{
  float: right;
  font-size: 10px;
}
.view-cart{
  display: block;
  width: 80%;
  margin: 20px auto;
}
.list-of-orders{
  max-height: 400px;
  overflow: auto;
}
.list-of-orders::-webkit-scrollbar {
  display: none;
}
::v-deep{
  .view-cart .v-btn__content{
    padding: 8px !important;
  }
}
@media only screen and (max-width: 700px){
  .nav-drawer{
    width: 500px !important;
  }
  .sub-total{
    margin-top: 10px !important;
    line-height: 1.2rem;
  }
  .list-of-orders, .sub-total{
    width: 90%;
    margin: 0 auto;
  }
}
</style>
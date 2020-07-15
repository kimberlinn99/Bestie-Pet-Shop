<template>
  <div class="narrow-container">
    <v-layout row wrap class="layout" v-if="user">
      <!-- Left Panel -->
      <v-flex xs12 md3>
        <left-panel />
      </v-flex>

      <!-- Right Panel -->
      <v-flex xs12 md9>
        <v-card tile flat class="ml-2 pa-5 card-wrapper">
          <h1>My Orders</h1>
          <hr>
          <div v-if="user.orders">
            <div v-if="user.orders.length == 0" class="empty-order">
              <p>You don't have any orders.</p>
              <nuxt-link to="/products/shop-all">Continue Shopping</nuxt-link>
            </div>
            <div v-else>
              <v-card tile flat 
                v-for="order in user.orders"
                :key="order._id" 
                class="list-of-order" 
              >
                <span class="status">Status: 
                  <span style="color: green;">
                    Puchased
                  </span>
                </span>
                <p>Order ID: {{ order._id }}</p>
                <p>TotalPrice: ${{ order.totalPrice }}</p>
                <v-divider></v-divider>
              </v-card>
            </div>
          </div>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import LeftPanel from '@/components/UserInfo/LeftPanel'

export default {
  head: {
    title: 'My Orders'
  },
  components: {
    LeftPanel
  },
  computed: {
    user() {
      return this.$store.state.sessionStorage.user || null
    }
  },
  async fetch(){
    const userId =  this.$store.state.sessionStorage.user.id
    try{
      const user = (await this.$axios.$get(`/user/${userId}`)).user
      this.$store.commit('sessionStorage/setUser', user)
    } catch(err){
      this.$router.push('/')
    }
  }
}
</script>

<style lang="scss" scoped>
.layout{
  margin: 50px 0;
}
.card-wrapper{
  border: 1px solid;
}
h1{
  color: var(--primary-color);
}
.empty-order{
  width: 100%;
  height: 300px;
  text-align: center;
  padding-top: 100px;
}
.empty-order p{
  margin-bottom: 5px;
}
.empty-order a{
  text-decoration: underline;
}
.list-of-order{
  font-size: 0.8rem;
  margin: 20px 0;
}
.list-of-order p{
  margin: 0;
}
.list-of-order .status{
  float: right;
  margin-top: 10px;
}
hr{
  border-top: 1px solid black;
  margin-top: 15px;
}
@media only screen and (max-width: 700px){
  .narrow-container{
    width: 80%;
  }
  .card-wrapper{
    margin: 0 !important;
    margin-top: 10px !important;
  }
}
</style>
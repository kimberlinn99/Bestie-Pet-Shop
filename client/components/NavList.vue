<template>
  <nav id="full-nav">
    <v-row>
      <v-col md="10" class="pa-0" justify="start">
        <ul>
          <li v-for="item in navBarList" :key="item.title">
            <nuxt-link :to="item.linkTo">{{ item.title }}</nuxt-link>
          </li>
        </ul>
      </v-col>
      <v-col md="2" class="pa-0"> 
        <v-menu 
          offset-y 
          v-if="name != ''"
        >
          <template v-slot:activator="{ on, attrs }">
            <button 
              type="button" 
              class="text-caption text-capitalize mx-4"
              v-bind="attrs"
              v-on="on"  
            >
              <v-avatar>
                <img 
                  alt="Profile Image" 
                  :src="getProductImage()"
                  loading="lazy"
                />
              </v-avatar >
              <v-icon>mdi-menu-down</v-icon>
            </button>
          </template>
          <v-list dense outlined>
            <nuxt-link to="/user/my-account">
              <v-list-item dense>
                <v-list-item-title>My Account</v-list-item-title>
              </v-list-item>
            </nuxt-link>
            <nuxt-link to="/user/my-order">
              <v-list-item dense>
                <v-list-item-title>My Orders</v-list-item-title>
              </v-list-item>
            </nuxt-link>
            <v-divider width="80%" class="mx-auto"></v-divider>
            <v-list-item dense @click="logout()">
              <v-list-item-title>Log Out</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

        <nuxt-link to="/login" v-else>
          <button type="button" class="text-caption text-capitalize mr-5">
            <v-avatar>
              <img 
              alt="Profile Image" 
              :src="getProductImage()"/>
            </v-avatar >
              Log in
          </button>
        </nuxt-link>

        <span @click="updateDrawerStatus">
          <v-badge
            :content="numberOfOrders || 0"
            inline
          >
            <v-icon color="black" class="ml-3 mr-2">mdi-cart-outline</v-icon>
          </v-badge>
        </span>
      </v-col>
    </v-row>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      navBarList: [
        {
          title: 'shop all',
          linkTo: '/products/shop-all'
        },
        {
          title: 'dogs',
          linkTo: '/products/animals/dog'
        },
        {
          title: 'cats',
          linkTo: '/products/animals/cat'
        },
        {
          title: 'birds',
          linkTo: '/products/animals/bird'
        },
        {
          title: 'fish & aquatics',
          linkTo: '/products/animals/fish'
        },
        {
          title: 'small animals',
          linkTo: '/products/animals/small_animal'
        },
        {
          title: 'reptiles',
          linkTo: '/products/animals/reptile'
        }, 
        {
          title: 'contact',
          linkTo: '/contact'
        }
      ],
      name: '',
      profileImage: 'public/uploads/default_profile_image.png'
    }
  },
  computed: {
   numberOfOrders(){
     const orders = this.$store.state.sessionStorage.orders
     return orders.length || 0
   },
   user(){
     return this.$store.state.sessionStorage.user || null
   } 
  },
  methods: {
    updateDrawerStatus(){
      this.$store.commit('product/updateDrawerStatus')
    },
    getProductImage(){
      return `http://localhost:8080/${this.profileImage}`
    },
    checkUser(){
      if(Object.keys(this.user).length){
        this.name = this.user.firstName
        this.profileImage = this.user.profileImage
      }
    },
    async logout(){
      try {
        const response = await this.$axios.post('/log-out')
        this.$store.commit('sessionStorage/userLogOut')
        alert(response.data.message)
        this.$router.push('/login')
      } catch(err) {
        this.$router.push('/')
      }
    }
  },
  mounted(){
    this.checkUser()
  }
}
</script>

<style lang="scss" scoped>
nav ul{
  display: flex;
}
a{
  font-size: 0.8rem;
  font-weight: 500;
  text-transform: uppercase;
}
a:hover{
  color: #FF5722 !important;
}
.v-avatar{
  height: 40px !important;
  min-width: 40px !important;
  width: 40px !important;
}
.v-avatar img{
  width: 30px;
  height: 30px;
}
button:focus{
  outline: none;
}
.v-list{
  padding: 0;
}
.v-list-item{
  text-transform: capitalize;
  font-size: 1rem;
}
.v-badge:hover{
  cursor: pointer;
}
::v-deep{
  .v-badge__badge{
    background-color: var(--primary-color) !important;
    right: 12px;
  }
  .v-badge--inline{
    top: 5px;
  }
  .mdi-menu-down::before{
    color: var(--primary-color) !important;
  }
}
@media only screen and (max-width: 800px) {
  #full-nav{
    display: none;
  }
}
</style>
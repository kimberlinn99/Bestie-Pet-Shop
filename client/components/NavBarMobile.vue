<template>
  <div>
    <div class="nav-icon" @click="drawer = true">
      <v-icon>mdi-menu</v-icon>
    </div>
    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
      right
      app
      class="nav-drawer"
    >
      <v-list-item class="mt-3 mb-2 ml-4">
        <v-list-item-avatar>
          <img 
            alt="Profile Image" 
            :src="getProductImage()"
            loading="lazy"
          />
        </v-list-item-avatar>
        <v-list-item v-if="!isUser">
          <nuxt-link to="/login">Login</nuxt-link>
        </v-list-item>
        <v-list-item-content v-if="isUser">
          <v-list-item-title>
            {{ user.firstName }} {{ user.lastName }} 
          </v-list-item-title>
        </v-list-item-content>
        <v-spacer></v-spacer>
        <v-icon small @click="drawer = false">mdi-close</v-icon>
      </v-list-item>
      <div v-if="isUser">
        <nuxt-link 
          :to="item.linkTo"
          v-for="item in linkList" 
          :key="item.title"
        >
          <v-list-item class="px-5 mx-5 drawer-list">
            {{ item.title }}
          </v-list-item>
        </nuxt-link>
        <v-list-item
          @click="logout()" 
          class="px-5 mx-5 mb-2 drawer-list"
        >
          <v-list-item-title>Log Out</v-list-item-title>
        </v-list-item>
      </div>

      <v-divider></v-divider>

      <v-list>
        <v-list-item
          v-for="item in navBarList"
          :key="item.title"
          class="text-uppercase text-center py-1"
        >
          <v-list-item-content class="drawer-list">
            <nuxt-link :to="item.linkTo">
              <v-list-item-title>
                {{ item.title }}
              </v-list-item-title>
            </nuxt-link>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer> 
  </div>
</template>

<script>
export default {
  data(){
    return{
      drawer: false,
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
      linkList: [
        {
          title: 'My Account',
          linkTo: '/user/my-account'
        },
        {
          title: 'My Orders',
          linkTo: '/user/my-order'
        }
      ],
      profileImage: 'public/uploads/default_profile_image.png',
      isUser: false
    }
  },
  computed: {
    user(){
      return this.$store.state.sessionStorage.user || null
    }
  },
  methods: {
    getProductImage(){
      return `http://localhost:8080/${this.profileImage}`
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
    if(Object.keys(this.user).length){
      this.profileImage = this.user.profileImage
      this.isUser = true
    }
  }
}
</script>

<style lang="scss" scoped>
.nav-icon, .nav-drawer{
  display: none;
}
.drawer-list a{
  text-decoration: none;
  color: black;
}
.drawer-list:hover{
  background-color: rgb(219, 219, 219);
}
@media only screen and (max-width: 800px){
  .nav-drawer{
    display: block;
  }
  .nav-icon{
    display: block;
    margin-top: 20px;
    margin-right: 30px;
  }
  .nav-icon:hover{
    cursor: pointer;
  }
  .nav-drawer{
    width: 800px !important;
  }
}
</style>
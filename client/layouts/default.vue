<template>
  <v-app>
    <Header />
    <OrderDrawer />
    <nuxt/>
    <Footer />
  </v-app>
</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import OrderDrawer from '@/components/Order/OrderDrawer'

export default {
  name: 'default',
  components: {
    Header,
    Footer,
    OrderDrawer
  }
}      
</script>

<style>
:root{
  --primary-color: #FF5722;
  --secondary-color: #00ACC1;
}
*{
  box-sizing: border-box;
}
body{
  font-family: 'Courier New', Courier, monospace;
}
li{
  list-style: none;
  padding: 10px 10px;
}
a{
  color: black !important;
  text-decoration: none;
}
.wrapper{
  width:100%
}
.wide-container{
  width: 90%;
  margin: 0 auto;
}
.narrow-container{
  width: 60%;
  margin: 0 auto;
}
.v-divider{
  border-top: 2px solid rgb(185, 185, 185);
}
</style>
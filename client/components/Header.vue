<template>
  <div class="wrapper">
    <nav>
      <div class="logo">
        <nuxt-link to="/">
          <v-icon color="white">
            mdi-paw
          </v-icon>
          <div class="logo-text">
            <h2 class="text-uppercase deep-orange--text">besties</h2>
            <span class="text-caption font-weigth-light">
              A Pet's Favorite Place
            </span>
          </div>
        </nuxt-link>
      </div>
      <v-spacer></v-spacer>
      <nav-bar-mobile />
      <div class="social-icon">
        <v-icon>mdi-facebook</v-icon>
        <v-icon>mdi-youtube</v-icon>
        <v-icon>mdi-instagram</v-icon>
      </div>
      <div class="call-us">
        <h4>Call us</h4>
        <h5>123-456-789</h5>
      </div>
    </nav>
    <v-divider></v-divider>
    <nav-list/>
  </div>
</template>

<script>
import NavList from './NavList'
import NavBarMobile from './NavBarMobile'

export default {
  components: {
    NavList,
    NavBarMobile
  }  
}
</script>

<style scoped>
nav{
  display: flex;
  height: fit-content;
  width: 100%;
}
.logo{
  margin: 10px 40px;
}
.logo .v-icon{
  background-color: var(--primary-color);
  padding: 7px;
  border-radius: 50%;
  margin-top: 10px;
}
.logo-text{
  position: absolute;
  top: 0px;
  margin-left: 50px;
  margin-top: 20px;
}
.logo-text h2{
  line-height: 1.3rem;
}
.call-us{
  background-color: var(--primary-color);
  padding: 15px 20px;
  margin-left: 20px;
  color: white;
  text-align: center;
}
.social-icon{
  margin-top: 25px;
}
.social-icon .v-icon{
  margin: 0 5px;
  color: black;
}
.social-icon .v-icon:hover{
  cursor: pointer;
}
@media only screen and (max-width: 800px){
  .social-icon, .call-us{
    display: none;
  }
  .v-divider{
    width: 90%;
    margin: 0 auto;
    margin-bottom: 10px;
  }
}
</style>
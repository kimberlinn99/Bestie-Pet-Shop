<template>
  <div class="logo">
    <span>
      <v-icon color="white">
        mdi-paw
      </v-icon>
    </span>
    <div class="logo-text">
      <h2 class="text-uppercase deep-orange--text">besties</h2>
      <span class="text-caption font-weigth-light">
        A Pet's Favorite Place
      </span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.logo{
  margin: 20px auto;
}
.logo .v-icon{
  background-color: var(--primary-color);
  padding: 7px;
  border-radius: 50%;
  position: absolute;
  margin-left: 225px;
}
.logo-text{
  text-align: center;
  margin-top: 20px;
}
.logo-text h2{
  line-height: 1.3rem;
}
@media only screen and (max-width: 1024px){
  .logo .v-icon{
    margin-left: 150px;
  }
}
@media only screen and (max-width: 768px){
  .logo, .logo-text{
    margin: 0;
  }
  .logo .v-icon{
    margin-left: 80px;
  }
}
@media only screen and (max-width: 400px){
  .logo .v-icon{
    margin-left: 40px;
  }
}
</style>
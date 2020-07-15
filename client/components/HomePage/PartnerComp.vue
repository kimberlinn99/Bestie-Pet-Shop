<template>
  <div class="wide-container">
    <h1>Best Brands at Lowest Prices</h1>

    <!-- Partner Logo -->
    <div class="partner-logo">
      <div v-for="index in 5" :key="index">
        <img 
          :src="require(`@/assets/images/partner_logo${index}.jpg`)"
          :alt="`partner_logo${index}.jpg`" loading="lazy">
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wide-container{
  background-color: rgba(241, 241, 241, 0.883);
}
h1{
  color: var(--primary-color);
  text-align: center;
  margin-top: 50px;
  padding: 50px;
}
.partner-logo{
  display: grid;
  grid-template-columns: repeat(5, 200px);
  margin-left: 30px;
  padding-bottom: 50px;
}
.partner-logo img{
  width: 100%;
  object-fit: cover;
}
@media only screen and (max-width: 1100px){
  .partner-logo{
    grid-template-columns: repeat(3, 1fr);
    text-align: center;
    margin-left: 0;
  }
}
@media only screen and (max-width: 900px){
  .partner-logo img{
    width: 70%;
  }
  .partner-logo{
    grid-template-columns: repeat(2, 1fr);
  }
}
@media only screen and (max-width: 700px){
  .wide-container{
    width: 100%;
  }
  .partner-logo{
    grid-template-columns: 1fr;
  }
}
</style>
<template>
  <v-container class="narrow-container">
    <h1>Our Story</h1>
    <div class="grid-container">
      <div>
        <p class="text-caption">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laboriosam veniam nisi qui magnam rem debitis ad? Est amet quae facere. Qui a sit, nesciunt earum voluptatibus delectus animi dolore iure, fugiat nostrum officia. Hic necessitatibus sed est velit. Dolorem, beatae.
        </p>
      </div>
      <div>
        <p class="text-caption">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laboriosam veniam nisi qui magnam rem debitis ad? Est amet quae facere. Qui a sit, nesciunt earum voluptatibus delectus animi dolore iure, fugiat nostrum officia. Hic necessitatibus sed est velit. Dolorem, beatae.
        </p>
      </div>
    </div>
    <img 
      :src="require('@/assets/images/about.jpg')" 
      alt="Dog"
      loading="lazy"  
    >
  </v-container>
</template>

<script>
export default {
  head: {
    title: 'About'
  }
}
</script>

<style lang="scss" scoped>
.grid-container{
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 40px;
  margin-bottom: 20px;
}
h1{
  color: var(--primary-color);
  margin: 40px 0;
}
p{
  line-height: 1.6rem !important;
}
img{
  width: 100%;
  margin-bottom: 50px;
}
@media only screen and (max-width: 700px){
  .narrow-container{
    width: 90%;
    margin: 0 auto;
  }
  .grid-container{
    grid-template-columns: 1fr;
    row-gap: 10px;
  }
}
</style>
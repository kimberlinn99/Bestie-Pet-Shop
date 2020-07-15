<template>
  <v-carousel
    cycle
    height="500"
    hide-delimiter-background
    show-arrows
  >
    <v-carousel-item
      v-for="pet in pets"
      :key="pet.title"
    >
      <v-img :src="pet.src" :alt="pet.title" heigth="500">
        <v-container fill-height fluid>
          <v-layout fill-height>
            <v-flex md3 xs7>
              <v-card class="card-carousel pa-2" tile flat>
                <h1 class="headline" v-text="pet.description"></h1>
                <h4 v-if="pet.subDescription" v-text="pet.subDescription"></h4>
                <span>
                  <home-page-button :title="pet.butttonText" :linkTo="pet.linkTo" />
                </span> 
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-img>

    </v-carousel-item>
  </v-carousel>
</template>

<script>
import HomePageButton from './HomePageButton'

export default {
  components: {
    HomePageButton
  },
  data () {
    return {
      pets: [
        {
          title: 'carousel_pets',
          src: require('../../assets/images/carousel_pets.jpg'),
          description: 'Welcome to Our Pet Supply Shop',
          butttonText: 'Start Shopping',
          linkTo: '/products/shop-all'
        },
        {
          title: 'carousel_birds',
          src: require('../../assets/images/carousel_birds.jpg'),
          description: 'Hear the Birds Chirping',
          subDescription: '30% on our birds products',
          butttonText: 'Shop Now',
          linkTo: '/products/animals/bird'
        },
        {
          title: 'carousel_kitten',
          src: require('../../assets/images/carousel_cat.jpg'),
          description: 'Play, Stretch, Sleep, Repeat',
          butttonText: 'Shop Cat Toys',
          linkTo: '/products/animals/cat'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.card-carousel{
  background-color: rgba($color: rgb(206, 206, 206), $alpha: 0.5);
  width: 100%;
  height: 300px;
  margin-top: 70px;
  margin-left: 100px;
}
.card-carousel h1, h4{
  color: black;
  padding-left: 20px;
}
.card-carousel h1{
  padding: 20px;
  font-weight: 600;
  line-height: 2.5rem;
  font-size: 2.8rem !important;
}
.card-carousel a{
  margin-left: 20px !important;
  margin-top: 40px;
}
.v-img{
  object-fit: cover;
}
::v-deep{
    .v-responsive__content{
      height: 500px;
    }
  }
@media only screen and (max-width: 700px){
  .card-carousel{
    margin-left: 20px;
    margin-top: 10px;
    height: 250px;
  }
  .card-carousel h1{
    font-size: 2rem !important;
    line-height: 2.3rem;
  }
  .card-carousel a{
    margin: 10px;
  }
}
</style>
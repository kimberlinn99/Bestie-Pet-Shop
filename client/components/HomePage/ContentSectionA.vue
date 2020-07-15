<template>
  <div class="wide-container">
    <div class="grid-container">
      <div 
        class="sale-promotion"
        :style="{ backgroundImage: 'url(' + require('@/assets/images/home_page_deal.jpg') + ')' }"
      >
        <h1 class="text-uppercase">
          DEAL OF THE WEEK
        </h1>
        <v-divider dark></v-divider>
        <p>50% OFF <br> on dog treats</p>
        <home-page-button title="Shop Now" linkTo="/products/shop-all" />
      </div>

      <div 
        v-for="card in cards"
        :key="card.animal"
        :class="[card.animal, 'animal-cards']"
        :style="{ backgroundImage: 'url(' + card.imageUrl + ')' }"
      >
        <h1 class="text-capitalize">{{ card.animal }}</h1>
        <p>{{ card.title}}</p>
        <home-page-button title="Shop Now" :linkTo="card.linkTo" />
      </div>

    </div>
  </div>
</template>

<script>
import HomePageButton from './HomePageButton'

export default {
  components: {
    HomePageButton
  },
  data() {
    return {
      cards: [
        {
          animal: 'dogs',
          title: 'Lorem ipsum dolor sit amet.',
          imageUrl: require('@/assets/images/home_page_dog.jpg'),
          linkTo: '/products/animals/dog'
        },
        {
          animal: 'cats',
          title: 'Lorem ipsum dolor sit amet.',
          imageUrl: require('@/assets/images/home_page_cat.jpg'),
          linkTo: '/products/animals/cat'
        },
        {
          animal: 'birds',
          title: 'Lorem ipsum dolor sit amet.',
          imageUrl: require('@/assets/images/home_page_bird.jpg'),
          linkTo: '/products/animals/bird'
        },
        {
          animal: 'fishes',
          title: 'Lorem ipsum dolor sit amet.',
          imageUrl: require('@/assets/images/home_page_fish.jpg'),
          linkTo: '/products/animals/fish'
        },
        {
          animal: 'small animals',
          title: 'Lorem ipsum dolor sit amet.',
          imageUrl: require('@/assets/images/home_page_hamster.jpg'),
          linkTo: '/products/animals/small_animal'
        },
        {
          animal: 'reptiles',
          title: 'Lorem ipsum dolor sit amet.',
          imageUrl: require('@/assets/images/home_page_reptile.jpg'),
          linkTo: '/products/animals/reptile'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.grid-container{
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(3, 300px);
  padding: 7px;
  grid-gap: 30px;
  margin-bottom: 40px;
}
.animal-cards{
  text-align: left;
  color: white;
  background-size: cover;
  padding-left: 30px;
  padding-top: 160px;
}
.sale-promotion{
  grid-column: 1 / 2;
  padding: 25px 30px;
  color: white;
  background-size: cover;
}
.sale-promotion h1{
  line-height: 40px;
  letter-spacing: 1px;
}
.sale-promotion .v-divider{
  width: 30px;
  margin: 18px 0;
  background-color: white;
}
.dogs{
  grid-column: 2 / 4;
}
.cats, .reptiles{
  grid-column: 4 / 6;
}
.birds{
  grid-column: 1 / 3;
}
.fishes{
  grid-column: 3 / 6;
}
.animals{
  grid-column: 1 / 4;
}
@media only screen and (max-width: 1024px){
  .sale-promotion{
    padding-right: 0;
  }
}
@media only screen and (max-width: 768px) {
  .wide-container{
    width: 100%;
  }
  .grid-container{
    padding: 0;
    grid-template-columns: 1fr;
  }
  .dogs, .cats, .fishes, .birds, .animals, .reptiles{
    grid-column: 1 / 2;
  }
  .sale-promotion{
    padding-left: 50px;
    padding-right: 200px;
  }
  .fishes, .birds, .animals, .reptiles{
    padding-bottom: 25px;
  }
}
@media only screen and (max-width: 320px){
  .sale-promotion{
    padding-right: 150px;
  }
}
</style>
<template>
  <div>
    <h1>Shop All</h1>
    <h2 v-if="animalType != ''" class="text-capitalize mt-3">
      - {{ animalType }} -
    </h2> 
    <v-layout>
      <v-row class="mt-4">
        <!-- Side bar -->
        <v-col md="2" class="side-bar-col">
          <v-card tile flat class="side-bar">
            <h3>Filter by</h3>

            <v-divider class="my-2"></v-divider>

            <v-expansion-panels flat>
              <v-expansion-panel>
                <v-expansion-panel-header expand-icon="mdi-menu-down" class="pa-0 panel-header">
                  Collections 
                </v-expansion-panel-header>
                <v-expansion-panel-content class="panel-content">
                  <p @click="getAllProducts()">All</p>
                  <p @click="getAnimalProducts('dog')">Dogs</p>
                  <p @click="getAnimalProducts('cat')">Cats</p>
                  <p @click="getAnimalProducts('bird')">Birds</p>
                  <p @click="getAnimalProducts('fish')">Fish & Aquatics</p>
                  <p @click="getAnimalProducts('small_animal')">Small Animals</p>
                  <p @click="getAnimalProducts('reptile')">Reptiles</p>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>

            <v-divider></v-divider>

            <v-expansion-panels flat>
              <v-expansion-panel>
                <v-expansion-panel-header expand-icon="mdi-menu-down" class="pa-0 panel-header">
                  Prices 
                </v-expansion-panel-header>
                <v-expansion-panel-content class="panel-content">
                  <v-range-slider
                    v-model="range"
                    :max="max"
                    :min="min"
                    hide-details
                    track-color="black"
                    color="black"
                    class="align-center"
                    @input="filterPrice"
                  ></v-range-slider>
                  <div class="slider-value">
                    <span>${{ range[0] }}.00</span>
                    <span style="float: right;">${{ range[1] }}.00</span>
                  </div>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
            <v-divider></v-divider>
          </v-card>
        </v-col>

        <!-- Products -->
        <v-col md="10">
          <product-card-container :productList="products"/>
        </v-col>
      </v-row>
    </v-layout>
  </div>
</template>

<script>
import ProductCardContainer from '@/components/Product/ProductCardContainer'

export default {
  components: {
    ProductCardContainer
  },
  data(){
    return {
      min: 1,
      max: 200,
      range: [1, 200],
      animalType: '',
      isClickedFilter: false
    }
  },
  methods: {
    getAnimalProducts(animalType){
      this.isClickedFilter = true
      this.animalType = animalType
      this.$store.dispatch('product/getAnimalProducts', animalType)
      this.filterPrice()
    },
    getAllProducts(){
      this.isClickedFilter = false
      this.animalType = ''
      this.$store.dispatch('product/getAllProducts')
      this.filterPrice()
    },
    filterPrice(){
      this.isClickedFilter = true
      const min = this.range[0]
      const max = this.range[1]
      if(this.animalType != ''){
        const animalType = this.animalType
        this.$store.dispatch('product/filterPrice', { animalType, min, max })
      } else {
        this.$store.dispatch('product/filterPriceAll', { min, max })
      }
    }
  },
  computed: {
    products(){
      return this.$store.state.product.products
    }
  },
  created() {
    this.$store.dispatch('product/getAllProducts')
  },
  head: {
    title: 'Shop All'
  }
}
</script>

<style lang="scss" scoped>
h1, h2{
  color: var(--primary-color);
  text-align: center;
}
h1{
  margin-top: 40px;
}
::v-deep{
  .v-expansion-panel-content__wrap{
    padding: 0;
    padding-bottom: 10px;
  }
}
</style>
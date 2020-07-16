<template>
  <div>
    <h1>{{ animalProduct.animal.name }}</h1> 
    <sort-by :animal="animalProduct.animal.type" :category="group" @selectedChoice="sortSelected"/>
    <v-layout>
      <v-row>
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
                  <p @click="getAnimalProducts()">
                    All
                  </p>
                  <p 
                    v-for="genre in animalProduct.category"
                    :key="genre.name"
                    @click="filterCategory(genre.name)"
                  >
                    {{ genre.title }}
                  </p>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>

            <v-divider></v-divider>

            <v-expansion-panels flat>
              <v-expansion-panel>
                <v-expansion-panel-header expand-icon="mdi-menu-down" class="pa-0 panel-header">
                  Prices 
                  <span class="price-header">
                    &nbsp;&nbsp;(${{ range[0] }} - ${{ range[1] }})
                  </span>
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
        <v-col md="10" class="product-container">
          <product-card-container :productList="products"/>
        </v-col>
      </v-row>
    </v-layout>
  </div>
</template>

<script>
import ProductCardContainer from '@/components/Product/ProductCardContainer'
import SortBy from '@/components/SortBy'

export default {
  components: {
    ProductCardContainer,
    SortBy
  },
  data(){
    return {
      min: 1,
      max: 200,
      range: [1, 200],
      animalType: '',
      group: '',
      sortMethod: ''
    }
  },
  created() {
    this.animalType = this.animalProduct.animal.type
    this.$store.dispatch('product/getAnimalProducts', this.animalType)
  },
  methods: {
    getAnimalProducts(){
      this.group = ''
      this.$store.dispatch('product/getAnimalProducts', this.animalType)
      this.filterPrice()
    },
    filterCategory(genreName){
      this.group = genreName
      this.$store.dispatch('product/filterCategory', {
        animalType: this.animalType, 
        category: this.group 
      })
      this.filterPrice()
    },
    filterPrice(){
      if(this.group != ''){
        this.$store.dispatch('product/filterPriceWithCategory', { 
          animalType: this.animalType,
          category: this.group, 
          min: this.range[0], 
          max: this.range[1]
        })
      } else{
        this.$store.dispatch('product/filterPrice', { 
          animalType: this.animalType, 
          min: this.range[0], 
          max: this.range[1] 
        })
      }
      this.sortSelected(this.sortMethod)
    },
    sortSelected(sortMethod){
      this.sortMethod = sortMethod
      if(sortMethod != ''){
        if(this.group != ''){
        this.$store.dispatch('product/filterAll', { 
          animalType: this.animalType,
          category: this.group,
          sortMethod: this.sortMethod,
          min: this.range[0],
          max: this.range[1]
         })
        } else{
          this.$store.dispatch('product/sortWithPrice', { 
            animalType: this.animalType,
            sortMethod: this.sortMethod,
            min: this.range[0],
            max: this.range[1]
          })
        }
      }
    }
  },
  computed: {
    animalProduct(){
      return this.$store.state.animalProductInfo.animalInfo.find(item => {
        return this.$route.params.animal == item.animal.type
      })
    },
    products(){
      return this.$store.state.product.products
    }
  },
  head() {
    return{
      title: `${this.animalProduct.animal.name} Products`
    }
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
.side-bar{
  padding-left: 50px;
  margin-bottom: 50px;
}
.side-bar h3{
  font-weight: 300;
}
.panel-header .price-header{
  display: none;
}
.panel-content, .panel-header {
  font-size: 0.8rem;
}
.panel-content p{
  margin-bottom: 5px;
}
.panel-content p:hover{
  cursor: pointer;
}
@media only screen and (max-width: 1024px){
  .side-bar{
    margin-right: 0;
  }
}
@media only screen and (max-width: 768px){
  .side-bar{
    margin-bottom: 10px;
    padding-left: 20px;
    margin-right: 20px;
  }
  .panel-header .price-header{
    display: block;
  }
  .product-container{
    padding-left: 0;
  }
}
</style>
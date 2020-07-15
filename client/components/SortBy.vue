<template>
  <v-layout>
    <v-row justify="end">  
      <v-col md="2" class="sort-by-col">
        <label>
          <select name="sort-by" id="sort-by" @change="selectSortMethod">
              <option value="sort-by" selected disabled>Sort by</option>
              <option value="newest">Newest</option>
              <option value="price-low-to-high">Price (Low to High)</option>
              <option value="price-high-to-low">Price (High to Low)</option>
              <option value="name-a-z">Name A-Z</option>
              <option value="name-z-a">Name Z-A</option>
          </select>
        </label>
      </v-col>
    </v-row>
  </v-layout>
</template>

<script>
export default {
  methods: {
    selectSortMethod(){
      var sortMethod = document.getElementById("sort-by").value;
      this.$emit('selected', sortMethod)
    }
  }
}
</script>

<style lang="scss" scoped>
select{
  border: 1px solid black;
  font-size: 0.9rem;
  font-weight: 300;
  padding: 2px 5px;
  outline: none;
}
option{
  font-size: 0.8rem;
  padding: 3px !important;
  background-color: none;
  border: 0px solid transparent;
}
@media only screen and (max-width: 800px){
  .sort-by-col select{
    width: 22%;
    margin-left: 20px;
  }
}
@media only screen and (max-width: 500px){
  .sort-by-col select{
    width: 90%;
  }
  .sort-by-col{
    margin: 0;
  }
}
</style>
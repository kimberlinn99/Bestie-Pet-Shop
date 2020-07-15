export const state = () => ({
  products: [],
  oneProduct: {},
  otherProducts: [],
  drawer: false
})

export const actions = {
  async getAllProducts ({ commit }) {
    const products = await this.$axios.$get('/products')
    commit('setProducts', products.products)
  },
  async getLimitedProducts({ commit }, limitNumber) {
    const products = await this.$axios.$get(`/products/limit/${limitNumber}`)
    commit('setProducts', products.products)
  },
  async getAnimalProducts ({ commit }, animalType) {
    const products = await this.$axios.$get(`/products/animals/${animalType}`)
    commit('setProducts', products.animalProducts)
  },
  async getSingleAnimalProduct ({ commit }, payload) {
    const product = await this.$axios.$get(
      `/products/animals/${payload.animalType}/${payload.name}`
    )
    commit('setOneProduct', product.animalProduct)
    commit('setOtherProducts', product.otherProducts)
  },
  // Filter Price of all products
  async filterPriceAll({ commit }, payload) {
    const products = await this.$axios.$get(
      `/products/filter/price?min=${payload.min}&max=${payload.max}`
    )
    commit('setProducts', products.animalProducts)
  },
  // Filter Category only 
  async filterCategory ({ commit }, payload) {
    const products = await this.$axios.$get(
      `/products/animals/${payload.animalType}/filter?category=${payload.category}&sortBy=undefined&min=undefined&max=undefined`
    )
    commit('setProducts', products.animalProducts)
  },
  // Filter Price only
  async filterPrice({ commit }, payload) {
    const products = await this.$axios.$get(
      `/products/animals/${payload.animalType}/filter?category=undefined&sortBy=undefined&min=${payload.min}&max=${payload.max}`
    )
    commit('setProducts', products.animalProducts)
  },
  
  // Filter Price and Category
  async filterPriceWithCategory({ commit }, payload) {
    const products = await this.$axios.$get(
      `/products/animals/${payload.animalType}/filter?category=${payload.category}&sortBy=undefined&min=${payload.min}&max=${payload.max}`
    )
    commit('setProducts', products.animalProducts)
  },
 
  // Sort and Price
  async sortWithPrice({ commit }, payload) {
    const products = await this.$axios.$get(
      `/products/animals/${payload.animalType}/filter?category=undefined&sortBy=${payload.sortMethod}&min=${payload.min}&max=${payload.max}`
    )
    commit('setProducts', products.animalProducts)
  },
  async filterAll({ commit }, payload) {
    const products = await this.$axios.$get(
      `/products/animals/${payload.animalType}/filter?category=${payload.category}&sortBy=${payload.sortMethod}&min=${payload.min}&max=${payload.max}`
    )
    commit('setProducts', products.animalProducts)
  }
}

export const mutations = {
  setProducts(state, products){
    state.products = products
  },
  setOneProduct(state, product){
    state.oneProduct = product
  },
  setOtherProducts(state, products){
    state.otherProducts = products
  },
  updateDrawerStatus(state){
    state.drawer = !state.drawer
  }
}
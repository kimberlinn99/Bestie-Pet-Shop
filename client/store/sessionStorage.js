export const state = () => ({
  orders: [],
  subTotal: 0,
  user: {}
})

export const actions = {
  async updateUserInfo ({ commit }, payload) {
    const response = await this.$axios.$patch(
      `/user/account/update/${payload.id}`, {
        firstName: payload.firstName,
        lastName: payload.lastName,
        phone: payload.phone,
        address: payload.address
      }
    )
    commit('setUser', response.user)
  },
}

export const mutations = {
  updateOrder (state, payload) {
    const foundOrder = state.orders.some(order => order.name === payload.product.name)
    if(!foundOrder){
      const newOrder = {
        name: payload.product.name,
        quantity: payload.quantity,
        previousPrice: payload.product.previousPrice,
        currentPrice: payload.product.currentPrice,
        productImage: payload.product.productImage
      }
      state.orders.push(newOrder)
    }
  },
  updateOrderQuantity(state, payload){
    for(var i in state.orders){
      if(state.orders[i].name === payload.order.name){
        state.orders[i].quantity = payload.quantity
        break
      }
    }
  },
  removeOrder(state, order){
    state.orders = state.orders.filter(item => {
      return item.name !== order.name
    })
  },
  computeSubTotal(state){
    var sum = []
    state.orders.forEach((item, index) => {
      sum[index] = item.quantity * item.currentPrice
    })
    state.subTotal = sum.reduce((total, sum) => {
      return total + sum
    }, 0)
  },
  clearOrders(state){
    state.orders = []
    state.subTotal = 0
  },
  setUser(state, user){
    state.user = user
  },
  userLogOut(state){
    state.user = {}
  }
}
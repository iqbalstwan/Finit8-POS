import axios from 'axios'

export default {
  state: {
    page: 1,
    limit: 6,
    sort: '',
    products: [],
    totalData: 1
  },
  mutations: {
    setProduct(state, payload) {
      state.products = payload.data
      state.totalData = payload.pagination.totalData
    },
    setPage(state, payload) {
      state.page = payload
    }
  },
  actions: {
    getProducts(context, payload) {
      axios
        .get(
          `http://127.0.0.1:3001/product?sort=${context.state.sort}&page=${context.state.page}&limit=${context.state.limit}`
          // 'http://127.0.0.1:3001/product'
        )
        .then(response => {
          context.commit('setProduct', response.data)
          //   context.state.products = response.data.data
          //   context.state.totalData = response.data.pagination.totalData
          // this.$router.push(`?sort=${this.sort}&page=${this.page}`)
        })
        .catch(error => {
          console.log(error)
        })
    },
    addProduct(context, payload) {
      //   console.log(payload)
      return new Promise((resolve, reject) => {
        axios
          .post('http://127.0.0.1:3001/product', payload)
          .then(response => {
            console.log(response)
            resolve(response.data)
          })
          .catch(error => {
            reject(error.response)
            console.log(error.response)
          })
      })
    }
  },
  getters: {
    getLimit(state) {
      return state.limit
    },
    getPage(state) {
      return state.page
    },
    getSort(state) {
      return state.sort
    },
    getTotalData(state) {
      return state.totalData
    },
    getProduct(state) {
      return state.products
    }
  }
}

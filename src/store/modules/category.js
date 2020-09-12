import axios from 'axios'

export default {
  state: {
    page: 1,
    limit: 6,
    sort: '',
    categorys: [],
    totalData: null,
    category_id: ''
  },
  mutations: {
    setCategory(state, payload) {
      console.log(payload)
      state.categorys = payload.data
      state.totalData = payload.pagination.totalData
    },
    setPage(state, payload) {
      state.page = payload
      console.log(payload)
      console.log(state.page)
    }
  },
  actions: {
    getAllCategory(context, payload) {
      axios
        .get(
          `http://127.0.0.1:3001/category?sort=${context.state.sort}&page=${context.state.page}&limit=${context.state.limit}`
          // 'http://127.0.0.1:3001/product'
        )
        .then(response => {
          console.log(response)
          context.commit('setCategory', response.data)
          context.state.categorys = response.data.data
          context.state.totalData = response.data.pagination.totalData
          // this.$router.push(`?sort=${this.sort}&page=${this.page}`)
        })
        .catch(error => {
          console.log(error)
        })
    },
    addCategorys(context, payload) {
      console.log(payload)
      return new Promise((resolve, reject) => {
        axios
          .post('http://127.0.0.1:3001/category', payload)
          .then(response => {
            console.log(response)
            resolve(response.data)
          })
          .catch(error => {
            reject(error.response)
            console.log(error.response)
          })
      })
    },
    updateCategorys(context, payload) {
      console.log(payload.product_id)
      console.log(payload.form)
      return new Promise((resolve, reject) => {
        axios
          .patch(
            `http://127.0.0.1:3001/category/${payload.category_id}`,
            payload.form
          )
          .then(response => {
            console.log(response)
            resolve(response.data)
          })
          .catch(error => {
            reject(error.response)
            console.log(error.response)
          })
      })
    },
    deleteCategorys(context, payload) {
      console.log(payload.category_id)
      //   console.log(payload)
      return new Promise((resolve, reject) => {
        axios
          .delete(
            `http://127.0.0.1:3001/category/${payload.category_id}`,
            payload.form
          )
          .then(response => {
            resolve(response.data)
          })
          .catch(error => {
            reject(error.response)
          })
      })
    }
  },
  getters: {
    getLimitCategory(state) {
      return state.limit
    },
    getPageCategory(state) {
      return state.page
    },
    getSortCategory(state) {
      return state.sort
    },
    getTotalDataCategory(state) {
      return state.totalData
    },
    getCategorys(state) {
      return state.categorys
    }
  }
}

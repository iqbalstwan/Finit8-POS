import axios from 'axios'

export default {
  state: {
    page: 1,
    limit: 6,
    sort: '',
    search: '',
    products: [],
    totalData: 1,
    product_id: '',
    cart: []
  },
  mutations: {
    addToCart(state, payload) {
      const setCart = {
        product_id: payload.product_id,
        product_name: payload.product_name,
        product_price: payload.product_price,
        product_img: payload.product_img,
        order_qty: 1,
        total_price: payload.product_price
        // product_price
      }
      const fixedData = [...state.cart, setCart]
      const addedItem = fixedData.find(
        item => item.product_id === payload.product_id
      )
      const existItem = state.cart.find(
        item => item.product_id === payload.product_id
      )
      if (existItem) {
        addedItem.order_qty += 1
      } else {
        // spread operator
        state.cart = [...state.cart, setCart]
      }
      // console.log(this.cart)
    },
    // checkCart(state, payload) {
    //   return state.cart.some(item => item.product_id === payload.product_id)
    // },
    removeCart(state, payload) {
      return state.cart.splice(
        state.cart.findIndex(item => item.product_id === payload.product_id),
        1
      )
    },
    clearCart(state, payload) {
      state.cart = []
    },
    increment(state, payload) {
      payload.order_qty += 1
      payload.total_price = payload.product_price * payload.order_qty
    },
    decrement(state, payload) {
      if (payload.order_qty === 1) {
        state.cart.splice(
          state.cart.findIndex(item => item.product_id === payload.product_id),
          1
        )
      } else {
        payload.order_qty -= 1
        payload.total_price = payload.product_price * payload.order_qty
      }
    },
    setSearch(state, payload) {
      state.search = payload
      state.products = payload.data
    },
    setProduct(state, payload) {
      state.products = payload.data
      state.totalData = payload.pagination.totalData
    },
    setPage(state, payload) {
      state.page = payload
    },
    setSort(state, payload) {
      state.sort = payload
      console.log('storeeeee====')
      console.log(payload)
    }
  },
  actions: {
    getProducts(context, payload) {
      axios
        .get(
          `${process.env.VUE_APP_URL}/product?sort=${context.state.sort}&page=${context.state.page}&limit=${context.state.limit}`
          // 'http://127.0.0.1:3001/product'
        )
        .then(response => {
          context.commit('setProduct', response.data)
          // context.state.products = response.data.data
          // context.state.totalData = response.data.pagination.totalData
          // this.$router.push(`?sort=${this.sort}&page=${this.page}`)
        })
        .catch(error => {
          // console.log('-----store')
          // console.log(error.response.data.msg)
          alert(error.response.data.msg)
        })
    },
    addProducts(context, payload) {
      //   console.log(payload)
      return new Promise((resolve, reject) => {
        axios
          .post(`${process.env.VUE_APP_URL}/product`, payload)
          .then(response => {
            console.log(response)
            resolve(response.data)
          })
          .catch(error => {
            reject(error.response)
          })
      })
    },
    updateProducts(context, payload) {
      console.log(payload.product_id)
      console.log(payload.form)
      return new Promise((resolve, reject) => {
        axios
          .patch(
            `${process.env.VUE_APP_URL}/product/${payload.product_id}`,
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
    deleteProducts(context, payload) {
      console.log(payload.product_id)
      console.log(payload)
      //   console.log(payload)
      return new Promise((resolve, reject) => {
        axios
          .delete(
            `${process.env.VUE_APP_URL}/product/${payload.product_id}`,
            payload.form
          )
          .then(response => {
            console.log(response)
            resolve(response.data)
          })
          .catch(error => {
            console.log(error.response)
            reject(error.response)
          })
      })
    },
    postOrders(context, payload) {
      console.log(payload)
      return new Promise((resolve, reject) => {
        axios
          .post(`${process.env.VUE_APP_URL}/order`, payload)
          .then(response => {
            resolve(response.data)
            // this.invoice = response.data.data
            // this.isMsg = response.data.msg
          })
          .catch(error => {
            reject(error.response)
          })
      })
    },
    searching(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .get(
            `${process.env.VUE_APP_URL}/product?search=${context.state.search}`,
            payload
          )
          .then(response => {
            console.log(response)
            context.commit('setProduct', response.data)
            resolve(response.data)
            // state.products = response.data.data
            // this.$router.push(`?produk=${this.search}`)
            // console.log(this.products)
          })
          .catch(error => {
            reject(error.response)
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
    },
    getCart(state) {
      return state.cart
    },
    getSearch(state) {
      return state.search
    }
  }
}

import axios from 'axios'

export default {
  state: {
    historyDay: [],
    historyWeek: [],
    historyYears: [],
    chart: [],
    recentOrder: [],
    weekOrder: [],
    monthOrder: [],
    // setData: []
    history: {},
    data: []
  },
  mutations: {
    setHistoryDay(state, payload) {
      state.historyDay = payload
    },
    setHistoryWeek(state, payload) {
      state.historyWeek = payload
    },
    setHistoryYears(state, payload) {
      state.historyYears = payload
    },
    setChart(state, payload) {
      for (let i = 0; i < payload.length; i++) {
        state.chart.push([payload[i].date, payload[i].total])
      }
    },
    setRecentOrder(state, payload) {
      payload.map(value => {
        const setData = {
          invoices: value.invoice,
          cashier: 'wanwan',
          date: value.history_created_at.slice(0, 10),
          orders: value.orders
            .map(item => item.product_name.concat(` ${item.order_qty}x`))
            .join(', '),
          amount: value.history_subTotal
        }
        state.recentOrder = [...state.recentOrder, setData]
        console.log('========')
        console.log(state.user)
      })
    },
    setWeekOrder(state, payload) {
      payload.map(value => {
        const setData = {
          invoices: value.invoice,
          cashier: value.user_name,
          date: value.history_created_at.slice(0, 10),
          orders: value.orders
            .map(item => item.product_name.concat(` ${item.order_qty}x`))
            .join(', '),
          amount: value.history_subTotal
        }
        state.weekOrder = [...state.weekOrder, setData]
        console.log(setData)
      })
    },
    setMonthOrder(state, payload) {
      payload.map(value => {
        const setData = {
          invoices: value.invoice,
          cashier: value.user_name,
          date: value.history_created_at.slice(0, 10),
          orders: value.orders
            .map(item => item.product_name.concat(` ${item.order_qty}x`))
            .join(', '),
          amount: value.history_subTotal
        }
        state.monthOrder = [...state.monthOrder, setData]
        console.log(payload.user_name)
      })
    }
  },

  actions: {
    getHistoryDay(context, payload) {
      axios
        .get(`${process.env.VUE_APP_URL}/history/dashboard/day`)
        .then(response => {
          context.commit('setHistoryDay', response.data.data[0].Today)
          // console.log(this.historyDay)
        })
        .catch(error => {
          console.log(error)
        })
    },
    getHistoryWeek(context, payload) {
      axios
        .get(`${process.env.VUE_APP_URL}/history/dashboard/week`)
        .then(response => {
          context.commit('setHistoryWeek', response.data.data[0].orders)
          // console.log(this.historyDay)
        })
        .catch(error => {
          console.log(error)
        })
    },
    getHistoryYears(context, payload) {
      axios
        .get(`${process.env.VUE_APP_URL}/history/dashboard/years`)
        .then(response => {
          context.commit('setHistoryYears', response.data.data[0].Years)
          // console.log(this.historyDay)
        })
        .catch(error => {
          console.log(error)
        })
    },
    getChart(context, payload) {
      axios
        .get(`${process.env.VUE_APP_URL}/history/chart`)
        .then(response => {
          context.commit('setChart', response.data.data)
        })
        .catch(error => {
          console.log(error)
        })
    },
    getRecentOrder(context, payload) {
      axios
        .get(`${process.env.VUE_APP_URL}/history/recent/order`)
        .then(response => {
          console.log(response)
          context.commit('setRecentOrder', response.data.data)
        })
        .catch(error => {
          console.log(error)
        })
    },
    getWeekOrder(context, payload) {
      axios
        .get(`${process.env.VUE_APP_URL}/history/week/order`)
        .then(response => {
          context.commit('setWeekOrder', response.data.data)
        })
        .catch(error => {
          console.log(error)
        })
    },
    getMonthOrder(context, payload) {
      axios
        .get(`${process.env.VUE_APP_URL}/history/month/order`)
        .then(response => {
          context.commit('setMonthOrder', response.data.data)
        })
        .catch(error => {
          console.log(error)
        })
    }
  },

  getters: {
    getHistDay(state) {
      return state.historyDay
    },
    getHistCount(state) {
      return state.historyWeek
    },
    getHistYears(state) {
      return state.historyYears
    },
    getHistChart(state) {
      return state.chart
    },
    getOrders(state) {
      return state.recentOrder
    },
    getWeekOrders(state) {
      return state.weekOrder
    },
    getMonthOrders(state) {
      return state.monthOrder
    },
    getData(state) {
      return state.data
    }
  }
}

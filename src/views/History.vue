<template>
  <div>
    <HistHeader text="History" />
    <!-- sidebar -->
    <main>
      <div class="container-fluid sidebar">
        <div class="row">
          <b-col cols lg="1" class="sidebar text-center">
            <div class="fork">
              <router-link to="/">
                <img src="../assets/img/fork.png" />
              </router-link>
            </div>
            <div class="clipboard">
              <router-link to="/history">
                <img src="../assets/img/clipboard.png" />
              </router-link>
            </div>
          </b-col>
          <b-col
            cols
            lg="11"
            class="history"
            style="background:whitesmoke;box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25)"
          >
            <div class="income">
              <b-col cols lg="4" class="left">
                <h4>Today's Income</h4>
                <p>Rp. {{ getHistDay }}</p>
                <h4>+2% Yesterday</h4>
              </b-col>
              <b-col cols lg="4" class="mid">
                <h4>Orders</h4>
                <p>{{ getHistCount }}</p>
                <h4>+5% Last Week</h4>
              </b-col>
              <b-col cols lg="4" class="right">
                <h4>Today's Income</h4>
                <p>Rp. {{ getHistYears }}</p>
                <h4>+10% Last Year</h4>
              </b-col>
            </div>
            <div
              style="background:white;box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.25);border-radius: 10px;"
            >
              <div>
                <b-col cols lg="12" class="revenue">
                  <div style="margin-top:20px">
                    <h4>Revenue</h4>
                  </div>
                  <div style="margin-top:20px">
                    <b-dropdown text="Months">
                      <b-dropdown-item href="#" @click="getChart"
                        >Month</b-dropdown-item
                      >
                      <b-dropdown-item href="#">Another item</b-dropdown-item>
                    </b-dropdown>
                  </div>
                </b-col>
              </div>
              <div>
                <b-col cols lg="12" class="chart text-center">
                  <line-chart :data="getHistChart"></line-chart>
                </b-col>
              </div>
            </div>
            <br />
            <div
              style="background:white;box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.25);border-radius: 10px;"
            >
              <div>
                <b-col cols lg="12" class="recent">
                  <div style="margin:20px">
                    <h4>Recent Order</h4>
                  </div>
                  <div style="margin:20px">
                    <b-dropdown text="Today">
                      <b-dropdown-item @click="getRecentOrder"
                        >Today</b-dropdown-item
                      >
                      <b-dropdown-item>Week</b-dropdown-item>
                      <b-dropdown-item>Month</b-dropdown-item>
                    </b-dropdown>
                  </div>
                </b-col>
              </div>
              <br />

              <div class="under-row text-center">
                <b-col cols lg="12" style="height:300px;overflow-y: auto;">
                  <table class="table table-sm" id="recent">
                    <thead class="”thead-light”">
                      <tr>
                        <th style="text-align: center">INVOICES</th>
                        <th style="text-align: center">CASHIER</th>
                        <th style="text-align: center">DATE</th>
                        <th style="text-align: center">ORDERS</th>
                        <th style="text-align: center">AMOUNT</th>
                      </tr>
                    </thead>
                    <tr v-for="(value, index) in getOrders" :key="index">
                      <td>{{ value.invoices }}</td>
                      <td>{{ value.cashier }}</td>
                      <td>{{ value.date }}</td>
                      <td>{{ value.orders }}</td>
                      <td>Rp. {{ value.amount }}</td>
                    </tr>
                  </table>
                </b-col>
              </div>
            </div>
          </b-col>
        </div>
      </div>
    </main>
    <!-- <Histcontent /> -->
  </div>
</template>

<script>
import HistHeader from '../components/_base/HistHeader'
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  name: 'History',
  components: {
    HistHeader
  },
  data() {
    return {
      // historyDay: [],
      // historyWeek: [],
      // historyYears: [],
      // chart: [],
      // recentOrder: {},
      // history: {}
      // data: []
    }
  },
  created() {
    this.getHistoryDay()
    this.getHistoryWeek()
    this.getHistoryYears()
    this.getChart()
    this.getRecentOrder()
    this.getWeekOrder()
    this.getMonthOrder()
  },
  computed: {
    ...mapGetters([
      'getHistDay',
      'getHistCount',
      'getHistYears',
      'getHistChart',
      'getOrders',
      'getData',
      'getWeekOrders',
      'getMonthOrders'
    ])
  },
  methods: {
    ...mapActions([
      'getHistoryDay',
      'getHistoryWeek',
      'getHistoryYears',
      'getChart',
      'getRecentOrder',
      'getWeekOrder',
      'getMonthOrder'
    ]),
    ...mapMutations([
      'setHistoryDay',
      'setHistoryWeek',
      'setHistoryYears',
      'setChart',
      'setRecentOrder',
      'setWeekOrder',
      'setMonthOrder'
    ])
    // getRecentOrder(data) {
    //   axios
    //     .get(`${process.env.VUE_APP_URL}/history/recent/order`)
    //     .then(response => {
    //       this.recentOrder = response.data.data
    //       this.recentOrder.map(value => {
    //         const setData = {
    //           invoices: value.invoice,
    //           cashier: 'Pevita Pearce',
    //           date: value.history_created_at.slice(0, 10),
    //           orders: value.orders
    //             .map(item => item.product_name.concat(` ${item.order_qty}x`))
    //             .join(', '),
    //           amount: value.history_subTotal
    //         }
    //         this.data = [...this.data, setData]
    //         console.log(this.data)
    //       })
    //     })
    //     .catch(error => {
    //       console.log(error)
    //     })
    // },
    // getWeekOrder(data) {
    //   axios
    //     .get(`${process.env.VUE_APP_URL}/history/week/order`)
    //     .then(response => {
    //       this.weekOrder = response.data.data
    //       this.weekOrder.map(value => {
    //         const setData = {
    //           invoices: value.invoice,
    //           cashier: 'Pevita Pearce',
    //           date: value.history_created_at.slice(0, 10),
    //           orders: value.orders
    //             .map(item => item.product_name.concat(` ${item.order_qty}x`))
    //             .join(', '),
    //           amount: value.history_subTotal
    //         }
    //         this.data = [...this.data, setData]
    //         console.log(this.data)
    //       })
    //     })
    //     .catch(error => {
    //       console.log(error)
    //     })
    // },
    // getMonthOrder(data) {
    //   axios
    //     .get(`${process.env.VUE_APP_URL}/history/month/order`)
    //     .then(response => {
    //       this.monthOrder = response.data.data
    //       this.monthOrder.map(value => {
    //         const setData = {
    //           invoices: value.invoice,
    //           cashier: 'Pevita Pearce',
    //           date: value.history_created_at.slice(0, 10),
    //           orders: value.orders
    //             .map(item => item.product_name.concat(` ${item.order_qty}x`))
    //             .join(', '),
    //           amount: value.history_subTotal
    //         }
    //         this.data = [...this.data, setData]
    //         console.log(this.data)
    //       })
    //     })
    //     .catch(error => {
    //       console.log(error)
    //     })
    // }
  }
}
</script>

<style src="../assets/css/history.css"></style>

<template>
  <div>
    <Histheader />
    <!-- sidebar -->
    <main>
      <div class="container-fluid sidebar">
        <div class="row">
          <b-col cols lg="1" class="sidebar text-center">
            <div class="fork">
              <img src="../assets/img/fork.png" />
            </div>
            <div class="clipboard">
              <router-link to="/history">
                <img src="../assets/img/clipboard.png" />
              </router-link>
            </div>
            <div class="add">
              <img src="../assets/img/add.png" />
            </div>
          </b-col>
          <b-col
            cols
            lg="11"
            class="history"
            style="background:whitesmoke;box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25)"
          >
            <div class="income">
              <b-col cols lg="3" class="left">
                <h4>Today's Income</h4>
                <p>Rp. {{historyDay}}</p>
                <h4>+2% Yesterday</h4>
              </b-col>
              <b-col cols lg="3" class="mid">
                <h4>Orders</h4>
                <p>{{historyWeek}}</p>
                <h4>+5% Last Week</h4>
              </b-col>
              <b-col cols lg="3" class="right">
                <h4>Today's Income</h4>
                <p>Rp. {{historyYears}}</p>
                <h4>+10% Last Year</h4>
              </b-col>
            </div>
            <div>
              <b-col cols lg="12" class="revenue">
                <div>
                  <h4>Revenue</h4>
                </div>
                <div>
                  <b-dropdown text="Months">
                    <b-dropdown-item href="#" @click="getChart">Month</b-dropdown-item>
                    <b-dropdown-item href="#">Another item</b-dropdown-item>
                  </b-dropdown>
                </div>
              </b-col>
            </div>
            <div>
              <b-col cols lg="12" class="chart text-center">
                <line-chart :data="chart"></line-chart>
              </b-col>
            </div>
            <br />
            <div>
              <b-col cols lg="12" class="recent">
                <div>
                  <h4>Recent Order</h4>
                </div>
                <div>
                  <b-dropdown text="Today">
                    <b-dropdown-item @click="getRecentOrder">Today</b-dropdown-item>
                    <b-dropdown-item>This Week</b-dropdown-item>
                  </b-dropdown>
                </div>
              </b-col>
            </div>
            <br />

            <div class="under-row text-center">
              <b-col cols lg="12">
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
                  <tr v-for="(value, index) in data" :key="index">
                    <td>{{value.invoices}}</td>
                    <td>{{value.cashier}}</td>
                    <td>{{value.date}}</td>
                    <td>{{value.orders}}</td>
                    <td>Rp. {{value.amount}}</td>
                  </tr>
                </table>
              </b-col>
            </div>
          </b-col>
        </div>
      </div>
    </main>
    <!-- <Histcontent /> -->
  </div>
</template>

<script>
import axios from 'axios'
import Histheader from '../components/_base/Histheader'
// import Histcontent from '../components/_base/Hiscontent'

export default {
  name: 'History',
  components: {
    Histheader
    // Histcontent
  },
  data() {
    return {
      historyDay: [],
      historyWeek: [],
      historyYears: [],
      chart: [],
      recentOrder: {},
      // history: {},
      data: []
    }
  },
  created() {
    this.getHistoryDay()
    this.getHistoryWeek()
    this.getHistoryYears()
    this.getChart()
    this.getRecentOrder()
    // this.getAllHistory()
  },
  methods: {
    getHistoryDay(data) {
      axios
        .get('http://127.0.0.1:3001/history/dashboard/day')
        .then(response => {
          this.historyDay = response.data.data[0].Today
          console.log(this.historyDay)
        })
        .catch(error => {
          console.log(error)
        })
    },
    getHistoryWeek(data) {
      axios
        .get('http://127.0.0.1:3001/history/dashboard/week')
        .then(response => {
          this.historyWeek = response.data.data[0].orders
          // console.log(this.historyDay)
        })
        .catch(error => {
          console.log(error)
        })
    },
    getHistoryYears(data) {
      axios
        .get('http://127.0.0.1:3001/history/dashboard/years')
        .then(response => {
          this.historyYears = response.data.data[0].Years
          // console.log(this.historyDay)
        })
        .catch(error => {
          console.log(error)
        })
    },
    getRecentOrder(data) {
      axios
        .get('http://127.0.0.1:3001/history/recent/order')
        .then(response => {
          this.recentOrder = response.data.data
          this.recentOrder.map(value => {
            const setData = {
              invoices: value.invoice,
              cashier: 'Pevita Pearce',
              date: value.history_created_at.slice(0, 10),
              orders: value.orders
                .map(item => item.product_name.concat(` ${item.order_qty}x`))
                .join(', '),
              amount: value.history_subTotal
            }
            this.data = [...this.data, setData]
            console.log(this.data)
          })
        })
        .catch(error => {
          console.log(error)
        })
    },
    getChart() {
      axios
        .get('http://localhost:3001/history/chart')
        .then(response => {
          const setData = response.data.data
          for (let i = 0; i < setData.length; i++) {
            this.chart.push([setData[i].date, setData[i].total])
          }
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>

<style src="../assets/css/history.css"></style>

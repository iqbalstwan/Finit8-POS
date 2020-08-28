<template>
  <div>
    <Histheader />
    <!-- sidebar -->
    <main>
      <div class="container-fluid sidebar">
        <div class="row">
          <div class="col-md-1 text-center">
            <div class="fork">
              <a href="home.html">
                <img src="../assets/img/fork.png" />
              </a>
            </div>
            <div class="clipboard">
              <a href="history.html">
                <img src="../assets/img/clipboard.png" />
              </a>
            </div>
            <div class="add">
              <img src="../assets/img/add.png" />
            </div>
          </div>
          <div class="col-md-11 history">
            <div class="row income">
              <div class="col-md-3 left">
                <h4>Today's Income</h4>
                <p>Rp. 1.000.000</p>
                <h4>+2% Yesterday</h4>
              </div>
              <div class="col-md-3 mid">
                <h4>Orders</h4>
                <p>Rp. 3.270</p>
                <h4>+5% Last Week</h4>
              </div>
              <div class="col-md-3 right">
                <h4>Today's Income</h4>
                <p>Rp. 100.000.000.000</p>
                <h4>+10% Last Year</h4>
              </div>
              <div class="col-md-11 chart text-center">
                <line-chart :data="{'2017-01-01': 11, '2017-01-02': 6}"></line-chart>
              </div>
              <div class="col-md-12 recent">
                <h4>Recent Order</h4>
                <button
                  class="btn btn-secondary dropdown-toggle"
                  type="button"
                  id="dropdownMenu2"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >Today</button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
                  <button class="dropdown-item" type="button">Action</button>
                  <button class="dropdown-item" type="button">Another action</button>
                  <button class="dropdown-item" type="button">Something else here</button>
                </div>
              </div>
            </div>
            <div class="row order">
              <div class="col-md-2">
                <p>INVOICES</p>
                <hr width="100%" />
                <h6>#1098</h6>
              </div>
              <div class="col-md-2">
                <p>Cashier</p>
                <hr width="100%" />
                <h6>Cashier1</h6>
              </div>
              <div class="col-md-2">
                <p>Date</p>
                <hr width="100%" />
                <h6>06 October 2019</h6>
              </div>
              <div class="col-md-2">
                <p>ORDERS</p>
                <hr width="100%" />
                <h6>Ice Tea, Salad</h6>
              </div>
              <div class="col-md-2">
                <p>AMOUNT</p>
                <hr width="100%" />
                <h6>Rp. 120.000</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    <!-- <Histcontent /> -->
  </div>
</template>

<script>
import Histheader from '../components/_base/Histheader'
// import Histcontent from '../components/_base/Hiscontent'

export default {
  name: 'History',
  components: {
    Histheader
    // Histcontent
  }
}
</script>

<style src="../assets/css/history.css"></style>

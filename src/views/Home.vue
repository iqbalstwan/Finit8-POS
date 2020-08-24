<template>
  <div>
    <b-container fluid class="home">
      <b-row class="text-center">
        <b-col md="8">
          <div class="menu-icon">
            <b-link href="index.html">
              <img src="../assets/img/menu.png" />
            </b-link>
          </div>
          <div class="food">
            <p>Food Items</p>
          </div>
          <div class="search">
            <img src="../assets/img/magnifying-glass.png" />
          </div>
        </b-col>
        <b-col md="4">
          <p>
            Cart<span>{{ count }}</span>
          </p>
        </b-col>
      </b-row>
    </b-container>
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
            <div type="button" data-toogle="modal" class="add">
              <img src="../assets/img/add.png" />
            </div>
          </div>
          <div class="col-md-7 menu">
            <b-row>
              <b-col
                col
                lg="4"
                sm="12"
                v-for="(item, index) in products"
                :key="index"
              >
                <div
                  class="count"
                  @increment="incrementCount()"
                  v-on:click="addToCart(item)"
                >
                  <img src="https://picsum.photos/600/300/?image=25" alt="" />
                  <h4>{{ item.product_name }}</h4>
                  <p>Rp. {{ item.product_price }}</p>
                  <b-button variant="primary" @click="increment"
                    >Add To Cart</b-button
                  >
                  <!-- <b-button variant="success" v-on:click="setProduct(item)"
                  >Update</b-button
                >
                <b-button
                  variant="danger"
                  v-on:click="deleteProduct(item.product_id)"
                  >Delete</b-button
                > -->
                </div>
                <!-- <b-card
                v-bind:title="item.product_name"
                img-src="https://picsum.photos/600/300/?image=25"
                img-alt="Image"
                img-top
                tag="article"
                style="max-width: 20rem;"
                class="mb-2"
              >
                <b-card-text>{{ item.product_price }}</b-card-text>

                <b-button variant="primary" v-on:click="addToCart(item)"
                  >Add To Cart</b-button
                >
                <b-button variant="success" v-on:click="setProduct(item)"
                  >Update</b-button
                >
                <b-button
                  variant="danger"
                  v-on:click="deleteProduct(item.product_id)"
                  >Delete</b-button
                >
              </b-card> -->
              </b-col>
            </b-row>
          </div>
          <div class="col-md-4 text-center">
            <div class="cart">
              <img src="../assets/img/food-and-restaurant.png" alt="" />
              <h4>Your cart is empty</h4>
              <p>please add some item from the menu</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import axios from 'axios'
// import Header from '../components/_base/Header'
// import Menu from '../components/_base/Menu'

// export default {
//   name: 'Home'
//   // components: {
//   //   Header,
//   //   Menu
//   // }
// }
export default {
  name: 'axios',
  data() {
    return {
      count: 0,
      cart: [],
      page: 1,
      limit: 4,
      products: [],
      form: {
        category_id: '',
        product_name: '',
        product_price: '',
        product_status: ''
      },
      alert: false,
      isMsg: '',
      isUpdate: false,
      product_id: ''
    }
  },
  created() {
    this.get_product()
  },
  methods: {
    increment() {
      console.log('clicked')
      this.$emit('increment', 1)
    },
    incrementCount(data) {
      this.count += data
    },
    addToCart(data) {
      const setCart = {
        product_id: data.product_id,
        product_name: data.product_name,
        product_price: data.product_price,
        qty: 1
        // product_price
      }
      // spread operator
      this.cart = [...this.cart, setCart]
      console.log(this.cart)
    },
    get_product() {
      axios
        .get(
          `http://127.0.0.1:3001/product?page=${this.page}limit=${this.limit}`
          // 'http://127.0.0.1:3001/product'
        )
        .then(response => {
          this.products = response.data.data
          console.log(this.products)
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>

<style src="../assets/css/style.css"></style>

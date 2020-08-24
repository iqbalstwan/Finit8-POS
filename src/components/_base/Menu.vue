<template>
  <main>
    <div class="container-fluid sidebar">
      <div class="row">
        <div class="col-md-1 text-center">
          <div class="fork">
            <a href="home.html">
              <img src="../../assets/img/fork.png" />
            </a>
          </div>
          <div class="clipboard">
            <a href="history.html">
              <img src="../../assets/img/clipboard.png" />
            </a>
          </div>
          <div type="button" data-toogle="modal" class="add">
            <img src="../../assets/img/add.png" />
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
              <div>
                <img src="https://picsum.photos/600/300/?image=25" alt="" />
                <h4>{{ item.product_name }}</h4>
                <p>{{ item.product_price }}</p>
                <b-button variant="primary" v-on:click="addToCart(item)"
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
            <img src="../../assets/img/food-and-restaurant.png" alt="" />
            <h4>Your cart is empty</h4>
            <p>please add some item from the menu</p>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Axios',
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
    },
    addProduct() {
      console.log(this.form)
      axios
        .post(
          // `http://127.0.0.1:3001/product?page=${this.page}limit=${this.limit}`
          'http://127.0.0.1:3001/product',
          this.form
        )
        .then(response => {
          this.alert = true
          this.isMsg = response.data.msg
          // console.log(this.products)
        })
        .catch(error => {
          console.log(error)
        })
    },
    setProduct(data) {
      this.form = {
        product_name: data.product_name,
        category_id: data.category_id,
        product_price: data.product_price,
        product_status: data.product_status
      }
      this.isUpdate = true
      this.product_id = data.product_id
      // console.log(data.product_id)
    },
    patchProduct() {
      this.isUpdate = false
    },
    deleteProduct(data) {
      console.log(data)
    }
  }
}
</script>

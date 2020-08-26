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
            <p>Finit8</p>
          </div>
          <div class="search">
            <button
              type="button"
              data-toggle="modal"
              data-target="#myModal"
              class="btn btn-default navbar-btn"
            >
              <img src="../assets/img/magnifying-glass.png" />
            </button>
            <b-modal id="myModal" title="BootstrapVue">
              <p class="my-4">Hello from modal!</p>
            </b-modal>
          </div>
        </b-col>
        <b-col md="4">
          <p>
            Cart<span>{{ cart.length }}</span>
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
            <div>
              <b-button
                v-b-modal.modal-1
                style="background-color:transparent;border:none"
                ><img src="../assets/img/add.png"
              /></b-button>
              <b-modal id="modal-1" title="Add Product" hide-footer="true">
                <b-alert :show="alert">{{ isMsg }}</b-alert>
                <form v-on:submit.prevent="addProduct">
                  <b-form-group
                    id="input-group-1"
                    label="Product Name:"
                    label-for="input-1"
                  >
                    <b-form-input
                      id="input-1"
                      v-model="form.product_name"
                      type="productName"
                      required
                      placeholder="Input Product Name"
                    ></b-form-input>
                  </b-form-group>

                  <b-form-group
                    id="input-group-2"
                    label="Price:"
                    label-for="input-2"
                  >
                    <b-form-input
                      id="input-2"
                      v-model="form.product_price"
                      required
                      placeholder="Input Price"
                    ></b-form-input>
                  </b-form-group>

                  <b-form-group
                    id="input-group-3"
                    label="Category Id:"
                    label-for="input-3"
                  >
                    <b-form-input
                      id="input-3"
                      v-model="form.category_id"
                      required
                      placeholder="Input Category Id"
                    ></b-form-input>
                  </b-form-group>

                  <b-form-group
                    id="input-group-4"
                    label="Product Status:"
                    label-for="input-4"
                  >
                    <b-form-select
                      id="input-4"
                      v-model="form.product_status"
                      :options="status"
                      required
                    ></b-form-select>
                  </b-form-group>
                  <button type="submit" class="btn-pink" v-show="!isUpdate">
                    Add
                  </button>
                </form>
              </b-modal>
            </div>
          </div>
          <div class="col-md-7 menu">
            <b-row>
              <b-col cols="12">
                <div>
                  <select v-model="sort" @change="get_product()">
                    <option value="">Sort by</option>
                    <option value="product_name">Name</option>
                    <option value="category_id">Category</option>
                    <option value="product_price">Price</option>
                    <option value="product_created_at DESC">Date</option>
                  </select>
                </div>
              </b-col>
              <hr />
              <b-col
                col
                lg="4"
                sm="12"
                v-for="(item, index) in products"
                :key="index"
              >
                <div class="counting" @increment="incrementCount()">
                  <!-- <b-iconstack font-scale="5" animation="spin">
                    <b-icon
                      stacked
                      icon="camera"
                      variant="info"
                      scale="0.75"
                      shift-v="-0.25"
                    ></b-icon>
                    <b-icon
                      stacked
                      icon="slash-circle"
                      variant="danger"
                    ></b-icon>
                  </b-iconstack> -->
                  <div class="select-image" v-if="checkCart(item)">
                    <img
                      style="width:40px;height:50px;text-align:center;margin-left:105px;margin-top:60px"
                      src="../assets/img/tick (1).png"
                      class="select-icon"
                      alt=""
                    />
                  </div>
                  <img src="../assets/img/redvelvet.png" alt="" />
                  <h4>{{ item.product_name }}</h4>
                  <p>Rp. {{ item.product_price }}</p>
                  <b-icon-cart3 v-on:click="addToCart(item)">Add</b-icon-cart3>
                  <!-- <p v-if="checkCart(item)">checklist</p> -->
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
              <b-col cols="12">
                <div>
                  <b-pagination
                    first-text="First"
                    last-text="Last"
                    pills
                    size="sm"
                    v-model="page"
                    :total-rows="totalData"
                    :per-page="limit"
                    @change="pageChange"
                    v-show="showPagination"
                    align="center"
                  ></b-pagination>
                </div>
              </b-col>
            </b-row>
          </div>
          <div class="col-md-4 text-center">
            <div class="cart" v-if="cart.length <= 0">
              <img src="../assets/img/food-and-restaurant.png" alt="" />
              <h4>Your cart is empty</h4>
              <p>please add some item from the menu</p>
            </div>
            <div v-else-if="cart.length > 0">
              <div class="img-cart" v-for="(item, index) in cart" :key="index">
                <div class="hover">
                  <img src="../assets/img/bear.png" alt="" />
                </div>
                <div class="items">
                  <p>{{ item.product_name }}</p>
                  <div class="min">-</div>
                  <div class="number">1</div>
                  <div class="plus">+</div>
                </div>
                <div class="price">
                  <p>{{ item.product_price }}</p>
                </div>
              </div>
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
  name: 'Home',
  data() {
    return {
      count: 0,
      cart: [],
      page: 1,
      limit: 6,
      totalData: 0,
      showPagination: true,
      sort: '',
      products: [],
      form: {
        category_id: '',
        product_name: '',
        product_price: '',
        product_status: ''
      },
      status: [{ text: 'Select Status', value: null }, '0', '1'],
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
    checkCart(data) {
      return this.cart.some(item => item.product_id === data.product_id)
    },
    incrementCount(data) {
      this.count += 1
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
          `http://127.0.0.1:3001/product?sort=${this.sort}&page=${this.page}&limit=${this.limit}`
          // 'http://127.0.0.1:3001/product'
        )
        .then(response => {
          this.products = response.data.data
          console.log(this.products)
          this.totalData = response.data.pagination.totalData
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
    pageChange(value) {
      this.page = value
      this.get_product()
    }
  }
}
</script>

<style src="../assets/css/style.css"></style>

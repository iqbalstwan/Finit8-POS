<template>
  <div>
    <b-container fluid class="home">
      <b-row class="header">
        <b-col md="8">
          <div class="menu-icon">
            <b-button
              style="background-color:transparent;border:none"
              v-b-toggle.sidebar-1
              ><img src="../assets/img/menu.png"
            /></b-button>
            <b-sidebar
              id="sidebar-1"
              title="Hello..."
              shadow
              bg-variant="warning"
            >
              <h1>Admin</h1>
              <h1>Setting</h1>
            </b-sidebar>
          </div>
          <div class="food">
            <p>Finit8</p>
          </div>
          <div class="search">
            <b-form>
              <input
                style="border-color:white"
                placeholder="Search..."
                type="search"
                v-model="search"
                @change="searchProduct()"
              />
              <!-- </input> -->
              <button
                type="reset"
                style="background:transparent;background:white;border:none"
              >
                <img
                  style="text-color:white"
                  src="../assets/img/magnifying-glass.png"
                />
              </button>
            </b-form>
          </div>
        </b-col>
        <b-col md="4" class="cart text-center">
          <p>
            Cart
            <span>{{ cart.length }}</span>
          </p>
        </b-col>
      </b-row>
    </b-container>
    <main>
      <div class="container-fluid sidebar">
        <div class="row">
          <b-col cols md="1 text-center">
            <div class="fork">
              <img @click="handleLogout" src="../assets/img/fork.png" />
            </div>
            <div class="clipboard">
              <router-link to="/history">
                <img src="../assets/img/clipboard.png" />
              </router-link>
            </div>
            <div>
              <b-button
                @click="showModal"
                class="add"
                style="background-color:transparent;border:none"
              >
                <img src="../assets/img/add.png" />
              </b-button>
              <b-modal ref="my-modal" title :hide-footer="true">
                <form v-on:submit.prevent="addProduct">
                  <!-- <b-alert :show="alert">{{ isMsg }}</b-alert> -->
                  <b-form-group
                    id="input-group-1"
                    label="Product Name:"
                    label-for="input-1"
                  >
                    <b-form-input
                      id="input-1"
                      v-model="form.product_name"
                      type="text"
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
                  <button
                    type="submit"
                    class="btn-pink"
                    v-show="!isUpdate"
                    @click="makeToast('success')"
                  >
                    Add
                  </button>
                  <button
                    type="button"
                    class="btn-pink"
                    v-show="isUpdate"
                    @click="patchProduct(), makeToast('primary')"
                  >
                    Update
                  </button>
                </form>
              </b-modal>
            </div>
          </b-col>
          <b-col cols md="7" class="menu">
            <b-row>
              <b-col cols="12">
                <div>
                  <select v-model="sort" @change="get_product()">
                    <option value>Sort by</option>
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
                md="6"
                sm="12"
                v-for="(item, index) in products"
                :key="index"
              >
                <div class="counting" @increment="incrementCount()">
                  <div class="select-image" v-if="checkCart(item)">
                    <img
                      style="width:40px;height:50px;text-align:center;margin-left:105px;margin-top:60px"
                      src="../assets/img/tick (1).png"
                      class="select-icon"
                      alt
                    />
                  </div>
                  <img :src="'http://127.0.0.1:3001/' + item.product_img" />
                  <h4 style="font-weight:bold">{{ item.product_name }}</h4>
                  <p style="color:grey">Rp. {{ item.product_price }}</p>
                  <b-button
                    v-on:click="addToCart(item)"
                    style="width:70px;margin-right:10px;background:green;border:white"
                  >
                    <img
                      style="width:30px;height:45px;margin-top:-25px"
                      src="../assets/img/cart.png"
                    />
                  </b-button>
                  <!-- <div class="button-bot"> -->
                  <!-- modal Update -->
                  <b-button
                    v-b-modal.modal-1
                    variant="outline-primary"
                    v-on:click="setProduct(item)"
                    >Update</b-button
                  >
                  <b-button
                    variant="outline-danger"
                    @click="deleteProduct(item)"
                    style="color:red;cursor:pointer;margin-left:10px"
                    >Delete</b-button
                  >
                  <!-- </div> -->
                  <!-- <p v-if="checkCart(item)">checklist</p> -->
                </div>
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
          </b-col>
          <b-col cols md="4">
            <div class="cart text-center" v-if="cart.length <= 0">
              <img src="../assets/img/food-and-restaurant.png" alt />
              <h4>Your cart is empty</h4>
              <p>please add some item from the menu</p>
            </div>
            <div class="cartIn" v-else-if="cart.length > 0">
              <div class="img-cart" v-for="(item, index) in cart" :key="index">
                <div class="hover">
                  <img :src="'http://127.0.0.1:3001/' + item.product_img" alt />
                </div>
                <div class="items">
                  <p style="color:grey">{{ item.product_name }}</p>
                  <b-button variant="success" @click="decrement(item)"
                    >-</b-button
                  >
                  <b-button variant="outline-success">{{
                    item.order_qty
                  }}</b-button>
                  <b-button variant="success" @click="increment(item)"
                    >+</b-button
                  >
                </div>
                <div class="price">
                  <b-button
                    style="margin-bottom:10px"
                    class="remove-cart"
                    variant="danger"
                    @click="removeCart(item)"
                    >Remove</b-button
                  >
                  <p style="margin-top:15px;color:grey">
                    Rp.{{ item.product_price * item.order_qty }}
                  </p>
                </div>
              </div>
              <div class="total">
                <div>
                  <h4>Total :</h4>
                  <p>*Belum termasuk ppn</p>
                </div>
                <div>
                  <h4>Rp. {{ totally }}</h4>
                </div>
              </div>
              <!-- @click="postOrder()" -->
              <div class="total-box">
                <div class="checkout">
                  <b-button
                    type="button"
                    class="btn-primary"
                    v-b-modal.modal-checkout
                    style="border:none"
                    @click="postOrder()"
                    >Checkout</b-button
                  >
                  <b-modal
                    id="modal-checkout"
                    title="Checkout"
                    class="check"
                    hide-footer
                    no-close-on-backdrop
                  >
                    <div class="line1">
                      <div class="first">
                        <div class="cashier">Cashier: Pevita Pearce</div>
                        <div class="cashier">
                          Receipt no: # {{ modalCheckOut.Invoices }}
                        </div>
                      </div>
                      <div
                        class="second"
                        v-for="(item, index) in cart"
                        :key="index"
                        style="display:flex;justify-content:space-between;margin-top:10px"
                      >
                        <div>
                          <p>{{ item.product_name }} x{{ item.order_qty }}</p>
                        </div>
                        <div>
                          <p>Rp. {{ item.product_price }}</p>
                        </div>
                      </div>
                      <div
                        class="third"
                        style="display:flex;justify-content:space-between;margin-top:40px"
                      >
                        <div>
                          <p>Ppn 10%</p>
                        </div>
                        <div>
                          <p>Rp. {{ (totally * 10) / 100 }}</p>
                        </div>
                      </div>
                      <div class="fourth" style="text-align:right">
                        <div>
                          <p>
                            Total : Rp. {{ totally + (totally * 10) / 100 }}
                          </p>
                        </div>
                      </div>
                      <b-button
                        class="print"
                        style="width:460px;background: #f24f8a;border:none;font-size: 25px;margin-top:20px"
                        >Print</b-button
                      >
                      <div style="text-align:center;margin-top:10px">OR</div>
                      <b-button
                        class="email"
                        style="width:460px;background: #57cad5;border:none;font-size: 25px;margin-top:20px"
                        >Send Email</b-button
                      >
                    </div>
                  </b-modal>
                </div>
                <b-button
                  class="cancel"
                  @click="cart = []"
                  style="width:450px;background: #f24f8a;border:none;font-size: 25px;margin-top:10px;font-weight:bold"
                  >Cancel</b-button
                >
              </div>
            </div>
          </b-col>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import axios from 'axios'
// import Header from '../components/_base/Header'
// import Menu from '../components/_base/Menu'

export default {
  name: 'Home',
  // component: {
  //   Header
  // },
  data() {
    return {
      count: 0,
      cart: [],
      // page: 1,
      // limit: 6,
      // totalData: 1,
      showPagination: true,
      // sort: '',
      // products: [],
      qty: 1,
      modalCheckOut: {},
      form: {
        category_id: '',
        product_name: '',
        product_price: '',
        product_status: ''
      },
      status: [{ text: 'Select Status', value: null }, '0', '1'],
      alert: false,
      search: '',
      isSearch: false,
      isMsg: '',
      isUpdate: false,
      product_id: ''
    }
  },
  created() {
    this.get_product()
  },
  methods: {
    ...mapActions({ get_product: 'getProducts' }),
    ...mapMutations(['setPage']),
    ...mapActions({ handleLogout: 'logout' }),
    // handleLogout() {
    //   console.log('logout clicked')
    // },
    checkCart(data) {
      return this.cart.some(item => item.product_id === data.product_id)
    },
    removeCart(data) {
      return this.cart.splice(
        this.cart.findIndex(item => item.product_id === data.product_id),
        1
      )
    },
    showModal() {
      this.form = {
        category_id: '',
        product_name: '',
        product_price: '',
        product_status: ''
      }
      this.isUpdate = false
      this.$refs['my-modal'].show()
    },
    hideModal() {
      this.$refs['my-modal'].hide()
    },
    toggleModal() {
      // We pass the ID of the button that we want to return focus to
      // when the modal has hidden
      this.$refs['my-modal'].toggle('#toggle-btn')
    },
    incrementCount(data) {
      this.count += 1
    },
    increment(data) {
      data.order_qty += 1
      data.total_price = data.product_price * data.order_qty
    },
    decrement(data) {
      if (data.order_qty === 1) {
        alert('Please,Quantity not allowed')
      } else {
        data.order_qty -= 1
        data.total_price = data.product_price * data.order_qty
      }
    },

    addToCart(data) {
      const setCart = {
        product_id: data.product_id,
        product_name: data.product_name,
        product_price: data.product_price,
        order_qty: 1,
        total_price: data.product_price
        // product_price
      }
      const fixedData = [...this.cart, setCart]
      const addedItem = fixedData.find(
        item => item.product_id === data.product_id
      )
      const existItem = this.cart.find(
        item => item.product_id === data.product_id
      )
      if (existItem) {
        addedItem.order_qty += 1
      } else {
        // spread operator
        this.cart = [...this.cart, setCart]
      }
      // console.log(this.cart)
    },
    // get_product() {
    //   axios
    //     .get(
    //       `http://127.0.0.1:3001/product?sort=${this.sort}&page=${this.page}&limit=${this.limit}`
    //       // 'http://127.0.0.1:3001/product'
    //     )
    //     .then(response => {
    //       this.products = response.data.data
    //       console.log(this.products)
    //       this.totalData = response.data.pagination.totalData
    //       // this.$router.push(`?sort=${this.sort}&page=${this.page}`)
    //     })
    //     .catch(error => {
    //       console.log(error)
    //     })
    // },
    searchProduct() {
      console.log(this.search)
      if (this.search === '') {
        this.get_product()
      } else {
        axios
          .get(`http://127.0.0.1:3001/product?search=${this.search}`)
          .then(response => {
            this.products = response.data.data
            this.$router.push(`?produk=${this.search}`)
            console.log(this.products)
          })
          .catch(error => {
            console.log(error)
          })
      }
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
          this.$refs['my-modal'].hide()
          this.alert = true
          this.isMsg = response.data.msg
          // alert(this.isMsg)
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
      this.$refs['my-modal'].show()
      this.product_id = data.product_id
      // console.log(data.product_id)
    },
    patchProduct() {
      // console.log(this.product_id)
      // console.log(this.form)
      this.isUpdate = false

      axios
        .patch(`http://127.0.0.1:3001/product/${this.product_id}`, this.form)
        .then(response => {
          this.$refs['my-modal'].hide()
          this.get_product()
          console.log(response)
          this.alert = true
          this.isMsg = response.data.msg
          // alert(this.isMsg)
        })
        .catch(error => {
          console.log(error)
        })
    },
    deleteProduct(data) {
      // console.log(this.product_id)
      // console.log(this.form)
      axios
        .delete(`http://127.0.0.1:3001/product/${data.product_id}`, this.form)
        .then(response => {
          this.get_product()
          this.alert = true
          this.isMsg = response.data.msg
          alert(this.isMsg)
          console.log(response)
        })
        .catch(error => {
          console.log(error)
        })
    },
    postOrder(data) {
      const setCart = {
        orders: [...this.cart]
      }
      console.log(setCart)
      axios
        .post('http://127.0.0.1:3001/order', setCart)
        .then(response => {
          this.modalCheckOut = response.data.data
          console.log(response)
          // this.alert = true
          // this.invoice = response.data.data
          // this.isMsg = response.data.msg
        })
        .catch(error => {
          console.log(error)
        })
    },
    pageChange(value) {
      this.$router.push(`?page=${value}`)
      this.setPage(value)
      this.get_product()
    },
    makeToast(variant = null) {
      this.$bvToast.toast('Patch Done ', {
        title: 'Update ',
        variant: variant,
        solid: true
      })
    }
  },
  computed: {
    ...mapGetters({
      limit: 'getLimit',
      page: 'getPage',
      sort: 'getSort',
      totalData: 'getTotalData',
      products: 'getProduct'
    }),
    totally() {
      const totals = this.cart.map(value => {
        return value.order_qty * value.product_price
      })
      return totals.reduce((a, b) => a + b)
    }
  }
}
</script>

<style src="../assets/css/style.css"></style>

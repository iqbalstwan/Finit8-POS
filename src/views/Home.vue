<template>
  <div>
    <!-- <Header /> -->
    <b-container fluid class="home">
      <b-row class="header">
        <b-col md="8">
          <div class="menu-icon">
            <b-button
              style="background-color:transparent;border:none"
              v-b-toggle.sidebar-1
            >
              <img src="../assets/img/menu.png" />
            </b-button>
            <b-sidebar
              class="aside text-center"
              id="sidebar-1"
              title="Hello..."
              shadow
              bg-variant="light"
            >
              <router-link to="/admin" v-if="user.user_role === 1">
                <h3 style="cursor:pointer;color:black">
                  <img style="height:30px" src="../assets/img/admin.png" />
                  Admin
                </h3>
              </router-link>
              <router-link to="/setting" v-if="user.user_role === 1">
                <h3 style="cursor:pointer;color:black">
                  <img style="height:30px" src="../assets/img/list.png" />
                  Setting
                </h3>
              </router-link>
              <h3 style="cursor:pointer" @click="handleLogout">
                <img style="height:30px" src="../assets/img/logout.png" />
                Logout
              </h3>
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
                v-model="find"
                @change="searchProduct"
              />
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
              <img
                v-b-popover.hover.top="'Menu'"
                src="../assets/img/fork.png"
              />
            </div>
            <div class="clipboard">
              <router-link to="/history">
                <img
                  v-b-popover.hover.top="'History'"
                  src="../assets/img/clipboard.png"
                />
              </router-link>
            </div>
            <div>
              <b-button
                @click="showModal"
                class="add"
                style="background-color:transparent;border:none"
              >
                <img
                  v-b-popover.hover.top="'Add'"
                  src="../assets/img/add.png"
                />
              </b-button>
              <b-modal ref="my-modal" title :hide-footer="true">
                <form v-on:submit.prevent="addProduct">
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
                    id="input-group-2"
                    label="Image:"
                    label-for="input-2"
                  ></b-form-group>
                  <input type="file" @change="handleFile" required />
                  <b-form-group
                    id="input-group-4"
                    label="Category:"
                    label-for="input-4"
                  >
                    <b-form-select
                      id="input-4"
                      v-model="form.category_id"
                      :options="category"
                      required
                    ></b-form-select>
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
                  <button
                    type="button"
                    class="btn-pink"
                    v-show="isUpdate"
                    @click="patchProduct()"
                  >
                    Update
                  </button>
                </form>
              </b-modal>
            </div>
          </b-col>
          <b-col cols md="7" sm="12" class="menu">
            <b-row>
              <b-col cols="12">
                <div>
                  <select v-model="defaultSort" @change="handleSort">
                    <option value>-Sort by-</option>
                    <optgroup label="Name">
                      <option value="product_name">Name (A-Z)</option>
                      <option value="product_name DESC">Name (Z-A)</option>
                    </optgroup>
                    <optgroup label="Category">
                      <option value="category_id">Category (A-Z)</option>
                      <option value="category_id DESC">Category (Z-A)</option>
                    </optgroup>
                    <optgroup label="Price">
                      <option value="product_price"
                        >Price (Lowest-Highest)</option
                      >
                      <option value="product_price DESC"
                        >Price (Highest-Lowest)</option
                      >
                    </optgroup>
                    <optgroup label="Date">
                      <option value="product_created_at "
                        >Date (Newest-Oldest)</option
                      >
                      <option value="product_created_at DESC"
                        >Date (Oldest-Newest)</option
                      >
                    </optgroup>
                  </select>
                </div>
              </b-col>
              <hr />
              <b-col col lg="4" v-for="(item, index) in products" :key="index">
                <div class="counting" @increment="incrementCount()">
                  <div class="select-image" v-if="checkCart(item)">
                    <img
                      style="width:40px;height:50px;text-align:center;"
                      src="../assets/img/tick (1).png"
                      class="select-icon"
                      alt
                    />
                  </div>
                  <img :src="url + '/' + item.product_img" />
                  <h4 style="font-weight:bold">{{ item.product_name }}</h4>
                  <p style="color:grey">Rp. {{ item.product_price }}</p>
                  <b-button
                    v-on:click="addToCart(item)"
                    style="width:70px;margin-right:10px;background:green;border:white"
                  >
                    <img
                      style="width:30px;height:45px;margin-top:-25px"
                      src="../assets/img/newCart.png"
                    />
                  </b-button>
                  <b-button
                    v-b-popover.hover.top="'Update'"
                    v-b-modal.modal-1
                    variant="outline-primary"
                    v-on:click="setProduct(item)"
                    v-if="user.user_role === 1"
                    ><b-icon icon="pencil" aria-hidden="true"></b-icon
                  ></b-button>
                  <b-button
                    v-b-popover.hover.top="'Delete'"
                    variant="outline-danger"
                    @click.prevent="deleteProduct(item)"
                    style="color:red;cursor:pointer;margin-left:10px"
                    v-if="user.user_role === 1"
                    ><b-icon icon="trash" aria-hidden="true"></b-icon
                  ></b-button>
                </div>
              </b-col>
              <b-col cols="12">
                <div>
                  <b-pagination
                    first-text="First"
                    last-text="Last"
                    pills
                    size="sm"
                    v-model="currentPage"
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
          <b-col cols md="4" sm="12">
            <div class="cart text-center" v-if="cart.length <= 0">
              <img src="../assets/img/food-and-restaurant.png" alt />
              <h4>Your cart is empty</h4>
              <p>please add some item from the menu</p>
            </div>
            <div class="cartIn" v-if="cart.length > 0">
              <div style="height:400px;overflow-y: auto;">
                <div
                  class="img-cart"
                  v-for="(item, index) in cart"
                  :key="index"
                >
                  <div class="hover">
                    <img :src="url + '/' + item.product_img" alt />
                  </div>
                  <div class="items">
                    <p style="color:grey">{{ item.product_name }}</p>
                    <b-button variant="success" @click="decrement(item)"
                      >-</b-button
                    >
                    <b-button variant="outline-success">
                      {{ item.order_qty }}
                    </b-button>
                    <b-button variant="success" @click="increment(item)"
                      >+</b-button
                    >
                  </div>
                  <div class="price">
                    <b-button
                      style="margin-bottom:10px;width:60%"
                      class="remove-cart text-center"
                      variant="danger"
                      @click="removeCart(item)"
                      ><b-icon icon="trash" aria-hidden="true"></b-icon
                    ></b-button>
                    <p style="margin-top:15px;color:grey">
                      Rp.{{ item.product_price * item.order_qty }}
                    </p>
                  </div>
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
                        <div class="cashier">
                          Cashier : {{ user.user_name }}
                        </div>
                        <div class="cashier">
                          Receipt no: # {{ modalCheckOut }}
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
                          <p>Rp. {{ item.product_price * item.order_qty }}</p>
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
                        v-font-size="25"
                        @click="download()"
                        class="print"
                        style="width:100%;background: #f24f8a;border:none;margin-top:20px"
                        >Print</b-button
                      >
                      <div style="text-align:center;margin-top:10px">OR</div>
                      <b-button
                        v-font-size="25"
                        class="email"
                        style="width:100%;background: #57cad5;border:none;margin-top:20px"
                        @click="clearCart()"
                        >Send Email</b-button
                      >
                    </div>
                  </b-modal>
                </div>
                <b-button class="cancel" @click="clearCart()">Cancel</b-button>
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
import mixins from '../mixin/mixin'
import JsPDF from 'jspdf'
// import axios from 'axios'
// import Emptycart from '../components/_base/Emptycart'
// import Menu from '../components/_base/Menu'

export default {
  name: 'Home',
  mixins: [mixins],
  component: {
    // Emptycart
  },
  data() {
    return {
      count: 0,
      // cart: [],
      currentPage: 1,
      defaultSort: '',
      url: process.env.VUE_APP_URL,
      find: '',
      showPagination: true,
      qty: 1,
      modalCheckOut: {},
      form: {
        category_id: '',
        product_name: '',
        product_price: '',
        product_img: {},
        product_status: ''
      },
      category: [
        { text: 'Select Category', value: null },
        { text: 'Food', value: '1' },
        { text: 'Milk', value: '2' },
        { text: 'Beverages', value: '3' },
        { text: 'Meals', value: '4' },
        { text: 'Coffes', value: '13' }
      ],
      status: [{ text: 'Select Status', value: null }, '0', '1'],
      alert: false,
      isSearch: false,
      isMsg: '',
      isUpdate: false
    }
  },
  created() {
    this.get_product()
  },
  computed: {
    ...mapGetters({
      limit: 'getLimit',
      page: 'getPage',
      sort: 'getSort',
      totalData: 'getTotalData',
      products: 'getProduct',
      cart: 'getCart',
      // modalCheckOut: 'getCheckOut',
      search: 'getSearch',
      user: 'setUser'
    }),
    totally() {
      const totals = this.cart.map(value => {
        return value.order_qty * value.product_price
      })
      return totals.reduce((a, b) => a + b)
    },
    incrementCount() {
      return this.cart.length
    }
  },
  methods: {
    ...mapActions([
      'addProducts',
      'updateProducts',
      'deleteProducts',
      'postOrders',
      'searching',
      'logout'
    ]),
    ...mapMutations([
      'setPage',
      'addToCart',
      'increment',
      'decrement',
      'setSearch',
      'setSort',
      // 'checkCart',
      'removeCart',
      'clearCart'
      // 'modalCheckOut'
    ]),
    ...mapActions({ get_product: 'getProducts' }),
    handleLogout() {
      this.$bvModal
        .msgBoxConfirm('Are you sure?', {
          cancelVariant: 'light',
          okVariant: 'info',
          headerClass: 'p-2 border-bottom-0',
          footerClass: 'p-2 border-top-0',
          centered: true
        })
        .then(item => {
          this.isLogout = item
          this.isLogout ? this.logout(this.$bvToast) : console.log(item)
        })
    },
    download() {
      console.log(this.cart[0].product_name)
      // Jspdf.default = Jspdf
      const doc = new JsPDF()
      doc.setFontSize(14)
      doc.text(
        `- FINIT8 -
      
      Cashier : ${this.user.user_name}
      Receipt no : #${this.modalCheckOut}
      Item: ${this.cart[0].product_name}x${this.cart[0].order_qty}  Rp.${this
          .cart[0].product_price * this.cart[0].order_qty}
      Ppn10% : Rp.${(this.totally * 10) / 100}
      Total : Rp.${this.totally + (this.totally * 10) / 100}
      Date : ${new Date()}
     `,
        15,
        15
      )

      doc.save('finit8.pdf')
    },
    handleFile(event) {
      this.form.product_img = event.target.files[0]
      console.log(event.target.files)
    },
    addProduct() {
      const data = new FormData()
      data.append('category_id', this.form.category_id)
      data.append('product_name', this.form.product_name)
      data.append('product_price', this.form.product_price)
      data.append('product_img', this.form.product_img)
      data.append('product_status', this.form.product_status)

      this.$refs['my-modal'].hide()
      this.addProducts(data)
        .then(response => {
          this.alert = true
          this.isMsg = response.msg
          this.get_product()
          this.$bvToast.toast(`${response.msg}`, {
            title: 'Gotcha ',
            variant: 'success',
            solid: true
          })
        })
        .catch(error => {
          this.alert = true
          this.isMsg = error.data.msg
          this.$bvToast.toast(`${error.data.msg}`, {
            title: 'Check it ',
            variant: 'danger',
            solid: true
          })
        })
    },
    setProduct(data) {
      this.form = {
        category_id: data.category_id,
        product_name: data.product_name,
        product_price: data.product_price,
        product_img: data.product_img,
        product_status: data.product_status
      }
      this.isUpdate = true
      this.$refs['my-modal'].show()
      this.product_id = data.product_id
    },
    patchProduct() {
      const data = new FormData()
      data.append('category_id', this.form.category_id)
      data.append('product_name', this.form.product_name)
      data.append('product_price', this.form.product_price)
      data.append('product_img', this.form.product_img)
      data.append('product_status', this.form.product_status)

      const setData = {
        product_id: this.product_id,
        form: data
      }
      console.log(setData)
      this.$refs['my-modal'].hide()
      this.isUpdate = false
      this.updateProducts(setData)
        .then(response => {
          this.alert = true
          this.isMsg = response.msg
          this.get_product()
          this.$bvToast.toast(`${response.msg}`, {
            title: 'Update ',
            variant: 'primary',
            solid: true
          })
        })
        .catch(error => {
          this.alert = true
          this.isMsg = error.data.msg
          this.$bvToast.toast(`${error.data.msg}`, {
            title: 'Update ',
            variant: 'danger',
            solid: true
          })
        })
    },
    setDelete(data) {
      this.form = {
        category_id: data.category_id,
        product_name: data.product_name,
        product_price: data.product_price,
        product_img: data.product_img,
        product_status: data.product_status
      }
      this.product_id = data.product_id
    },
    deleteProduct(data) {
      const setData = {
        product_id: data.product_id,
        form: data
      }
      this.$bvModal
        .msgBoxConfirm(`Are you sure want to delete ${data.product_name} ?`, {
          title: 'Delete Product',
          size: 'md',
          buttonSize: 'md',
          okVariant: 'danger',
          okTitle: 'Yes',
          cancelTitle: 'Cancel',
          footerClass: 'p-2',
          hideHeaderClose: false,
          centered: true
        })
        .then(response => {
          if (response === true) {
            this.deleteProducts(setData, this.$bvModal)
              .then(response => {
                this.isMsg = response.msg
                this.get_product()
                this.$bvToast.toast(`${response.msg}`, {
                  title: 'Deleted ',
                  variant: 'success',
                  solid: true
                })
                this.closeModal()
                this.isUpdate = false
                // this.get_product()
              })
              .catch(error => {
                this.alert = true
                this.isMsg = error.data.msg
                this.$bvToast.toast(`${error.data.msg}`, {
                  title: 'Delete ',
                  variant: 'danger',
                  solid: true
                })
              })
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    postOrder() {
      const setCart = {
        orders: [...this.cart]
      }
      console.log(setCart)
      this.postOrders(setCart)
        .then(response => {
          this.modalCheckOut = response.data.Invoices
          this.$bvToast.toast(`${response.msg}`, {
            title: 'Gotcha ',
            variant: 'success',
            solid: true
          })
          console.log(response)
        })
        .catch(error => {
          this.$bvToast.toast(`${error.data.msg}`, {
            title: 'Order ',
            variant: 'danger',
            solid: true
          })
          console.log(error)
        })
    },

    checkCart(data) {
      return this.cart.some(item => item.product_id === data.product_id)
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
      this.$refs['my-modal'].toggle('#toggle-btn')
    },

    searchProduct() {
      console.log(this.find)
      if (this.find === '') {
        this.get_product()
      } else {
        this.$router.push(`?product=${this.find}`)
        this.setSearch(this.find)
        this.searching()
      }
    },
    pageChange(event) {
      this.$router.push(`?page=${event}`)
      this.setPage(event)
      this.get_product()
    }
  }
}
</script>

<style src="../assets/css/style.css"></style>

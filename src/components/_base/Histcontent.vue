<template>
  <header>
    <div class="container-fluid home">
      <div class="row text-center">
        <b-col
          cols
          lg="12"
          md="12"
          sm="12"
          style="background:whitesmoke;box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25)"
        >
          <table class="table table-sm" id="recent">
            <thead class="”thead-light”">
              <tr>
                <th style="text-align: center">Category ID</th>
                <th style="text-align: center">Name</th>
                <th style="text-align: center">Status</th>
                <th style="text-align: center">Created</th>
                <th style="text-align: center">Updated</th>
                <th style="text-align: center">
                  Button
                  <b-button
                    v-b-popover.hover.top="'Add Product'"
                    @click="showModal"
                    class="addCategory"
                    style="background-color:transparent;border:none;height:25px"
                  >
                    <img
                      style="height:15px;margin-top:-13px"
                      src="../../assets/img/add.png"
                    />
                  </b-button>

                  <b-modal ref="my-modal" title :hide-footer="true">
                    <form v-on:submit.prevent="addCategory">
                      <b-form-group
                        id="input-group-1"
                        label="Category Name:"
                        label-for="input-1"
                      >
                        <b-form-input
                          id="input-1"
                          v-model="form.category_name"
                          type="text"
                          required
                          placeholder="Input Category Name"
                        ></b-form-input>
                      </b-form-group>

                      <b-form-group
                        id="input-group-4"
                        label="Category Status:"
                        label-for="input-4"
                      >
                        <b-form-select
                          id="input-4"
                          v-model="form.category_status"
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
                        @click="patchCategory()"
                      >
                        Update
                      </button>
                    </form>
                  </b-modal>
                </th>
              </tr>
            </thead>
            <tr v-for="(item, index) in categorys" :key="index">
              <td>{{ item.category_id }}</td>
              <td>{{ item.category_name }}</td>
              <td>{{ item.category_status }}</td>
              <td>{{ item.category_created_at }}</td>
              <td>{{ item.category_update_at }}</td>
              <td>
                <b-button
                  v-b-popover.hover.top="'Update'"
                  v-b-modal.modal-1
                  variant="outline-primary"
                  v-on:click="setCategory(item)"
                  ><b-icon icon="pencil" aria-hidden="true"></b-icon
                ></b-button>
                <b-button
                  v-b-popover.hover.top="'Delete'"
                  variant="outline-danger"
                  @click="deleteCategory(item)"
                  style="color:red;cursor:pointer;margin-left:10px"
                  ><b-icon icon="trash" aria-hidden="true"></b-icon
                ></b-button>
              </td>
            </tr>
          </table>
        </b-col>
      </div>
    </div>
  </header>
</template>

<style scoped>
table {
  border: 1px solid #ccc;
  border-collapse: collapse;
  margin: 0;
  padding: 0;
  width: 100%;
  table-layout: fixed;
}

table caption {
  font-size: 1.5em;
  margin: 0.5em 0 0.75em;
}

table tr {
  background-color: #f8f8f8;
  border: 1px solid #ddd;
  padding: 0.35em;
}

table th,
table td {
  padding: 0.625em;
  text-align: center;
}

table th {
  font-size: 0.85em;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

@media screen and (max-width: 768px) {
  table {
    border: 0;
  }

  table caption {
    font-size: 1.3em;
  }

  table thead {
    border: none;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
  }

  table tr {
    border-bottom: 3px solid #ddd;
    display: block;
    margin-bottom: 0.625em;
  }

  table td {
    border-bottom: 1px solid #ddd;
    display: block;
    font-size: 0.8em;
    text-align: left;
  }

  table td::before {
    /*
    * aria-label has no advantage, it won't be read inside a table
    content: attr(aria-label);
    */
    content: attr(data-label);
    float: left;
    font-weight: bold;
    text-transform: uppercase;
  }

  table td:last-child {
    border-bottom: 0;
  }
}
</style>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
export default {
  name: 'HistContent',
  data() {
    return {
      form: {
        category_name: '',
        category_status: '',
        category_created_at: '',
        category_update_at: ''
      },
      status: [{ text: 'Select Status', value: null }, '0', '1'],
      // category_id: '',
      isMsg: '',
      isUpdate: false
    }
  },
  created() {
    this.get_category()
  },
  computed: {
    ...mapGetters({
      limit: 'getLimitCategory',
      page: 'getPageCategory',
      sort: 'getSortCategory',
      totalData: 'getTotalDataCategory',
      categorys: 'getCategorys'
    })
  },
  methods: {
    ...mapActions(['addCategorys', 'updateCategorys', 'deleteCategorys']),
    ...mapMutations(['setCategory', 'setPage']),
    ...mapActions({ get_category: 'getAllCategory', handleLogout: 'logout' }),

    addCategory() {
      this.$refs['my-modal'].hide()
      this.addCategorys(this.form)
        .then(response => {
          console.log(response)
          this.alert = true
          this.isMsg = response.msg
          this.get_category()
          this.$bvToast.toast(`${response.msg}`, {
            title: 'Gotcha ',
            variant: 'success',
            solid: true
          })
        })
        .catch(error => {
          console.log(this.form)
          this.alert = true
          this.isMsg = error.data.msg
          this.$bvToast.toast(`${error.data.msg}`, {
            title: 'You are... ',
            variant: 'danger',
            solid: true
          })
        })
      // .then(response => {})
      // .catch(error => {})
      //   console.log(this.form)
    },
    setCategory(data) {
      this.form = {
        category_name: data.category_name,
        category_status: data.category_status
      }
      this.isUpdate = true
      this.$refs['my-modal'].show()
      this.category_id = data.category_id
      // console.log(data.product_id)
    },
    patchCategory() {
      const setData = {
        category_id: this.category_id,
        form: this.form
      }
      console.log(setData)
      this.$refs['my-modal'].hide()
      this.isUpdate = false
      this.updateCategorys(setData)
        .then(response => {
          this.$bvToast.toast(`${response.msg}`, {
            title: 'Updated ',
            variant: 'primary',
            solid: true
          })
          this.alert = true
          this.isMsg = response.msg
          this.get_category()
        })
        .catch(error => {
          this.alert = true
          this.isMsg = error.data.msg
          this.$bvToast.toast(`${error.data.msg}`, {
            title: 'You are... ',
            variant: 'danger',
            solid: true
          })
        })
    },
    deleteCategory(data) {
      const setData = {
        category_id: data.category_id,
        form: data
      }
      this.$bvModal
        .msgBoxConfirm(`Are you sure want to delete ${data.category_name} ?`, {
          title: 'Delete Product',
          size: 'md',
          buttonSize: 'md',
          okVariant: 'danger',
          okTitle: 'YES',
          cancelTitle: 'NO',
          footerClass: 'p-2',
          hideHeaderClose: false,
          centered: true
        })
        .then(response => {
          if (response === true) {
            this.deleteCategorys(setData, this.$bvModal)
              .then(response => {
                this.isMsg = response.msg
                this.get_category()
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
        // // console.log(setData)
        // this.deleteCategorys(setData)
        //   .then(response => {
        //     this.alert = true
        //     this.isMsg = response.msg
        //     this.get_category()
        //     this.$bvToast.toast(`${response.msg}`, {
        //       title: 'Deleted ',
        //       variant: 'danger',
        //       solid: true
        //     })
        //   })
        .catch(error => {
          console.log(error)
        })
    },
    showModal() {
      this.form = {
        category_name: '',
        category_status: ''
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
    }
    // makeToast(variant = null) {
    //   this.$bvToast.toast(`${response.msg}`, {
    //     // title: 'Update ',
    //     variant: variant,
    //     solid: true
    //   })
    // }
  }
}
</script>

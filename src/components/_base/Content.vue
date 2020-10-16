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
                <th style="text-align: center">Email</th>
                <th style="text-align: center">Username</th>
                <th style="text-align: center">Role</th>
                <th style="text-align: center">Status</th>
                <th style="text-align: center">
                  Button
                  <b-button
                    @click="showModal"
                    class="addCategory"
                    style="background-color:transparent;border:none;height:25px"
                  ></b-button>

                  <b-modal ref="my-modal" title :hide-footer="true">
                    <form v-on:submit.prevent="addUser">
                      <b-form-group
                        id="input-group-1"
                        label="Email:"
                        label-for="input-1"
                      >
                        <b-form-input
                          id="input-1"
                          v-model="form.user_email"
                          type="text"
                          required
                          placeholder="Input Email"
                        ></b-form-input>
                      </b-form-group>

                      <b-form-group
                        id="input-group-1"
                        label="Password:"
                        label-for="input-1"
                      >
                        <b-form-input
                          id="input-1"
                          v-model="form.user_password"
                          type="password"
                          required
                          placeholder="Input Password"
                        ></b-form-input>
                      </b-form-group>

                      <b-form-group
                        id="input-group-4"
                        label="User Status:"
                        label-for="input-4"
                      >
                        <b-form-select
                          id="input-4"
                          v-model="form.user_status"
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
                        @click="patchUser()"
                      >
                        Update
                      </button>
                    </form>
                  </b-modal>
                </th>
              </tr>
            </thead>
            <tr v-for="(item, index) in allUsers" :key="index">
              <td>{{ item.user_email }}</td>
              <td>{{ item.user_name }}</td>
              <td>{{ item.user_role }}</td>
              <td>{{ item.user_status }}</td>
              <td>
                <b-button
                  v-b-popover.hover.top="'Update'"
                  v-b-modal.modal-1
                  variant="outline-primary"
                  v-on:click="setUser(item)"
                  ><b-icon icon="pencil" aria-hidden="true"></b-icon
                ></b-button>
                <!-- <b-button
                  variant="outline-danger"
                  @click="deleteUser(item)"
                  style="color:red;cursor:pointer;margin-left:10px"
                  >Delete</b-button
                >-->
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
import { mapActions, mapMutations, mapGetters } from 'vuex'
export default {
  name: 'Admin',
  data() {
    return {
      form: {
        user_email: '',
        user_password: '',
        user_name: '',
        user_role: '',
        user_status: ''
      },
      status: [{ text: 'Select Status', value: null }, '0', '1'],
      isMsg: '',
      isUpdate: false
    }
  },
  created() {
    this.getAllUsers()
  },
  computed: {
    ...mapGetters({
      allUsers: 'getUsers'
    })
  },
  methods: {
    ...mapActions(['getAllUsers', 'updateUsers', 'deleteUsers']),
    ...mapMutations(['setAllUsers']),
    ...mapActions({ handleLogout: 'logout' }),

    setUser(data) {
      this.form = {
        user_email: data.user_email,
        user_password: data.user_password,
        user_status: data.user_status
      }
      this.isUpdate = true
      this.$refs['my-modal'].show()
      this.user_id = data.user_id
      // console.log(data.product_id)
    },
    patchUser() {
      const setData = {
        user_id: this.user_id,
        form: this.form
      }
      console.log(setData)
      this.$refs['my-modal'].hide()
      // this.isUpdate = false
      this.updateUsers(setData)
        .then(response => {
          this.alert = true
          this.isMsg = response.msg
          this.getAllUsers()
          this.$bvToast.toast(`${response.msg}`, {
            title: 'Updated ',
            variant: 'primary',
            solid: true
          })
        })
        .catch(error => {
          this.alert = true
          this.isMsg = error.data.msg
          this.$bvToast.toast(`${error.data.msg}`, {
            title: 'Update ',
            variant: 'Danger',
            solid: true
          })
        })
    },
    deleteUser(data) {
      const setData = {
        user_id: data.user_id,
        form: data
      }
      // // console.log(setData)
      this.deleteUsers(setData)
        .then(response => {
          this.alert = true
          this.isMsg = response.msg
          this.getAllUsers()
        })
        .catch(error => {
          this.alert = true
          this.isMsg = error.data.msg
        })
    },
    showModal() {
      this.form = {
        user_name: '',
        user_status: ''
      }
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
    //   this.$bvToast.toast('Patch Done ', {
    //     title: 'Update ',
    //     variant: variant,
    //     solid: true
    //   })
    // }
  }
}
</script>

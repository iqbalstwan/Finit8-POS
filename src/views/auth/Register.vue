<template>
  <div class="register container-fluid text center">
    <h1>SIGN UP</h1>
    <b-form class="form-data">
      <b-form-input
        id="input-1"
        class="form-email"
        v-model="form.user_email"
        type="email"
        required
        placeholder="Enter email"
      ></b-form-input>
      <b-form-input
        id="input-1"
        class="form-password"
        v-model="form.user_password"
        type="password"
        required
        placeholder="Enter password"
      ></b-form-input>
      <b-form-input
        id="input-2"
        class="form-username"
        v-model="form.user_name"
        required
        placeholder="Enter username"
      ></b-form-input>
      <b-button pill type="submit" @click.prevent="userRegister"
        >Register</b-button
      >
      <h1 v-font-size="12" style="text-align:center;margin-top:15px">
        Already have an account?
        <router-link to="/login">Sign in</router-link>
      </h1>
    </b-form>
    <hr />
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Register',
  data() {
    return {
      form: {
        user_email: '',
        user_password: '',
        user_name: ''
      }
    }
  },
  methods: {
    ...mapActions(['register']),

    userRegister() {
      //   const data = new FormData()
      //   data.append('user_email', this.form.user_email)
      //   data.append('user_password', this.form.user_password)
      //   data.append('user_name', this.form.user_name)
      //   this.register(data)
      // .then(response => {})
      // .catch(error => {})
      this.register(this.form)
        .then(result => {
          console.log(result)
          this.$bvToast.toast(`${result.msg}`, {
            title: 'Success ',
            variant: 'success',
            solid: true
          })
        })
        .catch(error => {
          //   console.log(error.data.data.msg)
          this.$bvToast.toast(`${error.data.msg}`, {
            title: 'Check it again ',
            variant: 'danger',
            solid: true
          })
        })
    }
  }
}
</script>

<style src="../../assets/css/register.css"></style>

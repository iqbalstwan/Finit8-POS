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
        v-validate="'required'"
        ref="pass"
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

      <b-button pill type="submit" @click="userRegister">Submit</b-button>
      <router-link to="/">
        <h6
          style="color:white;text-align:center;cursor:pointer;margin-top:40px"
        >
          Sign in
        </h6>
      </router-link>
    </b-form>
    <hr />
    <!-- <h3>{{ name }}</h3> -->
    <!-- <h3>{{ dataName }}</h3> -->
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
    }
  }
}
</script>

<style src="../../assets/css/register.css"></style>

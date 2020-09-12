<template>
  <div class="login container-fluid text center">
    <h1>Login</h1>
    <b-form class="form-data" @submit.prevent="onSubmit">
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
      <router-link to="/Register">
        <h6 style="color:white;text-align:right;cursor:pointer">Sign Up?</h6>
      </router-link>
      <b-button pill type="submit">Login</b-button>
    </b-form>
    <hr />
    <!-- <h3>{{ name }}</h3> -->
    <!-- <h3>{{ dataName }}</h3> -->
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Login',
  data() {
    return {
      form: {
        user_email: '',
        user_password: ''
      }
    }
  },
  computed: {
    // dataName() {
    //   return this.$store.state.name
    // }

    // ...mapState({dataName:'name'})

    ...mapState(['name'])
  },
  methods: {
    ...mapActions(['login']),
    onSubmit() {
      //   console.log(this.form)
      this.login(this.form)
        .then(result => {
          console.log(result)
          this.$router.push('/')
        })
        .catch(error => {
          //   console.log('error')
          alert(error.response.data.msg)
        })
    },
    onReset() {
      this.form = {
        user_email: '',
        user_password: ''
      }
    }
  }
}
</script>

<style src="../../assets/css/login.css"></style>

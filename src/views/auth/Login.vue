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
      <b-button pill type="submit">Login</b-button>
      <h1 v-font-size style="text-align:center;margin-top:15px">
        Don't have an account?
        <router-link to="/register">Sign Up</router-link>
      </h1>
    </b-form>
    <hr />
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
        .then(response => {
          this.$bvToast.toast('Login success', {
            title: 'Success',
            variant: 'success',
            solid: true
          })

          setTimeout(() => {
            this.$router.push('/')
          }, 2000)
        })
        .catch(error => {
          console.log(error)
          this.$bvToast.toast(`${error.response.data.msg}`, {
            title: 'Check it again ',
            variant: 'danger',
            solid: true
          })
          // alert(error.response.data.msg)
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

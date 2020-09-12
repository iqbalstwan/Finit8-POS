import axios from 'axios'
import router from '../../router/index'

export default {
  state: {
    user: {},
    token: localStorage.getItem('token') || null,
    user_id: '',
    allUsers: []
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload
      state.token = payload.token
      console.log(payload)
    },
    delUser(state) {
      state.user = {}
      state.token = null
    },
    setAllUsers(state, payload) {
      state.allUsers = payload.data
    }
  },
  actions: {
    login(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .post('http://127.0.0.1:3001/user/login', payload)
          .then(response => {
            console.log(response)
            context.commit('setUser', response.data.data)
            localStorage.setItem('token', response.data.data.token)
            resolve(response.data)
          })
          .catch(error => {
            reject(error)
            // console.log(error.response)
          })
      })
    },
    register(context, payload) {
      console.log(payload)
      return new Promise((resolve, reject) => {
        axios
          .post('http://127.0.0.1:3001/user/register', payload)

          .then(response => {
            context.commit('setUser', response.data.data)
            localStorage.setItem('token', response.data.data.token)
            console.log(response)
            resolve(response.data)
          })
          .catch(error => {
            reject(error.response)
            console.log(error.response)
          })
      })
    },
    logout(context) {
      localStorage.removeItem('token')
      context.commit('delUser')
      router.push('/login')
    },
    interceptorRequest(context) {
      console.log('inteceptor works')
      axios.interceptors.request.use(
        function(config) {
          config.headers.Authorization = `Bearer ${context.state.token}`
          // Do something before request is sent
          return config
        },
        function(error) {
          // Do something with request error
          return Promise.reject(error)
        }
      )
    },
    interceptorResponse(context) {
      axios.interceptors.response.use(
        function(response) {
          // Any status code that lie within the range of 2xx cause this function to trigger
          // Do something with response data
          return response
        },
        function(error) {
          console.log(error.response)
          if (error.response.status === 403) {
            if (
              error.response.data.msg === 'invalid token' ||
              error.response.data.msg === 'invalid signature'
            ) {
              localStorage.removeItem('token')
              context.commit('delUser')
              router.push('/login')
              alert('You cannot access, Invalid token!')
            } else if (
              error.response.data.msg === 'jwt expired' ||
              error.response.data.msg === 'jwt malformed'
            ) {
              localStorage.removeItem('token')
              context.commit('delUser')
              router.push('/login')
              alert('Your token is expired!')
            }
          }
          return Promise.reject(error)
        }
      )
    },
    getAllUsers(context, payload) {
      // console.log(payload)
      axios
        .get(
          'http://127.0.0.1:3001/user'
          // 'http://127.0.0.1:3001/product'
        )
        .then(response => {
          console.log(response)
          context.commit('setAllUsers', response.data)
        })
        .catch(error => {
          console.log(error)
        })
    },
    updateUsers(context, payload) {
      console.log(payload.user_id)
      console.log(payload.form)
      return new Promise((resolve, reject) => {
        axios
          .patch(
            `http://127.0.0.1:3001/user/update/${payload.user_id}`,
            payload.form
          )
          .then(response => {
            localStorage.setItem('token', response.data.data.token)
            console.log(response)
            resolve(response.data)
          })
          .catch(error => {
            reject(error.response)
            console.log(error.response)
          })
      })
    },
    deleteUsers(context, payload) {
      //   console.log(payload.user_id)
      //   console.log(payload)
      return new Promise((resolve, reject) => {
        axios
          .delete(
            `http://127.0.0.1:3001/user/delete/${payload.user_id}`,
            payload.form
          )
          .then(response => {
            console.log(response.data)
            //   resolve(response.data)
          })
          .catch(error => {
            console.log(error.response)
            // reject(error.response)
          })
      })
    }
  },
  getters: {
    isLogin(state) {
      return state.token !== null
    },
    getUsers(state) {
      return state.allUsers
    }
  }
}

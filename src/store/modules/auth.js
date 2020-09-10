import axios from 'axios'
import router from '../../router/index'

export default {
  state: {
    user: {},
    token: localStorage.getItem('token') || null
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
            console.log(error.response)
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
          console.log(error)
          if (error.response.status === 403) {
            if (
              error.response.msg === 'invalid token' ||
              error.response.msg === 'invalid signature'
            ) {
              localStorage.removeItem('token')
              context.commit('delUser')
              router.push('/login')
              alert('You cannot access, Invalid token!')
            } else if (error.response.msg === 'jwt expired!') {
              localStorage.removeItem('token')
              context.commit('delUser')
              router.push('/login')
              alert('Your token is expired!')
            }
          }
          return Promise.reject(error)
        }
      )
    }
  },
  getters: {
    isLogin(state) {
      return state.token !== null
    }
  }
}

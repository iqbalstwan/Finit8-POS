export default {
  data() {
    return {
      msg: 'this message in mxiin'
    }
  },
  methods: {
    handleSort(event) {
      console.log(event.target.value)
      this.$router.push(`?sort=${event.target.value}`)
      this.setSort(event.target.value)
      // console.log(value)
      this.get_product()
    }
  }
}

<template>
  <div>
    <h1>Page Product</h1>
    <form>
      <input
        type="text"
        v-model="form.category_id"
        placeholder="Category ID..."
      />
      <input
        type="text"
        v-model="form.product_name"
        placeholder="Product Name ..."
      />
      <input
        type="text"
        v-model="form.product_price"
        placeholder="Product Price..."
      />
      <input type="file" @change="handleFile" />
      <input
        type="text"
        v-model="form.product_status"
        placeholder="Product Status..."
      />
      <br />
      <button @click.prevent="postProduct">Submit</button>
      <button>Update</button>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Product',
  data() {
    return {
      form: {
        category_id: '',
        product_name: '',
        product_price: '',
        product_img: {},
        product_status: ''
      }
    }
  },
  methods: {
    ...mapActions(['addProduct']),
    handleFile(event) {
      this.form.product_img = event.target.files[0]
      console.log(event.target.files)
    },
    postProduct() {
      const data = new FormData()
      data.append('category_id', this.form.category_id)
      data.append('product_name', this.form.product_name)
      data.append('product_price', this.form.product_price)
      data.append('product_img', this.form.product_img)
      data.append('product_status', this.form.product_status)
      this.addProduct(data)
      // .then(response => {})
      // .catch(error => {})
      //   console.log(this.form)
    }
  }
}
</script>

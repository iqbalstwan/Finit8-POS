<template>
  <div>
    <Header />
    <Menu />
  </div>
</template>

<script>
import Header from '../components/_base/Header'
import Menu from '../components/_base/Menu'

export default {
  name: 'Home',
  components: {
    Header,
    Menu
  }
}
</script>

<style src="../assets/css/style.css"></style>

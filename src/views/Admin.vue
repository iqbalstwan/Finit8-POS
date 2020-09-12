<template>
  <div>
    <HistHeader text="Only Me" />
    <Content />
  </div>
</template>

<script>
import HistHeader from '../components/_base/HistHeader'
import Content from '../components/_base/Content'

export default {
  name: 'Setting',
  components: {
    HistHeader,
    Content
  }
}
</script>

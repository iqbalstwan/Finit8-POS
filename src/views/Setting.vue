<template>
  <div>
    <HistHeader text="Category" />
    <HistContent />
  </div>
</template>

<script>
import HistHeader from '../components/_base/HistHeader'
import HistContent from '../components/_base/HistContent'

export default {
  name: 'Setting',
  components: {
    HistHeader,
    HistContent
    // Histcontent
  }
}
</script>

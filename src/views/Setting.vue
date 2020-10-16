<template>
  <div>
    <HistHeader text="Category" />
    <HistContent />
  </div>
</template>

<script>
import HistHeader from '../components/_base/Histheader'
import HistContent from '../components/_base/Histcontent'

export default {
  name: 'Setting',
  components: {
    HistHeader,
    HistContent
  }
}
</script>

<template>
  <div>
    <Histheader />
    <Histcontent />
  </div>
</template>

<script>
import Histheader from '../components/_base/Histheader'
import Histcontent from '../components/_base/Hiscontent'

export default {
  name: 'Home',
  components: {
    Histheader,
    Histcontent
  }
}
</script>

<template>
  <div class="clock">
    <p class="date">{{ date }}</p>
    <p class="time">{{ time }}</p>
    <p class="text">DIGITAL CLOCK with Vue.js</p>
  </div>
</template>

<style scoped>
p {
  margin: 0;
  padding: 0;
}
.clock {
  font-family: 'Share Tech Mono', monospace;
  color: #ffffff;
  text-align: center;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  color: #daf6ff;
  text-shadow: 0 0 20px rgba(10, 175, 230, 1), 0 0 20px rgba(10, 175, 230, 0);
}
.class .time {
  letter-spacing: 0.05em;
  font-size: 80px;
  padding: 5px 0;
}
.class .date {
  letter-spacing: 0.1em;
  font-size: 24px;
}
.class .text {
  letter-spacing: 0.1em;
  font-size: 12px;
  padding: 20px 0 0;
}
</style>

<script>
export default {
  store: {
    clock
  }
}
</script>

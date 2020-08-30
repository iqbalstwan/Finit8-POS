<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style>
html,
body {
  margin: 0;
  padding: 0;
}
@font-face {
  font-family: 'airbnb';
  src: local('airbnb'),
    url(./assets/font/airbnb/AirbnbCerealBook.ttf) format('truetype');
}
#app {
  font-family: 'airbnb', Helvetica, Arial, sans-serif;
}
</style>

<template>
  <img alt="Vue logo" src="./assets/e-commerce-3692440_1280.jpg">
  <HomePage msg="Welcome to TechThread App"/>
</template>

<script>
import HomePage from './components/HomePage.vue'

export default {
  name: 'App',
  components: {
    HomePage
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-block-start: 60px;
  margin-block-end: 60px;
}
</style>

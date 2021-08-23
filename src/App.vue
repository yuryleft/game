<template>
<div class="app">
  <img class="logo" alt="Vue logo" src="./assets/logo.png">
  <h1 class="h1">Remember </h1>
  <p>Remember and open all cards</p>
  <Board/>
</div>
</template>

<script>
import Board from './components/Board.vue'
export default {
  name: 'App',
  components: {
   Board
  }
}
</script>

<style scoped>
.logo{
  width: 100px;
  height: 100px;
}
.app{
text-align: center;
margin: 20px;
font-family: Verdana, Geneva, Tahoma, sans-serif;

}
</style>

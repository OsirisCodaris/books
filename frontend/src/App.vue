<template>
  <div id="app">
    <b-container fluid>
        <page-header class="mb-5" />
        <b-container >
          <router-view/>
        </b-container>
    </b-container>
  </div>
</template>

<script>
import PageHeader from "@/components/Header.vue"
export default {
  name: 'App',
  components: {
    PageHeader
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 70px;
}
</style>

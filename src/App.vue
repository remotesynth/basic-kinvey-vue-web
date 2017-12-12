<template>
  <div id="app">
    <shrines-list></shrines-list>
  </div>
</template>

<script>
import ShrinesList from './components/shrines-list.vue'

export default {
  name: 'app',
  components: {
    'shrines-list': ShrinesList
  }
}
</script>

<style>
</style>

<template>
  <div id="app">
    <kinvey-connection v-on:kinvey-connected="setActiveUser" :appKey="this.$kinvey.appkey" appSecret="this.$kinvey.appsecret"></kinvey-connection>
    <shrines-list :activeUser="activeUser"></shrines-list>
  </div>
</template>

<script>
import KinveyConnection from './components/kinvey-connection.vue'
import ShrinesList from './components/shrines-list.vue'

export default {
  name: 'app',
  data () {
    return {
      activeUser: null
    }
  },
  components: {
    'kinvey-connection': KinveyConnection,
    'shrines-list': ShrinesList
  },
  methods: {
    setActiveUser(activeUser) {
      console.log('active user set');
      this.activeUser = activeUser;
    }
  }
}
</script>

<style>
</style>

<template>
<ul>
  <li v-for="shrine in shrines" :key="shrine._id">
    {{ shrine.name }}
  </li>
</ul>
</template>

<script>
import Kinvey from 'kinvey-html5-sdk'

export default {
    props: ['activeUser'],
    data() {
      return {
        shrines: [{'_id':'0','name':'Loading...'}]
      }
    },
    watch: {
      activeUser: {
        handler: function (val) {
          // this seems to work on all requests except hot reloads
          if (val != '') {
            console.log('loaded on watch');
            this.getShrines();
          }
        }
      }
    },
    methods: {
      getShrines() {
        var dataStore = Kinvey.DataStore.collection('shrines', Kinvey.DataStoreType.Network),
            stream = dataStore.find(),
            that = this;
        stream.subscribe(function onNext(item) {
          that.shrines= item;
        }, function onError(error) {
          console.log(error);
        }, function onComplete() {
          // ...
        });
      }
    },
    created() {
      // this seems to make the hot reloads work
      if (this.activeUser) {
        console.log('loaded on created');
        this.getShrines();
      }
    }
}
</script>

<style>

</style>

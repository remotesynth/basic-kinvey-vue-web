<template>
<div>
<ul>
  <li v-for="shrine in shrines" :key="shrine._id">
    {{ shrine.name }}
  </li>
</ul>
</div>
</template>

<script>
export default {
    data() {
      return {
        shrines: [{'_id':'0','name':'Loading...'}]
      }
    },
    methods: {
      getShrines() {
        var datastore = this.$kinvey.getCollection('shrines',this.$kinvey.DataStoreType.Network),
          stream = datastore.find(),
          that = this;
        stream.subscribe(function onNext(item) {
          that.shrines = item;
        }, function onError(error) {
          console.log(error);
        }, function onComplete() {
          //...
        });
      }
    },
    created() {
      this.$kinvey.$on("kinvey-connected",this.getShrines);
      // if it's already connected
      if (this.$kinvey.isConnected) {
        console.log('loaded on created');
        this.getShrines();
      }
    }
}
</script>

<style>

</style>

import kinvey from './kinvey-vue/index'
import Vue from 'vue'
import App from './App.vue'

Vue.prototype.$kinvey= kinvey;

new Vue({
  el: '#app',
  render: h => h(App),
});
import kinveyConfig from '../kinvey-config'
import Vue from 'vue'
import App from './App.vue'

Vue.prototype.$kinvey= {
  appkey: kinveyConfig.APPKEY,
  appsecret: kinveyConfig.APPSECRET
};

new Vue({
  el: '#app',
  render: h => h(App),
});

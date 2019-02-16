import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import Notifications from "vue-notification"
import VueSocketIO from "vue-socket.io";

Vue.config.productionTip = false;
Vue.use(Notifications);
Vue.use(new VueSocketIO({
  debug: true,
  connection: "http://10.0.1.27:8089",
}))
new Vue({
  render: h => h(App),
}).$mount('#app')

import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import Notifications from "vue-notification"
import VueVideoPlayer from "vue-video-player"
import "video.js/dist/video-js.css"

Vue.config.productionTip = false
Vue.use(Notifications)
new Vue({
  render: h => h(App),
}).$mount('#app')

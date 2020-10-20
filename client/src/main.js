import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import {store} from "./store"
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import Rooms from "./components/Rooms";
import Chat from "./components/Chat";

Vue.use(VueMaterial)
Vue.use(VueRouter)

const getRuntimeConfig = async () => {
   const runtimeConfig = await fetch('/runtimeConfig.json');
   return await runtimeConfig.json()
}

getRuntimeConfig().then(function(data) {
  Vue.mixin({
    data() {
      return data
    }
  });
});

const router = new VueRouter({
  routes: [
    { path: '', component: Rooms, name:'rooms' },
    { path: '/room/:roomId', component: Chat, name:'room', props: true}
  ]
})
Vue.config.productionTip = false
new Vue({
  render: h => h(App),
  router,
  store: store,
}).$mount('#app')

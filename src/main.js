import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'

import firebase from '@/firebase'
import store from './store'

Vue.config.productionTip = false

let app;

firebase.auth().onAuthStateChanged(user => {
  if (!app) {
    app = new Vue({
      router,
      render: h => h(App)
    }).$mount('#app')
  }
});
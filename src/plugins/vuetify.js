import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'

Vue.use(Vuetify, {
  iconfont: 'md',
  theme: {
    primary: '#00dbda',
    secondary: '#1f2833',
    succes: '#66bb6a',
    info: '#ffca28',
    error: '#9b0000'
  }
})
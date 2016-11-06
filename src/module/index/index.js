if (!window.localStorage.getItem('user')) {
  window.location.href = `./wxAuth.html?url=index.html`
}
import Vue from 'vue'
import App from './app'
import vueTap from 'v-tap'

/* eslint-disable no-new */
new Vue({
  el: 'body',
  components: { App }
})

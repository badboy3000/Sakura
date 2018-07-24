import 'es6-promise/auto';
// Import Vue
import Vue from 'vue'

// Import Framework7
import Framework7 from 'framework7/framework7.esm.bundle.js';

// Import Framework7 Vue
import Framework7Vue from 'framework7-vue/framework7-vue.esm.bundle.js';

// Import F7 iOS Icons
import 'framework7-icons/css/framework7-icons.css'

// Import Element-UI Styles
import 'element-ui/lib/theme-chalk/index.css'

// Import Mint-UI Styles
import 'mint-ui/lib/style.css'

// Import Fontawesome Theme Styles
import 'font-awesome/css/font-awesome.css'

// Import App Custom Styles
import 'assets/style/main.scss'

// Import App Component
import app from './app.vue'

// Import Vuex Storage
import store from './store/index.js'

import 'assets/js/index'

// Different F7-Vue plugin initialization with f7 v3.0
Framework7.use(Framework7Vue)

// Init Vue App
export default new Vue({
  // Root Element
  el: '#app',
  store,
  components: {
    app
  },
  render: c => c('app'),
});
import Vue from 'vue';
import Cookies from 'js-cookie';
import toast from './toast'
import captcha from './captcha'
import ImageLazy from './imagelazy'
import TimeAgo from './timeago'
import alias from './alias'
import func from './func'
import resize from './imageResize'
import NoMore from 'components/NoMore.vue'

Vue.component(ImageLazy.name, ImageLazy)
Vue.component(TimeAgo.name, TimeAgo)
Vue.component(NoMore.name, NoMore)

Vue.use({
  install(Vue, options) {
    Vue.prototype.$channel = new Vue();

    Vue.prototype.$alias = alias;

    Vue.prototype.$width = window.innerWidth * 2

    Vue.prototype.$captcha = captcha;

    Vue.prototype.$cache = Cookies;

    Vue.prototype.$toast = toast;

    Vue.prototype.$func = func;

    Vue.prototype.$resize = resize;
  }
});

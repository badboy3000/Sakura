import Vue from 'vue';
import Cookies from 'js-cookie';
import toast from 'assets/js/toast'
import captcha from 'assets/js/captcha'
import ImageLazy from 'assets/js/imagelazy'
import TimeAgo from 'assets/js/timeago'
import alias from 'assets/js/alias'
import func from 'assets/js/func'
import resize from 'assets/js/imageResize'
import NoMore from 'components/NoMore.vue'

import {
  InfiniteScroll,
  Loadmore
} from 'mint-ui';

Vue.use(InfiniteScroll);
Vue.component(Loadmore.name, Loadmore);
Vue.component(ImageLazy.name, ImageLazy);
Vue.component(TimeAgo.name, TimeAgo);
Vue.component(NoMore.name, NoMore);

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

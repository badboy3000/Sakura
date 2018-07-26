import Vue from 'vue';
import Cookies from 'js-cookie';
import toast from 'assets/js/toast'
import captcha from 'assets/js/captcha'
import ImageLazy from 'assets/js/imagelazy'
import TimeAgo from 'assets/js/timeago'
import alias from 'assets/js/alias'
import func from 'assets/js/func'
import resize from 'assets/js/imageResize'
import NoMore from 'components/NoMore'
import 'src/mixins/computeImageAspect'
import CommentMain from 'components/comment/CommentMain'
import PageActions from 'components/PageActions'
import JsonContent from 'components/jsonEditor/JsonContent'

import {
  InfiniteScroll,
  Loadmore
} from 'mint-ui';

import { Rate } from 'element-ui';

Vue.use(InfiniteScroll);
Vue.component(Rate.name, Rate);
Vue.component(JsonContent.name, JsonContent);
Vue.component(CommentMain.name, CommentMain);
Vue.component(PageActions.name, PageActions);
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

import Vue from 'vue';
import Cookies from 'js-cookie';
import toast from 'vendor/toast'
import captcha from 'vendor/captcha'
import ImageLazy from 'vendor/imagelazy'
import TimeAgo from 'vendor/timeago'
import alias from 'vendor/alias'
import func from 'vendor/func'
import resize from 'vendor/imageResize'
import 'mixins/computeImageAspect'
import 'directives/scrollEmiter'
import NoMore from 'components/NoMore'
import CommentMain from 'components/comment/CommentMain'
import PageActions from 'components/PageActions'
import JsonContent from 'components/jsonEditor/JsonContent'
import BangumiPanel from 'components/bangumi/BangumiPanel'
import VCharts from 'v-charts'
import camera from 'vendor/camera'

import {
  DatetimePicker,
  InfiniteScroll
} from 'mint-ui';

import { Rate } from 'element-ui';

Vue.use(VCharts);
Vue.use(InfiniteScroll);
Vue.component(Rate.name, Rate);
Vue.component(BangumiPanel.name, BangumiPanel);
Vue.component(DatetimePicker.name, DatetimePicker);
Vue.component(JsonContent.name, JsonContent);
Vue.component(CommentMain.name, CommentMain);
Vue.component(PageActions.name, PageActions);
Vue.component(ImageLazy.name, ImageLazy);
Vue.component(TimeAgo.name, TimeAgo);
Vue.component(NoMore.name, NoMore);

Vue.use({
  install(Vue, options) {
    Vue.prototype.$channel = new Vue();

    Vue.prototype.$alias = alias;

    Vue.prototype.$camera = camera;

    Vue.prototype.$width = window.innerWidth * 2

    Vue.prototype.$captcha = captcha;

    Vue.prototype.$cache = Cookies;

    Vue.prototype.$toast = toast;

    Vue.prototype.$func = func;

    Vue.prototype.$resize = resize;
  }
});

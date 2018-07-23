import { Toast, Indicator } from 'mint-ui'
import 'mint-ui/lib/toast/style.css'
import 'mint-ui/lib/indicator/style.css'

const timeout = (duration) => new Promise((resolve) => {
  setTimeout(resolve, duration)
});

const showTime = 3000

export default {
  success (txt) {
    this.stop()
    Toast({
      message: txt || '操作成功',
      iconClass: 'fa fa-check'
    })
    return timeout(showTime)
  },

  info (txt) {
    this.stop();
    Toast(txt);
    return timeout(showTime)
  },

  error (txt) {
    this.stop()
    Toast({
      message: txt || '操作失败',
      iconClass: 'fa fa-times'
    })
    return timeout(showTime)
  },

  loading (txt) {
    Indicator.open({
      text: txt || '加载中...',
      spinnerType: 'triple-bounce'
    })
  },

  stop () {
    Indicator.close()
  }
}

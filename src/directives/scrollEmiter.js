import Vue from 'vue'

Vue.directive('scroll-emit', {
  inserted (el, binding) {
    let lastScrollTop = 0
    const flog = binding.value;
    if (!flog) {
      return
    }
    el.addEventListener('scroll', (evt) => {
      const value = (evt.currentTarget || evt.target).scrollTop;
      if (value < flog * 1.5) {
        Vue.prototype.$channel.$emit('flow-list-scroll', {
          value: value > flog ? flog : value,
          isUp: lastScrollTop > value
        })
      }
      lastScrollTop = value <= 0 ? 0 : value
    })
  }
});

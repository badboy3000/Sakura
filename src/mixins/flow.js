export default {
  data () {
    return {
      fetched: false
    }
  },
  computed: {
    listenKey() {
      if (this.userId) {
        return `user-${this.triggerKey}`
      } else if (this.bangumiId) {
        return `bangumi-${this.triggerKey}`
      }
      return `world-${this.triggerKey}`
    },
    dispatchAction() {
      return this.bangumiId || this.userId ? 'flow/getData' : 'world/getData'
    }
  },
  created () {
    this.$channel.$on(this.listenKey, this.initData)
  },
  beforeDestroy () {
    this.$channel.$off(this.listenKey)
  },
  methods: {
    initData () {
      if (this.fetched) {
        return
      }
      this.fetched = true
      this.getData()
    },
    loadMore () {
      this.getData()
    },
    async refresh (event, done) {
      await this.getData(true);
      this.$toast.info('刷新成功');
      done && done()
    }
  }
}

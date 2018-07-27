export default {
  data () {
    return {
      fetched: false
    }
  },
  created () {
    this.$channel.$on(this.triggerKey, this.initData)
  },
  beforeDestroy () {
    this.$channel.$off(this.triggerKey)
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
      done && done()
    }
  }
}

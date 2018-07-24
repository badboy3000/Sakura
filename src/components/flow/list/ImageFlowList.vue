<template>
  <mt-loadmore
    v-infinite-scroll="loadMore"
    ref="page"
    :top-method="refresh"
    infinite-scroll-distance="50"
    infinite-scroll-disabled="notFetch"
  >
    <image-waterfall
      :list="source.list"
      show="all"
    />
    <no-more
      :loading="source.loading"
      :length="source.list.length"
      :no-more="source.noMore"
    />
  </mt-loadmore>
</template>

<script>
  import ImageWaterfall from 'components/flow/item/ImageWaterfall.vue'

  export default {
    name: 'ImageFlowList',
    components: {
      ImageWaterfall
    },
    props: {
      bangumiId: {
        type: Number,
        default: 0
      },
      userId: {
        type: Number,
        default: 0
      }
    },
    data () {
      return {
        lock: true
      }
    },
    computed: {
      source () {
        if (this.bangumiId || this.userId) {
          return this.$store.state.flow.image.active
        }
        return this.$store.state.world.image.active
      },
      notFetch () {
        return this.lock || this.source.loading || this.source.noMore
      },
      switchEvt () {
        if (this.bangumiId) {
          return 'bangumi-show-tab-1-switch'
        }
        if (this.userId) {
          return 'user-show-tab-1-switch'
        }
        return 'the-world-tab-1-switch'
      }
    },
    mounted () {
      this.$channel.$on(this.switchEvt, (isShow) => {
        this.lock = !isShow
      })
    },
    beforeDestroy () {
      this.$channel.$off(this.switchEvt)
    },
    methods: {
      loadMore () {
        this.getData(false)
      },
      refresh () {
        this.getData(true)
      },
      async getData (refresh) {
        try {
          const action = this.bangumiId || this.userId ? 'flow/getData' : 'world/getData'
          await this.$store.dispatch(action, {
            type: 'image',
            sort: 'active',
            refresh,
            bangumiId: this.bangumiId,
            userId: this.userId
          })
        } catch (e) {
          this.$toast.error(e)
        } finally {
          refresh && this.$refs.page.onTopLoaded();
        }
      }
    }
  }
</script>

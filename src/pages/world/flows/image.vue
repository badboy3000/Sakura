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
  import ImageWaterfall from 'components/image/ImageWaterfall.vue'

  export default {
    name: 'ImageFlowList',
    components: {
      ImageWaterfall
    },
    data () {
      return {
        lock: true
      }
    },
    computed: {
      source () {
        return this.$store.state.world.image.active
      },
      notFetch () {
        return this.lock || this.source.loading || this.source.noMore
      }
    },
    mounted () {
      this.$channel.$on('the-world-tab-1-switch', (isShow) => {
        this.lock = !isShow
      })
    },
    beforeDestroy () {
      this.$channel.$off('the-world-tab-1-switch')
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
          await this.$store.dispatch('world/getData', {
            type: 'image',
            sort: 'active',
            refresh
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

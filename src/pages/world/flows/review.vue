<template>
  <mt-loadmore
    v-infinite-scroll="loadMore"
    ref="page"
    :top-method="refresh"
    infinite-scroll-distance="50"
    infinite-scroll-disabled="notFetch"
  >
    <score-flow-item
      v-for="item in source.list"
      :key="item.id"
      :item="item"
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
  import ScoreFlowItem from 'components/score/ScoreFlowItem.vue'

  export default {
    name: 'ScoreFlowList',
    components: {
      ScoreFlowItem
    },
    data () {
      return {
        lock: true
      }
    },
    computed: {
      source () {
        return this.$store.state.world.score.active
      },
      notFetch () {
        return this.lock || this.source.loading || this.source.noMore
      }
    },
    mounted () {
      this.$channel.$on('the-world-tab-2-switch', (isShow) => {
        this.lock = !isShow
      })
    },
    beforeDestroy () {
      this.$channel.$off('the-world-tab-2-switch')
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
            type: 'score',
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

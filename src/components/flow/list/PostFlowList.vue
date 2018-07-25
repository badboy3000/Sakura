<template>
  <mt-loadmore
    v-infinite-scroll="loadMore"
    ref="page"
    :top-method="refresh"
    infinite-scroll-distance="50"
    infinite-scroll-disabled="notFetch"
  >
    <f7-list>
      <post-flow-item
        v-for="item in posts"
        :key="item.id"
        :item="item"
      />
    </f7-list>
    <no-more
      :loading="source.loading"
      :length="source.list.length"
      :no-more="source.noMore"
    />
  </mt-loadmore>
</template>

<script>
  import PostFlowItem from 'components/flow/item/PostFlowItem.vue'

  export default {
    name: 'PostFlowList',
    components: {
      PostFlowItem
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
        lock: false
      }
    },
    computed: {
      source () {
        if (this.bangumiId || this.userId) {
          return this.$store.state.flow.post.active
        }
        return this.$store.state.world.post.active
      },
      topic () {
        return this.bangumiId ? this.$store.state.post.topic : []
      },
      posts () {
        return this.source
          ? this.topic.concat(this.source.list)
          : this.topic
      },
      notFetch () {
        return this.lock || this.source.loading || this.source.noMore
      },
      switchEvt () {
        if (this.bangumiId) {
          return 'bangumi-show-tab-0-switch'
        }
        if (this.userId) {
          return 'user-show-tab-0-switch'
        }
        return 'the-world-tab-0-switch'
      }
    },
    created () {
      if (this.bangumiId || this.userId) {
        this.$store.commit('flow/RESET_STATE', { type: 'post' })
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
          if (this.bangumiId) {
            await Promise.all([
              this.$store.dispatch(action, {
                type: 'post',
                sort: 'active',
                refresh,
                bangumiId: this.bangumiId,
                userId: this.userId
              }),
              this.$store.dispatch('post/getBangumiTopic', {
                bangumiId: this.id
              })
            ])
          } else {
            await this.$store.dispatch(action, {
              type: 'post',
              sort: 'active',
              refresh,
              bangumiId: this.bangumiId,
              userId: this.userId
            })
          }
        } catch (e) {
          this.$toast.error(e)
        } finally {
          refresh && this.$refs.page.onTopLoaded();
        }
      }
    }
  }
</script>

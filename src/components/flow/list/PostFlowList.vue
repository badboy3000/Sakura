<template>
  <f7-page
    :page-content="true"
    :infinite="!source.noMore"
    ptr
    @infinite="loadMore"
    @ptr:refresh="refresh"
  >
    <f7-list class="no-arrow">
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
  </f7-page>
</template>

<script>
  import PostFlowItem from 'components/flow/item/PostFlowItem'
  import flowMixin from 'mixins/flow'

  export default {
    name: 'PostFlowList',
    components: {
      PostFlowItem
    },
    mixins: [flowMixin],
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
        triggerKey: 'flow-list-fetch-post'
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
      }
    },
    methods: {
      async getData (refresh = false) {
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
                bangumiId: this.bangumiId
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
        }
      }
    }
  }
</script>

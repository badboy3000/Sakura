<template>
  <f7-page
    :page-content="true"
    :infinite="!source.noMore"
    ptr
    @infinite="loadMore"
    @ptr:refresh="refresh"
  >
    <slot/>
    <f7-list class="no-arrow">
      <score-flow-item
        v-for="item in source.list"
        :key="item.id"
        :item="item"
        :bangumi-id="bangumiId"
        :user-id="userId"
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
  import ScoreFlowItem from 'components/flow/item/ScoreFlowItem.vue'
  import flowMixin from 'mixins/flow'

  export default {
    name: 'ScoreFlowList',
    components: {
      ScoreFlowItem
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
        triggerKey: 'flow-list-fetch-score'
      }
    },
    computed: {
      source () {
        if (this.bangumiId || this.userId) {
          return this.$store.state.flow.score.active
        }
        return this.$store.state.world.score.active
      }
    },
    methods: {
      async getData (refresh = false) {
        try {
          await this.$store.dispatch(this.dispatchAction, {
            type: 'score',
            sort: 'active',
            refresh,
            bangumiId: this.bangumiId,
            userId: this.userId
          })
        } catch (e) {
          this.$toast.error(e)
        }
      }
    }
  }
</script>

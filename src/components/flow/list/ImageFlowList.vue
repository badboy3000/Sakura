<template>
  <f7-page
    :page-content="true"
    :infinite="!source.noMore"
    ptr
    @infinite="loadMore"
    @ptr:refresh="refresh"
  >
    <image-waterfall
      :list="source.list"
      :bangumi-id="bangumiId"
      :user-id="userId"
      :watch-key="count"
    />
    <no-more
      :loading="source.loading"
      :length="source.list.length"
      :no-more="source.noMore"
    />
  </f7-page>
</template>

<script>
  import ImageWaterfall from 'components/flow/item/ImageWaterfall.vue'
  import flowMixin from 'mixins/flow'

  export default {
    name: 'ImageFlowList',
    components: {
      ImageWaterfall
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
        triggerKey: 'flow-list-fetch-image',
        count: 0
      }
    },
    computed: {
      source () {
        if (this.bangumiId || this.userId) {
          return this.$store.state.flow.image.active
        }
        return this.$store.state.world.image.active
      }
    },
    mounted () {
      this.$channel.$on(this.listenKey, () => {
        this.count++
      })
    },
    methods: {
      async getData (refresh = false) {
        try {
          await this.$store.dispatch(this.dispatchAction, {
            type: 'image',
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

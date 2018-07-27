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
      show="all"
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
        triggerKey: 'flow-list-fetch-image'
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
    methods: {
      async getData (refresh = false) {
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
        }
      }
    }
  }
</script>

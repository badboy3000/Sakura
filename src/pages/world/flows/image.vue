<template>
  <div>
    <image-waterfall
      :list="source.list"
      show="all"
    />
    <no-more
      :loading="source.loading"
      :length="source.list.length"
      :no-more="source.noMore"
    />
  </div>
</template>

<script>
  import ImageWaterfall from 'components/image/ImageWaterfall.vue'

  export default {
    name: 'ImageFlowList',
    components: {
      ImageWaterfall
    },
    computed: {
      source () {
        return this.$store.state.world.image.active
      }
    },
    created () {
      this.$channel.$on('the-world-tab-1-show', this.getData)
    },
    beforeDestroy () {
      this.$channel.$off('the-world-tab-1-show', this.getData)
    },
    methods: {
      async getData (refresh = false, done) {
        try {
          await this.$store.dispatch('world/getTrending', {
            type: 'image',
            sort: 'active',
            refresh
          })
        } catch (e) {
          this.$toast.error(e)
        } finally {
          done && done()
        }
      },
      loadMore () {
        this.$store.dispatch('world/loadMore', {
          type: 'image',
          sort: 'active'
        })
      }
    }
  }
</script>

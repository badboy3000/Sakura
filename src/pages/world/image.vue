<template>
  <f7-page
    id="image-trending"
    :page-content="true"
    :infinite-preloader="false"
    :infinite-distance="50"
    ptr
    infinite
    class="tab-layout-content-container"
    @infinite="loadMore"
    @ptr:refresh="getData"
  >
    <image-flow-list
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
  import ImageFlowList from 'components/image/ImageFlowList.vue'

  export default {
    components: {
      ImageFlowList
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

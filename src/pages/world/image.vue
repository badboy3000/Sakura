<template>
  <f7-page
    :page-content="true"
    :infinite-distance="50"
    :infinite-preloader="source.loading"
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
        return this.$store.state.trending.image.active
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
          await this.$store.dispatch('trending/getTrending', {
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
        this.$store.dispatch('trending/loadMore', {
          type: 'image',
          sort: 'active'
        })
      }
    }
  }
</script>

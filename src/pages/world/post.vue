<template>
  <f7-page
    :page-content="true"
    :infinite-distance="50"
    :infinite-preloader="source.loading"
    infinite
    ptr
    class="tab-layout-content-container"
    @infinite="loadMore"
    @ptr:refresh="getData"
  >
    <post-flow-item
      v-for="item in source.list"
      :key="item.id"
      :item="item"
    />
    <no-more
      :length="source.list.length"
      :no-more="source.noMore"
    />
  </f7-page>
</template>

<script>
  import PostFlowItem from 'components/post/PostFlowItem.vue'

  export default {
    components: {
      PostFlowItem
    },
    computed: {
      source () {
        return this.$store.state.trending.post.active
      }
    },
    created () {
      this.getData();
    },
    methods: {
      async getData (refresh = false, done) {
        try {
          await this.$store.dispatch('trending/getTrending', {
            type: 'post',
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
          type: 'post',
          sort: 'active'
        })
      }
    }
  }
</script>

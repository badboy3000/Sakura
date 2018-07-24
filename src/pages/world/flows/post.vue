<template>
  <div>
    <div>
      <post-flow-item
        v-for="item in source.list"
        :key="item.id"
        :item="item"
      />
    </div>
    <no-more
      :loading="source.loading"
      :length="source.list.length"
      :no-more="source.noMore"
    />
  </div>
</template>

<script>
  import PostFlowItem from 'components/post/PostFlowItem.vue'

  export default {
    name: 'PostFlowList',
    components: {
      PostFlowItem
    },
    computed: {
      source () {
        return this.$store.state.world.post.active
      }
    },
    created () {
      this.getData();
    },
    methods: {
      async getData (refresh = false, done) {
        try {
          await this.$store.dispatch('world/getTrending', {
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
        this.$store.dispatch('world/loadMore', {
          type: 'post',
          sort: 'active'
        })
      }
    }
  }
</script>

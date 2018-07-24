<template>
  <f7-page
    :page-content="true"
    :infinite-preloader="false"
    :infinite-distance="50"
    infinite
    ptr
    @infinite="loadMore"
    @ptr:refresh="getData"
  >
    <div>
      <post-flow-item
        v-for="item in posts"
        :key="item.id"
        :item="item"
      />
    </div>
    <no-more
      :loading="loading"
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
    props: {
      id: {
        type: Number,
        required: true
      }
    },
    data () {
      return {
        loading: false
      }
    },
    computed: {
      source () {
        return this.$store.state.trending.post.active
      },
      topic () {
        return this.$store.state.post.topic
      },
      posts () {
        return this.source
          ? this.topic.concat(this.source.list)
          : this.topic
      }
    },
    created () {
      this.getData();
    },
    methods: {
      async getData (refresh = false, done) {
        if (this.loading) {
          return
        }
        this.loading = true;
        try {
          await Promise.all([
            this.$store.dispatch('trending/getTrending', {
              type: 'post',
              sort: 'active',
              bangumiId: this.id,
              refresh
            }),
            this.$store.dispatch('post/getBangumiTopic', {
              bangumiId: this.id
            })
          ])
        } catch (e) {
          this.$toast.error(e)
        } finally {
          this.loading = false;
          done && done()
        }
      },
      async loadMore () {
        console.log('load more');
        if (this.loading) {
          return
        }
        this.loading = true;
        try {
          this.$store.dispatch('world/loadMore', {
            type: 'post',
            sort: 'active',
            bangumiId: this.id
          })
        } catch (e) {
          this.$toast.error(e)
        } finally {
          this.loading = false;
        }
      }
    }
  }
</script>

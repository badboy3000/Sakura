<template>
  <f7-page
    :page-content="true"
    :infinite-preloader="false"
    :infinite-distance="50"
    ptr
    infinite
    class="tab-layout-content-container"
    @infinite="loadMore"
    @ptr:refresh="getData"
  >
    <score-flow-item
      v-for="item in source.list"
      :key="item.id"
      :item="item"
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
  import ScoreFlowItem from 'components/score/ScoreFlowItem.vue'

  export default {
    components: {
      ScoreFlowItem
    },
    computed: {
      source () {
        return this.$store.state.world.score.active
      }
    },
    created () {
      this.$channel.$on('the-world-tab-2-show', this.getData)
    },
    beforeDestroy () {
      this.$channel.$off('the-world-tab-2-show', this.getData)
    },
    methods: {
      async getData (refresh = false, done) {
        try {
          await this.$store.dispatch('world/getTrending', {
            type: 'score',
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
          type: 'score',
          sort: 'active'
        })
      }
    }
  }
</script>

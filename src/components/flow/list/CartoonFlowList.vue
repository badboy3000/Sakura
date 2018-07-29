<style lang="scss">
  #cartoon-flow-list {
    width: 310px;
    margin: 0 auto;
    @extend %clearfix;
  }
</style>

<template>
  <f7-page
    :page-content="true"
    :infinite="!source.noMore"
    ptr
    @infinite="loadMore"
    @ptr:refresh="refresh"
  >
    <f7-list
      id="cartoon-flow-list"
      class="no-arrow"
    >
      <cartoon-flow-item
        v-for="item in source.list"
        :key="item.id"
        :item="item"
      />
    </f7-list>
    <no-more
      :loading="loading"
      :length="source.list.length"
      :no-more="source.noMore"
    />
  </f7-page>
</template>

<script>
  import CartoonFlowItem from 'components/flow/item/CartoonFlowItem'
  import flowMixin from 'mixins/flow'

  export default {
    name: 'CartoonFlowList',
    components: {
      CartoonFlowItem
    },
    mixins: [flowMixin],
    props: {
      bangumiId: {
        type: Number,
        required: true
      }
    },
    data () {
      return {
        loading: false,
        triggerKey: 'flow-list-fetch-cartoon'
      }
    },
    computed: {
      source () {
        return this.$store.state.bangumi.cartoon
      }
    },
    methods: {
      async getData (refresh = false) {
        if (this.loading) {
          return
        }
        this.loading = true
        try {
          await this.$store.dispatch('bangumi/getCartoons', {
            bangumiId: this.bangumiId,
            refresh
          })
        } catch (e) {
          this.$toast.error(e)
        } finally {
          this.loading = false
        }
      }
    }
  }
</script>

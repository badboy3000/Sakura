<template>
  <div
    v-infinite-scroll="getData"
    infinite-scroll-distance="50"
    infinite-scroll-disabled="notFetch"
  >
    <f7-list>
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
  </div>
</template>

<script>
  import CartoonFlowItem from 'components/flow/item/CartoonFlowItem'

  export default {
    name: 'CartoonFlowList',
    components: {
      CartoonFlowItem
    },
    props: {
      bangumiId: {
        type: Number,
        required: true
      }
    },
    data () {
      return {
        loading: false,
        lock: true
      }
    },
    computed: {
      source () {
        return this.$store.state.bangumi.cartoon
      },
      notFetch () {
        return this.lock || this.loading || this.source.noMore
      }
    },
    mounted () {
      this.$channel.$on('bangumi-show-tab-4-switch', (isShow) => {
        this.lock = !isShow
      })
    },
    beforeDestroy () {
      this.$channel.$off('bangumi-show-tab-4-switch')
    },
    methods: {
      async getData () {
        if (this.loading) {
          return
        }
        this.loading = true
        try {
          await this.$store.dispatch('bangumi/getCartoons', {
            bangumiId: this.bangumiId
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

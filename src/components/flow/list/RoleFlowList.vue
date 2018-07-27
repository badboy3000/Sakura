<template>
  <f7-page
    :page-content="true"
    :infinite="!source.noMore"
    ptr
    @infinite="loadMore"
    @ptr:refresh="refresh"
  >
    <f7-list
      media-list
      class="no-arrow"
    >
      <role-flow-item
        v-for="item in source.list"
        :key="item.id"
        :item="item"
        show="trending"
      />
    </f7-list>
    <no-more
      :loading="source.loading"
      :length="source.list.length"
      :no-more="source.noMore"
    />
  </f7-page>
</template>

<script>
  import RoleFlowItem from 'components/flow/item/RoleFlowItem'
  import flowMixin from 'mixins/flow'

  export default {
    name: 'RoleFlowList',
    components: {
      RoleFlowItem
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
        triggerKey: 'flow-list-fetch-role'
      }
    },
    computed: {
      source () {
        if (this.bangumiId || this.userId) {
          return this.$store.state.flow.role.hot
        }
        return this.$store.state.world.role.hot
      }
    },
    methods: {
      async getData (refresh = false) {
        try {
          const action = this.bangumiId || this.userId ? 'flow/getData' : 'world/getData'
          await this.$store.dispatch(action, {
            type: 'role',
            sort: 'hot',
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

<template>
  <f7-page
    :page-content="true"
    :infinite="!source.noMore"
    ptr
    @infinite="loadMore"
    @ptr:refresh="refresh"
  >
    <div
      v-for="(col, index) in source.list"
      :key="index"
    >
      <f7-block-title v-text="col.date"/>
      <f7-list
        media-list
        class="no-arrow"
      >
        <f7-list-item
          v-for="item in col.list"
          :key="item.id"
          :title="item.name"
          :text="item.summary"
          :link="$alias.bangumi(item.id)"
        >
          <img
            slot="media"
            :src="$resize(item.avatar, { width: 160 })"
            width="80"
          >
        </f7-list-item>
      </f7-list>
    </div>
    <no-more
      :loading="false"
      :length="source.list.length"
      :no-more="source.noMore"
    />
  </f7-page>
</template>

<script>
  import flowMixin from 'mixins/flow'

  export default {
    mixins: [flowMixin],
    data () {
      return {
        triggerKey: 'fetch-bangumi-timeline'
      }
    },
    computed: {
      source () {
        return this.$store.state.bangumi.timeline
      }
    },
    methods: {
      async getData (refresh = false) {
        try {
          await this.$store.dispatch('bangumi/getTimeline', { refresh })
        } catch (e) {
          this.$toast.error(e)
        }
      }
    }
  }
</script>

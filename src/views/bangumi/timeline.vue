<template>
  <div
    v-infinite-scroll="getData"
    infinite-scroll-distance="50"
    infinite-scroll-disabled="notFetch"
  >
    <div>
      <div
        v-for="(col, index) in source.list"
        :key="index"
      >
        <f7-block-title v-text="col.date"/>
        <f7-list media-list>
          <f7-list-item
            v-for="item in col.list"
            :key="item.id"
            :title="item.name"
            :text="item.summary"
            link="#"
          >
            <img
              slot="media"
              :src="$resize(item.avatar, { width: 160 })"
              width="80"
            >
          </f7-list-item>
        </f7-list>
      </div>
    </div>
    <no-more
      :loading="loading"
      :length="source.list.length"
      :no-more="source.noMore"
    />
  </div>
</template>

<script>
  export default {
    data () {
      return {
        lock: true,
        loading: false
      }
    },
    computed: {
      source () {
        return this.$store.state.bangumi.timeline
      },
      notFetch () {
        return this.lock || this.loading || this.source.noMore
      }
    },
    mounted () {
      this.$channel.$on('bangumi-tab-1-switch', (isShow) => {
        this.lock = !isShow
      })
    },
    beforeDestroy () {
      this.$channel.$off('bangumi-tab-1-switch')
    },
    methods: {
      async getData () {
        if (this.loading) {
          return
        }
        this.loading = true
        try {
          await this.$store.dispatch('bangumi/getTimeline')
        } catch (e) {
          this.$toast.error(e)
        } finally {
          this.loading = false
        }
      }
    }
  }
</script>

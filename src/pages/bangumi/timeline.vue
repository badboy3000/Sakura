<style lang="scss">

</style>

<template>
  <f7-page
    :page-content="true"
    :infinite-preloader="false"
    :infinite-distance="50"
    infinite
    class="tab-layout-content-container"
    @infinite="getData"
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
  </f7-page>
</template>

<script>
  export default {
    data () {
      return {
        loading: false
      }
    },
    computed: {
      source () {
        return this.$store.state.bangumi.timeline
      }
    },
    mounted () {
      this.$channel.$on('bangumi-tab-1-show', () => {
        if (!this.source.list.length) {
          this.getData()
        }
      })
    },
    methods: {
      async getData () {
        console.log('get data');
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

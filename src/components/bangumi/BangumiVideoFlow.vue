<style lang="scss">

</style>

<template>
  <f7-block
    v-if="loading"
    class="text-align-center"
  >
    <f7-preloader/>
  </f7-block>
  <f7-block
    v-else-if="!source"
    class="text-align-center"
  >
    还什么都没有
  </f7-block>
  <div v-else>
    <div v-if="source.has_season">
      <div
        v-for="(col, index) in source.videos"
        :key="index"
      >
        <f7-block-title v-text="col.name"/>
        <f7-list media-list>
          <f7-list-item
            v-for="item in col.data"
            :key="item.id"
            :title="item.name"
            :subtitle="`第${ item.part - col.base }话`"
            link="#"
          >
            <img
              slot="media"
              :src="$resize(item.poster, { width: 160 })"
              width="80"
            >
          </f7-list-item>
        </f7-list>
      </div>
    </div>
    <f7-list
      v-else
      media-list
    >
      <f7-list-item
        v-for="item in source.videos"
        :key="item.id"
        :title="item.name"
        :subtitle="`第${ item.part }话`"
        link="#"
      >
        <img
          slot="media"
          :src="$resize(item.poster, { width: 160 })"
          width="80"
        >
      </f7-list-item>
    </f7-list>
  </div>
</template>

<script>
  import { videos as Api } from 'api/bangumiApi'

  export default {
    components: {

    },
    props: {
      id: {
        type: Number,
        required: true
      }
    },
    data () {
      return {
        source: null,
        loading: false
      }
    },
    computed: {

    },
    watch: {

    },
    created () {

    },
    mounted () {
      this.$channel.$on('bangumi-show-tab-3-show', this.getData)
    },
    methods: {
      async getData () {
        if (this.loading || this.source) {
          return
        }
        this.loading = true
        try {
          this.source = await Api(this.id)
        } catch (e) {
          this.$toast.error(e)
        } finally {
          this.loading = false
        }
      }
    }
  }
</script>

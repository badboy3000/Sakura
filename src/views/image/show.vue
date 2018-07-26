<style lang="scss">

</style>

<template>
  <f7-page>
    <f7-navbar
      title="image show"
      back-link
      sliding
    />
    <div class="hr"/>
    <comment-main
      :id="id"
      :only-see-master="false"
      :master-id="masterId"
      type="image"
    />
    <f7-block
      v-if="loading"
      class="text-align-center"
    >
      <f7-preloader/>
    </f7-block>
  </f7-page>
</template>

<script>
  import { getImageInfo } from 'api/imageApi'

  export default {
    name: 'ImageShow',
    data () {
      return {
        loading: true,
        source: null
      }
    },
    computed: {
      id () {
        return +this.$f7route.params.id
      },
      bangumi () {
        return this.source.bangumi
      },
      author () {
        return this.source.user
      },
      masterId () {
        return this.source
          ? this.author.id
          : 0
      }
    },
    watch: {

    },
    created () {
      this.getData()
    },
    mounted () {

    },
    methods: {
      async getData () {
        try {
          this.source = await getImageInfo({
            imageId: this.id
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

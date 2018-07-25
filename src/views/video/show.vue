<style lang="scss">

</style>

<template>
  <f7-page>
    <f7-navbar
      title="video show"
      back-link
      sliding
    />
  </f7-page>
</template>

<script>
  import { getVideoInfo } from 'api/videoApi'

  export default {
    name: 'VideoShow',
    components: {

    },
    data () {
      return {
        loading: false,
        source: null
      }
    },
    computed: {
      id () {
        return +this.$f7route.params.id
      }
    },
    watch: {

    },
    created () {
      this.getInfo()
    },
    mounted () {

    },
    methods: {
      async getInfo () {
        if (this.loading) {
          return
        }
        this.loading = true
        try {
          this.source = await getVideoInfo(this.id)
        } catch (e) {
          this.$toast.error(e)
        } finally {
          this.loading = false
        }
      }
    }
  }
</script>

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
      },
      bangumi () {
        return this.source
          ? this.source.bangumi
          : null
      },
      useOtherSiteSource () {
        if (!this.bangumi) {
          return false
        }
        if (this.bangumi.others_site_video) {
          return true
        }
        const resource = this.source.info.resource
        if (!resource) {
          return true
        }
        return !((
          resource.video[720] && resource.video[720].src
        ) || (
          resource.video[1080] && resource.video[1080].src
        ))
      },
      videoSrc () {
        if (!this.source) {
          return ''
        }
        const video = this.source.info
        if (!video) {
          return ''
        }
        return this.useOtherSiteSource
          ? video.url
          : video.resource
            ? (
              video.resource.video[720] && video.resource.video[720].src
            ) || (
              video.resource.video[1080] && video.resource.video[1080].src
            ) || video.url
            : video.url
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
          this.playVideo()
        } catch (e) {
          console.log(e);
          this.$toast.error(e)
        } finally {
          this.loading = false
        }
      },
      playVideo () {
        window.plugins.streamingMedia.playVideo(this.videoSrc, {
          successCallback: () => {
            console.log("Video was closed without error.");
          },
          errorCallback: (errMsg) => {
            console.log("Error! " + errMsg);
          },
          orientation: 'landscape',
          shouldAutoClose: true,  // true(default)/false
          controls: true // true(default)/false. Used to hide controls on fullscreen
        });
      }
    }
  }
</script>

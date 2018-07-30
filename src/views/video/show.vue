<style lang="scss">
  #video-show {
    .video-poster {
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center;
      width: 100%;
      height: 200px;
      display: block;
      overflow: hidden;
      position: relative;

      &:before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, .3);
      }

      .icon {
        position: absolute;
        left: 50%;
        top: 50%;
        margin-left: -25px;
        margin-top: -25px;
      }
    }
  }
</style>

<template>
  <f7-page id="video-show">
    <f7-navbar
      back-link
      sliding
    />
    <f7-block
      v-if="loading"
      class="text-align-center"
    >
      <f7-preloader/>
    </f7-block>
    <template v-else>
      <f7-block-title>
        {{ bangumi.name }} 第{{ video.part }}话：{{ video.name }}
      </f7-block-title>
      <f7-link
        :style="{ backgroundImage: `url(${$resize(video.poster, { width: $width, height: 400 })})` }"
        class="video-poster"
        href="#"
        @click="playVideo"
      >
        <f7-icon
          f7="play_round_fill"
          color="white"
          size="50"
        />
      </f7-link>
      <bangumi-panel :bangumi="bangumi"/>
    </template>
    <comment-main
      :id="id"
      :only-see-master="false"
      :master-id="masterId"
      type="video"
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
  import { getVideoInfo } from 'api/videoApi'

  export default {
    name: 'VideoShow',
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
      video () {
        return this.source.info
      },
      masterId () {
        return this.source
          ? this.video.user_id
          : 0
      },
      useOtherSiteSource () {
        if (!this.bangumi) {
          return false
        }
        if (this.bangumi.others_site_video) {
          return true
        }
        const resource = this.video.resource
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
        const video = this.video
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
    created () {
      this.getData()
    },
    methods: {
      async getData () {
        if (this.loading) {
          return
        }
        this.loading = true
        try {
          this.source = await getVideoInfo({
            videoId: this.id
          })
        } catch (e) {
          this.$toast.error(e)
        } finally {
          this.loading = false
        }
      },
      playVideo () {
        if (this.useOtherSiteSource) {
          this.$f7.dialog.alert('该视频不支持站内播放', '提示')
          return
        }
        window.plugins.streamingMedia.playVideo(this.videoSrc, {
          successCallback: () => {
            console.log("Video was closed without error.");
          },
          errorCallback: (errMsg) => {
            this.$toast.error('视频加载失败');
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

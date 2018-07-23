<style lang="scss">
  $banner-height: 180px;

  #bangumi-show {
    position: relative;

    .banner {
      position: relative;
      width: 100%;
      height: $banner-height;
      overflow: hidden;
      box-shadow: inset 0 0 15px 0 rgba(0,0,0,.5);
      z-index: 0;

      .background {
        width: 110%;
        height: $banner-height;
        margin: -$banner-height / 2 -55%;
        position: absolute;
        top: 50%;
        left: 50%;
        z-index: -1;
        background-color: #999;
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
        @include filter-blur();
      }
    }
  }
</style>

<template>
  <f7-page id="bangumi-show">
    <f7-navbar
      :title="bangumi ? bangumi.name : '···'"
      back-link="Back"
      sliding
    />
    <template v-if="bangumi">
      <div class="banner">
        <div
          :style="{ backgroundImage: `url(${$resize(bangumi.banner, { width: $width, height: 400 })})` }"
          class="background"
        />
        banner
      </div>
      <menu-bar
        :list="menu"
        :active="0"
      />
      <f7-tabs
        animated
        swipeable
      >
        <f7-tab
          id="bangumi-show-post"
          tab-active
          @tab:show="handleTabShow(0)"
          @tab:hide="handleTabHide(0)"
        >
          <bangumi-post-flow/>
        </f7-tab>
        <f7-tab
          id="bangumi-show-image"
          @tab:show="handleTabShow(1)"
          @tab:hide="handleTabHide(1)"
        >
          <bangumi-image-flow/>
        </f7-tab>
        <f7-tab
          id="bangumi-show-score"
          @tab:show="handleTabShow(2)"
          @tab:hide="handleTabHide(2)"
        >
          <bangumi-score-flow/>
        </f7-tab>
        <f7-tab
          id="bangumi-show-video"
          @tab:show="handleTabShow(3)"
          @tab:hide="handleTabHide(3)"
        >
          <bangumi-video-flow/>
        </f7-tab>
        <f7-tab
          id="bangumi-show-cartoon"
          @tab:show="handleTabShow(4)"
          @tab:hide="handleTabHide(4)"
        >
          <bangumi-cartoon-flow/>
        </f7-tab>
        <f7-tab
          id="bangumi-show-role"
          @tab:show="handleTabShow(5)"
          @tab:hide="handleTabHide(5)"
        >
          <bangumi-role-flow/>
        </f7-tab>
        <f7-tab
          id="bangumi-show-setting"
          @tab:show="handleTabShow(6)"
          @tab:hide="handleTabHide(6)"
        >
          <bangumi-setting/>
        </f7-tab>
      </f7-tabs>
    </template>
    <f7-block
      v-else
      class="text-align-center"
    >
      <f7-preloader/>
    </f7-block>
  </f7-page>
</template>

<script>
  import MenuBar from 'components/MenuBar.vue'
  import BangumiPostFlow from 'components/bangumi/BangumiPostFlow.vue'
  import BangumiImageFlow from 'components/bangumi/BangumiImageFlow.vue'
  import BangumiScoreFlow from 'components/bangumi/BangumiScoreFlow.vue'
  import BangumiVideoFlow from 'components/bangumi/BangumiVideoFlow.vue'
  import BangumiCartoonFlow from 'components/bangumi/BangumiCartoonFlow.vue'
  import BangumiRoleFlow from 'components/bangumi/BangumiRoleFlow.vue'
  import BangumiSetting from 'components/bangumi/BangumiSetting.vue'

  export default {
    components: {
      MenuBar,
      BangumiPostFlow,
      BangumiImageFlow,
      BangumiScoreFlow,
      BangumiVideoFlow,
      BangumiCartoonFlow,
      BangumiRoleFlow,
      BangumiSetting
    },
    data () {
      return {
        loading: false,
        bangumi: null,
        menu: [
          {
            value: 'bangumi-show-post',
            label: '帖子'
          },
          {
            value: 'bangumi-show-image',
            label: '相册'
          },
          {
            value: 'bangumi-show-score',
            label: '漫评'
          },
          {
            value: 'bangumi-show-video',
            label: '视频'
          },
          {
            value: 'bangumi-show-cartoon',
            label: '漫画'
          },
          {
            value: 'bangumi-show-role',
            label: '偶像'
          },
          {
            value: 'bangumi-show-setting',
            label: '设置'
          }
        ]
      }
    },
    computed: {
      id () {
        return this.$f7route.params.id
      }
    },
    created () {
      this.getData();
    },
    methods: {
      async getData () {
        if (this.loading) {
          return
        }
        this.loading = true;
        try {
          this.bangumi = await this.$store.dispatch('bangumi/getInfo', {
            id: this.id
          })
        } catch (e) {
          this.$toast.error(e)
        } finally {
          this.loading = false
        }
      },
      handleTabShow (index) {
        this.$channel.$emit(`bangumi-show-tab-${index}-show`)
      },
      handleTabHide (index) {
        this.$channel.$emit(`bangumi-show-tab-${index}-hide`)
      }
    }
  }
</script>

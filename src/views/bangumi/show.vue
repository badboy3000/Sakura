<style lang="scss">
  #bangumi-show {
    position: relative;

    .banner {
      .avatar {
        position: absolute;
        left: 50%;
        top: 50%;
        margin-left: -30px;
        margin-top: -50px;
        @include avatar(60px)
      }
    }

    .tabs .tab {
      padding-bottom: 0;
    }
  }

  .ios-edge #bangumi-show {
    .tabs-animated-wrap {
      margin-top: -44px;
    }
  }
</style>

<template>
  <f7-page id="bangumi-show">
    <f7-navbar
      :title="bangumi ? bangumi.name : ''"
      back-link
      sliding
    />
    <template v-if="bangumi">
      <scroll-banner
        :height="200"
        :background="bangumi.banner"
        class="banner"
      >
        <div class="avatar">
          <img :src="$resize(bangumi.avatar, { width: 120 })">
        </div>
      </scroll-banner>
      <menu-bar
        :list="computedMenu"
        :active="0"
      />
      <f7-tabs animated>
        <f7-tab
          v-scroll-emit="200"
          id="bangumi-show-post"
          tab-active
          class="page-content"
          @tab:show="handleTabShow(0)"
          @tab:hide="handleTabHide(0)"
        >
          <post-flow-list :bangumi-id="id"/>
        </f7-tab>
        <f7-tab
          v-scroll-emit="200"
          id="bangumi-show-image"
          class="page-content"
          @tab:show="handleTabShow(1)"
          @tab:hide="handleTabHide(1)"
        >
          <image-flow-list :bangumi-id="id"/>
        </f7-tab>
        <f7-tab
          v-scroll-emit="200"
          id="bangumi-show-score"
          class="page-content"
          @tab:show="handleTabShow(2)"
          @tab:hide="handleTabHide(2)"
        >
          <bangumi-score-flow :bangumi-id="id"/>
        </f7-tab>
        <f7-tab
          v-scroll-emit="200"
          v-if="bangumi.has_video"
          id="bangumi-show-video"
          class="page-content"
          @tab:show="handleTabShow(3)"
          @tab:hide="handleTabHide(3)"
        >
          <bangumi-video-flow :id="id"/>
        </f7-tab>
        <f7-tab
          v-scroll-emit="200"
          v-if="bangumi.has_cartoon"
          id="bangumi-show-cartoon"
          class="page-content"
          @tab:show="handleTabShow(4)"
          @tab:hide="handleTabHide(4)"
        >
          <cartoon-flow-list :bangumi-id="id"/>
        </f7-tab>
        <f7-tab
          v-scroll-emit="200"
          id="bangumi-show-role"
          class="page-content"
          @tab:show="handleTabShow(5)"
          @tab:hide="handleTabHide(5)"
        >
          <role-flow-list :bangumi-id="id"/>
        </f7-tab>
        <f7-tab
          v-scroll-emit="200"
          v-if="bangumi.is_master"
          id="bangumi-show-setting"
          class="page-content"
          @tab:show="handleTabShow(6)"
          @tab:hide="handleTabHide(6)"
        >
          <bangumi-setting :id="id"/>
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
  import ScrollBanner from 'components/ScrollBanner'
  import MenuBar from 'components/MenuBar'
  import PostFlowList from 'components/flow/list/PostFlowList'
  import ImageFlowList from 'components/flow/list/ImageFlowList'
  import BangumiScoreFlow from 'components/bangumi/BangumiScoreFlow'
  import BangumiVideoFlow from 'components/bangumi/BangumiVideoFlow'
  import CartoonFlowList from 'components/flow/list/CartoonFlowList'
  import RoleFlowList from 'components/flow/list/RoleFlowList'
  import BangumiSetting from 'components/bangumi/BangumiSetting'

  export default {
    components: {
      ScrollBanner,
      MenuBar,
      PostFlowList,
      ImageFlowList,
      BangumiScoreFlow,
      BangumiVideoFlow,
      CartoonFlowList,
      RoleFlowList,
      BangumiSetting
    },
    data () {
      return {
        loading: false,
        bangumi: null
      }
    },
    computed: {
      id () {
        return +this.$f7route.params.id
      },
      computedMenu () {
        const result = [
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
          }
        ];
        if (this.bangumi.has_video) {
          result.push({
            value: 'bangumi-show-video',
            label: '视频'
          })
        }
        if (this.bangumi.has_cartoon) {
          result.push({
            value: 'bangumi-show-cartoon',
            label: '漫画'
          })
        }
        result.push({
          value: 'bangumi-show-role',
          label: '偶像'
        })
        if (this.bangumi.is_master) {
          result.push({
            value: 'bangumi-show-setting',
            label: '管理'
          })
        }

        return result
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
            bangumiId: this.id
          })
        } catch (e) {
          this.$toast.error(e)
        } finally {
          this.loading = false
        }
      },
      handleTabShow (index) {
        this.$channel.$emit(`bangumi-show-tab-${index}-switch`, true)
      },
      handleTabHide (index) {
        this.$channel.$emit(`bangumi-show-tab-${index}-switch`, false)
      }
    }
  }
</script>

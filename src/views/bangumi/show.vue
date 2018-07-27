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

    .bangumi-tabs-wrap {
      margin-top: 200px;
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
    </template>
    <f7-block
      v-else
      class="text-align-center"
    >
      <f7-preloader/>
    </f7-block>
    <f7-page
      :page-content="true"
      class="bangumi-tabs-wrap"
    >
      <f7-tabs>
        <f7-tab
          v-scroll-emit="200"
          id="bangumi-show-post"
          tab-active
        >
          <post-flow-list :bangumi-id="id"/>
        </f7-tab>
        <f7-tab
          v-scroll-emit="200"
          id="bangumi-show-image"
          @tab:show="$channel.$emit('flow-list-fetch-image')"
        >
          <image-flow-list :bangumi-id="id"/>
        </f7-tab>
        <f7-tab
          v-scroll-emit="200"
          id="bangumi-show-score"
          @tab:show="$channel.$emit('flow-list-fetch-score')"
        >
          <bangumi-score-flow :bangumi-id="id"/>
        </f7-tab>
        <f7-tab
          v-scroll-emit="200"
          v-if="hasVideo"
          id="bangumi-show-video"
        >
          <bangumi-video-flow :id="id"/>
        </f7-tab>
        <f7-tab
          v-scroll-emit="200"
          v-if="hasCartoon"
          id="bangumi-show-cartoon"
        >
          <cartoon-flow-list :bangumi-id="id"/>
        </f7-tab>
        <f7-tab
          v-scroll-emit="200"
          id="bangumi-show-role"
        >
          <role-flow-list :bangumi-id="id"/>
        </f7-tab>
        <f7-tab
          v-scroll-emit="200"
          v-if="isMaster"
          id="bangumi-show-setting"
        >
          <bangumi-setting :id="id"/>
        </f7-tab>
      </f7-tabs>
    </f7-page>
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
        if (this.hasVideo) {
          result.push({
            value: 'bangumi-show-video',
            label: '视频'
          })
        }
        if (this.hasCartoon) {
          result.push({
            value: 'bangumi-show-cartoon',
            label: '漫画'
          })
        }
        result.push({
          value: 'bangumi-show-role',
          label: '偶像'
        })
        if (this.isMaster) {
          result.push({
            value: 'bangumi-show-setting',
            label: '管理'
          })
        }
        return result
      },
      hasVideo () {
        return this.bangumi
          ? this.bangumi.has_video
          : false
      },
      hasCartoon () {
        return this.bangumi
          ? this.bangumi.has_cartoon
          : false
      },
      isMaster () {
        return this.bangumi
          ? this.bangumi.is_master
          : false
      }
    },
    created () {
      this.getData();
    },
    mounted () {
      this.$channel.$emit('flow-list-fetch-post')
    },
    methods: {
      async getData () {
        try {
          this.bangumi = await this.$store.dispatch('bangumi/getInfo', {
            bangumiId: this.id
          })
        } catch (e) {
          this.$toast.error(e)
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

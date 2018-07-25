<style lang="scss">
  $banner-height: 180px;

  #bangumi-show {
    position: relative;

    .banner {
      position: relative;
      width: 100%;
      height: $banner-height;
      overflow: hidden;
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
      :title="bangumi ? bangumi.name : '加载中...'"
      back-link
      sliding
    />
    <menu-bar
      v-if="bangumi"
      :list="computedMenu"
      :active="0"
    />
    <template v-if="bangumi">
      <f7-tabs animated>
        <f7-tab
          id="bangumi-show-post"
          tab-active
          class="page-content"
          @tab:show="handleTabShow(0)"
          @tab:hide="handleTabHide(0)"
        >
          <post-flow-list :bangumi-id="id"/>
        </f7-tab>
        <f7-tab
          id="bangumi-show-image"
          class="page-content"
          @tab:show="handleTabShow(1)"
          @tab:hide="handleTabHide(1)"
        >
          <image-flow-list :bangumi-id="id"/>
        </f7-tab>
        <f7-tab
          id="bangumi-show-score"
          class="page-content"
          @tab:show="handleTabShow(2)"
          @tab:hide="handleTabHide(2)"
        >
          <score-flow-list :bangumi-id="id"/>
        </f7-tab>
        <f7-tab
          v-if="bangumi.has_video"
          id="bangumi-show-video"
          class="page-content"
          @tab:show="handleTabShow(3)"
          @tab:hide="handleTabHide(3)"
        >
          <bangumi-video-flow :id="id"/>
        </f7-tab>
        <f7-tab
          v-if="bangumi.has_cartoon"
          id="bangumi-show-cartoon"
          class="page-content"
          @tab:show="handleTabShow(4)"
          @tab:hide="handleTabHide(4)"
        >
          <bangumi-cartoon-flow :id="id"/>
        </f7-tab>
        <f7-tab
          id="bangumi-show-role"
          class="page-content"
          @tab:show="handleTabShow(5)"
          @tab:hide="handleTabHide(5)"
        >
          <role-flow-list :bangumi-id="id"/>
        </f7-tab>
        <f7-tab
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
  import MenuBar from 'components/MenuBar.vue'
  import PostFlowList from 'components/flow/list/PostFlowList'
  import ImageFlowList from 'components/flow/list/ImageFlowList'
  import ScoreFlowList from 'components/flow/list/ScoreFlowList'
  import BangumiVideoFlow from 'components/bangumi/BangumiVideoFlow.vue'
  import BangumiCartoonFlow from 'components/bangumi/BangumiCartoonFlow.vue'
  import RoleFlowList from 'components/flow/list/RoleFlowList'
  import BangumiSetting from 'components/bangumi/BangumiSetting.vue'

  export default {
    components: {
      MenuBar,
      PostFlowList,
      ImageFlowList,
      ScoreFlowList,
      BangumiVideoFlow,
      BangumiCartoonFlow,
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
            label: '设置'
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
            id: this.id
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

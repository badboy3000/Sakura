<style lang="scss">
  #the-world {
    height: 100%;
    margin-top: -44px;
    padding-top: 44px;

    .tabs-animated-wrap {
      padding-bottom: $tab-height;

      .tab {
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
      }
    }
  }
</style>

<template>
  <div id="the-world">
    <f7-toolbar tabbar>
      <f7-link
        tab-link="#world-post"
        tab-link-active
      >帖子</f7-link>
      <f7-link
        tab-link="#world-image"
      >图片</f7-link>
      <f7-link
        tab-link="#world-review"
      >漫评</f7-link>
    </f7-toolbar>
    <f7-tabs
      animated
      swipeable
    >
      <f7-tab
        id="world-post"
        tab-active
        @tab:show="handleTabShow(0)"
        @tab:hide="handleTabHide(0)"
      >
        <post-flow-list/>
      </f7-tab>
      <f7-tab
        id="world-image"
        @tab:show="handleTabShow(1)"
        @tab:hide="handleTabHide(1)"
      >
        <image-flow-list/>
      </f7-tab>
      <f7-tab
        id="world-review"
        @tab:show="handleTabShow(2)"
        @tab:hide="handleTabHide(2)"
      >
        <score-flow-list/>
      </f7-tab>
    </f7-tabs>
  </div>
</template>

<script>
  import PostFlowList from 'components/flow/list/PostFlowList'
  import ImageFlowList from 'components/flow/list/ImageFlowList'
  import ScoreFlowList from 'components/flow/list/ScoreFlowList'

  export default {
    components: {
      PostFlowList,
      ImageFlowList,
      ScoreFlowList
    },
    methods: {
      handleTabShow (index) {
        this.$channel.$emit(`the-world-tab-${index}-switch`, true)
      },
      handleTabHide (index) {
        this.$channel.$emit(`the-world-tab-${index}-switch`, false)
      }
    }
  };
</script>

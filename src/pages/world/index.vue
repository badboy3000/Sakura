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
        <post-trending/>
      </f7-tab>
      <f7-tab
        id="world-image"
        @tab:show="handleTabShow(1)"
        @tab:hide="handleTabHide(1)"
      >
        <image-trending/>
      </f7-tab>
      <f7-tab
        id="world-review"
        @tab:show="handleTabShow(2)"
        @tab:hide="handleTabHide(2)"
      >
        <score-trending/>
      </f7-tab>
    </f7-tabs>
  </div>
</template>

<script>
  import PostTrending from './flows/post.vue'
  import ImageTrending from './flows/image.vue'
  import ScoreTrending from './flows/review.vue'

  export default {
    components: {
      PostTrending,
      ImageTrending,
      ScoreTrending
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

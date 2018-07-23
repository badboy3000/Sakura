<template>
  <f7-page
    :page-content="true"
    hide-toolbar-on-scroll
  >
    <f7-toolbar
      ref="bar"
      tabbar
    >
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
  </f7-page>
</template>

<script>
  import PostTrending from './post.vue'
  import ImageTrending from './image.vue'
  import ScoreTrending from './review.vue'

  export default {
    components: {
      PostTrending,
      ImageTrending,
      ScoreTrending
    },
    mounted () {
      this.$channel.$on('tab-switch', () => {
        this.$refs.bar.show(0)
      })
    },
    methods: {
      handleTabShow (index) {
        this.$channel.$emit(`the-world-tab-${index}-show`)
      },
      handleTabHide (index) {
        this.$channel.$emit(`the-world-tab-${index}-hide`)
      }
    }
  };
</script>

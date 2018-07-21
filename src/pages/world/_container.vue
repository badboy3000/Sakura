<template>
  <f7-page hide-toolbar-on-scroll>
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
      >
        <f7-view url="/tabs/world/post"/>
      </f7-tab>
      <f7-tab
        id="world-image"
      >
        <f7-view url="/tabs/world/image"/>
      </f7-tab>
      <f7-tab
        id="world-review"
      >
        <f7-view url="/tabs/world/review"/>
      </f7-tab>
    </f7-tabs>
  </f7-page>
</template>

<script>
  export default {
    mounted () {
      this.$channel.$on('tab-switch', () => {
        this.$refs.bar.show(0)
      })
    }
  };
</script>

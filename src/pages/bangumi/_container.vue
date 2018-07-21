<template>
  <f7-page hide-toolbar-on-scroll>
    <f7-toolbar
      ref="bar"
      tabbar
    >
      <f7-link
        tab-link="#bangumi-release"
        tab-link-active
      >放映表</f7-link>
      <f7-link
        tab-link="#bangumi-timeline"
      >时间轴</f7-link>
      <f7-link
        tab-link="#bangumi-tags"
      >标签云</f7-link>
    </f7-toolbar>
    <f7-tabs
      animated
      swipeable
    >
      <f7-tab
        id="bangumi-release"
        tab-active
      >
        <f7-view
          url="/tabs/bangumi/release"
        />
      </f7-tab>
      <f7-tab
        id="bangumi-timeline"
      >
        <f7-view
          url="/tabs/bangumi/timeline"
        />
      </f7-tab>
      <f7-tab
        id="bangumi-tags"
      >
        <f7-view url="/tabs/bangumi/tags"/>
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

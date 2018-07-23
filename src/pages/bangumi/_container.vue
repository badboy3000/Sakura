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
        tab-link="#bangumi-category"
      >标签云</f7-link>
    </f7-toolbar>
    <f7-tabs
      animated
      swipeable
    >
      <f7-tab
        id="bangumi-release"
        tab-active
        @tab:show="handleTabShow(0)"
        @tab:hide="handleTabHide(0)"
      >
        <bangumi-release/>
      </f7-tab>
      <f7-tab
        id="bangumi-timeline"
        @tab:show="handleTabShow(1)"
        @tab:hide="handleTabHide(1)"
      >
        <bangumi-timeline/>
      </f7-tab>
      <f7-tab
        id="bangumi-category"
        @tab:show="handleTabShow(2)"
        @tab:hide="handleTabHide(2)"
      >
        <bangumi-category/>
      </f7-tab>
    </f7-tabs>
  </f7-page>
</template>

<script>
  import BangumiRelease from './release.vue'
  import BangumiTimeline from './timeline.vue'
  import BangumiCategory from './category.vue'

  export default {
    components: {
      BangumiRelease,
      BangumiTimeline,
      BangumiCategory
    },
    mounted () {
      this.$channel.$on('tab-switch', () => {
        this.$refs.bar.show(0)
      })
    },
    methods: {
      handleTabShow (index) {
        this.$channel.$emit(`bangumi-tab-${index}-show`)
      },
      handleTabHide (index) {
        this.$channel.$emit(`bangumi-tab-${index}-hide`)
      }
    }
  };
</script>

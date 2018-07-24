<template>
  <div class="homepage-container">
    <f7-toolbar tabbar>
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
  </div>
</template>

<script>
  import BangumiRelease from 'views/bangumi/release.vue'
  import BangumiTimeline from 'views/bangumi/timeline.vue'
  import BangumiCategory from 'views/bangumi/category.vue'

  export default {
    components: {
      BangumiRelease,
      BangumiTimeline,
      BangumiCategory
    },
    methods: {
      handleTabShow (index) {
        this.$channel.$emit(`bangumi-tab-${index}-switch`, true)
      },
      handleTabHide (index) {
        this.$channel.$emit(`bangumi-tab-${index}-switch`, false)
      }
    }
  };
</script>

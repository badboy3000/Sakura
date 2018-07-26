<template>
  <div class="homepage-container">
    <f7-toolbar
      tabbar
      no-hairline
      no-shadow
    >
      <f7-link
        tab-link="#bangumi-release"
        tab-link-active
      >新番时间表</f7-link>
      <f7-link
        tab-link="#bangumi-timeline"
      >时间轴</f7-link>
      <f7-link
        tab-link="#bangumi-category"
      >番剧索引</f7-link>
      <f7-link
        tab-link="#cartoon-role-trending"
      >偶像排行榜</f7-link>
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
      <f7-tab
        id="cartoon-role-trending"
        @tab:show="handleTabShow(3)"
        @tab:hide="handleTabHide(3)"
      >
        <cartoon-role-trending/>
      </f7-tab>
    </f7-tabs>
  </div>
</template>

<script>
  import BangumiRelease from 'views/bangumi/release'
  import BangumiTimeline from 'views/bangumi/timeline'
  import BangumiCategory from 'views/bangumi/category'
  import CartoonRoleTrending from 'views/role/trending'

  export default {
    components: {
      BangumiRelease,
      BangumiTimeline,
      BangumiCategory,
      CartoonRoleTrending
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

<template>
  <f7-page :page-content="true">
    <f7-tabs
      animated
      swipeable
    >
      <f7-tab
        id="bangumi-release"
        tab-active
      >
        <bangumi-release/>
      </f7-tab>
      <f7-tab
        id="bangumi-timeline"
        @tab:show="$channel.$emit('bangumi-tab-fetch-timeline')"
      >
        <bangumi-timeline/>
      </f7-tab>
      <f7-tab
        id="bangumi-category"
        @tab:show="$channel.$emit('bangumi-tab-fetch-category')"
      >
        <bangumi-category/>
      </f7-tab>
      <f7-tab
        id="cartoon-role-trending"
        @tab:show="$channel.$emit('flow-list-fetch-role')"
      >
        <cartoon-role-trending/>
      </f7-tab>
    </f7-tabs>
  </f7-page>
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

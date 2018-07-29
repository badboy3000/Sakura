<template>
  <f7-page :page-content="true">
    <f7-tabs>
      <f7-tab
        id="bangumi-release"
        tab-active
      >
        <bangumi-release/>
      </f7-tab>
      <f7-tab
        id="bangumi-timeline"
        @tab:show="$channel.$emit('world-fetch-bangumi-timeline')"
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
        @tab:show="$channel.$emit('world-flow-list-fetch-role')"
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
    }
  };
</script>

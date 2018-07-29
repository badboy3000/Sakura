<template>
  <f7-page :page-content="true">
    <f7-tabs>
      <f7-tab
        id="world-post"
        tab-active
      >
        <post-flow-list/>
      </f7-tab>
      <f7-tab
        id="world-image"
        @tab:show="$channel.$emit('world-flow-list-fetch-image')"
      >
        <image-flow-list/>
      </f7-tab>
      <f7-tab
        id="world-review"
        @tab:show="$channel.$emit('world-flow-list-fetch-score')"
      >
        <score-flow-list/>
      </f7-tab>
    </f7-tabs>
  </f7-page>
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
    mounted () {
      this.$channel.$emit('world-flow-list-fetch-post')
    }
  };
</script>

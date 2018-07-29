<template>
  <div class="bangumi-panel">
    <div class="hr"/>
    <f7-list
      media-list
      class="no-arrow"
    >
      <f7-block-title>
        所属番剧
      </f7-block-title>
      <f7-list-item
        :title="bangumi.name"
        :text="bangumi.summary"
        :link="$alias.bangumi(bangumi.id)"
      >
        <img
          slot="media"
          :src="$resize(bangumi.avatar, { width: 160 })"
          width="80"
        >
      </f7-list-item>
    </f7-list>
  </div>
</template>

<script>
  export default {
    name: 'BangumiPanel',
    props: {
      bangumi: {
        required: true,
        type: Object
      }
    },
    data () {
      return {

      }
    },
    computed: {

    },
    watch: {

    },
    created () {

    },
    mounted () {

    },
    methods: {

    }
  }
</script>

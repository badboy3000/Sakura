<template>
  <f7-list-item
    :title="item.name"
    :text="item.intro"
    link="#"
  >
    <img
      slot="media"
      :src="$resize(item.avatar, { width: 160 })"
      width="80"
    >
  </f7-list-item>
</template>

<script>
  export default {
    name: 'RoleFlowItem',
    props: {
      item: {
        required: true,
        type: Object
      },
      show: {
        required: true,
        type: String,
        validator: val => ~['trending', 'user', 'bangumi'].indexOf(val)
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

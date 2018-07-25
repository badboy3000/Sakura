<template>
  <f7-toolbar
    tabbar
    scrollable
    no-hairline
    no-shadow
  >
    <f7-link
      v-for="(item, index) in list"
      :key="index"
      :tab-link="`#${item.value}`"
      :tab-link-active="index === active"
      v-text="item.label"
    />
  </f7-toolbar>
</template>

<script>
  export default {
    name: 'MenuBar',
    props: {
      list: {
        required: true,
        type: Array
      },
      active: {
        type: Number,
        default: 0
      }
    }
  }
</script>

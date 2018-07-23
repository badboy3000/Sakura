<style lang="scss">
  .custom-menu-bar {
    position: relative;
    padding-bottom: 1px;
    @include border-bottom();

    .tabbar {
      background-color: #fff !important;
    }

    a {
      color: $color-text-normal !important;
    }

    .tab-link-highlight {
      background-color: $color-text-normal !important;
    }
  }
</style>

<template>
  <div class="custom-menu-bar">
    <f7-toolbar
      tabbar
      scrollable
      no-shadow
      no-hairline
    >
      <f7-link
        v-for="(item, index) in list"
        :key="index"
        :tab-link="`#${item.value}`"
        :tab-link-active="index === active"
        v-text="item.label"
      />
    </f7-toolbar>
  </div>
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

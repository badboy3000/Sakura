<style lang="scss">
  .md-edge .custom-scroll-nav {
    background-color: #fff !important;

    .tab-link {
      color: $color-text-normal !important;
      transition-duration: 0s !important;
    }

    .tab-link-active {
      color: $theme-color !important;
    }

    .tab-link-highlight {
      background-color: $theme-color !important;
    }
  }
</style>

<template>
  <f7-toolbar
    :class="{ 'custom-scroll-nav': !isZero }"
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
    },
    data () {
      return {
        isZero: false
      }
    },
    created () {
      this.$channel.$on('scroll-banner-zero', this.traceOn)
    },
    beforeDestroy () {
      this.$channel.$off('scroll-banner-zero', this.traceOn)
    },
    methods: {
      traceOn (isZero) {
        this.isZero = isZero
      }
    }
  }
</script>

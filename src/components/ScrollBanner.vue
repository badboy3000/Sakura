<style lang="scss">
  .scroll-banner {
    position: relative;
    width: 100%;
    overflow: hidden;
    z-index: 0;
    transition: height .2s linear;
  }
</style>

<template>
  <div
    :style="containerHeight"
    class="scroll-banner"
  >
    <slot/>
  </div>
</template>

<script>
  export default {
    name: 'ScrollBanner',
    props: {
      height: {
        required: true,
        type: [Number, String]
      }
    },
    data () {
      return {
        size: this.height,
        lastValue: 0
      }
    },
    computed: {
      containerHeight () {
        return {
          height: `${this.size}px`
        }
      }
    },
    created () {
      this.$channel.$on('flow-list-scroll', this.traceOn)
    },
    beforeDestroy () {
      this.$channel.$off('flow-list-scroll', this.traceOn)
    },
    methods: {
      traceOn ({ value, isUp }) {
        if (this.lastValue > value && !isUp) {
          return
        }
        if (this.lastValue < value && isUp) {
          return
        }
        this.lastValue = value
        this.size = +this.height - value
        this.$channel.$emit('scroll-banner-zero', this.size === 0)
      }
    }
  }
</script>

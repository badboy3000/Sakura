<style lang="scss">
  .scroll-banner {
    position: relative;
    width: 100%;
    overflow: hidden;
    z-index: 0;
    transition: height .2s linear;

    .fade-container {
      width: 100%;
      height: 100%;
      transition: opacity .2s linear;
    }

    .background {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      background-color: #ddd;
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;

      &:after {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: #000;
        opacity: .2;
      }
    }
  }
</style>

<template>
  <div
    :style="containerHeight"
    class="scroll-banner"
  >
    <div
      :style="{ backgroundImage: `url(${$resize(background, { width: $width, height: height * 2 })})` }"
      class="background"
    />
    <div
      :style="{ opacity }"
      class="fade-container"
    >
      <slot/>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ScrollBanner',
    props: {
      height: {
        required: true,
        type: [Number, String]
      },
      background: {
        required: true,
        type: String
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
      },
      opacity () {
        return this.size / this.height
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

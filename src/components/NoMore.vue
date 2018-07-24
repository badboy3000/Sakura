<style lang="scss">
  .no-more {
    height: 50px;

    .no-more-txt {
      margin: 0;
      text-align: center;
      font-size: 12px;
      line-height: 50px;
      color: $color-text-normal;
    }
  }

  .no-more-loading {
    height: 50px;
    line-height: 50px;
    text-align: center;
  }

  .no-more-shim {
    height: 50px;
  }
</style>

<template>
  <div
    v-if="noMore"
    class="no-more"
  >
    <slot v-if="length === 0">
      <p class="no-more-txt">
        还什么都没有
      </p>
    </slot>
    <p
      v-else
      class="no-more-txt"
    >
      没有更多了，休息一下吧
    </p>
  </div>
  <div
    v-else-if="loading"
    class="no-more-loading"
  >
    <f7-preloader/>
  </div>
  <div
    v-else
    class="no-more-shim"
  />
</template>

<script>
  export default {
    name: 'NoMore',
    props: {
      loading: {
        required: true,
        type: Boolean
      },
      length: {
        required: true,
        type: Number
      },
      noMore: {
        required: true,
        type: Boolean
      }
    }
  }
</script>

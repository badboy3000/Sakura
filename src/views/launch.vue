<style lang="scss">

</style>

<template>
  <f7-page>
    <f7-block-title>calibur.tv</f7-block-title>
    <f7-block inner>
      <p>天下漫友是一家</p>
    </f7-block>
  </f7-page>
</template>

<script>
  import BaseApi from 'api/_baseApi.js'

  export default {
    computed: {
      isGuest () {
        return !this.$store.state.user
      }
    },
    created () {
      this.$channel.$on('request-module-init-success', this.initialize)
      this.$channel.$on('request-module-init-failed', this.appInitFailed)
      BaseApi.init();
    },
    methods: {
      async initialize () {
        await this.$store.dispatch('login');
        setTimeout(() => {
          if (this.isGuest) {
            this.$f7router.navigate('/sign')
          } else {
            this.$f7router.navigate('/')
          }
          this.$channel.$emit('clear-router-history', this)
          this.$channel.$off('request-module-init-success')
        }, 0)
      },
      appInitFailed () {
        this.$toast.error('应用初始化失败')
        this.$channel.$off('request-module-init-failed')
      }
    }
  }
</script>

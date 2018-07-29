<style lang="scss">
  #launch {
    background-position: center;
    background-repeat: no-repeat;
    background-image: url(~images/splash.png);
    background-size: cover;
  }
</style>

<template>
  <f7-page id="launch"/>
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
          navigator.splashscreen.hide()
        }, 0)
      },
      appInitFailed () {
        this.$toast.error('应用初始化失败')
        this.$channel.$off('request-module-init-failed')
      }
    }
  }
</script>

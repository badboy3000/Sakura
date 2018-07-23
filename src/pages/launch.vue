<style lang="scss">

</style>

<template>
  <f7-page>
    launch screen
  </f7-page>
</template>

<script>
  export default {
    components: {

    },
    props: {

    },
    data () {
      return {

      }
    },
    computed: {
      isGuest () {
        return !this.$store.state.user
      }
    },
    created () {
      this.$channel.$on('init-D', this.redirect)
    },
    beforeDestroy () {
      this.$channel.$off('init-D', this.redirect)
    },
    methods: {
      redirect () {
        setTimeout(() => {
          if (this.isGuest) {
            this.$f7router.navigate('/sign', {
              animate: false
            })
          } else {
            this.$f7router.navigate('/tabs', {
              animate: false
            })
          }
          this.$channel.$emit('clear-router-history', this)
        }, 0)
      }
    }
  }
</script>

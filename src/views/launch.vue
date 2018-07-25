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
      this.initialize()
    },
    methods: {
      async initialize () {
        await this.$store.dispatch('initialize');
        setTimeout(() => {
          if (this.isGuest) {
            this.$f7router.navigate('/sign', {
              animate: false
            })
          } else {
            this.$f7router.navigate('/', {
              animate: false
            })
          }
          this.$channel.$emit('clear-router-history', this)
        }, 0)
      }
    }
  }
</script>

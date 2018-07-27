<style lang="scss">

</style>

<template>
  <f7-page>
    <f7-block-title>Introduction</f7-block-title>
    <f7-block inner>
      <p>This is template for Framework7 v2, Vue and Phonegap.</p>
    </f7-block>
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
            this.$f7router.navigate('/sign')
          } else {
            this.$f7router.navigate('/')
          }
          this.$channel.$emit('clear-router-history', this)
        }, 0)
      }
    }
  }
</script>

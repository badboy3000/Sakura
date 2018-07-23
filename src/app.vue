<style lang="scss">
  .hiddenNavBorder .navbar:after {
    content: none;
  }

  .creatorDialogIsOpen {
    .navbar {
      z-index: 0;
    }

    .creator-btn .oy-menu-item >*:after {
      visibility: visible !important;
    }
  }
</style>

<template>
  <f7-app
    :params="f7params"
    class="color-theme-pink"
  >
    <f7-statusbar/>
    <f7-view
      :main="true"
      :class="{ hiddenNavBorder, creatorDialogIsOpen, 'ios-edge': $theme.ios }"
      url="/launch"
    />
  </f7-app>
</template>

<script>
  import routes from './routes'

  let theme = 'auto';
  if (document.location.search.indexOf('theme=') >= 0) {
    theme = document.location.search.split('theme=')[1].split('&')[0];
  }

  export default {
    data() {
      return {
        f7params: {
          theme,
          routes,
          name: 'calibur.tv',
          id: 'io.framework7.testapp',
        },
        hiddenNavBorder: true,
        creatorDialogIsOpen: false
      }
    },
    created () {
      this.getLoginUser()
    },
    mounted () {
      this.$channel.$on('tab-switch', (index) => {
        this.hiddenNavBorder = index < 2
      })
      this.$channel.$on('toggle-creator', (isOpen) => {
        this.creatorDialogIsOpen = isOpen
      })
      this.$channel.$on('clear-router-history', (ctx) => {
        setTimeout(() => {
          ctx.$f7router.clearPreviousHistory();
        }, 0)
      })
    },
    methods: {
      async getLoginUser () {
        await this.$store.dispatch('initialize');
        this.$channel.$emit('init-D')
      }
    }
  }
</script>

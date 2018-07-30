<template>
  <f7-app
    ref="app"
    :params="f7params"
    class="color-theme-pink"
  >
    <f7-statusbar/>
    <f7-view
      :main="true"
      :class="{ 'ios-edge': $theme.ios, 'md-edge': $theme.md }"
      url="/"
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
        }
      }
    },
    mounted () {
      this.$channel.$on('clear-router-history', (ctx) => {
        setTimeout(() => {
          ctx.$f7router.clearPreviousHistory();
        }, 0)
      })
    }
  }
</script>

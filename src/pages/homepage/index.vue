<style lang="scss">
  .nav-avatar {
    @include avatar(32px)
  }

  #calibur {
    .tab,
    .page-current,
    .page-content >.tabs {
      height: 100%;
    }

    .page-content >.tabs {
      position: relative;
      z-index: 1;
    }

    .tab-layout-content-container > .page-content {
      padding-top: 0 !important;
      padding-bottom: $tab-height !important;

      &.ptr-content {
        padding-bottom: 0 !important;
      }
    }

    .the-world-container {
      padding-bottom: $tab-height;
    }
  }

  .ios-edge #calibur {
    .hide-toolbar-on-scroll {
      padding-top: 44px !important;
      padding-bottom: 0 !important;
    }

    .toolbar {
      top: 0 !important;

      &:before {
        top: auto !important;
        bottom: 0 !important;
      }

      &.toolbar-hidden {
        transform: translate3d(0, -100%, 0) !important;

        &:before {
          bottom: -1px !important;
        }

        & + .hide-toolbar-on-scroll {
          padding-top: 0 !important;
        }
      }
    }

    .ptr-pull-up {
      padding-top: 44px !important;
      margin-top: -44px !important;
    }
  }

  .md-edge, #calibur {
    .ptr-preloader {
      top: -40px !important;
    }

    .tab-layout-content-container > .page-content.ptr-content {
      padding-bottom: $tab-height !important;
    }
  }
</style>

<template>
  <f7-page id="calibur">
    <f7-navbar
      ref="nav"
      :no-hairline="hiddenBorder"
      :no-shadow="hiddenBorder"
    >
      <f7-nav-left>
        <div class="nav-avatar">
          <img :src="$resize(avatar, { width: 100 })">
        </div>
      </f7-nav-left>
      <div class="title">calibur.tv</div>
      <f7-nav-right>
        <f7-link
          icon="fa fa-search"
          @click="openSearchDialog = true"
        />
      </f7-nav-right>
    </f7-navbar>
    <search-dialog v-model="openSearchDialog"/>
    <f7-tabs>
      <f7-tab
        id="tab-world"
        tab-active
      >
        <the-world/>
      </f7-tab>
      <f7-tab
        id="tab-bangumi"
      >
        <bangumi-area/>
      </f7-tab>
      <f7-tab
        id="tab-user"
      >
        <my-home/>
      </f7-tab>
      <f7-tab
        id="tab-about"
      >
        <about-page/>
      </f7-tab>
    </f7-tabs>
    <tab-bar/>
  </f7-page>
</template>

<script>
  import TabBar from 'components/Tabbar.vue'
  import SearchDialog from 'components/Search.vue'
  import TheWorld from './world.vue'
  import BangumiArea from './bangumi.vue'
  import AboutPage from './about.vue'
  import MyHome from './user.vue'

  export default {
    components: {
      TabBar,
      SearchDialog,
      TheWorld,
      BangumiArea,
      AboutPage,
      MyHome
    },
    data () {
      return {
        hiddenBorder: true,
        openSearchDialog: false
      }
    },
    computed: {
      avatar () {
        return this.$store.state.user
          ? this.$store.state.user.avatar
          : ''
      }
    },
    mounted () {
      this.$channel.$on('tab-switch', (index) => {
        this.hiddenBorder = index < 2
      })
    }
  }
</script>

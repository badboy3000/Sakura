<style lang="scss">
  .nav-avatar {
    @include avatar(32px)
  }

  #calibur {
    .tab,
    .page-current,
    .page-content > .tabs {
      height: 100%;
    }

    .homepage-container {
      height: 100%;

      .tabs-animated-wrap {
        padding-bottom: $tab-height;

        .tab {
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
        }
      }
    }
  }

  .ios #calibur {
    .homepage-container {
      margin-top: -$ios-tab-height;
      padding-top: $ios-tab-height;
    }
  }

  .md #calibur {
    .homepage-container {
      margin-top: -$md-tab-height;
      padding-top: $md-tab-height;
    }
  }
</style>

<template>
  <f7-page id="calibur">
    <f7-navbar
      no-hairline
      no-shadow
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
        id="tab-notification"
      >
        <notification/>
      </f7-tab>
      <f7-tab
        id="tab-user"
      >
        <my-home/>
      </f7-tab>
    </f7-tabs>
    <tab-bar/>
  </f7-page>
</template>

<script>
  import TabBar from 'components/Tabbar'
  import SearchDialog from 'components/Search'
  import TheWorld from './world'
  import BangumiArea from './bangumi'
  import Notification from './notification'
  import CartoonRoleTrending from './role'
  import MyHome from './user'

  export default {
    components: {
      TabBar,
      SearchDialog,
      TheWorld,
      BangumiArea,
      Notification,
      MyHome
    },
    data () {
      return {
        openSearchDialog: false
      }
    },
    computed: {
      avatar () {
        return this.$store.state.user
          ? this.$store.state.user.avatar
          : ''
      }
    }
  }
</script>

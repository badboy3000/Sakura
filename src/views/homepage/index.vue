<style lang="scss">
  .nav-avatar {
    @include avatar(22px)
  }

  #calibur.showNavBorder {
    &>.navbar:after {
      opacity: 0;
    }
  }

  .ios-edge #calibur {
    #tab-world, #tab-bangumi {
      .toolbar {
        @include border-bottom();
      }
    }
  }

  .md-edge #calibur {
    #tab-world, #tab-bangumi {
      & .tab .page-content {
        padding-top: 114px;
        padding-bottom: $tab-height;
      }
    }

    #tab-notification, #tab-user {
      .page-content {
        padding-bottom: $tab-height;
      }
    }
  }
</style>

<template>
  <f7-page
    id="calibur"
    :class="{ showNavBorder }"
  >
    <f7-navbar no-hairline>
      <f7-nav-left>
        <f7-link icon="fa fa-bars"/>
        <div class="nav-avatar">
          <img :src="$resize(avatar, { width: 50 })">
        </div>
      </f7-nav-left>
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
        <f7-toolbar
          tabbar
          no-hairline
        >
          <f7-link
            tab-link="#world-post"
            tab-link-active
          >帖子</f7-link>
          <f7-link
            tab-link="#world-image"
          >图片</f7-link>
          <f7-link
            tab-link="#world-review"
          >漫评</f7-link>
        </f7-toolbar>
        <the-world class="sub-tab-page"/>
      </f7-tab>
      <f7-tab id="tab-bangumi">
        <f7-toolbar
          tabbar
          no-hairline
        >
          <f7-link
            tab-link="#bangumi-release"
            tab-link-active
          >新番时间表</f7-link>
          <f7-link
            tab-link="#bangumi-timeline"
          >时间轴</f7-link>
          <f7-link
            tab-link="#bangumi-category"
          >番剧索引</f7-link>
          <f7-link
            tab-link="#cartoon-role-trending"
          >偶像排行榜</f7-link>
        </f7-toolbar>
        <bangumi-area class="sub-tab-page"/>
      </f7-tab>
      <f7-tab id="tab-notification">
        <notification/>
      </f7-tab>
      <f7-tab id="tab-user">
        <my-home/>
      </f7-tab>
    </f7-tabs>
    <tab-bar @tab-switch="handleTabSwitch"/>
  </f7-page>
</template>

<script>
  import TabBar from 'components/Tabbar'
  import SearchDialog from 'components/Search'
  import TheWorld from './world'
  import BangumiArea from './bangumi'
  import Notification from './notification'
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
        openSearchDialog: false,
        showNavBorder: true
      }
    },
    computed: {
      avatar () {
        return this.$store.state.user
          ? this.$store.state.user.avatar
          : ''
      }
    },
    methods: {
      handleTabSwitch (index) {
        this.showNavBorder = index < 2
      }
    }
  }
</script>

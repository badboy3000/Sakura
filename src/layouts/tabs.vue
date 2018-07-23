<style lang="scss">
  .nav-avatar {
    @include avatar(32px)
  }

  .tabs-layout {
  }
</style>

<template>
  <f7-page class="tabs-layout">
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
  import TheWorld from 'pages/world/_container.vue'
  import BangumiArea from 'pages/bangumi/_container.vue'
  import MyHome from 'pages/user/self.vue'
  import AboutPage from 'pages/about/us.vue'

  export default {
    components: {
      TabBar,
      SearchDialog,
      TheWorld,
      BangumiArea,
      MyHome,
      AboutPage
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

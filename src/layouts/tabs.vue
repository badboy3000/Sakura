<template>
  <f7-page class="tabs-layout">
    <f7-navbar
      ref="nav"
      :no-hairline="hiddenBorder"
      :no-shadow="hiddenBorder"
    >
      <f7-nav-left>
        <f7-link
          icon="fa fa-bars"
        />
      </f7-nav-left>
      <div class="title">calibur.tv</div>
      <f7-nav-right>
        <f7-link
          icon="fa fa-search"
          @click="openSearchDialog = true"
        />
      </f7-nav-right>
    </f7-navbar>
    <v-search v-model="openSearchDialog"/>
    <f7-tabs>
      <f7-tab
        id="tab-world"
        tab-active
      >
        <f7-view url="/tabs/world"/>
      </f7-tab>
      <f7-tab
        id="tab-bangumi"
      >
        <f7-view url="/tabs/bangumi"/>
      </f7-tab>
      <f7-tab
        id="tab-user"
      >
        <f7-view url="/tabs/user"/>
      </f7-tab>
      <f7-tab
        id="tab-about"
      >
        <f7-view url="/tabs/about"/>
      </f7-tab>
    </f7-tabs>
    <tab-bar/>
  </f7-page>
</template>

<script>
  import TabBar from 'components/tabbar.vue'
  import VSearch from 'components/search.vue'

  export default {
    components: {
      TabBar,
      VSearch
    },
    data () {
      return {
        hiddenBorder: true,
        openSearchDialog: false
      }
    },
    mounted () {
      this.$channel.$on('tab-switch', (index) => {
        this.hiddenBorder = index < 2
      })
    }
  }
</script>

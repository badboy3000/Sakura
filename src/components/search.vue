<style lang="scss">
  .searchbar-backdrop {
    background-color: #fff !important;
  }

  .md .searchbar {
    border-radius: 24px;
    overflow: hidden;

    input {
      padding-left: 40px !important;
      padding-right: 40px !important;
    }
  }

  .ios .searchbar-input-wrap {
    border-radius: 16px;
    overflow: hidden;
  }
</style>

<template>
  <f7-popup
    :opened="popupOpened"
    @popup:closed="popupOpened = false"
  >
    <f7-page>
      <f7-navbar>
        <f7-nav-left>&nbsp;</f7-nav-left>
        <div style="width: 100%">
          <f7-searchbar
            search-container=".components-list"
            placeholder="搜索二次元的一切"
            disable-button-text=""
            search-in="a"
          />
        </div>
        <f7-nav-right>
          <f7-link @click="popupOpened = false">取消</f7-link>
        </f7-nav-right>
      </f7-navbar>
      <f7-block-title>Introduction</f7-block-title>
      <f7-block inner>
        <p>This is template for Framework7 v2, Vue and Phonegap.</p>
      </f7-block>
      <f7-block-title class="searchbar-found">Links</f7-block-title>
      <f7-list class="components-list searchbar-found">
        <f7-list-item
          link="/about/"
          title="About"
          panel-close
        >
          <f7-icon
            slot="media"
            icon="fa fa-info fa-fw"
          />
        </f7-list-item>
        <f7-list-item
          link="/form/"
          title="Form"
          panel-close
        >
          <f7-icon
            slot="media"
            icon="fa fa-vcard-o fa-fw"
          />
        </f7-list-item>
        <f7-list-item
          link="/dynamic-route/blog/11/post/23/"
          title="Dynamic Route"
          panel-close
        >
          <f7-icon
            slot="media"
            icon="fa fa-rss fa-fw"
          />
        </f7-list-item>
        <f7-list-item
          link="/chat/"
          title="Chat"
          panel-close
        >
          <f7-icon
            slot="media"
            icon="fa fa-user fa-fw"
          />
        </f7-list-item>
        <f7-list-item
          link="/vuex/"
          title="Vuex"
          panel-close
        >
          <f7-icon
            slot="media"
            icon="fa fa-battery fa-fw"
          />
        </f7-list-item>
      </f7-list>
      <f7-list class="searchbar-not-found">
        <f7-list-item title="Nothing found"/>
      </f7-list>
      <f7-block-title class="searchbar-hide-on-search">Themes</f7-block-title>
      <f7-list class="searchbar-hide-on-search">
        <f7-list-item
          title="iOS Theme"
          external
          link="./index.html?theme=ios"
        />
        <f7-list-item
          title="Material (MD) Theme"
          external
          link="./index.html?theme=md"
        />
        <f7-list-item
          title="Color Themes"
          link="/color-themes/"
        />
      </f7-list>
    </f7-page>
  </f7-popup>
</template>

<script>
  export default {
    props: {
      value: {
        required: true,
        type: Boolean
      }
    },
    data () {
      return {
        popupOpened: this.value
      }
    },
    watch: {
      value (val) {
        this.popupOpened = val
      },
      popupOpened (val) {
        this.$emit('input', val)
      }
    },
    created () {

    },
    mounted () {

    },
    methods: {

    }
  }
</script>

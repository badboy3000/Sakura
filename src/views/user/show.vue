<style lang="scss">
  #user-show {
    .banner {
      .avatar {
        position: absolute;
        left: 50%;
        top: 50%;
        margin-left: -30px;
        margin-top: -50px;
        @include avatar(60px)
      }
    }
  }
</style>

<template>
  <f7-page id="user-show">
    <f7-navbar sliding>
      <f7-nav-left
        back-link
      />
      <page-actions
        :id="zone"
        type="user"
      />
    </f7-navbar>
    <template v-if="user">
      <scroll-banner
        :height="400"
        :background="user.banner"
        class="banner"
      >
        <div class="avatar">
          <img :src="$resize(user.avatar, { width: 120 })">
        </div>
      </scroll-banner>
      <!--
      <menu-bar
        :list="menu"
        :active="0"
      />
      -->
      <f7-block>
        施工中...
      </f7-block>
    </template>
    <f7-block
      v-else
      class="text-align-center"
    >
      <f7-preloader/>
    </f7-block>
  </f7-page>
</template>

<script>
  import { getUserInfo } from 'api/userApi'
  import ScrollBanner from 'components/ScrollBanner'
  import MenuBar from 'components/MenuBar'

  export default {
    name: 'UserShow',
    components: {
      ScrollBanner,
      MenuBar
    },
    data () {
      return {
        user: null,
        menu: [
          {
            value: 'user-show-active',
            label: '动态'
          },
          {
            value: 'user-show-bangumi',
            label: '番剧'
          },
          {
            value: 'user-show-post',
            label: '帖子'
          },
          {
            value: 'user-show-image',
            label: '相册'
          },
          {
            value: 'user-show-score',
            label: '漫评'
          },
          {
            value: 'user-show-role',
            label: '偶像'
          }
        ]
      }
    },
    computed: {
      zone () {
        return this.$f7route.params.zone
      }
    },
    watch: {

    },
    created () {
      this.getData();
    },
    mounted () {

    },
    methods: {
      async getData () {
        try {
          this.user = await getUserInfo({
            zone: this.zone
          })
        } catch (e) {
          this.$toast.error(e)
        }
      }
    }
  }
</script>

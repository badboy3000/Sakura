<style lang="scss">
  #home {
    .colorful {
      .col {
        text-align: center;
      }

      .menu-item {
        flex-direction: column;

        span {
          margin-left: 0;
          font-size: 11px;
          margin-top: 5px;
        }
      }
    }
  }
</style>

<template>
  <f7-page
    v-if="user"
    id="home"
    :page-content="true"
  >
    <f7-block class="colorful">
      <f7-row>
        <f7-col>
          <f7-link
            :href="$alias.user(user.zone)"
            color="gray"
            class="menu-item"
          >
            <f7-icon
              f7="home_fill"
              size="35"
              color="pink"
            />
            <span>我的主页</span>
          </f7-link>
        </f7-col>
        <f7-col>
          <f7-link
            href="/my/draft"
            color="gray"
            class="menu-item"
          >
            <f7-icon
              f7="compose_fill"
              size="35"
              color="green"
            />
            <span>我的草稿</span>
          </f7-link>
        </f7-col>
        <f7-col/>
        <f7-col/>
      </f7-row>
    </f7-block>
    <f7-block-title>每日签到</f7-block-title>
    <f7-list>
      <f7-list-item :title="`${user.coin}`">
        <f7-icon
          slot="media"
          f7="money_dollar_fill"
          color="yellow"
          size="29"
        />
        <day-sign-btn slot="after"/>
      </f7-list-item>
      <f7-block-footer>
        <p>每日签到赚金币，1 金币 = 1 人民币，满 100 金币可提现 (。・∀・)ノ</p>
      </f7-block-footer>
    </f7-list>
    <user-setting-form/>
  </f7-page>
</template>

<script>
  import DaySignBtn from 'components/button/DaySignBtn'
  import UserSettingForm from 'components/form/UserSettingForm'

  export default {
    components: {
      DaySignBtn,
      UserSettingForm
    },
    computed: {
      user () {
        return this.$store.state.user
      }
    }
  }
</script>

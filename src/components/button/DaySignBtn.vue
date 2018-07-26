<template>
  <f7-button
    :fill="!user.daySign"
    color="yellow"
    round
    @click="daySignAction"
  >
    <f7-preloader
      v-if="signing"
      :size="20"
      color="white"
    />
    {{ user.daySign ? '今日已签到' : '签到' }}
  </f7-button>
</template>

<script>
  import { daySign } from 'api/userApi'

  export default {
    data () {
      return {
        signing: false
      }
    },
    computed: {
      user () {
        return this.$store.state.user
      }
    },
    methods: {
      async daySignAction () {
        if (this.signing || this.user.daySign) {
          return
        }
        this.signing = true
        try {
          await daySign();
          this.$store.commit('UPDATE_USER_INFO', {
            key: 'coin',
            value: this.user.coin + 1
          });
          this.$store.commit('UPDATE_USER_INFO', {
            key: 'daySign',
            value: true
          });
          this.$toast.success('签到成功')
        } catch (e) {
          this.$toast.error(e)
        } finally {
          this.signing = false
        }
      }
    }
  }
</script>

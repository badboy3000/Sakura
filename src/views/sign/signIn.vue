<template>
  <f7-page
    id="sign-in"
    class="sign-container"
  >
    <div class="form-container">
      <f7-list
        inline-labels
        no-hairlines-md
      >
        <f7-list-item>
          <f7-icon
            slot="media"
            f7="phone"
          />
          <f7-input
            type="tel"
            placeholder="我的手机号"
            @input="access = $event.target.value"
          />
        </f7-list-item>
        <f7-list-item>
          <f7-icon
            slot="media"
            f7="lock"
          />
          <f7-input
            type="password"
            placeholder="我的密码"
            @input="secret = $event.target.value"
          />
        </f7-list-item>
      </f7-list>
      <f7-button
        raised
        fill
        round
        class="submit-btn"
        @click="submit"
      >
        登录
      </f7-button>
      <f7-block>
        <f7-link
          class="sign-left-btn"
          href="/sign/forgot"
        >
          忘记密码？
        </f7-link>
        <f7-link
          class="sign-right-btn"
          href="/sign/up"
        >
          注册
        </f7-link>
      </f7-block>
    </div>
  </f7-page>
</template>

<script>
  import { login } from 'api/userApi'
  import BaseApi from 'api/_baseApi.js'

  export default {
    data () {
      return {
        access: '',
        secret: '',
        loading: false
      }
    },
    methods: {
      async submit () {
        const access = this.access
        const secret = this.secret
        if (!access || access.length !== 11) {
          this.$toast.info('请填写 11 位手机号');
          return
        }
        if (!secret || secret.length < 6 || secret.length > 16) {
          this.$toast.info('密码错误');
          return
        }
        if (this.loading) {
          return
        }
        this.loading = true
        this.$f7.preloader.show();
        try {
          const token = await login({
            access,
            secret,
            remember: true
          });
          this.$cache.set('JWT-TOKEN', token)
          BaseApi.setToken(token);
          await this.$store.dispatch('login');
          this.$f7router.navigate('/', {
            animate: false
          })
          this.$channel.$emit('clear-router-history', this)
        } catch (e) {
          this.$toast.error(e)
        } finally {
          this.loading = false
          this.$f7.preloader.hide();
        }
      }
    }
  }
</script>

<style lang="scss">
  #sign-in {
    background-color: $theme-color;

    .form-container {
      width: 280px;
      margin: 0 auto;

      .list {
        background-color: #fff;
        border-radius: 7px;
        overflow: hidden;
      }

      .submit-btn {
        background-color: $color-yellow;
        height: 44px;
        line-height: 44px;
        border-radius: 22px;
        box-shadow: none;
        letter-spacing: 3px;
        font-weight: bold;
      }
    }
  }
</style>

<template>
  <f7-page id="sign-in">
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
            clear-button
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
            clear-button
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
      >登录</f7-button>
    </div>
  </f7-page>
</template>

<script>
  import { login } from 'api/userApi'

  export default {
    data () {
      return {
        access: '',
        secret: '',
        loading: false
      }
    },
    methods: {
      submit () {
        const access = this.access
        const secret = this.secret
        if (!access || access.length !== 11) {
          this.$toast.info('请填写 11 位手机号');
          return
        }
        if (!secret || secret.length < 6 || secret.length > 16 || !/^[a-z0-9]+$/i.test(secret)) {
          this.$toast.info('密码错误');
          return
        }
        if (this.loading) {
          return
        }
        this.loading = true
        this.$captcha({
          success: ({ data }) => {
            login({
              access,
              secret,
              remember: true,
              geetest: data
            }).then(async (token) => {
              this.$cache.set('JWT-TOKEN', token)
              await this.$store.dispatch('initialize')
              this.$f7router.navigate('/tabs', {
                animate: false
              })
              this.$channel.$emit('clear-router-history', this)
            }).catch((err) => {
              this.$toast.error(err)
              this.loading = false
            })
          },
          close: () => {
            this.loading = false
          },
          error: (err) => {
            this.loading = false
            this.$toast.error(err)
          }
        })
      }
    }
  }
</script>

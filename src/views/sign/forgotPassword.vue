<style lang="scss">

</style>

<template>
  <f7-page
    id="sign-forgot"
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
            placeholder="我的新密码"
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
        <f7-preloader
          v-if="submitBtnLoading"
          :size="20"
          color="white"
        />
        {{ submitBtnText }}
        <template v-if="timeout">
          （{{ timeout }}s 后可重新获取）
        </template>
      </f7-button>
      <f7-block class="text-align-center">
        <f7-link
          class="sign-center-btn"
          back
        >
          登录
        </f7-link>
      </f7-block>
    </div>
  </f7-page>
</template>

<script>
  import { sendMessage, resetPassword } from 'api/userApi'

  export default {
    data () {
      return {
        access: '',
        secret: '',
        authCode: '',
        // state
        step: 0,
        timeout: 0
      }
    },
    computed: {
      submitBtnText () {
        if (this.step === 0) {
          return '重置密码'
        } else if (this.step === 1) {
          return '提交中...'
        } else if (this.step === 2) {
          return '短信已发送'
        } else if (this.step === 3) {
          return '已重置'
        }
      },
      submitBtnLoading () {
        return this.step === 1 || this.step === 3
      },
      submitBtnDisabled () {
        return (
            this.timeout !== 0 && this.step === 0
          ) || this.step === 3
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
        if (!secret) {
          this.$toast.info('请填写新密码');
          return
        }
        if (secret.length > 16) {
          this.$toast.info('密码最多 16 位');
          return
        }
        if (secret.length < 6) {
          this.$toast.info('密码至少 6 位');
          return
        }
        if (this.step === 0) {
          this.getResetAuthCode()
        }
        if (this.step === 2) {
          this.openConfirmModal()
        }
      },
      getResetAuthCode () {
        this.step = 1
        this.$captcha({
          success: async ({ data }) => {
            try {
              await sendMessage({
                type: 'forgot_password',
                phone_number: this.access,
                geetest: data
              })
              this.step = 2
              this.openConfirmModal()
            } catch (err) {
              this.$toast.error(err)
              this.step = 0
            } finally {
              this.timeout = 60
              const timer = setInterval(() => {
                if (!--this.timeout) {
                  this.step = 0
                  clearInterval(timer)
                }
              }, 1000)
            }
          },
          close: () => {
            this.step = 0
          },
          error: (err) => {
            this.step = 0
            this.$toast.error(err)
          }
        })
      },
      openConfirmModal () {
        this.$f7.dialog.prompt('请输入收到的验证码', '短信已发送', (value) => {
          this.authCode = value
          this.step = 3
          this.signReset()
        }, () => {})
      },
      async signReset () {
        try {
          const res = await resetPassword({
            access: this.access,
            authCode: this.authCode,
            secret: this.secret
          })
          this.$toast.success(res)
          this.$f7router.navigate('/sign')
          this.$channel.$emit('clear-router-history', this)
        } catch (err) {
          this.$toast.error(err)
        } finally {
          this.step = 0
        }
      }
    }
  }
</script>

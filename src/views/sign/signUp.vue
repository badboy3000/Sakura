<style lang="scss">

</style>

<template>
  <f7-page
    id="sign-up"
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
            f7="compose"
          />
          <f7-input
            type="text"
            placeholder="你的名字"
            @input="nickname = $event.target.value"
          />
        </f7-list-item>
        <f7-list-item>
          <f7-icon
            slot="media"
            f7="phone"
          />
          <f7-input
            type="tel"
            placeholder="手机号"
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
            placeholder="密码"
            @input="secret = $event.target.value"
          />
        </f7-list-item>
      </f7-list>
      <f7-list v-if="showInvite">
        <f7-list-item>
          <f7-icon
            slot="media"
            f7="money_dollar"
          />
          <f7-input
            type="number"
            placeholder="邀请码"
            @input="inviteCode = $event.target.value"
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
      <f7-block>
        <f7-link
          class="sign-left-btn"
          back
        >
          登录
        </f7-link>
        <f7-link
          class="sign-right-btn"
          @click="showInvite = !showInvite"
        >
          {{ showInvite ? '没有邀请人' : '我有邀请人' }}
        </f7-link>
      </f7-block>
    </div>
  </f7-page>
</template>

<script>
  import { sendMessage, register } from 'api/userApi'

  export default {
    data () {
      return {
        nickname: '',
        access: '',
        secret: '',
        authCode: '',
        inviteCode: '',
        // state
        showInvite: false,
        step: 0,
        timeout: 0
      }
    },
    computed: {
      submitBtnText () {
        if (this.step === 0) {
          return '注册'
        } else if (this.step === 1) {
          return '提交中...'
        } else if (this.step === 2) {
          return '短信已发送'
        } else if (this.step === 3) {
          return '注册中...'
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
        if (this.submitBtnDisabled) {
          return
        }
        const access = this.access
        const secret = this.secret
        const nickname = this.nickname
        if (!access || access.length !== 11) {
          this.$toast.info('请填写 11 位手机号');
          return
        }
        if (!(/^(0|86|17951)?(1)[0-9]{10}$/.test(access))) {
          this.$toast.info('错误的手机号格式')
          return
        }
        if (!secret) {
          this.$toast.info('请填写正确的密码');
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
        if (nickname === '') {
          this.$toast.info('请先给自己起个名字')
        }
        if (!(/^([\u4e00-\u9fa5]|[a-z0-9])+$/i.test(nickname))) {
          this.$toast.info('昵称只能包含：中文、数字、字母')
          return
        }
        const nameLength = nickname.replace(/([\u4e00-\u9fa5])/g, 'aa').trim().length
        if (nameLength < 2) {
          this.$toast.info('昵称至少是2个字符')
          return
        }
        if (nameLength > 14) {
          this.$toast.info('昵称不能超过14个字符，1个汉字占2个字符')
          return
        }
        if (this.step === 0) {
          this.getRegisterAuthCode()
        }
        if (this.step === 2) {
          this.openConfirmModal()
        }
      },
      getRegisterAuthCode () {
        this.step = 1
        this.$captcha({
          success: async ({ data }) => {
            try {
              await sendMessage({
                type: 'sign_up',
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
          this.signUp()
        }, () => {})
      },
      signUp () {
        register({
          access: this.access,
          secret: this.secret,
          nickname: this.nickname,
          authCode: this.authCode,
          inviteCode: this.inviteCode
        }).then(async (token) => {
          this.$toast.success('注册成功！')
          this.$cache.set('JWT-TOKEN', token)
          await this.$store.dispatch('initialize')
          this.$f7router.navigate('/', {
            animate: false
          })
          this.$channel.$emit('clear-router-history', this)
        }).catch((err) => {
          this.step = 0
          this.$toast.error(err)
        })
      },
    }
  }
</script>

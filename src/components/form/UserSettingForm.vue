<style lang="scss">
  .user-setting-form {
    .profile-list {
      margin-bottom: 0;

      & + .list {
        margin-top: 0;

        .item-title {
          font-weight: normal;
        }

        & ul:before {
          content: none;
        }
      }
    }

    .submit-wrap {
      margin-top: 10px;
      margin-bottom: 30px;
      margin-left: 15px;
      margin-right: 15px;
    }
  }
</style>

<template>
  <div class="user-setting-form">
    <f7-block-title>个人资料</f7-block-title>
    <f7-list class="profile-list">
      <f7-list-item
        link="#"
        title="昵称"
        @click="openNicknameDialog"
      >
        <span
          slot="after"
          v-text="user.nickname"
        />
      </f7-list-item>
      <f7-list-item
        title="生日"
        link="#"
        @click="openBirthPicker"
      >
        <span
          slot="after"
          v-text="selectedBirthLabel"
        />
      </f7-list-item>
      <f7-list-item
        :smart-select-params="{ openIn: 'popover'}"
        title="性别"
        smart-select
      >
        <select name="superhero">
          <option
            :value="0"
            selected
          >未知</option>
          <option :value="1">男</option>
          <option :value="2">女</option>
          <option :value="3">伪娘</option>
          <option :value="4">药娘</option>
          <option :value="5">扶她</option>
        </select>
      </f7-list-item>
      <f7-list-item title="生日保密">
        <f7-toggle
          slot="after"
          :checked="user.birthSecret"
          color="pink"
          @toggle:change="handleBirthSecretChange"
        />
      </f7-list-item>
      <f7-list-item title="性别保密">
        <f7-toggle
          slot="after"
          :checked="user.sexSecret"
          color="pink"
          @toggle:change="handleSexSecretChange"
        />
      </f7-list-item>
    </f7-list>
    <f7-list media-list>
      <f7-list-item
        :text="user.signature"
        link="#"
        title="个性签名"
        @click="openSignatureDialog"
      />
      <f7-block-footer>
        <p>修改完成后点击保存方可生效！</p>
      </f7-block-footer>
      <div class="submit-wrap">
        <f7-button
          fill
          round
          big
          @click="submit"
        >
          <f7-preloader
            v-if="submitting"
            :size="20"
            color="white"
          />
          确认保存
        </f7-button>
      </div>
    </f7-list>
    <f7-popup
      :opened="popupOpened"
      @popup:closed="popupOpened = false"
    >
      <f7-page>
        <f7-navbar
          :title="changeNickname ? '修改昵称' : '修改签名'"
        >
          <f7-nav-right>
            <f7-link popup-close>确认</f7-link>
          </f7-nav-right>
        </f7-navbar>
        <f7-list>
          <f7-list-item v-if="changeNickname">
            <f7-input
              :value="user.nickname"
              type="text"
              placeholder="你的名字"
              clear-button
              @input="handleUsernameInput"
            />
          </f7-list-item>
          <f7-list-item v-if="changeSignature">
            <f7-input
              :value="user.signature"
              type="textarea"
              placeholder="用简单的言语，表达深刻的心"
              @input="handleSignatureInput"
            />
          </f7-list-item>
          <f7-block
            class="text-align-center"
            style="color: red;font-size: 12px"
          >{{ errorMsg }}</f7-block>
        </f7-list>
      </f7-page>
    </f7-popup>
    <mt-datetime-picker
      ref="birthPicker"
      v-model="birthday"
      :start-date="beginTime"
      :end-date="endTime"
      type="date"
      year-format="{value}年"
      month-format="{value}月"
      date-format="{value}日"
    />
  </div>
</template>

<script>
  import { settingProfile, settingImage } from 'api/userApi'

  export default {
    data () {
      return {
        beginTime: new Date(new Date().getFullYear() - 40, 0, 1),
        endTime: new Date(new Date().getFullYear() - 10, 11, 31),
        popupOpened: false,
        changeNickname: false,
        changeSignature: false,
        errorMsg: '',
        submitting: false
      }
    },
    computed: {
      user () {
        return this.$store.state.user
      },
      birthday: {
        get () {
          return new Date(this.user.birthday)
        },
        set (value) {
          this.$store.commit('UPDATE_USER_INFO', {
            key: 'birthday',
            value
          })
        }
      },
      selectedBirthLabel () {
        if (!this.user.birthday) {
          return '未知'
        }
        const date = this.birthday
        return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`
      }
    },
    methods: {
      openNicknameDialog () {
        this.changeSignature = false
        this.changeNickname = true
        this.popupOpened = true
      },
      openSignatureDialog () {
        this.changeNickname = false
        this.changeSignature = true
        this.popupOpened = true
      },
      openBirthPicker () {
        this.$refs.birthPicker.open()
      },
      handleUsernameInput ($event) {
        const value = $event.target.value;
        const length = value.replace(/([\u4e00-\u9fa5])/g, 'aa').trim().length
        if (!length) {
          this.errorMsg = '昵称不能为空'
          return
        } else if (length < 2) {
          this.errorMsg = '昵称至少为2个字符'
          return
        } else if (length > 14) {
          this.errorMsg = '昵称不能超过14个字符'
          return
        }
        this.errorMsg = ''
        this.$store.commit('UPDATE_USER_INFO', {
          key: 'nickname',
          value
        })
      },
      handleSignatureInput ($event) {
        const value = $event.target.value;
        if (value.length > 150) {
          this.errorMsg = '签名最多 150 字'
          return
        }
        this.errorMsg = ''
        this.$store.commit('UPDATE_USER_INFO', {
          key: 'signature',
          value
        })
      },
      handleBirthSecretChange (value) {
        this.$store.commit('UPDATE_USER_INFO', {
          key: 'birthSecret',
          value
        })
      },
      handleSexSecretChange (value) {
        this.$store.commit('UPDATE_USER_INFO', {
          key: 'sexSecret',
          value
        })
      },
      async submit () {
        if (this.submitting) {
          return
        }
        this.submitting = true
        const birth = this.birthday
        try {
          await settingProfile({
            nickname: this.user.nickname,
            signature: this.user.signature,
            birthday: `${birth.getFullYear()}-${birth.getMonth() + 1}-${birth.getDate()}`,
            birth_secret: this.user.birthSecret,
            sex_secret: this.user.sexSecret,
            sex: this.user.sex
          })
          this.$toast.success('修改成功')
        } catch (e) {
          this.$toast.error(e)
        } finally {
          this.submitting = false
        }
      }
    }
  }
</script>

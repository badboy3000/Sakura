<style lang="scss">
  .create-comment-bar {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 1;

    .create-comment-mask {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      pointer-events: all;
    }

    .messagebar {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      pointer-events: all;
    }

    .messagebar-area + a {
      display: none;
    }

    .submit-btn {
      flex-shrink: 0;
    }

    .other {
      flex-shrink: 0;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
    }
  }
</style>

<template>
  <div class="create-comment-bar">
    <div
      v-if="focused"
      class="create-comment-mask"
      @click="handleMaskClick"
    />
    <f7-messagebar
      ref="chat"
      :attachments-visible="attachmentsVisible"
      :sheet-visible="sheetVisible"
      :placeholder="placeholder"
      @submit="onSubmit"
      @send="onSubmit"
      @focus="handleInputFocus"
      @blur="handleInputBlur"
      @click.stop.prevent
    >
      <div
        v-show="focused"
        slot="inner-start"
        class="other"
      >
        <f7-link
          slot="inner-start"
          :icon-f7="sheetVisible ? 'camera_fill' : 'camera'"
          :icon-color="sheetVisible ? 'pink' : 'gray'"
          @click="chooseImages"
        />
        <f7-link
          icon-f7="social_github"
          icon-color="gray"
          @click="sheetVisible = !sheetVisible"
        />
      </div>
      <div slot="send-link"/>
      <slot>
        <f7-button
          v-if="focused"
          fill
          class="submit-btn"
          @click="onSubmit"
        >发送</f7-button>
        <div
          v-else
          class="other"
        >
          <f7-link
            v-if="canLike"
            :icon-f7="liked ? 'heart_fill' : 'heart'"
            :icon-color="liked ? 'pink' : 'gray'"
          />
          <f7-link
            v-if="canReward"
            :icon-f7="rewarded ? 'money_dollar_fill' : 'money_dollar'"
            :icon-color="rewarded ? 'pink' : 'gray'"
          />
          <f7-link
            v-if="canMark"
            :icon-f7="marked ? 'star_fill' : 'star'"
            :icon-color="marked ? 'pink' : 'gray'"
          />
        </div>
      </slot>
      <f7-messagebar-attachments>
        <f7-messagebar-attachment
          v-for="(image, index) in attachments"
          :key="index"
          :image="image"
          @attachment:delete="deleteAttachment(image)"
        />
      </f7-messagebar-attachments>
      <f7-messagebar-sheet>
        <f7-messagebar-sheet-image
          v-for="(image, index) in emojis"
          :key="index"
          :image="image"
          :checked="attachments.indexOf(image) >= 0"
          @change="handleAttachment(image)"
        />
      </f7-messagebar-sheet>
    </f7-messagebar>
  </div>
</template>

<script>
  import { likeApi, rewardApi, markApi } from 'api/toggleApi'

  export default {
    props: {
      id: {
        required: true,
        type: Number
      },
      canLike: {
        type: Boolean,
        default: true
      },
      canMark: {
        type: Boolean,
        default: true
      },
      canReward: {
        type: Boolean,
        default: true
      },
      liked: {
        type: Boolean,
        default: false
      },
      marked: {
        type: Boolean,
        default: false
      },
      rewarded: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        focused: false,
        sheetVisible: false,
        attachments: [],
        emojis: [
          'http://lorempixel.com/300/300/cats/1/',
          'http://lorempixel.com/200/300/cats/2/',
          'http://lorempixel.com/400/300/cats/3/',
          'http://lorempixel.com/300/150/cats/4/',
          'http://lorempixel.com/150/300/cats/5/',
          'http://lorempixel.com/300/300/cats/6/',
          'http://lorempixel.com/300/300/cats/7/',
          'http://lorempixel.com/200/300/cats/8/',
          'http://lorempixel.com/400/300/cats/9/',
          'http://lorempixel.com/300/150/cats/10/'
        ],
        saveValue: ''
      }
    },
    computed: {
      attachmentsVisible() {
        return this.focused && this.attachments.length > 0;
      },
      placeholder () {
        return this.saveValue || this.attachments.length
          ? '有草稿待发送'
          : '我也说一句...'
      }
    },
    methods: {
      chooseImages () {
        this.$camera.selectImages().then((images) => {
          this.attachments = ['//cdn.framework7.io/i/docs/messagebar-vue.jpg'];
//          const result = this.$camera.uploadImages(images);
          this.$f7.dialog.alert(JSON.stringify(images), 'image result')
        }).catch((err) => {
          this.$toast.error(err);
        })
      },
      handleInputFocus () {
        this.focused = true;
        this.$refs.chat.setValue(this.saveValue);
      },
      handleInputBlur () {
        this.saveValue = this.$refs.chat.getValue();
      },
      handleMaskClick () {
        this.$refs.chat.clear();
        this.focused = false;
        this.sheetVisible = false
      },
      handleAttachment(image) {
        const index = this.attachments.indexOf(image);
        if (index !== -1) {
          this.attachments.splice(index, 1)
        } else {
          this.attachments.unshift(image);
        }
      },
      deleteAttachment(image) {
        this.attachments.splice(this.attachments.indexOf(image), 1)
      },
      onSubmit () {
        console.log(this.$refs.chat.getValue());
        this.$emit('submit')
      }
    }
  }
</script>

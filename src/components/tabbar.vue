<style lang="scss">
  #bottom-fixed-tab-container {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: $tab-height;
    background-color: #fff;
    z-index: 1;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;

    &:before {
      content: '';
      position: absolute;
      background-color: #c4c4c4;
      display: block;
      top: 0;
      left: 0;
      height: 1px;
      width: 100%;
      transform-origin: 50% 0;
      transform: scaleY(0.5);
    }

    >* {
      flex-grow: 1;
    }

    .creator-btn {
      display: flex;
      flex-direction: row;
      justify-content: center;

      .oy-menu-btn {
        display: block;
        overflow: hidden;

        &:focus, &:active {
          outline-width: 0;
        }
      }

      .oy-menu-item {
        width: 40px;
        height: 40px;
        line-height: 40px;
        margin-left: 4px;
        color: #fff;

        .review-btn {
          line-height: 38px;

          i {
            margin-left: 2px;
          }
        }

        >* {
          position: relative;

          &:after {
            content: attr(data-text);
            position: absolute;
            top: 0;
            left: 100%;
            width: 100px;
            height: 40px;
            line-height: 40px;
            margin-left: 10px;
            font-size: 14px;
            color: #333;
            text-align: left;
            visibility: hidden;
          }
        }
      }

      .oy-mask-white {
        background-color: rgba(255, 255, 255, .9);
      }
    }

    .tab-link {
      height: 100%;
      background-color: transparent;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      i, span {
        color: #929292;
      }

      i {
        margin-bottom: 4px;
        margin-top: 2px;
      }

      span {
        margin-left: 0;
        letter-spacing: .01em;
        text-overflow: ellipsis;
        white-space: nowrap;
        line-height: 1;
        transform-origin: 50% 0;
        transform: scale(.9);
        font-size: 12px;
      }

      &.tab-link-active {
        i, span {
          color: $theme-color;
        }
      }
    }
  }
</style>

<template>
  <div id="bottom-fixed-tab-container">
    <f7-link
      tab-link="#tab-world"
      class="tab-link-active"
      @click="pageChange(0)"
    >
      <f7-icon
        v-if="selectedIndex === 0"
        f7="compass_fill"
        size="20"
      />
      <f7-icon
        v-else
        size="20"
        f7="compass"
      />
      <span>社区</span>
    </f7-link>
    <f7-link
      tab-link="#tab-bangumi"
      @click="pageChange(1)"
    >
      <f7-icon
        v-if="selectedIndex === 1"
        f7="videocam_fill"
        size="20"
      />
      <f7-icon
        v-else
        size="20"
        f7="videocam"
      />
      <span>番剧</span>
    </f7-link>
    <circle-menu
      :number="3"
      :colors="[ '#fa7884', '#FAB962', '#9266f9', '#16c2c2', '#f00']"
      btn
      mask="white"
      type="top"
      animate="animated jello"
      class="creator-btn"
      @click="createBtnClick"
    >
      <div
        slot="item_1"
        data-text="发帖子"
        class="post-btn"
      >
        <f7-icon
          f7="favorites_fill"
          size="13"
        />
      </div>
      <div
        slot="item_2"
        data-text="传图片"
        class="image-btn"
      >
        <f7-icon
          f7="images_fill"
          size="15"
        />
      </div>
      <div
        slot="item_3"
        data-text="写漫评"
        class="review-btn"
      >
        <f7-icon
          f7="document_text_fill"
          size="15"
        />
      </div>
    </circle-menu>
    <f7-link
      tab-link="#tab-role-trending"
      @click="pageChange(2)"
    >
      <f7-icon
        v-if="selectedIndex === 2"
        f7="heart_fill"
        size="20"
      />
      <f7-icon
        v-else
        size="20"
        f7="heart"
      />
      <span>偶像</span>
    </f7-link>
    <f7-link
      tab-link="#tab-user"
      @click="pageChange(3)"
    >
      <f7-icon
        v-if="selectedIndex === 3"
        f7="home_fill"
        size="20"
      />
      <f7-icon
        v-else
        size="20"
        f7="home"
      />
      <span>我的</span>
    </f7-link>
  </div>
</template>

<script>
  import CircleMenu from 'assets/js/creator.js'

  export default {
    components: {
      CircleMenu
    },
    data () {
      return {
        selectedIndex: 0
      }
    },
    methods: {
      pageChange (index) {
        this.selectedIndex = index
        this.$channel.$emit('tab-switch', index)
        this.$channel.$emit(`tab-switch-${index}`)
      },
      createBtnClick (isOpen) {
        this.$channel.$emit('toggle-creator', isOpen)
      }
    }
  }
</script>

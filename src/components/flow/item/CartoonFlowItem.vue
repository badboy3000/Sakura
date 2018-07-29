<style lang="scss">
  .cartoon {
    width: 145px;
    height: 250px;
    float: left;
    margin: 5px 5px 10px;
    border-radius: 5px;
    overflow: hidden;

    .item-content,
    .item-inner {
      padding: 0 !important;
    }

    .poster-wrap {
      position: relative;
      display: block;
      z-index: -2;

      &:after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 50px;
        opacity: .3;
        background-color: transparent;
        background-image: linear-gradient(transparent,rgba(0,0,0,.1) 20%,rgba(0,0,0,.2) 35%,rgba(0,0,0,.6) 65%,rgba(0,0,0,.9));
      }

      img {
        width: 100%;
        height: 210px;
        display: block;
      }

      .info {
        position: absolute;
        left: 7px;
        bottom: 4px;
        z-index: 1;
        color: #fff;
        line-height: 20px;

        i {
          font-size: 20px;
          vertical-align: middle;
        }

        .image-count {
          margin-left: 5px;
          font-size: 14px;
          vertical-align: middle;
        }
      }
    }

    .intro {
      padding: 5px 15px;

      .name, .social {
        height: 20px;
        font-size: 12px;
        line-height: 20px;
      }

      .name {
        margin-top: 3px;
        margin-bottom: 0;
      }

      .social {
        color: $color-text-light;
        margin-top: 2px;

        span {
          margin-right: 10px;
        }

        .done {
          color: $color-pink-deep;
        }
      }
    }

    .about {
      height: 51px;
      padding: 10px 15px;
      border-top: 1px solid #F2F2F2;

      .user-avatar {
        display: block;
        margin-right: 10px;
        overflow: hidden;
        float: left;
        @include avatar(30px);
      }

      .main-name {
        line-height: 30px;
        font-size: 12px;
        word-wrap: break-word;
        color: $color-text-normal;
      }
    }
  }
</style>

<template>
  <f7-list-item
    :link="$alias.image(item.id)"
    class="cartoon"
  >
    <div>
      <div class="poster-wrap">
        <img :src="$resize(item.source.url, { width: 290, height: 420 })">
        <div class="info">
          <i class="el-icon-picture-outline"/>
          <span
            class="image-count"
            v-text="item.image_count"
          />
        </div>
      </div>
      <div class="intro">
        <p class="name oneline">【 {{ item.part }} 】{{ item.name }}</p>
        <!--
        <div class="social">
          <span
            v-if="item.like_count"
            :class="{ 'done': item.liked }"
          >
            <i class="iconfont icon-guanzhu"/>
            {{ item.like_count }}
          </span>
          <span
            v-if="item.comment_count"
            :class="{ 'done': item.commented }"
          >
            <i class="iconfont icon-pinglun1"/>
            {{ item.comment_count }}
          </span>
          <span v-if="item.view_count">
            <i class="iconfont icon-ai-eye"/>
            {{ item.view_count }}
          </span>
        </div>
        -->
      </div>
    </div>
    <!--
    <div class="about">
      <a
        :href="$alias.user(item.user.zone)"
        class="user-avatar"
      >
        <img :src="$resize(item.user.avatar, { width: 60 })">
      </a>
      <a
        :href="$alias.user(item.user.zone)"
        class="main-name"
        v-text="item.user.nickname"
      />
    </div>
    -->
  </f7-list-item>
</template>

<script>
  export default {
    name: 'CartoonFlowItem',
    props: {
      item: {
        required: true,
        type: Object
      }
    }
  }
</script>

<style lang="scss">
  #image-waterfall-flow {
    margin-right: -5px;
    padding-top: 10px;
    width: 100%;

    .vue-waterfall {
      width: 310px;
      max-width: 100%;
      margin: 0 auto;
    }

    .vue-waterfall-slot {
      padding-right: 10px;
      padding-bottom: 10px;
      margin-left: 5px;
      margin-top: 5px;
    }

    .image {
      width: 100%;
      overflow: hidden;
      display: block;

      .image-box {
        display: block;
        position: relative;
        overflow: hidden;
        border-radius: 5px;
        z-index: -2;

        &.album-box:after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 50px;
          opacity: .3;
          background-image: linear-gradient(transparent,rgba(0,0,0,.1) 20%,rgba(0,0,0,.2) 35%,rgba(0,0,0,.6) 65%,rgba(0,0,0,.9));
        }

        .is-creator {
          font-size: 20px;
          position: absolute;
          left: 5px;
          top: 2px;
          z-index: 1;
          color: #ffcf00;
        }

        .is-album {
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

        img {
          display: block;
          width: 100%;
          height: auto;
        }
      }

      .intro {
        padding: 5px 15px;

        .name, .social {
          height: 20px;
          line-height: 20px;
          font-size: 12px;
          color: #333;
        }

        .name {
          margin: 0;
        }

        .social {
          color: $color-text-light;
          margin-top: 5px;

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

        .user-avatar {
          @include avatar(30px);
        }

        .bangumi-avatar {
          width: 30px;
          height: 30px;
        }

        .user-avatar, .bangumi-avatar {
          display: block;
          margin-right: 10px;
          overflow: hidden;
          float: left;
        }

        .main-name {
          line-height: 30px;
          font-size: 12px;
          word-wrap: break-word;
          color: $color-text-normal;
        }

        .info {
          overflow: hidden;
          font-size: 12px;
          line-height: 15px;

          .main-info {
            margin: 0 0 2px 0;

            span {
              color: $color-text-light;
              float: left;
            }
          }

          a {
            color: $color-text-normal;
            font-size: 12px;
            display: block;
          }
        }
      }
    }
  }
</style>

<template>
  <div id="image-waterfall-flow">
    <waterfall
      :line-gap="155"
      :auto-resize="false"
      :watch="watchKey"
    >
      <waterfall-slot
        v-for="(item, index) in list"
        :height="computeBoxHeight(item.source)"
        :order="index"
        :key="item.id"
        width="145"
      >
        <f7-link
          :href="$alias.image(item.id)"
          class="image"
        >
          <div
            :class="{ 'album-box': item.is_album }"
            class="image-box"
          >
            <i
              v-if="item.is_creator"
              class="is-creator iconfont icon-huangguan"
            />
            <img
              :height="computeImageHeight(item.source)"
              :src="$resize(item.source.url, { width: 400, mode: 2 })"
              width="200"
            >
            <div
              v-if="item.is_album"
              class="is-album"
            >
              <i class="el-icon-picture-outline"/>
              <span
                class="image-count"
                v-text="item.image_count"
              />
            </div>
          </div>
          <div class="intro">
            <p
              class="name oneline"
              v-text="item.name"
            />
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
                <i class="iconfont icon-yuedu"/>
                {{ item.view_count }}
              </span>
            </div>
            -->
          </div>
          <!--
          <div class="about">
            <template v-if="show === 'bangumi'">
              <a
                :href="$alias.bangumi(item.bangumi.id)"
                class="bangumi-avatar"
              >
                <img :src="$resize(item.bangumi.avatar, { width: 60 })">
              </a>
              <div class="info">
                <a
                  :href="$alias.bangumi(item.bangumi.id)"
                  class="main-name oneline"
                  v-text="item.bangumi.name"
                />
              </div>
            </template>
            <template v-else-if="show === 'user'">
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
            </template>
            <template v-else>
              <a
                :href="$alias.bangumi(item.bangumi.id)"
                class="bangumi-avatar"
              >
                <img :src="$resize(item.bangumi.avatar, { width: 60 })">
              </a>
              <div class="info">
                <p class="main-info">
                  <span>UP：</span>
                  <a
                    :href="$alias.user(item.user.zone)"
                    class="oneline"
                    v-text="item.user.nickname"
                  />
                </p>
                <a
                  :href="$alias.bangumi(item.bangumi.id)"
                  class="oneline"
                  v-text="item.bangumi.name"
                />
              </div>
            </template>
          </div>
          -->
        </f7-link>
      </waterfall-slot>
    </waterfall>
  </div>
</template>

<script>
  import Waterfall from 'assets/js/vue-waterfall'

  export default {
    name: 'ImageFlowList',
    components: {
      'waterfall': Waterfall.waterfall,
      'waterfall-slot': Waterfall.waterfallSlot
    },
    props: {
      list: {
        required: true,
        type: Array,
        default: () => []
      },
      bangumiId: {
        type: Number,
        default: 0
      },
      userId: {
        type: Number,
        default: 0
      },
      watchKey: {
        type: Number,
        default: 0
      }
    },
    methods: {
      computeBoxHeight (image) {
        return this.computeImageHeight(image) + 30
      },
      computeImageHeight (image) {
        return parseInt(image.height / image.width * 145, 10)
      }
    }
  }
</script>

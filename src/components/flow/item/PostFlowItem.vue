<style lang="scss">
  .post-flow-item {
    .header {
      height: 35px;
      margin-bottom: 10px;

      .user-avatar {
        margin-right: 7px;
        display: block;
        float: left;
        position: relative;
        @include avatar(35px);
        @include border($color-gray-normal, 50%);
      }

      .bangumi-avatar {
        margin-right: 10px;
        display: block;
        float: left;
        width: 35px;
        height: 35px;

        img {
          display: block;
          width: 100%;
          height: auto;
          overflow: hidden;
        }
      }

      .name {
        vertical-align: middle;
        display: block;
        overflow: hidden;
        height: 35px;

        .nickname {
          font-size: 14px;
          line-height: 14px;
          overflow: hidden;
          margin-top: 4px;
          margin-bottom: 0;
          color: #333;
        }

        a, time, span {
          display: block;
          color: #999;
          font-size: 11px;
          line-height: 11px;
          margin-top: 4px;
          float: left;
        }
      }
    }

    .body {
      display: block;

      .title {
        margin-bottom: 5px;

        .top_badge, .nice_badge {
          float: left;
          height: 16px;
          line-height: 18px;
          color: #fff;
          cursor: default;
          font-size: 11px;
          font-weight: bold;
          text-align: center;
          border-radius: 4px;
          padding: 0 4px;
          margin-right: 5px;
        }

        .top_badge {
          background-color: $color-blue-normal;
        }

        .nice_badge {
          background-color: $color-pink-deep;
        }

        .oneline {
          color: #4c4c4c;
          font-weight: bold;
          font-size: 14px;
          line-height: 14px;
          margin-top: 0;
          margin-bottom: 0;
        }
      }

      .content {
        color: #333;
        font-size: 14px;
        margin-top: 0;
        margin-bottom: 8px;
        @include twoline(18px)
      }

      .images {
        position: relative;
        margin-bottom: 8px;
        z-index: -2;

        .image-full {
          height: 190px;
          width: 100%;
          background-color: #eee;
        }

        .image-list {
          @extend %clearfix;

          img {
            width: 32%;
            max-height: 93px;
            height: auto;
            display: block;
            float: left;

            &:not(:last-child) {
              margin-right: 2%;
            }
          }
        }
      }
    }

    .footer {
      height: 30px;
      line-height: 30px;
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      align-items: center;

      span {
        font-size: 12px;
        color: #666;
      }

      .done {
        color: $color-blue-normal;
      }
    }
  }
</style>

<template>
  <div class="post-flow-item">
    <f7-list-item :link="$alias.post(item.id)">
      <div class="header">
        <a
          v-if="item.user"
          :href="$alias.user(item.user.zone)"
          class="user-avatar"
        >
          <v-img
            :src="item.user.avatar"
            width="70"
          />
        </a>
        <a
          v-else
          :href="$alias.bangumi(item.bangumi.id)"
          class="bangumi-avatar"
        >
          <v-img
            :src="item.bangumi.avatar"
            width="70"
          />
        </a>
        <div class="name">
          <p
            class="nickname"
            v-text="item.user.nickname"
          />
          <template v-if="bangumiId">
            <span>发表于&nbsp;·&nbsp;</span>
          </template>
          <template v-else>
            <a
              :href="$alias.bangumi(item.bangumi.id)"
              v-text="item.bangumi.name"
            />
            <span>&nbsp;·&nbsp;</span>
          </template>
          <v-time v-model="item.created_at"/>
        </div>
      </div>
      <div class="body">
        <div class="title">
          <div
            v-if="item.top_at"
            class="top_badge"
          >置顶</div>
          <div
            v-if="item.is_nice"
            class="nice_badge"
          >精</div>
          <p
            class="oneline"
            v-text="item.title"
          />
        </div>
        <p
          class="content"
          v-text="item.desc"
        />
        <div
          v-if="item.images.length"
          class="images"
        >
          <v-img
            v-if="item.images.length === 1"
            :src="item.images[0].url"
            class="image-full bg"
            height="190"
            mode="2"
            tag="div"
          />
          <div
            v-else
            class="image-list"
          >
            <v-img
              v-for="(image, index) in imageFilter(item.images)"
              :key="index"
              :src="image.url"
              width="110"
            />
          </div>
        </div>
      </div>
      <div class="footer">
        <span :class="{ 'done' : item.liked }">
          赞赏
          {{ $func.shortenNumber(item.like_count) }}
        </span>
        <span :class="{ 'done' : item.marked }">
          收藏
          {{ $func.shortenNumber(item.mark_count) }}
        </span>
        <span :class="{ 'done' : item.commented }">
          评论
          {{ $func.shortenNumber(item.comment_count) }}
        </span>
        <!--
        <a
          v-if="item.bangumi && item.user"
          :href="$alias.bangumi(item.bangumi.id)"
          class="bangumi oneline"
          v-text="item.bangumi.name"
        />
        -->
      </div>
    </f7-list-item>
    <div class="hr"/>
  </div>
</template>

<script>
  export default {
    name: 'PostFlowItem',
    props: {
      item: {
        required: true,
        type: Object
      },
      bangumiId: {
        type: Number,
        default: 0
      },
      userId: {
        type: Number,
        default: 0
      }
    },
    methods: {
      imageFilter (images) {
        return images.slice(0, 3)
      }
    }
  }
</script>

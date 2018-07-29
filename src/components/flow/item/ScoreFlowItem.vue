<style lang="scss">
  .score-flow-item {
    .header {
      margin-bottom: 10px;

      .user-avatar {
        display: block;
        margin-right: 5px;
        float: left;
        @include avatar(35px);
      }

      .header-content {
        overflow: hidden;

        .about {
          overflow: hidden;

          .bangumi-name {
            overflow: hidden;
            display: block;
            line-height: 23px;
            font-size: 12px;
            vertical-align: middle;
            color: #333;
          }

          .el-rate {
            display: inline-block;
            vertical-align: middle;
            height: 23px;
            margin-left: 10px;
            float: right;
          }
        }

        .meta {
          color: #999;
          font-size: 11px;
          line-height: 11px;

          a {
            color: #999;
          }
        }
      }
    }

    .body {
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
  <div class="score-flow-item">
    <f7-list-item :link="$alias.score(item.id)">
      <div class="header">
        <a
          :href="$alias.user(item.user.zone)"
          class="user-avatar"
        >
          <img :src="$resize(item.user.avatar, { width: 50 })">
        </a>
        <div class="header-content">
          <div class="about">
            <el-rate
              v-if="starCount"
              v-model="starCount"
              disabled
            />
            <el-rate
              v-else
              v-model="zero"
              disabled
            />
            <a
              :href="$alias.bangumi(item.bangumi.id)"
              class="bangumi-name oneline"
              v-text="item.bangumi.name"
            />
          </div>
          <div class="meta">
            <a
              :href="$alias.user(item.user.zone)"
              class="author"
              v-text="item.user.nickname"
            />
            &nbsp;·&nbsp;
            <v-time
              v-model="item.created_at"
              class="created-at"
            />
          </div>
        </div>
      </div>
      <div class="body">
        <div class="title">
          <p
            class="oneline"
            v-text="item.title"
          />
        </div>
        <div
          class="content"
          v-text="item.intro"
        />
      </div>
      <div class="footer">
        <span>
          喜欢
          {{ item.like_count }}
        </span>
        <span>
          评论
          {{ item.comment_count }}
        </span>
        <span>
          收藏
          0
        </span>
      </div>
    </f7-list-item>
    <div class="hr"/>
  </div>
</template>

<script>
  export default {
    name: 'ScoreFlowItem',
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
    data () {
      return {
        zero: 0
      }
    },
    computed: {
      starCount () {
        return this.item.total / 2
      }
    }
  }
</script>

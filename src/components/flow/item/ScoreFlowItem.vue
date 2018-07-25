<style lang="scss">
  .score-flow-item {
    padding-bottom: 10px;
    padding-top: $container-padding;

    &:not(:last-child) {
      border-bottom: 1px solid #f4f5f7;
    }

    .header {
      margin-bottom: 10px;

      .created-at {
        float: right;
        color: #99a2aa;
        font-size: 12px;
        line-height: 30px;
      }

      .about {
        overflow: hidden;

        .user-avatar,
        .bangumi-avatar {
          display: inline-block;
          vertical-align: middle;
          margin-right: 10px;
          line-height: 30px;
        }

        .user-avatar {
          @include avatar(25px);
        }

        .bangumi-avatar {
          width: 25px;
          height: 25px;

          img {
            display: block;
            width: 100%;
            height: 100%;
            border-radius: 3px;
            border: 1px solid #e5e9ef;
          }
        }

        .name {
          line-height: 30px;
          font-size: 12px;
          display: inline-block;
          vertical-align: middle;
          margin-right: 10px;
        }
      }

      .el-rate {
        display: inline-block;
        vertical-align: middle;
        height: 23px;
      }
    }

    .intro {
      display: block;
      font-size: 14px;
      @include twoline(22px);
    }

    .footer {
      margin-top: 10px;
      line-height: 16px;
      font-size: 13px;
      color: #99a2aa;
      text-align: right;

      span {
        width: 40px;
        display: inline-block;
      }
    }
  }
</style>

<template>
  <f7-list-item
    :link="$alias.score(item.id)"
    class="score-flow-item"
  >
    <div class="header">
      <v-time
        v-model="item.created_at"
        class="created-at"
      />
      <div
        class="about"
      >
        <a
          v-if="show !== 'bangumi'"
          :href="$alias.bangumi(item.bangumi.id)"
        >
          <div class="bangumi-avatar">
            <img :src="$resize(item.bangumi.avatar, { width: 50 })">
          </div>
          <span
            class="name"
            v-text="item.bangumi.name"
          />
        </a>
        <a
          v-else
          :href="$alias.user(item.user.zone)"
        >
          <div class="user-avatar">
            <img :src="$resize(item.user.avatar, { width: 50 })">
          </div>
          <span
            class="name"
            v-text="item.user.nickname"
          />
        </a>
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
      </div>
    </div>
    <a
      :href="$alias.score(item.id)"
      class="intro"
      v-text="item.intro"
    />
    <div class="footer">
      <span>
        <i class="iconfont icon-guanzhu"/>
        {{ item.like_count }}
      </span>
      <span>
        <i class="iconfont icon-pinglun1"/>
        {{ item.comment_count }}
      </span>
    </div>
  </f7-list-item>
</template>

<script>
  import { Rate } from 'element-ui'

  export default {
    name: 'ScoreFlowItem',
    components: {
      'el-rate': Rate
    },
    props: {
      item: {
        required: true,
        type: Object
      },
      show: {
        required: true,
        type: String,
        validator: val => ~['all', 'user', 'bangumi'].indexOf(val)
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

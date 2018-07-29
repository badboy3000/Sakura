<style lang="scss">
  #score-show {
    .score-header {
      .title {
        font-size: 24px;
        line-height: 32px;
        margin-bottom: 10px;
        font-weight: normal;
        @extend %breakWord;
      }

      .author-info {
        .total {
          float: right;
          font-weight: bold;
          font-size: 23px;
          letter-spacing: 1px;
          margin-left: 10px;
          color: #ff9900;
        }

        .author {
          overflow: hidden;
          line-height: 25px;
          font-size: 12px;
          margin-bottom: $container-padding;

          .avatar {
            margin-right: 10px;
            display: inline-block;
            vertical-align: middle;
            @include avatar(25px);
          }
        }
      }

      .star-row {
        font-size: 0;
        margin-bottom: $container-padding;

        .star-item {
          display: inline-block;
          width: 50%;
          height: 36px;
          margin-bottom: 10px;

          .label {
            font-size: 12px;
            margin-bottom: 3px;
            color: $color-text-normal;
          }
        }
      }
    }

    .score-body {
      margin-bottom: 30px;
      font-size: 16px;
      color: #222;
      line-height: 30px;
      font-family: Microsoft Yahei,Tahoma,Helvetica,Arial,\\5B8B\4F53,sans-serif;
      @extend %breakWord;
    }

    .score-footer {
      text-align: center;
      margin-bottom: 30px;

      /*
      .score-like-btn {
        @include btn-empty(#ffffff, #fa5555);
      }

      .score-liked-btn {
        @include btn-empty(#fa5555);
      }
      */
    }

    .control {
      text-align: right;
      margin-bottom: 20px;

      button, a {
        font-size: 12px;
        color: $color-text-normal;
        margin-left: 5px;
      }
    }

    .bangumi-panel {
      padding-top: $container-padding;
      padding-bottom: $container-padding;

      .summary {
        font-size: 12px;
        color: #666;
        @include twoline(13px)
      }
    }
  }
</style>

<template>
  <f7-page id="score-show">
    <f7-navbar sliding>
      <f7-nav-left
        back-link
      />
      <page-actions
        :id="id"
        type="score"
      >
        <template v-if="isMine">
          <f7-actions-button @click="deleteScore">
            编辑
          </f7-actions-button>
          <f7-actions-button @click="deleteScore">
            删除
          </f7-actions-button>
        </template>
      </page-actions>
    </f7-navbar>
    <template v-if="source">
      <f7-block class="score-header">
        <h1
          class="title"
          v-text="source.title"
        />
        <div class="author-info">
          <div class="total">{{ source.total }}分</div>
          <div class="author">
            <a
              :href="$alias.user(user.zone)"
              target="_blank"
            >
              <div class="avatar">
                <img :src="$resize(user.avatar, { width: 50 })">
              </div>
              <span
                class="name"
                v-text="user.nickname"
              />
            </a>
            ·
            <template v-if="source.published_at === source.updated_at">
              发表于：<v-time v-model="source.published_at"/>
            </template>
            <template v-else>
              编辑于：<v-time v-model="source.updated_at"/>
            </template>
          </div>
        </div>
        <div class="star-row">
          <div
            v-for="(item, index) in columns"
            :key="index"
            class="star-item"
          >
            <div
              class="label"
              v-text="`${labelMap[item]}：${source[item] * 2}分`"
            />
            <el-rate
              v-model="source[item]"
              disabled
              allow-half
            />
          </div>
        </div>
      </f7-block>
      <div class="score-body">
        <json-content :content="source.content"/>
      </div>
      <!--
      <div class="score-footer">
        <button
          :class="[ source.liked ? 'score-liked-btn' : 'score-like-btn' ]"
          @click="toggleLike"
        >
          <i class="iconfont icon-guanzhu"/>
          {{ source.liked ? '已喜欢' : '喜欢' }}{{ source.like_count ? `(${source.like_count})` : '' }}
        </button>
      </div>
      <div class="control container" v-if="isMine">
        <button @click="deleteScore">删除</button>
        <a :href="$alias.editScore(source.id)">
          <button>编辑</button>
        </a>
      </div>
      -->
    </template>
    <f7-block
      v-else
      class="text-align-center"
    >
      <f7-preloader/>
    </f7-block>
    <div class="hr"/>
    <comment-main
      :id="id"
      :only-see-master="false"
      :master-id="masterId"
      type="score"
    />
  </f7-page>
</template>

<script>
  import { getScoreInfo } from 'api/scoreApi'

  export default {
    name: 'ScoreShow',
    data () {
      const labelMap = {
        lol: '笑点',
        cry: '泪点',
        fight: '燃点',
        moe: '萌点',
        sound: '音乐',
        vision: '画面',
        story: '情节',
        role: '人设',
        express: '内涵',
        style: '美感'
      }
      return {
        source: null,
        labelMap,
        columns: Object.keys(labelMap),
        loadingToggleLike: false
      }
    },
    computed: {
      id () {
        return +this.$f7route.params.id
      },
      bangumi () {
        return this.source.bangumi
      },
      user () {
        return this.source.user
      },
      masterId () {
        return this.source
          ? this.user.id
          : 0
      },
      isMine () {
        return this.masterId === this.$store.state.user.id
      }
    },
    created () {
      this.getData()
    },
    mounted () {

    },
    methods: {
      deleteScore () {
        this.$confirm('删除后无法找回, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          const api = new ScoreApi(this)
          try {
            await api.delete({
              id: this.info.id
            })
            this.$toast.success('操作成功')
            setTimeout(() => {
              window.location.reload()
            }, 1000)
          } catch (e) {
            this.$toast.error(e)
          }
        }).catch(() => {})
      },
      async getData () {
        try {
          this.source = await getScoreInfo({
            scoreId: this.id
          })
        } catch (e) {
          this.$toast.error(e)
        }
      }
    }
  }
</script>

<style lang="scss">
  #post-show {
    .post {
      .title {
        color: #000;
        font-size: 18px;
        font-weight: 700;
        line-height: 28px;
        margin: 8px 0 15px;

        .nice_badge {
          float: left;
          height: 22px;
          line-height: 20px;
          color: #fff;
          cursor: default;
          font-size: 12px;
          font-weight: bold;
          text-align: center;
          padding: 1px 6px;
          border-radius: 4px;
          margin: 4px 5px 0 0;
          background-color: $color-pink-deep;
        }
      }

      .user {
        position: relative;
        .avatar {
          float: left;
          margin-right: 9px;
          @include avatar(35px)
        }

        .tool-btn {
          position: absolute;
          right: 5px;
          top: 0;
          line-height: 16px;
          font-size: 12px;
          color: #535353;
        }

        .summary {
          overflow: hidden;

          .nickname {
            overflow: hidden;
            display: inline-block;
            font-size: 14px;
            color: #333;
          }

          .info {
            line-height: 16px;
            font-size: 12px;
            color: #999;

            span {
              margin-right: 5px;
            }
          }
        }
      }

      .content {
        color: #000;
        font-size: 16px;
        margin: 22px 0;
        line-height: 24px;

        .image-area {
          margin: 16px 0;

          img {
            width: 100%;
            height: auto;
          }
        }
      }
    }
  }
</style>

<template>
  <f7-page id="post-show">
    <f7-navbar sliding>
      <f7-nav-left
        back-link
      />
      <page-actions
        :id="id"
        type="post"
      >
        <f7-actions-button @click="switchOnlySeeMaster">
          {{ onlySeeMaster ? '取消只看楼主' : '只看楼主' }}
        </f7-actions-button>
      </page-actions>
    </f7-navbar>
    <f7-block
      v-if="loading"
      class="text-align-center"
    >
      <f7-preloader/>
    </f7-block>
    <f7-block
      v-else
      class="post"
    >
      <h1 class="title">
        <div
          v-if="post.is_nice"
          class="nice_badge"
        >精</div>
        {{ post.title }}
      </h1>
      <div class="user">
        <a
          :href="$alias.user(master.zone)"
          class="avatar"
        >
          <img :src="$resize(master.avatar, { width: 70 })">
        </a>
        <div class="summary">
          <a
            :href="$alias.user(master.zone)"
            class="nickname"
            v-text="master.nickname"
          />
          <div class="info">
            <span>第1楼</span>
            <span>·</span>
            <template v-if="total > 1">
              <span>共{{ total }}楼</span>
              <span>·</span>
            </template>
            <v-time v-model="post.created_at"/>
            <span
              v-if="post.view_count"
              class="fr"
            >
              <i class="iconfont icon-yuedu"/>
              {{ $func.shortenNumber(post.view_count) }}
            </span>
          </div>
        </div>
      </div>
      <div class="content">
        <div
          class="text-area"
          v-html="post.content"
        />
        <div class="image-area">
          <div
            v-for="(img, idx) in post.images"
            :key="idx"
            class="image-package"
          >
            <!--
            @click="$previewImages(post.preview_images, img)"
            -->
            <v-img
              :src="img.url"
              :full="true"
              :source="img"
              :aspect="$computeImageAspect(img)"
              width="300"
              mode="2"
            />
          </div>
        </div>
      </div>
    </f7-block>
    <div class="hr"/>
    <comment-main
      :id="id"
      :only-see-master="onlySeeMaster"
      :master-id="masterId"
      :marked="marked"
      :liked="liked"
      :can-reward="false"
      type="post"
    />
  </f7-page>
</template>

<script>
  import { getPostInfo } from 'api/postApi'

  export default {
    name: 'PostShow',
    data () {
      return {
        loading: true,
        bangumi: null,
        post: null,
        master: null,
        onlySeeMaster: false
      }
    },
    computed: {
      id () {
        return +this.$f7route.params.id
      },
      masterId () {
        return this.master
          ? this.master.id
          : 0
      },
      total () {
        return this.$store.state.comment.total + 1
      },
      liked () {
        return this.post ? this.post.liked : false
      },
      marked () {
        return this.post ? this.post.marked : false
      }
    },
    created () {
      this.getData()
    },
    methods: {
      toggleLike () {

      },
      toggleMark () {

      },
      switchOnlySeeMaster () {
        this.onlySeeMaster = !this.onlySeeMaster
      },
      async getData () {
        try {
          const data = await getPostInfo({
            postId: this.id,
            only: this.onlySeeMaster
          })
          this.bangumi = data.bangumi
          this.master = data.user
          this.post = data.post
        } catch (e) {
          this.$toast.error(e)
        } finally {
          this.loading = false
        }
      }
    }
  }
</script>

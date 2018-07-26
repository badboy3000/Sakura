<style lang="scss">
  .comment-item {
    position: relative;
    margin-top: $container-padding;
    padding-bottom: $container-padding;

    .avatar {
      float: left;
      margin-right: 9px;
      @include avatar(35px);
    }

    .content {
      overflow: hidden;

      .header {
        .user {
          .nickname {
            font-size: 14px;
            line-height: 21px;
            display: block;
            color: #333;
          }

          .info {
            color: #999;
            line-height: 14px;
            font-size: 12px;

            span {
              margin-right: 5px;
            }
          }
        }
      }

      .main {
        font-size: 16px;
        margin: 10px 0 4px;
        color: #333;
        line-height: 24px;
        min-height: 65px;

        .image-area {
          margin: 10px 0;

          img {
            width: 100%;
            height: auto;
          }
        }
      }

      .footer {
        .extra {
          color: #999;
          line-height: 14px;
          font-size: 12px;
        }

        .comment-like-btn {
          float: right;
        }
      }
    }
  }
</style>

<template>
  <div
    :id="`comment-${comment.id}`"
    class="comment-item"
  >
    <a
      :href="$alias.user(comment.from_user_zone)"
      class="avatar"
    >
      <v-img
        :src="comment.from_user_avatar"
        :width="80"
        :height="80"
      />
    </a>
    <div class="content">
      <div class="header">
        <div class="user">
          <a
            :href="$alias.user(comment.from_user_zone)"
            class="nickname oneline"
            v-text="comment.from_user_name"
          />
          <div class="info">
            <span>第{{ comment.floor_count - 1 }}楼</span>
            <span>·</span>
          </div>
        </div>
      </div>
      <div
        class="main"
        v-html="comment.content"
      />
      <div class="footer">
        <div class="extra">
          <v-time v-model="comment.created_at"/>
          <f7-link
            class="comment-like-btn"
            @click.stop.prevent="toggleLike"
          >
            <span
              v-if="comment.like_count"
              v-text="comment.like_count"
            />
            <f7-icon
              :f7="comment.liked ? 'heart_fill' : 'heart'"
              :color="comment.liked ? 'pink' : 'gray'"
              size="12"
            />
          </f7-link>
        </div>
        <sub-comment-list
          :parent-comment="comment"
          :type="type"
          :show-all="showAll"
        />
      </div>
    </div>
  </div>
</template>

<script>
  import SubCommentList from './SubCommentList'

  export default {
    name: 'CommentItem',
    components: {
      SubCommentList
    },
    props: {
      comment: {
        required: true,
        type: Object
      },
      masterId: {
        required: true,
        type: Number
      },
      type: {
        required: true,
        type: String
      },
      showAll: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        deleting: false,
        liking: false
      }
    },
    computed: {
      currentUserId () {
        return this.$store.state.login
          ? this.$store.state.user.id
          : 0
      },
      isMine () {
        return this.currentUserId === this.comment.from_user_id
      },
      canDelete () {
        return this.isMine || this.currentUserId === this.masterId
      },
      actions () {
        const result = []
        if (this.canDelete) {
          result.push({
            name: '删除',
            method: this.deleteComment
          })
        }
        result.push({
          name: this.comment.liked ? '取消赞' : '点赞',
          method: this.toggleLike
        })

        return result
      }
    },
    methods: {
      async toggleLike () {
        if (!this.currentUserId) {
          this.$channel.$emit('sign-in')
          return
        }
        if (this.liking) {
          return
        }
        this.liking = true
        try {
          await this.$store.dispatch('comment/toggleLikeMainComment', {
            ctx: this,
            type: this.type,
            id: this.comment.id
          })
        } catch (e) {
        } finally {
          this.liking = false
        }
      },
      deleteComment () {
        if (this.deleting) {
          return
        }
        this.deleting = true
        this.$confirm('删除后无法找回, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$store.dispatch('comment/deleteMainComment', {
            ctx: this,
            type: this.type,
            id: this.comment.id
          })
        }).catch((e) => {
          this.deleting = false
          if (e === 'cancel') {
            return
          }
          this.$toast.error(e)
        })
      },
      handleCommentBtnClick () {
        this.$channel.$emit('reply-comment', {
          id: this.comment.id,
          targetUserId: this.comment.from_user_id,
          targetUserName: this.comment.from_user_name
        })
      }
    }
  }
</script>

<style lang="scss">
  #comment-wrap {
    position: relative;

    .sub-title {
      margin-top: 15px;
      margin-bottom: 15px;

      .write-btn {
        float: right;
        font-weight: bold;
        font-size: 13px;
      }
    }

    .comment-item-wrap {
      > .item-link {
        width: 100%;
      }
    }

    #comment-list-footer {
      margin-left: -$container-padding;
      margin-right: -$container-padding;
    }

    .focus-comment-drawer {
      .reply {
        .user {
          padding-top: 5px;

          .avatar {
            float: left;
            margin-right: 9px;
            @include avatar(35px)
          }

          .summary {
            overflow: hidden;

            .nickname {
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
          font-size: 16px;
          line-height: 24px;
          padding-top: 16px;
          margin-bottom: 16px;
          color: #000;

          .image-area {
            margin: 16px 0;

            img {
              width: 100%;
              height: auto;
            }
          }
        }

        .social {
          margin-bottom: 15px;
          font-size: 12px;

          .reply-liked-btn {
            color: $color-blue-deep;
          }

          button {
            color: #666;
            margin-left: 3px;
          }
        }
      }

      .total {
        height: 40px;
        line-height: 40px;
        color: #000;
        font-size: 16px;
      }

      .comments {
        li {
          padding: 17px 0 13px;
          position: relative;
          @include border-bottom();

          .from-user {
            .avatar {
              float: left;
              display: block;
              margin-right: 9px;
              @include avatar(35px);
            }

            .summary {
              overflow: hidden;

              .users {
                font-size: 14px;
                margin-bottom: 6px;
                margin-top: 2px;
                line-height: 14px;

                .nickname {
                  color: $color-blue-deep;
                }
              }

              .info {
                font-size: 12px;
                line-height: 12px;
                color: #999;
              }
            }
          }

          .main {
            margin-left: 45px;
            padding-top: 10px;

            .content {
              font-size: 14px;
              line-height: 21px;
              word-break: break-all;
            }
          }
        }
      }
    }

    .append-comment-btn {
      width: 100%;
      padding: 15px 0;
      font-size: 13px;
    }

    .no-content {
      text-align: center;
      margin-top: 30px;
      margin-bottom: 30px;
      font-size: 12px;
      color: #99a2aa;
    }
  }
</style>

<template>
  <div id="comment-wrap">
    <!-- 主列表的头部 -->
    <slot name="header">
      <div class="hr"/>
      <h3 class="sub-title">
        评论{{ total ? `(${total})` : '' }}
        <button
          class="write-btn"
          @click="writeComment"
        >写评论</button>
      </h3>
    </slot>
    <!-- 主列表的 list -->
    <f7-list
      v-infinite-scroll="loadMoreMainComment"
      id="comment-list-wrap"
      infinite-scroll-distance="50"
      infinite-scroll-disabled="notFetch"
      class="no-arrow"
    >
      <!-- 每条主评论 -->
      <f7-list-item
        v-for="comment in list"
        :key="comment.id"
        link="#"
        class="comment-item-wrap"
        @click="handleMainCommentClick(comment)"
      >
        <!-- 主评论的内容 -->
        <slot
          :comment="comment"
          :reply="handleSubCommentReply"
          name="comment-item"
        >
          <comment-item
            :type="type"
            :comment="comment"
            :master-id="masterId"
          />
        </slot>
      </f7-list-item>
    </f7-list>
    <div id="comment-list-footer">
      <button
        v-if="bottomAppendComment"
        class="append-comment-btn"
        @click="writeComment"
      >写评论</button>
    </div>
    <p
      class="no-content"
      v-text="emptyText"
    />
    <create-comment-bar/>
  </div>
</template>

<script>
  import CommentCreateForm from './CommentCreateForm'
  import CreateCommentBar from './CreateCommentBar'
  import CommentItem from './CommentItem'

  export default {
    name: 'CommentMain',
    components: {
      CreateCommentBar,
      CommentCreateForm,
      CommentItem
    },
    props: {
      id: {
        required: true,
        type: [Number, String]
      },
      type: {
        required: true,
        type: String,
        validator: val => ~['post', 'video', 'image', 'score'].indexOf(val)
      },
      onlySeeMaster: {
        type: Boolean,
        default: false
      },
      emptyText: {
        type: String,
        default: '暂无评论，快来抢沙发吧╮(￣▽￣)╭！'
      },
      masterId: {
        required: true,
        type: Number
      },
      bottomAppendComment: {
        type: Boolean,
        default: true
      }
    },
    data () {
      return {
        loadingMainComment: false,
        focusCommentId: 0,
        openFocusCommentDrawer: false,
        loadingSubComment: false,
        replyForm: {
          id: '',
          content: '',
          targetUserId: 0,
          targetUserName: '',
          open: false,
          replying: false,
          liking: false
        },
        openCreateCommentDrawer: false
      }
    },
    computed: {
      store () {
        return this.$store.state.comment
      },
      list () {
        return this.store.list
      },
      noMore () {
        return this.store.noMore
      },
      total () {
        return this.store.total
      },
      focusComment () {
        return this.focusCommentId
          ? this.list.filter(_ => _.id === this.focusCommentId)[0]
          : null
      },
      currentUserId () {
        return this.$store.state.login
          ? this.$store.state.user.id
          : 0
      },
      notFetch () {
        return this.loadingMainComment || this.noMore
      }
    },
    mounted () {
      this.$channel.$on('open-create-comment-drawer', () => {
        if (!this.currentUserId) {
          this.$channel.$emit('sign-in')
          return
        }
        this.openCreateCommentDrawer = true
      })
      this.$channel.$on('reply-comment', ({ id, targetUserId, targetUserName }) => {
        this.handleSubCommentReply({ id, targetUserId, targetUserName })
      })
    },
    methods: {
      async loadMoreMainComment () {
        if (this.loadingMainComment) {
          return
        }
        this.loadingMainComment = true
        try {
          await this.$store.dispatch('comment/getMainComments', {
            ctx: this,
            type: this.type,
            id: this.id,
            onlySeeMaster: this.onlySeeMaster ? 1 : 0
          })
        } catch (e) {
          this.$toast.error(e)
        } finally {
          this.loadingMainComment = false
        }
      },
      commentToComment (data) {
        this.handleSubCommentReply({
          id: data.parent_id,
          targetUserId: data.from_user_id,
          targetUserName: data.from_user_name
        })
      },
      handleCommentBtnClick () {
        this.handleSubCommentReply({
          id: this.focusComment.parent_id,
          targetUserId: this.focusComment.from_user_id,
          targetUserName: this.focusComment.from_user_name
        })
      },
      handleSubCommentReply ({ id, targetUserId, targetUserName }) {
        if (!this.currentUserId) {
          this.$channel.$emit('sign-in')
          return
        }
        this.replyForm.id = id
        this.replyForm.targetUserId = targetUserId
        this.replyForm.targetUserName = targetUserName
        this.replyForm.open = true
        setTimeout(() => { document.body.scrollTop = 0 }, 200)
      },
      async toggleFocusCommentLike () {
        if (!this.currentUserId) {
          this.$channel.$emit('sign-in')
          return
        }
        if (this.replyForm.liking) {
          return
        }
        this.replyForm.liking = true
        try {
          await this.$store.dispatch('comment/toggleLikeMainComment', {
            ctx: this,
            type: this.type,
            id: this.focusCommentId
          })
        } catch (e) {
        } finally {
          this.replyForm.liking = false
        }
      },
      handleReplyDrawerClose () {
        document.getElementById('reply-comment-textarea').style.display = 'none'
      },
      async handleReplySubmit () {
        if (!this.currentUserId) {
          this.$channel.$emit('sign-in')
          return
        }
        if (!this.replyForm.content) {
          return
        }
        if (this.replyForm.replying) {
          return
        }
        this.replyForm.replying = true
        this.$toast.loading('提交中...')
        try {
          await this.$store.dispatch('comment/createSubComment', {
            ctx: this,
            id: this.replyForm.id,
            type: this.type,
            content: this.replyForm.content,
            targetUserId: this.replyForm.targetUserId
          })
          this.replyForm.open = false
          this.replyForm.content = ''
          this.$toast.success('回复成功')
        } catch (e) {
          this.$toast.error(e)
        } finally {
          this.replyForm.replying = false
          this.handleReplyDrawerClose()
        }
      },
      writeComment () {
        this.$channel.$emit('open-create-comment-drawer')
      },
      closeCommentDrawer () {
        this.openCreateCommentDrawer = false
      },
      handleMainCommentClick (comment) {
        this.$f7router.navigate(`/comment/${comment.id}`, {
          context: {
            type: this.type,
            masterId: this.masterId
          }
        })
      }
    }
  }
</script>

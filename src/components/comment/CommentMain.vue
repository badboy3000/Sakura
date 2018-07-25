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
        v-for="comment in source.list"
        :key="comment.id"
        link="#"
        class="comment-item-wrap"
        @click="handleMainCommentClick(comment)"
      >
        <!-- 主评论的内容 -->
        <comment-item
          :type="type"
          :comment="comment"
          :master-id="masterId"
        />
      </f7-list-item>
    </f7-list>
    <p
      class="no-content"
      v-text="emptyText"
    />
    <create-comment-bar @submit="createMainComment"/>
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
      }
    },
    data () {
      return {
        loading: false
      }
    },
    computed: {
      source () {
        return this.$store.state.comment
      },
      total () {
        return this.source.total
      },
      notFetch () {
        return this.loading || this.source.noMore
      }
    },
    methods: {
      async loadMoreMainComment () {
        if (this.loading) {
          return
        }
        this.loading = true
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
          this.loading = false
        }
      },
      async createMainComment (content) {
        // submitting 的时候不要阻塞页面
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

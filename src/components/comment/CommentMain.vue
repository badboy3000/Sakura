<style lang="scss">
  #comment-wrap {
    position: relative;

    .sub-title {
      margin-top: 15px;
      margin-bottom: 15px;
    }

    .comment-item-wrap {
      > .item-link {
        width: 100%;
      }
    }
  }

  .ios-edge #comment-wrap {
    padding-bottom: 44px;
  }

  .md-edge #comment-wrap {
    padding-bottom: 48px;
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
      infinite-scroll-immediate-check="false"
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
    <no-more
      :loading="loading && !!source.list.length"
      :length="source.list.length"
      :no-more="source.noMore"
      :nothing-text="emptyText"
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
    created () {
      this.loadMoreMainComment();
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
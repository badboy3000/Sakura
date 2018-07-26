<style lang="scss">
  .sub-comment-list-wrap {
    position: relative;
    background-color: #f7f8fa;
    border-radius: 5px;

    .sub-comment-list {
      padding: 7px 0 7.5px;
      margin-top: 5px;
    }

    .load-all-comment {
      position: relative;
      margin-top: 6px;
      font-size: 12px;
      margin-bottom: 0;
      padding: 0 10px;
      color: #999;
      width: 100%;
      text-align: left;

      &:after {
        content: '';
        position: absolute;
        top: 50%;
        border: 3px solid #f5f5f5;
        border-left-color: #999;
        transform: translateY(-50%);
        margin-left: 4px;
      }
    }
  }
</style>

<template>
  <div class="sub-comment-list-wrap">
    <div
      v-if="hasComment"
      class="sub-comment-list"
    >
      <div
        v-infinite-scroll="loadMoreSubComment"
        v-if="showAll"
        infinite-scroll-distance="50"
        infinite-scroll-disabled="notFetch"
        class="show-all-sub-comment"
      >
        <sub-comment-item
          v-for="comment in comments.list"
          :key="comment.id"
          :comment="comment"
          :parent-user-id="authorId"
          :parent-comment-id="parentComment.id"
          :type="type"
        />
      </div>
      <div
        v-else
        class="show-filter-sub-comment"
      >
        <sub-comment-item
          v-for="comment in filterComments"
          :key="comment.id"
          :comment="comment"
          :parent-user-id="authorId"
          :parent-comment-id="parentComment.id"
          :type="type"
        />
        <button
          v-if="!comments.noMore || comments.list.length > 5"
          class="load-all-comment"
        >
          更多{{ comments.total }}条回复...
        </button>
      </div>
    </div>
  </div>
</template>

<script>
  import SubCommentItem from './SubCommentItem'

  export default {
    name: 'PostSubCommentList',
    components: {
      SubCommentItem
    },
    props: {
      parentComment: {
        required: true,
        type: Object
      },
      type: {
        required: true,
        type: String
      },
      showAll: {
        required: true,
        type: Boolean
      }
    },
    data () {
      return {
        loading: false
      }
    },
    computed: {
      comments () {
        return this.parentComment.comments
      },
      authorId () {
        return this.parentComment.from_user_id
      },
      hasComment () {
        return !!this.comments.list.length
      },
      filterComments () {
        const data = this.comments
        const comments = data.list
        const result = comments.slice(0, 5)
        if (comments.every(_ => _.id <= data.maxId)) {
          return result
        }
        const ids = result.map(_ => _.id)
        return result.concat(
          comments.filter(_ => _.id > data.maxId && ids.indexOf(_.id) === -1)
        )
      },
      notFetch () {
        return this.loading || this.comments.noMore
      }
    },
    methods: {
      async loadMoreSubComment () {
        if (this.loading) {
          return
        }
        this.loading = true
        try {
          await this.$store.dispatch('comment/getSubComments', {
            ctx: this,
            type: this.type,
            parentId: this.parentComment.id
          })
        } catch (e) {
          this.$toast.error(e)
        } finally {
          this.loading = false
        }
      }
    }
  }
</script>

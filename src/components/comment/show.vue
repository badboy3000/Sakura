<template>
  <f7-page>
    <f7-navbar sliding>
      <f7-nav-left
        back-link
      />
      <f7-nav-title>{{ comment.floor_count }}楼</f7-nav-title>
      <page-actions
        :id="id"
        :type="`${type}-comment`"
      />
    </f7-navbar>
    <f7-block>
      <comment-item
        :type="type"
        :comment="comment"
        :master-id="masterId"
        :show-all="true"
      />
    </f7-block>
  </f7-page>
</template>

<script>
  import CommentItem from 'components/comment/CommentItem'

  export default {
    name: 'CommentShow',
    components: {
      CommentItem
    },
    computed: {
      comment () {
        return this.$store.state.comment.list.filter(_ => _.id === this.id)[0]
      },
      id () {
        return +this.$f7route.params.id
      },
      type () {
        return this.$f7route.context.type
      },
      masterId () {
        return this.$f7route.context.masterId
      }
    }
  }
</script>

<style lang="scss">

</style>

<template>
  <f7-page>
    <f7-navbar
      title="comment show"
      back-link
      sliding
    />
    <comment-item
      :type="type"
      :comment="comment"
      :master-id="masterId"
      :show-all="true"
    />
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

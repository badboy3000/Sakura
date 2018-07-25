<style lang="scss">

</style>

<template>
  <f7-page>
    <f7-navbar
      :title="post ? post.title : ''"
      back-link
      sliding
    />
    <div class="hr"/>
    <comment-main
      :id="id"
      :only-see-master="onlySeeMaster"
      :bottom-append-comment="false"
      :master-id="masterId"
      type="post"
      empty-text=""
    />
  </f7-page>
</template>

<script>
  import { getPostInfo } from 'api/postApi'
  import CommentMain from 'components/comment/CommentMain'

  export default {
    name: 'PostShow',
    components: {
      CommentMain
    },
    data () {
      return {
        postLoaded: false,
        commentLoaded: false,
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
      }
    },
    created () {
      this.getData()
    },
    methods: {
      async getData () {
        try {
          const data = await getPostInfo({
            id: this.id,
            only: this.onlySeeMaster
          })
          this.bangumi = data.bangumi
          this.master = data.user
          this.post = data.post
          this.postLoaded = true
        } catch (e) {
          this.$toast.error(e)
        }
      }
    }
  }
</script>

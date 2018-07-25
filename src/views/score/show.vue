<template>
  <f7-page>
    <f7-navbar
      title="score show"
      back-link
      sliding
    />
    <comment-main
      :id="id"
      :only-see-master="false"
      :master-id="masterId"
      type="score"
    />
    <f7-block
      v-if="loading"
      class="text-align-center"
    >
      <f7-preloader/>
    </f7-block>
  </f7-page>
</template>

<script>
  import { getScoreInfo } from 'api/scoreApi'
  import CommentMain from 'components/comment/CommentMain'

  export default {
    name: 'ScoreShow',
    components: {
      CommentMain
    },
    data () {
      return {
        loading: true,
        source: null
      }
    },
    computed: {
      id () {
        return +this.$f7route.params.id
      },
      bangumi () {
        return this.source.bangumi
      },
      author () {
        return this.source.user
      },
      masterId () {
        return this.source
          ? this.author.id
          : 0
      }
    },
    created () {
      this.getData()
    },
    mounted () {

    },
    methods: {
      async getData () {
        try {
          this.source = await getScoreInfo({
            scoreId: this.id
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

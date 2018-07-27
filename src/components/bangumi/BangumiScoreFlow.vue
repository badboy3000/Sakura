<style lang="scss">
  #bangumi-score-panel {

    .bangumi-score-wrap {
      .ve-radar {
        margin: 0 auto;
      }
    }

    .bangumi-score-total {
      margin-top: $container-padding;
      margin-bottom: 10px;

      .intro {
        float: right;
        text-align: center;

        .total {
          font-size: 28px;
          line-height: 56px;
        }

        .rate {
          span {
            font-size: 12px;
            color: $color-text-normal;
          }
        }
      }

      .ladder {
        overflow: hidden;

        .label, .percent {
          margin-right: 10px;
          font-size: 13px;
          line-height: 14px;
          color: $color-text-normal;
          vertical-align: middle;
        }

        .score {
          display: inline-block;
          height: 10px;
          background-color: rgb(247, 186, 42);
          margin-right: 5px;
          border-radius: 3px;
          vertical-align: middle;
        }
      }
    }
  }
</style>

<template>
  <score-flow-list :bangumi-id="bangumiId">
    <f7-block
      v-if="bangumiScore"
      id="bangumi-score-panel"
    >
      <div class="bangumi-score-total">
        <div class="intro">
          <div
            class="total"
            v-text="totalScore"
          />
          <div class="rate">
            <el-rate
              v-model="totalRate"
              disabled
            />
            <span class="count">{{ bangumiScore.count }}人评价</span>
          </div>
        </div>
        <div class="ladder">
          <div
            v-for="(star, index) in bangumiScore.ladder"
            :key="index"
            class="star"
          >
            <span class="label">{{ star.key }}星</span>
            <div
              :style="{ width: `${90 * star.val / bangumiScore.count}px` }"
              class="score"
            />
            <span
              class="percent"
              v-text="`${star.val / bangumiScore.count * 100}%`"
            />
          </div>
        </div>
      </div>
      <div class="bangumi-score-wrap">
        <bangumi-score-chart
          :source="bangumiScore.radar"
          size="280px"
        />
      </div>
    </f7-block>
  </score-flow-list>
</template>

<script>
  import { bangumiScore } from 'api/scoreApi'
  import BangumiScoreChart from 'components/chart/BangumiScoreChart'
  import ScoreFlowList from 'components/flow/list/ScoreFlowList'

  export default {
    components: {
      ScoreFlowList,
      BangumiScoreChart
    },
    props: {
      bangumiId: {
        required: true,
        type: Number
      }
    },
    data () {
      return {
        bangumiScore: null
      }
    },
    computed: {
      totalRate () {
        return this.bangumiScore
          ? this.bangumiScore.total / 20
          : 0
      },
      totalScore () {
        return this.bangumiScore
          ? this.bangumiScore.total / 10
          : 0
      }
    },
    mounted () {
      this.$channel.$on('flow-list-fetch-score', this.getScore)
    },
    beforeDestroy () {
      this.$channel.$off('flow-list-fetch-score')
    },
    methods: {
      async getScore () {
        if (this.bangumiScore) {
          return
        }
        try {
          this.bangumiScore = await bangumiScore({
            bangumiId: this.bangumiId
          })
        } catch (e) {
          this.$toast.error(e)
        }
      }
    }
  }
</script>

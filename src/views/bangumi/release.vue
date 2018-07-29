<template>
  <f7-page :page-content="true">
    <f7-block
      v-if="loading"
      class="text-align-center"
    >
      <f7-preloader/>
    </f7-block>
    <f7-list
      v-else
      accordion-list
    >
      <f7-list-item
        v-for="(list, index) in source"
        :key="index"
        :title="showtime[index]"
        :class="{ 'accordion-item-opened': index === active }"
        accordion-item
      >
        <f7-accordion-content>
          <f7-list
            media-list
            class="no-arrow"
          >
            <f7-list-item
              v-for="item in list"
              :key="item.id"
              :title="item.name"
              :text="item.summary"
              :link="$alias.bangumi(item.id)"
            >
              <img
                slot="media"
                :src="$resize(item.avatar, { width: 160 })"
                width="80"
              >
              <a
                slot="after-title"
                :href="$alias.video(item.released_video_id)"
              >
                <f7-badge :color="item.update ? 'pink' : 'gray'">
                  {{ item.end ? '已完结' : `${item.released_part}话` }}
                </f7-badge>
              </a>
            </f7-list-item>
          </f7-list>
        </f7-accordion-content>
      </f7-list-item>
    </f7-list>
  </f7-page>
</template>

<script>
  export default {
    data () {
      return {
        loading: false,
        showtime: ['最新', '周一', '周二', '周三', '周四', '周五', '周六', '周日'],
        active: new Date().getDay() || 7
      }
    },
    computed: {
      source () {
        return this.$store.state.bangumi.released
      }
    },
    created () {
      this.$channel.$on('tab-switch-1', this.getData)
    },
    beforeDestroy () {
      this.$channel.$off('tab-switch-1')
    },
    methods: {
      async getData () {
        if (this.loading) {
          return
        }
        this.loading = true
        try {
          await this.$store.dispatch('bangumi/getReleased')
        } catch (e) {
          this.$toast.error(e)
        } finally {
          this.loading = false
        }
      }
    }
  }
</script>

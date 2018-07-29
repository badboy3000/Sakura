<style lang="scss">
  .bangumi-tag-wrap {
    .color-pink {
      border: 1px solid $theme-color;
      margin-right: 4px;
      margin-bottom: 3px;
    }
  }
</style>

<template>
  <f7-page
    :page-content="true"
    :infinite="!source.noMore"
    :infinite-preloader="!!source.list.length"
    @infinite="getData"
  >
    <f7-block-title>标签列表</f7-block-title>
    <f7-block
      strong
      class="bangumi-tag-wrap"
    >
      <f7-chip
        v-for="item in tags"
        :key="item.id"
        :text="item.name"
        :outline="!item.selected"
        color="pink"
        @click="choiceTag(item.id)"
      />
      <f7-chip
        outline
        text="点击搜索"
        @click="getData"
      />
    </f7-block>
    <template>
      <f7-block-title>番剧列表</f7-block-title>
      <f7-list
        media-list
        class="no-arrow"
      >
        <f7-list-item
          v-for="item in source.list"
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
        </f7-list-item>
      </f7-list>
      <no-more
        :loading="searching"
        :length="source.list.length"
        :no-more="source.noMore"
      />
    </template>
  </f7-page>
</template>

<script>
  export default {
    data () {
      return {
        loading: false,
        searching: false
      }
    },
    computed: {
      source () {
        return this.$store.state.bangumi.category
      },
      tags () {
        return this.$store.state.bangumi.tags
      }
    },
    created () {
      this.$channel.$on('bangumi-tab-fetch-category', this.getTags)
    },
    methods: {
      async getTags () {
        if (this.loading || this.tags.length) {
          return
        }
        this.loading = true
        try {
          await this.$store.dispatch('bangumi/getTags')
        } catch (e) {
          this.$toast.error(e)
        } finally {
          this.loading = false
        }
      },
      choiceTag (id) {
        this.$store.commit('bangumi/CHOICE_TAG', id)
      },
      async getData () {
        if (this.searching) {
          return
        }
        this.searching = true
        try {
          await this.$store.dispatch('bangumi/getCategory')
        } catch (e) {
          this.$toast.error(e)
        } finally {
          this.searching = false
        }
      }
    }
  }
</script>

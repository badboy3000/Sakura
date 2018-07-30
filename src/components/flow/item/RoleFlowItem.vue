<style lang="scss">
  .role-item {
    .lover {
      display: block;
      color: #333 !important;

      span {
        vertical-align: middle;
      }

      .avatar {
        display: inline-block;
        vertical-align: middle;
        @include avatar(16px)
      }
    }

    .bangumi {
      color: #333 !important;
    }

    &.role-item-1 .item-after {
      color: goldenrod;
    }

    &.role-item-2 .item-after {
      color: indianred;
    }

    &.role-item-3 .item-after {
      color: silver;
    }
  }
</style>

<template>
  <f7-list-item
    :title="item.name"
    :after="!bangumiId && !userId ? index + 1 : ''"
    :link="$alias.cartoonRole(item.id)"
    :class="`role-item-${index + 1}`"
    class="role-item"
  >
    <img
      slot="media"
      :src="$resize(item.avatar, { width: 160 })"
      width="80"
    >
    <a
      v-if="item.lover_id"
      slot="text"
      :href="$alias.user(item.lover_zone)"
      class="lover"
    >
      <span>守护者：</span>
      <span v-text="item.lover_nickname"/>
      <div class="avatar">
        <img :src="$resize(item.lover_avatar, { width: 32 })">
      </div>
    </a>
    <a
      v-if="!bangumiId"
      slot="subtitle"
      :href="$alias.bangumi(item.bangumi_id)"
      class="bangumi"
      v-text="item.bangumi_name"
    />
    <span slot="footer">共获得 {{ item.star_count }} 枚金币</span>
  </f7-list-item>
</template>

<script>
  export default {
    name: 'RoleFlowItem',
    props: {
      item: {
        required: true,
        type: Object
      },
      index: {
        required: true,
        type: Number
      },
      bangumiId: {
        type: Number,
        default: 0
      },
      userId: {
        type: Number,
        default: 0
      }
    },
    data () {
      return {

      }
    },
    computed: {

    },
    watch: {

    },
    created () {

    },
    mounted () {

    },
    methods: {

    }
  }
</script>

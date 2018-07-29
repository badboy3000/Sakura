<style lang="scss">
  #role-show {
    .profile {
      margin-top: $container-padding;
      min-height: 80px;

      .avatar {
        width: 81px;
        height: 81px;
        margin-right: 10px;
        margin-bottom: $container-padding;
        border-radius: 3px;
        float: left;
      }

      .info {
        overflow: hidden;

        .name {
          font-size: 18px;
          line-height: 18px;
          margin-bottom: 4px;
          margin-top: 0;
        }

        .lover {
          height: 26px;
          margin-bottom: 5px;

          img {
            vertical-align: middle;
            border: 1px solid $color-gray-normal;
            border-radius: 50%;
            @include avatar(26px);
          }

          a {
            color: #333;
          }
        }
      }

      .summary {
        line-height: 20px;
        font-size: 13px;
        margin-bottom: 5px;
      }

      .alias {
        line-height: 20px;
        font-size: 13px;
        margin-bottom: 5px;
        padding-left: 0;

        strong {
          float: left;
        }

        li {
          float: left;
          margin-right: 5px;
          text-decoration: underline;
        }
      }

      .coin {
        line-height: 20px;
        font-size: 13px;
        margin-bottom: 5px;
      }
    }

    .fans-item {
      .avatar {
        @include avatar(28px)
      }

      .item-inner {
        display: flex;
      }
    }
  }
</style>

<template>
  <f7-page id="role-show">
    <f7-navbar sliding>
      <f7-nav-left
        back-link
      />
      <page-actions
        :id="id"
        :org="true"
        type="role"
      />
    </f7-navbar>
    <template v-if="source">
      <div class="profile clearfix">
        <f7-block-title>角色信息</f7-block-title>
        <f7-block class="clearfix">
          <img
            :src="$resize(role.avatar, { width: 162 })"
            class="avatar"
          >
          <div class="info">
            <h1
              class="name"
              v-text="role.name"
            />
            <div class="lover">
              <template v-if="role.lover">
                <a :href="$alias.user(role.lover.zone)">
                  守护者：
                  <img :src="$resize(role.lover.avatar, { width: 52 })">
                  {{ role.lover.nickname }}
                </a>
              </template>
            </div>
            <f7-button
              outline
              round
              small
              fill
              class="star"
              @click="handleStarRole"
            >为TA应援</f7-button>
          </div>
        </f7-block>
        <f7-block-title>角色简介</f7-block-title>
        <f7-block>
          <p class="summary">
            <strong>介绍：</strong>{{ role.intro }}
          </p>
          <ul class="alias clearfix">
            <strong>别名：</strong>
            <li
              v-for="(name, index) in computeRoleAlias"
              :key="index"
              v-text="name"
            />
          </ul>
          <p
            v-if="role.star_count"
            class="coin"
          >
            <strong>粉丝：</strong>共有 {{ role.fans_count }} 个粉丝，收获了 {{ role.star_count }} 个金币
          </p>
        </f7-block>
      </div>
      <bangumi-panel :bangumi="bangumi"/>
      <div class="hr"/>
      <template v-if="fans.list.length">
        <f7-block-title>应援团</f7-block-title>
        <f7-list class="no-arrow">
          <f7-list-item
            v-for="item in fans.list"
            :key="item.id"
            :title="item.nickname"
            :link="$alias.user(item.zone)"
            class="fans-item"
          >
            <div
              slot="media"
              class="avatar"
            >
              <img
                :src="$resize(item.avatar, { width: 58 })"
              >
            </div>
            <v-time
              slot="after"
              v-model="item.score"
            />
          </f7-list-item>
        </f7-list>
        <no-more
          :loading="false"
          :length="fans.list.length"
          :no-more="fans.noMore"
        />
      </template>
    </template>
    <f7-block
      v-else
      class="text-align-center"
    >
      <f7-preloader/>
    </f7-block>
  </f7-page>
</template>

<script>
  export default {
    name: 'RoleShow',
    data () {
      return {
        sort: 'new'
      }
    },
    computed: {
      id () {
        return +this.$f7route.params.id
      },
      source () {
        return this.$store.state.role.info
      },
      role () {
        return this.source.data
      },
      bangumi () {
        return this.source.bangumi
      },
      fans () {
        return this.$store.state.role.fans.new
      },
      computeRoleAlias () {
        return this.role.alias.split(',')
      }
    },
    created () {
      this.getData()
      this.getFans()
    },
    methods: {
      async getData () {
        try {
          await this.$store.dispatch('role/getRoleInfo', {
            roleId: this.id
          })
        } catch (e) {
          this.$toast.error(e)
        }
      },
      async getFans () {
        try {
          await this.$store.dispatch('role/getFansList', {
            roleId: this.id,
            sort: this.sort,
            reset: false
          })
        } catch (e) {
          this.$toast.error(e)
        }
      },
      async handleStarRole () {
        if (!this.$store.state.user.coin) {
          this.$toast.error('金币不足')
          return
        }
        try {
          await this.$store.dispatch('role/star', {
            bangumiId: this.bangumi.id,
            roleId: this.id,
            hasStar: this.role.hasStar
          })
          this.$store.commit('USE_COIN')
          this.$toast.info(`+${this.role.hasStar}s`)
        } catch (e) {
          this.$toast.error(e)
        }
      }
    }
  }
</script>

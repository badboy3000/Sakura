<style lang="scss">
  #role-show {
    .profile {
      margin-top: $container-padding;
      min-height: 80px;

      .avatar {
        width: 80px;
        height: 80px;
        float: left;
        margin-right: 10px;
        margin-bottom: $container-padding;
      }

      .info {
        overflow: hidden;

        .name {
          font-size: 18px;
          margin-bottom: 5px;
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
        }

        .star {
          /*
          @include btn-empty(#000)
          */
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
        <h3 class="sub-title">角色信息</h3>
        <div>
          <div class="clearfix">
            <img
              :src="$resize(role.avatar, { width: 80 })"
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
              <button
                class="star"
                @click="handleStarRole"
              >为TA应援</button>
            </div>
          </div>
          <div>
            <h3 class="sub-title">角色简介</h3>
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
          </div>
        </div>
      </div>
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
  import { getRoleInfo } from 'api/roleApi'

  export default {
    name: 'RoleShow',
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
      computeRoleAlias () {
        return this.role.alias.split(',')
      }
    },
    created () {
      this.getData()
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

<style lang="scss">
  #image-show {
    .album-header {
      .title {
        font-size: 20px;
        margin-bottom: 15px;
      }

      .author {
        font-size: 13px;
        color: #333;

        .avatar {
          vertical-align: middle;
          border: 1px solid $color-gray-normal;
          border-radius: 50%;
          margin-right: 5px;
          @include avatar(30px);
        }
      }
    }

    .album-body {
      background-color: #fff;

      .image-package {
        position: relative;

        .image {
          width: 100%;
          height: auto;
        }
      }

      .no-image {
        text-align: center;
        padding-top: 30px;
        padding-bottom: 20px;
        color: $color-text-normal;
        font-size: 13px;
      }

      .cartoon-list {
        margin-top: 20px;
        position: relative;

        .sub-title {
          margin-left: 10px;

          .next {
            float: right;
            font-size: 13px;
            margin-right: 10px;
            margin-left: 15px;
            color: $color-text-normal;
          }

          .more {
            float: right;
            font-size: 13px;
            margin-right: 10px;
            margin-left: 15px;
            color: $color-text-normal;
          }
        }

        li {
          width: 50%;
          display: inline-block;
          text-align: center;
          margin-bottom: 7px;
          padding: 0 5px;

          a {
            border: 1px solid $color-gray-deep;
            height: 30px;
            color: $color-link;
            border-radius: 4px;
            display: block;
            font-size: 12px;
            line-height: 28px;

            &.active {
              border-color: $color-blue-light;
              background-color: $color-blue-light;
              color: $color-white;
            }
          }
        }
      }
    }
  }
</style>

<template>
  <f7-page id="image-show">
    <f7-navbar sliding>
      <f7-nav-left
        back-link
      />
      <f7-nav-title>
        {{ info ? info.name : '' }}
      </f7-nav-title>
      <page-actions
        :id="id"
        type="image"
      />
    </f7-navbar>
    <template v-if="info">
      <f7-block class="album-header">
        <h1 class="title oneline">
          {{ info.is_creator ? '[原创]' : '[转载]' }}
          [{{ info.is_cartoon ? '漫画' : '相册' }}]
          {{ info.name }}
        </h1>
        <a
          :href="$alias.user(user.zone)"
          class="author"
        >
          <img
            :src="$resize(user.avatar, { width: 60 })"
            class="avatar"
          >
          {{ user.nickname }}
          ·
          <v-time v-model="info.created_at"/>
        </a>
      </f7-block>
      <div class="album-body">
        <div
          v-if="info.is_album"
          class="images-wrap"
        >
          <div
            v-for="img in images"
            :key="img.id"
            class="image-package"
          >
            <v-img
              :src="img.url"
              :aspect="$computeImageAspect(img)"
              class="image"
              width="400"
              mode="2"
            />
          </div>
          <p
            v-if="!info.image_count"
            class="no-image"
          >
            还没有上传图片
          </p>
        </div>
        <div
          v-else
          class="image-package"
        >
          <v-img
            :src="source.url"
            :aspect="$computeImageAspect(source)"
            class="image"
            width="400"
            mode="2"
          />
        </div>
        <div
          v-if="info.is_cartoon"
          class="cartoon-list"
        >
          <h3 class="sub-title">
            选集（{{ cartoon.length }}）
            <a
              v-if="nextPartUrl"
              :href="nextPartUrl"
              class="next"
            >下一话</a>
            <div
              v-if="showMoreBtn"
              class="more"
              @click="showAll = !showAll"
            >{{ showAll ? '收起' : '展开' }}</div>
          </h3>
          <ul>
            <li
              v-for="(item, index) in sortCartoons"
              :key="index"
            >
              <a
                :href="$alias.image(item.id)"
                :class="{ 'active': item.id === id }"
                class="oneline"
                v-text="item.name"
              />
            </li>
          </ul>
        </div>
      </div>
      <bangumi-panel :bangumi="bangumi"/>
    </template>
    <f7-block
      v-else
      class="text-align-center"
    >
      <f7-preloader/>
    </f7-block>
    <comment-main
      :id="id"
      :only-see-master="false"
      :master-id="masterId"
      type="image"
    />
  </f7-page>
</template>

<script>
  import { getImageInfo } from 'api/imageApi'

  export default {
    name: 'ImageShow',
    data () {
      return {
        info: null,
        take: 4,
        page: 0,
        part: 0,
        showAll: false
      }
    },
    computed: {
      id () {
        return +this.$f7route.params.id
      },
      bangumi () {
        return this.info.bangumi
      },
      user () {
        return this.info.user
      },
      source () {
        return this.info.source
      },
      images () {
        return this.info.images
      },
      cartoon () {
        return this.info.parts
      },
      masterId () {
        return this.info
          ? this.user.id
          : 0
      },
      isMine () {
        return this.user.id === this.$store.state.user.id
      },
      showMoreBtn () {
        return this.take < this.cartoon.length
      },
      sortCartoons () {
        const begin = (this.page - 1) * this.take
        return this.showAll ? this.cartoon : this.cartoon.slice(begin, begin + this.take)
      },
      nextPartUrl () {
        if (!this.info.is_cartoon || !this.cartoon.length) {
          return ''
        }
        let index = 0
        this.cartoon.forEach((item, idx) => {
          if (item.id === this.id) {
            index = idx
          }
        })
        if (index >= this.cartoon.length - 1) {
          return ''
        }
        return this.$alias.image(this.cartoon[index + 1].id)
      }
    },
    created () {
      this.getData()
    },
    methods: {
      async getData () {
        try {
          this.info = await getImageInfo({
            imageId: this.id
          })
        } catch (e) {
          this.$toast.error(e)
        }
      },
      toggleLike () {

      }
    }
  }
</script>

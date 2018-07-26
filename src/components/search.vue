<style lang="scss">
  #search-box {
    .searchbar-backdrop {
      background-color: #fff !important;
    }

    .md .searchbar {
      border-radius: 24px;
      overflow: hidden;

      input {
        padding-left: 40px !important;
        padding-right: 40px !important;
      }
    }

    .ios .searchbar-input-wrap {
      border-radius: 16px;
      overflow: hidden;
    }

    .searched-item {
      img {
        width: 29px;
        height: 29px;
        border-radius: 6px;
        background-color: #ddd;
      }
    }
  }
</style>

<template>
  <f7-popup
    id="search-box"
    :opened="popupOpened"
    @popup:closed="popupOpened = false"
  >
    <f7-page>
      <f7-navbar
        no-hairline
        no-shadow
      >
        <f7-nav-left>&nbsp;</f7-nav-left>
        <div style="width: 100%">
          <f7-searchbar
            ref="search"
            :disable-button="false"
            :custom-search="true"
            no-shadow
            no-hairline
            placeholder="搜索番剧"
            @searchbar:search="search"
          />
        </div>
        <f7-nav-right>
          <f7-link @click="closeSearchBar">取消</f7-link>
        </f7-nav-right>
      </f7-navbar>
      <f7-list class="searchbar-found">
        <f7-list-item
          v-for="item in filteredOptions"
          :key="item.id"
          :title="item.name"
          link="#"
          class="searched-item"
          @click="goToBangumiPage(item)"
        >
          <f7-icon
            slot="media"
            icon="demo-list-icon"
          />
          <img
            slot="media"
            :src="$resize(item.avatar, { width: 58 })"
          >
        </f7-list-item>
      </f7-list>
      <template v-if="history.length">
        <f7-block-title>搜索历史</f7-block-title>
        <f7-list>
          <f7-list-item
            v-for="item in history"
            :key="item.id"
            :title="item.name"
            link="#"
            @click="goToBangumiPage(item)"
          />
        </f7-list>
        <f7-block-footer>
          <p @click="clearHistory">删除记录</p>
        </f7-block-footer>
      </template>
    </f7-page>
  </f7-popup>
</template>

<script>
  import { getAllBangumi } from 'api/searchApi'

  export default {
    props: {
      value: {
        required: true,
        type: Boolean
      }
    },
    data () {
      return {
        popupOpened: this.value,
        bangumis: [],
        filteredOptions: [],
        history: [],
        historyKey: 'search-history-cookie'
      }
    },
    watch: {
      value (val) {
        if (val) {
          this.getSearchBangumi()
        }
        this.popupOpened = val
      },
      popupOpened (val) {
        this.$emit('input', val)
      }
    },
    mounted () {
      this.history = this.getHistory()
    },
    methods: {
      search (el, query, prevQuery) {
        if (!query) {
          this.filteredOptions =  []
          return
        }
        this.filteredOptions = this.bangumis.filter(option => {
          return option.alias.indexOf(query) > -1 || option.name.indexOf(query) > -1;
        })
      },
      getHistory () {
        const cache = this.$cache.get(this.historyKey);
        if (!cache) {
          return []
        }
        try {
          return JSON.parse(cache)
        } catch (e) {
          this.$cache.remove(this.historyKey);
          return []
        }
      },
      setHistory ({ id, name }) {
        const history = this.getHistory()
        let index = -1;
        history.forEach((item, idx) => {
          if (item.id === id) {
            index = idx
          }
        })
        if (index !== -1) {
          history.splice(index, 1)
        }
        history.unshift({
          id, name
        })
        this.$cache.set(this.historyKey, JSON.stringify(history))
        this.history = history
      },
      clearHistory () {
        this.$cache.remove(this.historyKey);
        this.history = [];
        this.$toast.info('删除成功')
      },
      goToBangumiPage (bangumi) {
        this.setHistory({
          id: bangumi.id,
          name: bangumi.name
        });
        this.$f7router.navigate(`/bangumi/${bangumi.id}`);
        this.$refs.search.clear();
        this.closeSearchBar();
      },
      getSearchBangumi () {
        document.querySelector('.searchbar-backdrop').classList.remove('searchbar-backdrop-in');
        if (this.bangumis.length) {
          return
        }
        getAllBangumi().then((data) => {
          this.bangumis = data
        }).catch(() => {});
      },
      closeSearchBar () {
        this.popupOpened = false
      }
    }
  }
</script>

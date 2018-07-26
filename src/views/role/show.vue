<style lang="scss">

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
      source
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
    components: {

    },
    data () {
      return {
        source: null
      }
    },
    computed: {
      id () {
        return +this.$f7route.params.id
      },
      role () {
        return this.source.data
      },
      bangumi () {
        return this.source.bangumi
      }
    },
    created () {
      this.getData()
    },
    methods: {
      async getData () {
        try {
          this.source = await getRoleInfo({
            roleId: this.id
          })
        } catch (e) {
          this.$toast.error(e)
        }
      }
    }
  }
</script>

<template>
  <f7-nav-right>
    <f7-link
      icon-f7="tape_fill"
      icon-color="pink"
      @click="actionGridOpened = true"
    />
    <f7-actions
      :opened="actionGridOpened"
      @actions:closed="actionGridOpened = false"
    >
      <f7-actions-group>
        <slot/>
        <f7-actions-button>举报</f7-actions-button>
      </f7-actions-group>
      <f7-actions-group>
        <f7-actions-button>取消</f7-actions-button>
      </f7-actions-group>
    </f7-actions>
  </f7-nav-right>
</template>

<script>
  export default {
    name: 'PageActions',
    props: {
      id: {
        required: true,
        type: Number
      },
      type: {
        required: true,
        type: String
      }
    },
    data () {
      return {
        actionGridOpened: false
      }
    }
  }
</script>

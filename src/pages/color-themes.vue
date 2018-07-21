<template>
  <f7-page>
    <f7-navbar
      title="Color Themes"
      back-link="Back"
    />
    <f7-block-title>Layout Themes</f7-block-title>
    <f7-block>
      <p>Framework7 comes with 2 main layout themes: Light (default) and Dark:</p>
      <f7-row>
        <f7-col
          width="50"
          class="bg-color-white"
          style="cursor: pointer; padding: 30px; border: 1px solid rgba(0,0,0,0.1)"
          @click.native="setLayoutTheme('light')"
        />
        <f7-col
          width="50"
          class="bg-color-black"
          style="cursor: pointer; padding: 30px; border: 1px solid rgba(255,255,255,0.1)"
          @click.native="setLayoutTheme('dark')"
        />
      </f7-row>
    </f7-block>
    <f7-block-title>Choose Color Theme</f7-block-title>
    <f7-block>
      <p>Framework7 comes with {{ colorsAmount }} color themes set.</p>
      <f7-row>
        <f7-col
          v-for="color in colors"
          :key="color"
          width="33"
        >
          <f7-button
            :color="color"
            style="margin-bottom:1em; text-transform: capitalize;"
            fill
            round
            raised
            @click="setColorTheme(color)"
          >
            {{ color }}
          </f7-button>
        </f7-col>
        <f7-col width="33"/>
      </f7-row>
    </f7-block>
  </f7-page>
</template>
<script>
  export default {
    data() {
      const colors = [
        'red',
        'green',
        'blue',
        'pink',
        'yellow',
        'orange',
        'gray',
        'black',
      ];
      return {
        colors,
        colorsAmount: colors.length,
      };
    },
    methods: {
      setLayoutTheme(theme) {
        const app = this.$f7;
        app.root.removeClass('theme-dark theme-light').addClass(`theme-${theme}`);
      },
      setColorTheme(color) {
        const app = this.$f7;
        const currentColorClass = app.root[0].className.match(/color-theme-([a-z]*)/);
        if (currentColorClass) app.root.removeClass(currentColorClass[0]);
        app.root.addClass(`color-theme-${color}`);
      },
    },
  };
</script>

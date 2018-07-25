import Vue from 'vue'

Vue.mixin({
  methods: {
    $computeImageAspect (image) {
      const width = image.width
      const height = image.height

      if (!width || !height) {
        return 0
      }

      return height / width
    }
  }
})

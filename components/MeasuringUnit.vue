<template>
  <span class="ml-1">
    {{ unit }}<sup>{{ sup }}</sup>
  </span>
</template>

<script>
export default {
  name: 'MeasuringUnit',
  props: {
    value: {
      type: String,
      default() {
        return 'm'
      },
    },
  },
  computed: {
    unit() {
      return this.value.slice(0, 1)
    },
    sup() {
      if (this.value.length === 1) {
        return null
      } else if (this.value.length === 2) {
        return this.value.slice(1, 2)
      }
      return null
    },
  },
}
</script>

<style scoped></style>

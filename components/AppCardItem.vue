<template>
  <v-btn
    class="flex-grow-1 px-0 dense-letters"
    tile
    :height="height"
    text
    :class="{ 'disable-events': checked }"
    v-on="on"
  >
    <v-icon :color="checkIconColor" class="mr-2">{{ checkIconStr }}</v-icon>
    <span class="mr-1">{{ name | uppercase }} :</span>
    <template v-if="extended">
      <span v-for="(property, index) in properties" :key="index">
        <v-chip
          :color="property.checked ? 'white' : 'yellow'"
          class="px-1"
          label
        >
          {{ property.checked ? property.value : '?' }}
        </v-chip>
        <span v-if="property.measuringUnit" class="denser-letters">
          {{ property.measuringUnit.slice(0, 1) }}
          <sup v-if="property.measuringUnit.length > 1">{{
            property.measuringUnit.slice(1, 2)
          }}</sup>
        </span>
        <v-icon v-if="index === 0" size="small">{{ operationSymbol }}</v-icon>
      </span>
    </template>
    <template v-else>
      <v-chip :color="checked ? 'white' : 'yellow'" class="px-1" label>
        {{ checked ? value : '?' }}
      </v-chip>
      <span v-if="measuringUnit" class="denser-letters">
        {{ measuringUnit.slice(0, 1) }}
        <sup v-if="measuringUnit.length > 1">{{
          measuringUnit.slice(1, 2)
        }}</sup>
      </span>
    </template>
  </v-btn>
</template>

<script>
export default {
  name: 'AppCardItem',
  props: {
    name: {
      type: String,
      default: '',
    },
    checked: {
      type: Boolean,
      default: false,
    },
    measuringUnit: {
      type: String,
      default: undefined,
    },
    properties: {
      type: Array,
      default() {
        return []
      },
    },
    value: {
      type: [Number, String],
      default: 0,
    },
    extended: {
      type: Boolean,
      default: false,
    },
    operation: {
      type: String,
      default: '',
    },
    height: {
      type: Number,
      default: 48,
    },
    on: {
      type: Object,
      default() {},
    },
  },
  computed: {
    checkIconColor() {
      return this.checked ? 'primary' : 'grey'
    },
    checkIconStr() {
      return this.checked
        ? 'mdi-checkbox-marked-outline'
        : 'mdi-checkbox-blank-outline'
    },
    operationSymbol() {
      return this.operation === 'multiply' ? 'mdi-close' : 'mdi-plus'
    },
  },
}
</script>

<style scoped>
.dense-letters {
  letter-spacing: -0.01em;
}
.denser-letters {
  font-size: 0.85em;
  text-transform: lowercase;
  letter-spacing: -0.1em;
}
.disable-events {
  pointer-events: none;
}
</style>

<template>
  <v-card
    class="h-full d-flex align-center"
    :class="{
      'justify-end': !reverse,
      'justify-start': reverse,
      'flex-wrap-reverse': reverse,
    }"
    elevation="5"
  >
    <div
      class="d-flex pa-1 align-center flex-column"
      :class="{ 'order-5': reverse }"
    >
      <v-avatar small size="50">
        <v-img :src="image" :alt="name" />
      </v-avatar>
      <div class="align-center pt-1">
        <span class="font-weight-medium text-body-2">
          {{ name | uppercase }}
        </span>
      </div>
    </div>
    <v-divider :class="{ 'order-4': reverse }" vertical></v-divider>
    <div
      v-if="subItems.length > 0"
      class="d-flex align-center flex-column"
      :class="{ 'order-3': reverse }"
    >
      <div
        v-for="(sub, index) in subItems"
        :key="index"
        class="d-flex ma-1"
        :class="{ 'flex-wrap-reverse': reverse }"
      >
        <v-chip
          class="px-1"
          :class="{ 'order-5': reverse }"
          :color="index === 0 ? color : hexColor"
          :text-color="index === 0 ? 'black' : 'white'"
          label
          small
        >
          {{ sub.name.toUpperCase() }}
          ( {{ sub.properties[0].value }}
          <span
            v-if="sub.properties[0].measuringUnit"
            class="denser-letters mx-1"
          >
            {{ sub.properties[0].measuringUnit.slice(0, 1) }}
            <sup v-if="sub.properties[0].measuringUnit.length > 1">{{
              sub.properties[0].measuringUnit.slice(1, 2)
            }}</sup>
          </span>
          )
        </v-chip>
        <v-icon :class="{ 'order-4': reverse }" size="small">mdi-close</v-icon>
        <v-chip class="px-2" :class="{ 'order-3': reverse }" small>
          {{ sub.properties[1].value }}
        </v-chip>
        <v-icon :class="{ 'order-2': reverse }" size="small">mdi-equal</v-icon>
        <v-chip class="px-2" :class="{ 'order-1': reverse }" label small>
          {{ sub.properties[1].value * sub.properties[0].value }}
        </v-chip>
      </div>
    </div>
    <v-divider
      v-if="subItems.length > 0"
      :class="{ 'order-2': reverse }"
      vertical
    ></v-divider>
    <div
      class="d-flex align-center flex-column"
      :class="{ 'order-1': reverse }"
    >
      <div
        class="d-flex ma-1 align-center"
        :class="{ 'flex-wrap-reverse': reverse }"
      >
        <v-chip
          class="font-weight-bold px-1"
          :class="{ 'order-5': reverse }"
          :color="color"
          text-color="black"
          label
          small
        >
          {{ properties[0].value }}
          <span v-if="properties[0].measuringUnit" class="denser-letters mx-1">
            {{ properties[0].measuringUnit.slice(0, 1) }}
            <sup v-if="properties[0].measuringUnit.length > 1">{{
              properties[0].measuringUnit.slice(1, 2)
            }}</sup>
          </span>
        </v-chip>
        <v-icon :class="{ 'order-4': reverse }" size="small">mdi-close</v-icon>
        <v-chip
          class="font-weight-bold px-2"
          :class="{ 'order-3': reverse }"
          small
        >
          {{ properties[1].value }}
        </v-chip>
        <v-icon :class="{ 'order-2': reverse }" size="small">mdi-equal</v-icon>
        <v-chip
          class="font-weight-bold text-body-1 px-1"
          :class="{ 'order-1': reverse }"
          :color="hexColor"
          text-color="white"
        >
          {{ properties[2].value }}
          <span v-if="properties[2].measuringUnit" class="denser-letters mx-1">
            {{ properties[2].measuringUnit.slice(0, 1) }}
            <sup v-if="properties[2].measuringUnit.length > 1">{{
              properties[2].measuringUnit.slice(1, 2)
            }}</sup>
          </span>
        </v-chip>
      </div>
    </div>
  </v-card>
</template>

<script>
export default {
  name: 'ItemsListPanel',
  props: {
    reverse: {
      type: Boolean,
      default: false,
    },
    image: {
      type: String,
      default: '',
    },
    color: {
      type: String,
      default: '',
    },
    hexColor: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
    extended: {
      type: Boolean,
      default: false,
    },
    checked: {
      type: Boolean,
      default: false,
    },
    subItems: {
      type: Array,
      default() {
        return []
      },
    },
    properties: {
      type: Array,
      default() {
        return []
      },
    },
  },
  computed: {},
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

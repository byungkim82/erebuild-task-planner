<template>
  <v-expansion-panels
    v-model="selectedItem"
    focusable
    accordion
    @change="changeItem"
  >
    <v-expansion-panel v-for="(item, index) in items" :key="'panel-' + index">
      <v-expansion-panel-header :disable-icon-rotate="item.completed">
        {{ `${category.toUpperCase()} ${index + 1} : ` }}
        <span class="font-weight-bold ml-2">{{ item.name }}</span>
        <span class="text--secondary text-body-2 ml-auto">
          <slot name="header" v-bind="{ item: item, itemIndex: index }"></slot>
        </span>
        <template v-if="item.completed" #actions>
          <v-icon color="teal">mdi-check</v-icon>
        </template>
        <template v-else #actions>
          <v-icon>mdi-menu-down</v-icon>
        </template>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <slot name="content" v-bind="{ item: item, itemIndex: index }"></slot>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
export default {
  name: 'ItemListPanel',
  props: {
    category: {
      type: String,
      required: true,
      default: 'item',
    },
    items: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      defaultItem: 0,
      colors: ['primary', 'light-blue', 'indigo', 'purple'],
    }
  },
  computed: {
    selectedItem: {
      get() {
        return this.defaultItem
      },
      set(newValue) {
        this.defaultItem = newValue
      },
    },
  },
  methods: {
    changeItem(itemNumber) {
      this.$emit('change', itemNumber)
    },
  },
}
</script>

<style scoped></style>

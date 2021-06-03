<template>
  <v-card class="h-full d-flex flex-column" elevation="5">
    <v-badge
      :color="checked ? 'primary' : ''"
      :icon="checked ? 'mdi-check' : ''"
      offset-x="30"
      offset-y="30"
      overlap
      bordered
    >
      <div class="pa-3 flex-grow-1">
        <div class="d-flex align-center flex-column">
          <v-avatar small size="120">
            <v-img :src="image" :alt="name" />
          </v-avatar>
          <div class="text-center mt-2">
            <span class="font-weight-bold text-body-1">{{
              name | uppercase
            }}</span>
          </div>
        </div>
      </div>
    </v-badge>
    <v-divider></v-divider>

    <template v-for="(member, index) in members">
      <div :key="'div-' + index" class="d-flex">
        <question-prompt>
          <template #default="slotProps">
            <app-card-item
              v-bind="{
                on: slotProps.on,
                isMember: true,
                operation: 'multiply',
                ...member,
                ...slotProps.attrs,
              }"
            ></app-card-item>
          </template>
        </question-prompt>
      </div>
      <v-divider :key="'divider-' + index"></v-divider>
    </template>
    <div class="d-flex">
      <v-btn
        class="flex-grow-1"
        tile
        height="30"
        :color="color"
        @click="reveal = true"
      >
        Learn More
      </v-btn>
    </div>
    <v-expand-transition>
      <v-card
        v-if="reveal"
        :color="color"
        class="transition-fast-in-fast-out v-card--reveal"
        style="height: 100%"
      >
        <div class="pa-3 flex-grow-1">
          <div class="d-flex align-center flex-column">
            <v-avatar small size="72">
              <v-img :src="image" :alt="name" />
            </v-avatar>
            <div class="text-center mt-2">
              <span class="font-weight-bold text-body-1">{{
                name | uppercase
              }}</span>
            </div>
          </div>
        </div>
        <v-divider></v-divider>
        <template v-for="(property, index) in properties">
          <div :key="'item-' + index" class="d-flex">
            <question-prompt v-slot="slotProps">
              <app-card-item
                v-bind="{
                  on: slotProps.on,
                  isMember: false,
                  ...property,
                  ...slotProps.attrs,
                }"
              ></app-card-item>
            </question-prompt>
          </div>
          <v-divider :key="'divider-' + index"></v-divider>
        </template>
        <v-divider></v-divider>
        <div class="d-flex">
          <v-btn
            class="flex-grow-1"
            dark
            tile
            height="30"
            :color="hexColor"
            @click="reveal = false"
          >
            Close
          </v-btn>
        </div>
      </v-card>
    </v-expand-transition>
  </v-card>
</template>

<script>
import AppCardItem from '~/components/AppCardItem'
import QuestionPrompt from '~/components/QuestionPrompt'
export default {
  name: 'AppCard',
  components: {
    AppCardItem,
    QuestionPrompt,
  },
  props: {
    name: {
      type: String,
      default: '',
    },
    type: {
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
    image: {
      type: String,
      default: '',
    },
    measuringUnit: {
      type: String,
      default: '',
    },
    checked: {
      type: Boolean,
      default: false,
    },
    properties: {
      type: Array,
      default() {
        return []
      },
    },
    members: {
      type: Array,
      default() {
        return []
      },
    },
  },
  data() {
    return {
      reveal: false,
    }
  },
  computed: {},
}
</script>
<style scoped>
.v-card--reveal {
  bottom: 0;
  opacity: 1 !important;
  position: absolute;
  width: 100%;
}
</style>

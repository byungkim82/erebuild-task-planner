<template>
  <div>
    <v-row class="my-2">
      <v-col cols="3" class="pr-0 py-0 text-center">
        <draggable
          class="unallocated px-2"
          :list="occupants"
          :group="{ name: 'occupant', pull: 'clone', put: false }"
          :move="moveCallback"
          :clone="cloneCallback"
          :sort="false"
        >
          <v-chip
            v-for="occupant in occupants"
            :key="occupant.id"
            :color="occupant.color"
            class="occupant pa-1 ma-1"
            dark
          >
            {{ occupant.name }}:
            <span class="mx-2 text-h6 font-weight-bold white--text">
              {{ occupant.count }}
            </span>
          </v-chip>
        </draggable>
        <v-btn class="mt-2" color="red" dark small @click="reset()"
          >Reset</v-btn
        >
      </v-col>
      <v-col cols="9" class="pl-0 py-0">
        <v-col
          v-for="container in containers"
          :key="container.id"
          cols="12"
          class="py-1 pr-4"
        >
          <v-sheet elevation="10" rounded>
            <v-sheet
              class="px-1 py-0 primary d-flex justify-space-between"
              rounded
              dark
            >
              <span class="mx-2" style="font-size: 0.75rem">{{
                container.name | capitalize(true)
              }}</span>
              <span class="mr-6" style="font-size: 0.75rem"
                >Remaining Space:
                <span class="ml-2 yellow--text">
                  <template v-if="container.occupants.length > 0">
                    {{
                      remainingSpace(container.unitSpace, container.occupants)
                    }}
                  </template>
                  <template v-else>
                    {{ container.unitSpace }}
                  </template>
                  m<sup>2</sup>
                </span>
              </span>
            </v-sheet>
            <draggable
              class="allocated pa-1"
              :list="container.occupants"
              :group="{ name: 'occupant' }"
              :sort="false"
              :move="moveCallback"
              :total="container.unitSpace"
              style="min-width: 100px; min-height: 20px"
              @change="onChange"
            >
              <v-chip
                v-for="occupant in container.occupants"
                :key="occupant.id"
                :color="occupant.color"
                class="pa-1 ma-1"
                small
                dark
              >
                {{ occupant.name.split(' ')[0] }}
              </v-chip>
            </draggable>
          </v-sheet>
        </v-col>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import draggable from 'vuedraggable'

export default {
  name: 'AllocatingPractice',
  components: {
    draggable,
  },
  data() {
    return {
      colors: ['primary', 'orange', 'teal', 'purple'],
      occupants: this.$store.getters['occupants/occupantsForPractice'],
      containers: this.$store.getters['dwellings/containersForPractice'],
    }
  },
  computed: {},
  methods: {
    reset() {
      this.occupants.forEach((x) => (x.count = x.initialCount))
      this.containers.forEach((x) => (x.occupants = []))
    },
    createCloneId(oldId, newId) {
      return `occupant-${oldId.toString()}-${newId.toString()}`
    },
    cloneCallback(occupant) {
      if (occupant.count > 0) {
        return {
          ...occupant,
          id: this.createCloneId(occupant.id, occupant.cloneId),
          originalId: occupant.id,
          count: 1,
        }
      }
    },
    onChange(evt) {
      if (evt.added) {
        this.onAdded(evt.added)
      } else if (evt.removed) {
        this.onRemoved(evt.removed)
      }
    },
    moveCallback(evt) {
      if (evt.to.classList.contains('allocated')) {
        return (
          evt.draggedContext.element.unitSpace <=
          this.remainingSpace(
            evt.relatedContext.component.$attrs.total,
            evt.relatedContext.list
          )
        )
      }
    },
    onAdded(evt) {
      const occupant = this.occupants[evt.element.originalId - 1]
      occupant.count--
      occupant.cloneId++
    },
    onRemoved(evt) {
      const occupant = this.occupants[evt.element.originalId - 1]
      occupant.count++
    },
    remainingSpace(totalSpace, occupants = []) {
      let sum = 0
      if (occupants.length === 0) {
        sum = 0
      } else {
        occupants.map((x) => (sum += x.unitSpace))
      }
      return totalSpace - sum
    },
  },
}
</script>

<style scoped></style>

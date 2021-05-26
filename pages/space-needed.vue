<template>
  <v-card>
    <v-row>
      <v-col cols="6" class="pr-0">
        <div v-for="(occupant, index) in occupants" :key="occupant.name">
          <v-btn class="my-2 mx-1" x-large :color="colors[index]">
            <v-avatar class="mr-3" :color="colors[index] + ' lighten-3'">
              <img :src="occupant.properties.url" :alt="occupant.name" />
            </v-avatar>
            {{ occupant.name }}
          </v-btn>
        </div>
      </v-col>
      <v-col cols="6" class="pl-0">
        <item-list-panel
          category="occupant"
          :items="occupants"
          @change="selectOccupant"
        >
          <template #header="{ item }">
            <template v-if="item.completed">
              Space Needed:
              {{ item.properties.unitSpace * item.properties.count }}
              m<sup>2</sup>
            </template>
          </template>
          <template #content="{ item, itemIndex }">
            <template v-if="item.type === 'group'">
              <span
                v-for="(member, mIndex) in item.members"
                :key="'member-chip-' + itemIndex + '-' + mIndex"
              >
                <v-chip
                  :color="colors[mIndex]"
                  text-color="white"
                  class="ma-2"
                  small
                >
                  {{ member.properties.count }} {{ member.name | capitalize }}
                  <span class="mx-2">X</span>
                  {{ member.properties.unitSpace }}
                  <measuring-unit
                    :value="member.properties.measuringUnit"
                  ></measuring-unit>
                </v-chip>
                <span v-if="mIndex + 1 < item.members.length"> + </span>
              </span>
            </template>
            <template v-else>
              <v-chip
                :color="colors[itemIndex]"
                text-color="white"
                class="ma-2"
                small
              >
                {{ item.properties.count }} {{ item.name | capitalize }}
                <span class="mx-2">X</span>
                {{ item.properties.unitSpace }}
                <measuring-unit
                  :value="item.properties.measuringUnit"
                ></measuring-unit>
              </v-chip>
            </template>
          </template>
        </item-list-panel>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import pluralize from 'pluralize'
import ItemListPanel from '~/components/ItemListPanel'
// import QuestionPrompt from '~/components/QuestionPrompt'
import MeasuringUnit from '~/components/MeasuringUnit'
export default {
  name: 'SpaceNeeded',
  components: { ItemListPanel, MeasuringUnit },
  data() {
    return {
      gameLevel: 'DesertFill01',
      selectedOccupant: 0,
      colors: ['primary', 'light-blue', 'indigo', 'purple'],
      occupants: [
        {
          name: '1/1 Family',
          type: 'group',
          properties: {
            count: 4,
            unitSpace: 6,
            measuringUnit: 'm2',
            url: '/one_and_one_family.png',
          },
          members: [
            {
              name: 'adult',
              type: 'individual',
              properties: {
                count: 1,
                unitSpace: 4,
                measuringUnit: 'm2',
              },
            },
            {
              name: 'child',
              type: 'individual',
              properties: {
                count: 1,
                unitSpace: 2,
                measuringUnit: 'm2',
              },
            },
          ],
        },
        {
          name: '1/2 Family',
          type: 'group',
          properties: {
            count: 2,
            unitSpace: 8,
            measuringUnit: 'm2',
            url: '/one_and_two_family.png',
          },
          members: [
            {
              name: 'adult',
              type: 'individual',
              properties: {
                count: 1,
                unitSpace: 4,
                measuringUnit: 'm2',
              },
            },
            {
              name: 'child',
              type: 'individual',
              properties: {
                count: 2,
                unitSpace: 2,
                measuringUnit: 'm2',
              },
            },
          ],
        },
        {
          name: '2/1 Family',
          type: 'group',
          properties: {
            count: 2,
            unitSpace: 10,
            measuringUnit: 'm2',
            url: '/two_and_one_family.png',
          },
          members: [
            {
              name: 'adult',
              type: 'individual',
              properties: {
                count: 2,
                unitSpace: 4,
                measuringUnit: 'm2',
              },
            },
            {
              name: 'child',
              type: 'individual',
              properties: {
                count: 1,
                unitSpace: 2,
                measuringUnit: 'm2',
              },
            },
          ],
        },
        {
          name: '2/2 Family',
          type: 'group',
          properties: {
            count: 3,
            unitSpace: 12,
            measuringUnit: 'm2',
            url: '/two_and_two_family.png',
          },
          members: [
            {
              name: 'adult',
              type: 'individual',
              properties: {
                count: 2,
                unitSpace: 4,
                measuringUnit: 'm2',
              },
            },
            {
              name: 'child',
              type: 'individual',
              properties: {
                count: 2,
                unitSpace: 2,
                measuringUnit: 'm2',
              },
            },
          ],
        },
      ],
    }
  },
  methods: {
    selectOccupant(itemIndex) {
      this.selectedOccupant = itemIndex
    },
    unitMeasure(unit) {
      if (unit.length === 1) {
        return unit.slice(0, 1)
      } else if (unit.length === 2) {
        return unit.slice(0, 1) + '<sup>' + unit.slice(1, 2) + '</sup>'
      }
      return null
    },
    feedQuestionPrompt(occupant, index) {
      return {
        activator: {
          color: this.colors[index] + ' darken-2',
          title: 'Read More',
        },
        title: this.dialogTitle(occupant),
        question: this.question(occupant),
        inputType: 'number',
        hasUnit: true,
        measuringUnit: occupant.properties.measuringUnit,
        answer: this.answer(occupant),
        tip: '',
        hintFeedback: this.hintFeedback(occupant),
      }
    },
    question(occupant) {
      return `How much floor space is needed to place all ${pluralize(
        occupant.name
      )}?`
    },
    dialogTitle(occupant) {
      return `Floor Space Needed for All ${pluralize(occupant.name)}`
    },
    answer(occupant) {
      return occupant.properties.count * occupant.properties.unitSpace
    },
    hintFeedback(occupant) {
      return `Think about the floor space needed for one ${
        occupant.name
      }. You can also check out how many ${pluralize(
        occupant.name
      )} are in the inventory.`
    },
    tip(occupant) {
      return `${occupant}`
    },
  },
}
</script>

<style scoped></style>

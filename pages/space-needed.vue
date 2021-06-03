<template>
  <v-row class="py-1" justify="center" dense>
    <v-col
      v-for="(occupant, oIdx) in occupants"
      :key="oIdx"
      :cols="12 / occupants.length"
    >
      <app-cards
        v-bind="{
          extended: occupant.type === 'group',
          color: colors[oIdx].str,
          hexColor: colors[oIdx].hex,
          ...occupant,
        }"
      >
        <template v-if="occupant.type === 'group'" #front>
          <template v-for="(member, mIdx) in occupant.members">
            <div :key="'div-' + mIdx" class="d-flex">
              <question-prompt
                v-bind="feedMemberData(oIdx, mIdx, 0)"
                @proceeded="checkMemberProperty(oIdx, mIdx, 0)"
              >
                <template #activator="slotProps">
                  <app-card-item
                    v-bind="{
                      extended: true,
                      on: slotProps.on,
                      operation: 'multiply',
                      ...member,
                      ...slotProps.attrs,
                    }"
                  ></app-card-item>
                </template>
              </question-prompt>
            </div>
            <v-divider
              v-if="mIdx < occupant.members.length - 1"
              :key="'divider-' + mIdx"
            ></v-divider>
          </template>
        </template>
        <template v-else #front>
          <template v-for="(property, pIdx) in occupant.properties">
            <div :key="'div-' + pIdx" class="d-flex">
              <question-prompt
                v-bind="feedOccupantData(oIdx, pIdx)"
                @proceeded="checkProperty(oIdx, pIdx)"
              >
                <template #activator="slotProps">
                  <app-card-item
                    v-bind="{
                      isMember: false,
                      on: slotProps.on,
                      ...property,
                    }"
                  ></app-card-item>
                </template>
              </question-prompt>
            </div>
            <v-divider
              v-if="pIdx < occupant.properties.length - 1"
              :key="'divider-' + pIdx"
            ></v-divider>
          </template>
        </template>
        <template v-if="occupant.type === 'group'" #back>
          <template v-for="(property, pIdx) in occupant.properties">
            <div :key="'div-' + pIdx" class="d-flex">
              <question-prompt
                v-bind="feedOccupantData(oIdx, pIdx)"
                @proceeded="checkProperty(oIdx, pIdx)"
              >
                <template #activator="slotProps">
                  <app-card-item
                    v-bind="{
                      isMember: false,
                      on: slotProps.on,
                      ...property,
                    }"
                  ></app-card-item>
                </template>
              </question-prompt>
            </div>
            <v-divider
              v-if="pIdx < occupant.properties.length - 1"
              :key="'divider-' + pIdx"
            ></v-divider>
          </template>
        </template>
      </app-cards>
    </v-col>
  </v-row>
</template>

<script>
import pluralize from 'pluralize'
import AppCards from '~/components/AppCards'
import AppCardItem from '~/components/AppCardItem'
import QuestionPrompt from '~/components/QuestionPrompt'
export default {
  name: 'SpaceNeeded',
  components: { AppCards, AppCardItem, QuestionPrompt },
  data() {
    return {
      checked: false,
    }
  },
  computed: {
    colors() {
      return this.$store.state.colors
    },
    occupants() {
      return this.$store.state.occupants.list
    },
  },
  methods: {
    feedMemberData(occupantIndex, memberIndex, propertyIndex) {
      const occupant = this.occupants[occupantIndex]
      const member = occupant.members[memberIndex]
      const property = member.properties[propertyIndex]
      const common = {
        inputType: 'number',
        hasUnit: !!property.measuringUnit,
        measuringUnit: property.measuringUnit,
        answer: property.value,
      }

      if (property.name === 'unit space') {
        return {
          title: `Floor Space Needed for One ${member.name}`,
          question: `How much floor space does one ${member.name} need?`,
          hintFeedback: `Please check out the ratio of spatial need between ${occupant.members[0].name} and ${occupant.members[1].name}.`,
          ...common,
        }
      } else if (property.name === 'count') {
        return {
          title: `The Number of ${pluralize(member.name)} in One ${
            occupant.name
          }`,
          question: `How many ${pluralize(member.name)} are in one ${
            occupant.name
          }?`,
          hintFeedback: `Please check the information on the number of ${pluralize(
            member.name
          )} in one ${occupant.name}.`,
          ...common,
        }
      }
    },
    feedOccupantData(occupantIndex, propertyIndex) {
      const occupant = this.occupants[occupantIndex]
      const property = occupant.properties[propertyIndex]
      const common = {
        inputType: 'number',
        hasUnit: !!property.measuringUnit,
        measuringUnit: property.measuringUnit,
        answer: property.value,
      }

      if (property.name === 'unit space') {
        const hintFeedback =
          occupant.type === 'group'
            ? `What is the sum of space needed for ${occupant.members[0].name} and ${occupant.members[1].name}?`
            : `Please check out the player inventory to see the required floor space for one ${occupant.name}.`
        return {
          title: `Floor Space Needed for One ${occupant.name}`,
          question: `How much floor space is needed to place one ${occupant.name}?`,
          hintFeedback,
          ...common,
        }
      } else if (property.name === 'count') {
        return {
          title: `The Number of ${pluralize(occupant.name)} You Have`,
          question: `How many ${pluralize(
            occupant.name
          )} do you need to place in total?`,
          hintFeedback: `Please check the information on the number of ${pluralize(
            occupant.name
          )} in the player inventory at the beginning.`,
          ...common,
        }
      } else if (property.name === 'total space') {
        return {
          title: `Floor Space Needed for All ${pluralize(occupant.name)}`,
          question: `How much floor space is needed to place all ${pluralize(
            occupant.name
          )}?`,
          hintFeedback: `Think about the floor space needed for one ${
            occupant.name
          }. You can also check out how many ${pluralize(
            occupant.name
          )} you have in the inventory at the beginning.`,
          ...common,
        }
      }
    },
    checkMember(occupantIndex, memberIndex) {
      this.$store.commit('occupants/checkMember', {
        occupantIndex,
        memberIndex,
      })
    },
    checkMemberProperty(occupantIndex, memberIndex, propertyIndex) {
      this.$store.commit('occupants/checkMemberProperty', {
        occupantIndex,
        memberIndex,
        propertyIndex,
      })
    },
    checkProperty(occupantIndex, propertyIndex) {
      this.$store.commit('occupants/checkProperty', {
        occupantIndex,
        propertyIndex,
      })
    },
    checkOccupant(occupantIndex) {
      this.$store.commit('occupants/checkOccupant', occupantIndex)
    },
  },
}
</script>

<style scoped></style>

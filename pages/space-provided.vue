<template>
  <v-row class="py-1" justify="center" dense>
    <v-col v-for="(dwelling, dIdx) in dwellings" :key="dIdx" cols="4">
      <app-cards
        v-bind="{
          extended: true,
          color: colors[dIdx].str,
          hexColor: colors[dIdx].hex,
          ...dwelling,
        }"
      >
        <template #front>
          <template
            v-for="(value, vIdx) in dwelling.mathValues.filter(
              (value) => value.required === true
            )"
          >
            <div :key="'div-' + vIdx" class="d-flex">
              <question-prompt
                v-bind="feedMathValueData(dIdx, vIdx)"
                @proceeded="checkMathValues(dIdx, vIdx)"
              >
                <template #activator="slotProps">
                  <app-card-item
                    v-bind="{ extended: false, on: slotProps.on, ...value }"
                  >
                  </app-card-item>
                </template>
              </question-prompt>
            </div>
            <v-divider :key="'divider-' + vIdx"></v-divider>
          </template>
        </template>
        <template #back>
          <template
            v-for="(property, pIdx) in dwelling.properties.filter(
              (property) => property.required === true
            )"
          >
            <div :key="'div-' + pIdx" class="d-flex">
              <question-prompt
                v-bind="feedPropertyData(dIdx, pIdx)"
                @proceeded="checkProperty(dIdx, pIdx)"
              >
                <template #activator="slotProps">
                  <app-card-item
                    v-bind="{ extended: false, on: slotProps.on, ...property }"
                  >
                  </app-card-item>
                </template>
              </question-prompt>
            </div>
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
  name: 'SpaceProvided',
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
    dwellings() {
      return this.$store.state.dwellings.list
    },
  },
  methods: {
    feedMathValueData(dwellingIndex, valueIndex) {
      const dwelling = this.dwellings[dwellingIndex]
      const value = dwelling.mathValues[valueIndex]

      return {
        title: `The Length of ${dwelling.name}`,
        question: `What is the length of this ${dwelling.name} need?`,
        hintFeedback: `Please check the information on the ${value.name} of the ${dwelling.name} using the tooltip in the game.`,
        inputType: 'number',
        hasUnit: !!value.measuringUnit,
        measuringUnit: value.measuringUnit,
        answer: value.value,
      }
    },
    feedPropertyData(dwellingIndex, propertyIndex) {
      const dwelling = this.dwellings[dwellingIndex]
      const property = dwelling.properties[propertyIndex]
      const common = {
        inputType: 'number',
        hasUnit: !!property.measuringUnit,
        measuringUnit: property.measuringUnit,
        answer: property.value,
      }

      if (property.name === 'unit space') {
        return {
          title: `Floor Space Provided by One ${dwelling.name}`,
          question: `How much floor space does one ${dwelling.name} provide?`,
          hintFeedback: `Please check out the length and width of the ${dwelling.name} and multiply the two.`,
          ...common,
        }
      } else if (property.name === 'count') {
        return {
          title: `The Number of ${pluralize(dwelling.name)} Placed`,
          question: `How many ${pluralize(
            dwelling.name
          )} are placed in the game?`,
          hintFeedback: `Return to the game and try counting how many ${pluralize(
            dwelling.name
          )} are placed there.`,
          ...common,
        }
      } else if (property.name === 'total space') {
        return {
          title: `Floor Space Provided by All ${pluralize(dwelling.name)}`,
          question: `How much floor space is provided in total by the ${pluralize(
            dwelling.name
          )}?`,
          hintFeedback: `(Total Space) = (Unit Space) X (Quantity)`,
          ...common,
        }
      }
    },
    checkMathValues(dwellingIndex, valueIndex) {
      this.$store.commit('dwellings/checkMathValues', {
        dwellingIndex,
        valueIndex,
      })
    },
    checkProperty(dwellingIndex, propertyIndex) {
      this.$store.commit('dwellings/checkProperty', {
        dwellingIndex,
        propertyIndex,
      })
    },
  },
}
</script>

<style scoped></style>

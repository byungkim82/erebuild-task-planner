<template>
  <v-dialog v-model="dialog" max-width="600px" persistent>
    <template v-if="activator" #activator="{ on, attrs }">
      <v-btn
        class="ma-2"
        :color="activator.color"
        v-bind="attrs"
        dark
        v-on="on"
      >
        {{ activator.title }}
      </v-btn>
    </template>
    <template v-else #activator="{ on, attrs }">
      <slot name="activator" :on="on" :attrs="attrs"></slot>
    </template>
    <v-card>
      <v-card-title
        class="py-2 subtitle-1 text--secondary light-blue lighten-4"
      >
        {{ title }}
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-container>
          <v-row class="my-2 text--primary text-body-1 font-weight-bold">
            {{ question | capitalize }}
          </v-row>
          <v-row>
            <v-col cols="9" class="mx-auto">
              <template v-if="inputType === 'number'">
                <v-text-field
                  v-model="userInput"
                  type="number"
                  :rules="rules"
                  label="Please enter your answer"
                  :hint="tip"
                  :disabled="completed"
                  autofocus
                  outlined
                >
                  <template v-if="hasUnit" #append>
                    <span v-html="unitMeasure"></span>
                  </template>
                </v-text-field>
              </template>
              <template v-else-if="inputType === 'radio'">
                <v-radio-group v-model="userInput" :disabled="completed">
                  <v-radio
                    v-for="(item, index) in choices"
                    :key="'radio-' + index"
                    :label="item.label"
                    :value="item.value"
                  ></v-radio>
                </v-radio-group>
              </template>
              <template v-else-if="inputType === 'checkbox'">
                <v-checkbox
                  v-for="(item, index) in choices"
                  :key="'checkbox-' + index"
                  v-model="userSelected"
                  class="my-0"
                  :label="item.label"
                  :value="item.value"
                  :readonly="completed"
                ></v-checkbox>
              </template>
            </v-col>
          </v-row>
          <v-row>
            <v-alert
              :value="validFeedbackAlert"
              class="mb-0 mx-auto"
              transition="scale-transition"
              type="success"
              dense
              >{{ validFeedback }}</v-alert
            >
            <v-alert
              :value="invalidFeedbackAlert"
              class="mb-0 mx-auto"
              transition="scale-transition"
              type="error"
              dense
              >{{ invalidFeedback }}</v-alert
            >
            <v-alert
              :value="hintFeedbackAlert"
              class="mb-0 mx-auto"
              transition="scale-transition"
              type="warning"
              dense
              >{{ hintFeedback }}</v-alert
            >
          </v-row>
        </v-container>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="amber darken-1" @click="dialog = false">Cancel</v-btn>
        <v-btn
          color="light-blue lighten-1"
          :disabled="completed"
          @click="submit"
          >Submit</v-btn
        >
        <v-btn
          color="purple lighten-3"
          :disabled="!completed || proceeded"
          @click="proceed"
          >Proceed</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'QuestionPrompt',
  props: {
    activator: {
      type: Object,
      default() {
        return undefined
      },
    },
    question: {
      type: String,
      required: true,
      default: 'question',
    },
    answer: {
      type: [Number, String, Array],
      required: true,
    },
    title: {
      type: String,
      required: true,
      default: 'title',
    },
    inputType: {
      type: String,
      required: true,
      default: 'number',
    },
    hasUnit: {
      type: Boolean,
      required: true,
      default: false,
    },
    choices: {
      type: Array,
      default() {
        return [
          { key: 'choice-1', label: 'Choice 1', value: 1 },
          { key: 'choice-2', label: 'Choice 2', value: 2 },
          { key: 'choice-3', label: 'Choice 3', value: 3 },
          { key: 'choice-4', label: 'Choice 4', value: 4 },
        ]
      },
    },
    measuringUnit: {
      type: String,
      required: true,
      default: '',
    },
    tip: {
      type: String,
      default: '',
    },
    hintFeedback: {
      type: String,
      required: true,
      default: '',
    },
    validFeedback: {
      type: String,
      default:
        'Great job! Please click on PROCEED button to move on to the next step.',
    },
    invalidFeedback: {
      type: String,
      default: "That's not correct. Please try again.",
    },
  },
  data() {
    return {
      dialog: false,
      validated: false,
      errorCount: 0,
      completed: false,
      proceeded: false,
      userInput: null,
      userSelected: [],
      rules: [(value) => !!value || 'Required'],
    }
  },
  computed: {
    unitMeasure() {
      if (this.measuringUnit.length === 1) {
        return this.measuringUnit.slice(0, 1)
      } else if (this.measuringUnit.length === 2) {
        return (
          this.measuringUnit.slice(0, 1) +
          '<sup>' +
          this.measuringUnit.slice(1, 2) +
          '</sup>'
        )
      }
      return null
    },
    validFeedbackAlert() {
      return this.validated && this.completed
    },
    invalidFeedbackAlert() {
      return this.validated && !this.completed && this.errorCount < 3
    },
    hintFeedbackAlert() {
      return this.validated && !this.completed && this.errorCount >= 3
    },
  },
  methods: {
    submit() {
      this.validated = false
      if (this.checkAnswer()) {
        this.completed = true
      } else {
        this.errorCount++
      }
      this.validated = true
    },
    proceed() {
      this.$emit('proceeded')
      this.dialog = false
      this.proceeded = true
    },
    checkAnswer() {
      let result = false
      if (this.inputType === 'number') {
        result = this.compareNumber()
      } else if (this.inputType === 'radio') {
        result = this.compareRadio()
      } else if (this.inputType === 'checkbox') {
        result = this.compareCheckBox()
      }
      return result
    },
    compareNumber() {
      return this.answer === parseInt(this.userInput)
    },
    compareRadio() {
      return this.answer === this.userInput
    },
    compareCheckBox() {
      // eslint-disable-next-line vue/no-mutating-props
      this.answer.sort((a, b) => a - b)
      this.userSelected.sort((a, b) => a - b)
      return JSON.stringify(this.answer) === JSON.stringify(this.userSelected)
    },
  },
}
</script>

<style scoped></style>

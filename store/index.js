export const strict = false

export const state = () => ({
  counter: 0,
  colors: [
    { str: 'deep-purple lighten-4', hex: '#8b72b1' },
    { str: 'cyan lighten-4', hex: '#57c0d1' },
    { str: 'red lighten-4', hex: '#ef857c' },
    { str: 'light-green lighten-3', hex: '#72bb34' },
  ],
  phases: [
    { name: 'Overview', to: '/' },
    { name: 'Space Needed', to: '/space-needed', checked: false },
    { name: 'Space Provided', to: '/space-provided', checked: false },
    { name: 'Space Comparison', to: '/space-comparison', checked: false },
    { name: 'Practice', to: '/allocating-practice', checked: false },
  ],
  level: {},
})

export const getters = {
  lightColor(state, colorIndex) {
    return state.colors[colorIndex].string
  },
  deepColor(state, colorIndex) {
    return state.colors[colorIndex].hex
  },
}

export const mutations = {
  checkPhase(state, { phaseIndex }) {
    const phases = state.phases
    phases[phaseIndex].checked = true
  },
}

export const actions = {
  checkPhase(context) {
    context.commit('checkPhase')
  },
}

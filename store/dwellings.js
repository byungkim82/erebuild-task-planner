export const state = () => ({
  list: [
    {
      name: 'shipping container',
      type: 'prefab building',
      image: '/images/dwellings/shipping-container-1.svg',
      checked: false,
      mathValues: [
        {
          name: 'length',
          value: 6,
          measuringUnit: 'm',
          required: true,
          checked: false,
        },
        {
          name: 'width',
          value: 4,
          measuringUnit: 'm',
          required: true,
          checked: false,
        },
        {
          name: 'height',
          value: 5,
          measuringUnit: 'm',
          required: false,
          checked: true,
        },
      ],
      properties: [
        {
          name: 'unit space',
          value: 24,
          measuringUnit: 'm2',
          required: true,
          checked: false,
        },
        { name: 'count', value: 4, required: true, checked: false },
        {
          name: 'total space',
          value: 96,
          measuringUnit: 'm2',
          required: true,
          checked: false,
        },
        {
          name: 'acceptable rate',
          value: 100,
          measuringUnit: '%',
          required: false,
          checked: true,
        },
      ],
    },
  ],
})

export const getters = {
  containersForPractice: (state) => {
    const containers = []
    for (let i = 0; i < state.list[0].properties[1].value; i++) {
      containers.push({
        id: i + 1,
        name: state.list[0].name,
        color: 'primary',
        unitSpace: state.list[0].properties[0].value,
        occupants: [],
      })
    }
    return containers
  },
}

export const mutations = {
  checkMathValues(state, { dwellingIndex, valueIndex }) {
    const dwelling = state.list[dwellingIndex]
    const mathValues = dwelling.mathValues
    mathValues[valueIndex].checked = true
  },
  checkProperty(state, { dwellingIndex, propertyIndex }) {
    const dwelling = state.list[dwellingIndex]
    const props = dwelling.properties
    props[propertyIndex].checked = true
    const result = props.every((prop) => {
      return prop.checked
    })
    if (result) {
      dwelling.checked = true
    }
  },
}

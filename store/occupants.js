export const state = () => ({
  list: [
    {
      name: '1/1 family',
      type: 'group',
      image: '/images/families/family-1-1.png',
      checked: false,
      properties: [
        {
          name: 'unit space',
          value: 6,
          measuringUnit: 'm2',
          checked: false,
        },
        { name: 'count', value: 2, checked: false },
        {
          name: 'total space',
          value: 12,
          measuringUnit: 'm2',
          checked: false,
        },
      ],
      members: [
        {
          name: 'adult',
          type: 'individual',
          properties: [
            {
              name: 'unit space',
              value: 4,
              measuringUnit: 'm2',
              checked: true,
            },
            { name: 'count', value: 1, checked: true },
          ],
          checked: true,
        },
        {
          name: 'child',
          type: 'individual',
          properties: [
            {
              name: 'unit space',
              value: 2,
              measuringUnit: 'm2',
              checked: false,
            },
            { name: 'count', value: 1, checked: true },
          ],
          checked: false,
        },
      ],
    },
    {
      name: '1/2 family',
      type: 'group',
      image: '/images/families/family-1-2.png',
      checked: false,
      properties: [
        {
          name: 'unit space',
          value: 8,
          measuringUnit: 'm2',
          checked: false,
        },
        { name: 'count', value: 2, checked: false },
        {
          name: 'total space',
          value: 16,
          measuringUnit: 'm2',
          checked: false,
        },
      ],
      members: [
        {
          name: 'adult',
          type: 'individual',
          properties: [
            {
              name: 'unit space',
              value: 4,
              measuringUnit: 'm2',
              checked: true,
            },
            { name: 'count', value: 1, checked: true },
          ],
          checked: true,
        },
        {
          name: 'child',
          type: 'individual',
          properties: [
            {
              name: 'unit space',
              value: 2,
              measuringUnit: 'm2',
              checked: false,
            },
            { name: 'count', value: 2, checked: true },
          ],
          checked: false,
        },
      ],
    },
    {
      name: '2/1 family',
      type: 'group',
      image: '/images/families/family-2-1.png',
      checked: false,
      properties: [
        {
          name: 'unit space',
          value: 10,
          measuringUnit: 'm2',
          checked: false,
        },
        { name: 'count', value: 2, checked: false },
        {
          name: 'total space',
          value: 20,
          measuringUnit: 'm2',
          checked: false,
        },
      ],
      members: [
        {
          name: 'adult',
          type: 'individual',
          properties: [
            {
              name: 'unit space',
              value: 4,
              measuringUnit: 'm2',
              checked: true,
            },
            { name: 'count', value: 2, checked: true },
          ],
          measuringUnit: 'm2',
          checked: true,
        },
        {
          name: 'child',
          type: 'individual',
          properties: [
            {
              name: 'unit space',
              value: 2,
              measuringUnit: 'm2',
              checked: false,
            },
            { name: 'count', value: 1, checked: true },
          ],
          measuringUnit: 'm2',
          checked: false,
        },
      ],
    },
    {
      name: '2/2 family',
      type: 'group',
      image: '/images/families/family-2-2.png',
      checked: false,
      properties: [
        {
          name: 'unit space',
          value: 12,
          measuringUnit: 'm2',
          checked: false,
        },
        { name: 'count', value: 2, checked: false },
        {
          name: 'total space',
          value: 24,
          measuringUnit: 'm2',
          checked: false,
        },
      ],
      members: [
        {
          name: 'adult',
          type: 'individual',
          properties: [
            {
              name: 'unit space',
              value: 4,
              measuringUnit: 'm2',
              checked: true,
            },
            { name: 'count', value: 2, checked: true },
          ],
          checked: true,
        },
        {
          name: 'child',
          type: 'individual',
          properties: [
            {
              name: 'unit space',
              value: 2,
              measuringUnit: 'm2',
              checked: false,
            },
            { name: 'count', value: 2, checked: true },
          ],
          measuringUnit: 'm2',
          checked: false,
        },
      ],
    },
  ],
})

export const getters = {
  occupantsForPractice: (state, getters, rootState) => {
    return state.list.map((item, index) => ({
      id: index + 1,
      name: item.name,
      color: rootState.colors[index].hex,
      count: item.properties[1].value,
      unitSpace: item.properties[0].value,
      cloneId: 0,
      initialCount: item.properties[1].value,
    }))
  },
}

export const mutations = {
  checkOccupant(state, occupantIndex) {
    state.list[occupantIndex].checked = true
  },
  checkMember(state, { occupantIndex, memberIndex }) {
    state.list[occupantIndex].members[memberIndex].checked = true
  },
  checkMemberProperty(state, { occupantIndex, memberIndex, propertyIndex }) {
    const member = state.list[occupantIndex].members[memberIndex]
    const props = member.properties
    props[propertyIndex].checked = true
    const result = props.every((prop) => {
      return prop.checked
    })
    if (result) {
      member.checked = true
    }
  },
  checkProperty(state, { occupantIndex, propertyIndex }) {
    const occupant = state.list[occupantIndex]
    const props = occupant.properties
    props[propertyIndex].checked = true
    const result = props.every((prop) => {
      return prop.checked
    })
    if (result) {
      occupant.checked = true
    }
    // const completed = state.list.every((person) => {
    //   return person.checked
    // })
  },
}

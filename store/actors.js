import Actor from "@/models/Actor"
import { monsters } from "@/apis/dnd5eApi"

export const state = () => ({
  list: []
})

export const getters = {
  fetch: (state) => async (type, id) => {
    if (type === 'monster') {
      return (await monsters.get(id)).data
    }

    throw new Error(`Invalid type of ${type} passed to actor store fetch`)
  },

  getById: (state) => (id) => {
    return state.list.find(list => list.id === id)
  },

  orderedList: (state) => {
    return [...state.list].sort((a, b) => a.initiative > b.initiative)
  },

  search: (state) => async (query) => {
    return (await monsters.search(query)).data.results.map(r => ({ name: r.name, index: r.index, type: 'monster' }))
  }
}

export const mutations = {
  add (state, actor) {
    actor.id = Math.max(...state.list.map(a => a.id), 0) + 1
    state.list.push(new Actor(actor))
  },

  remove (state, actorId) {
    state.list.splice(state.list.indexOf(actorId), 1)
  }
}

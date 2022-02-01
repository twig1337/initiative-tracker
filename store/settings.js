export const state = () => ({
  isMinimal: false,
  isSorting: true
})

export const mutations = {
  setMinimal (state, isMinimal) {
    state.isMinimal = isMinimal
  },

  toggleMinimal (state) {
    state.isMinimal = !state.isMinimal
  },

  setSorting (state, isSorting) {
    state.isSorting = isSorting
  },

  toggleSorting (state) {
    state.isSorting = !state.isSorting
  }
}

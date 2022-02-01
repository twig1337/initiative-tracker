<template>
  <v-combobox
      v-model="selectedActor"
      :loading="isLoading"
      :items="actorOptions"
      :search-input.sync="actorSearchValue"
      autofocus
      auto-select-first
      hide-no-data
      hide-details
      item-text="name"
      label="Search the Bestiary"
      prepend-inner-icon="mdi-magnify"
      @change="handleNameChange"
  ></v-combobox>
</template>

<script>
import _ from "lodash"
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: "ActorSearch",
  data () {
    return {
      actorOptions: [],
      actorSearchValue: null,
      isLoading: false,
      selectedActor: null
    }
  },

  computed: {
    ...mapGetters({
      fetchActor: 'actors/fetch',
      searchActors: 'actors/search'
    })
  },

  watch: {
    actorSearchValue (actorNameFragment) {
      actorNameFragment && this.fetchActorOptions(actorNameFragment)
    },
  },

  methods: {
    handleNameChange () {
      if (_.isEmpty(this.selectedActor.name)) return

      _.debounce(async () => {
        this.addActor(await this.fetchActor(this.selectedActor.type, this.selectedActor.index))
        this.selectedActor = null
        this.actorOptions = []
      }, 10)()
    },

    async fetchActorOptions (nameFragment) {
      this.isLoading = true
      this.actorOptions = await this.searchActors([{ key: 'name', value: nameFragment }])
      this.isLoading = false
    },

    ...mapMutations({
      addActor: 'actors/add'
    })
  }
}
</script>

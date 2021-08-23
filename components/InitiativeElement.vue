<template>
  <v-row
      :class="[
        { 'no-gutters': $vuetify.breakpoint.mobile },
        { 'overflow-hidden': $vuetify.breakpoint.mobile },
        'initiative-element-wrap',
        'justify-space-around'
      ]"
  >
    <v-col>
      <v-combobox
          v-model="name"
          :loading="nameLoading"
          :items="nameOptions"
          :search-input.sync="nameSearch"
          auto-select-first
          cache-items
          hide-no-data
          hide-details
          item-text="name"
          item-value="index"
          label="Name"
          return-object
          @change="handleNameChange"
      ></v-combobox>
    </v-col>

    <v-col>
      <v-text-field
          v-model.number="initiative"
          label="Initiative"
          type="number"
          autocomplete="new-password"
          @change="emitUpdate"
      >
        <v-tooltip :slot="minimal ? 'prepend' : 'append'" top>
          <template #activator="{ on, attrs }">
            <v-icon
                color="primary"
                v-bind="attrs"
                v-on="on"
                @click="rollInitiative"
            >
              mdi-dice-d20
            </v-icon>
          </template>
          <span>Roll Initiative</span>
        </v-tooltip>
      </v-text-field>
    </v-col>

    <v-col v-if="!minimal">
      <v-text-field
          v-model.number="armorClass"
          type="number"
          label="Armor Class"
          autocomplete="new-password"
          @change="emitUpdate" />
    </v-col>

    <v-col v-if="!minimal">
      <v-text-field
          v-model.number="hitPoints"
          type="number"
          label="Ht Points"
          autocomplete="new-password"
          @change="emitUpdate" />
    </v-col>

    <v-col class="col-1 align-self-center">
      <v-tooltip top>
        <template #activator="{ on, attrs }">
          <v-btn
              class="primary--text"
              icon
              v-bind="attrs"
              v-on="on"
              @click="$emit('remove')"
          >
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </template>
        <span>Delete</span>
      </v-tooltip>
    </v-col>
  </v-row>
</template>

<script>
import _ from "lodash"

export default {
  name: "InitiativeElement",
  props: {
    minimal: { type: Boolean, default: false },
    nameInit: { type: String, default: '' },
    initiativeInit: { type: Number, default: null },
    armorClassInit: { type: Number, default: null },
    hitPointsInit: { type: Number, default: null }
  },
  data () {
    return {
      // Default props
      name: this.nameInit,
      initiative: this.initiativeInit,
      armorClass: this.armorClassInit,
      hitPoints: this.hitPointsInit,

      // Component State
      advancedData: null,

      // Name search
      nameOptions: [],
      nameLoading: false,
      nameSearch: null,
      nameSelect: null,
    }
  },
  watch: {
    nameSearch (nameFragment) {
      nameFragment && nameFragment !== this.nameSelect && this.queryNameSelections(nameFragment)
    },
  },
  methods: {
    emitUpdate () {
      this.$emit('update', {
        name: this.name,
        initiative: this.initiative,
        armorClass: this.armorClass,
        hitPoints: this.hitPoints
      })
    },

    async queryNameSelections (nameFragment) {
      this.nameLoading = true
      this.nameOptions = (await this.$monsters.search([{ key: 'name', value: nameFragment }])).results
      this.nameLoading = false
    },

    rollInitiative () {
      this.initiative = _.random(1, 20)
      return this.initiative
    },

    async handleNameChange () {
      if (_.isObject(this.name)) {
        this.advancedData = await this.$monsters.get(this.name.index)

        this.name = this.name.name
        this.initiative = this.initiative || this.rollInitiative()
        this.armorClass = this.armorClass || this.advancedData.armor_class
        this.hitPoints = this.hitPoints || this.advancedData.hit_points
      } else {
        this.advancedData = null
      }

      this.emitUpdate()
    }
  }
}
</script>

<style scoped lang="scss">
@import '~vuetify/src/styles/settings/_variables';

@media #{map-get($display-breakpoints, 'md-and-down')} {
  .col {
    margin-right: 10px;

    &:last-child, &:nth-last-child(2) {
      margin-right: 0;
    }
  }
}

.initiative-element-wrap {
  width: 100%;
}
</style>

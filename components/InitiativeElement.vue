<template>
  <v-row :class="[
        { 'no-gutters': $vuetify.breakpoint.mobile },
        { 'overflow-hidden': $vuetify.breakpoint.mobile },
        { 'pb-2': displayAdvanced },
        'justify-space-around'
      ]"
  >
    <v-col>
      <v-combobox
          v-model="name"
          :loading="nameLoading"
          :items="nameOptions"
          :search-input.sync="nameSearch"
          autofocus
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
          :label="'Initiative' + (advancedData ? ` (${dexMod})` : '')"
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
              @click="$emit('remove', id)"
          >
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </template>
        <span>Delete</span>
      </v-tooltip>
    </v-col>

    <v-slide-x-reverse-transition>
      <p v-if="displayAdvanced" class="attributes-list text-right caption font-weight-light">
        STR {{ advancedData.strength }}({{ strMod }})&nbsp;&nbsp;
        DEX {{ advancedData.dexterity }}({{ dexMod }})&nbsp;&nbsp;
        CON {{ advancedData.constitution }}({{ conMod }})&nbsp;&nbsp;
        INT {{ advancedData.intelligence }}({{ intMod }})&nbsp;&nbsp;
        WIS {{ advancedData.wisdom }}({{ wisMod }})&nbsp;&nbsp;
        CHA {{ advancedData.charisma }}({{ chaMod }})
      </p>
    </v-slide-x-reverse-transition>
  </v-row>
</template>

<script>
import _ from "lodash"

export default {
  name: "InitiativeElement",
  props: {
    args: { type: Object, default: null },
    minimal: { type: Boolean, default: false }
  },
  data () {
    return {
      // Default props
      id: this.args.id,
      name: this.args.name,
      initiative: this.args.initiative,
      armorClass: this.args.armorClass,
      hitPoints: this.args.hitPoints,

      // Component State
      advancedData: this.args.advancedData,

      // Name search
      nameOptions: this.args.nameOptions,
      nameLoading: this.args.nameLoading,
      nameSearch: this.args.nameSearch,
      nameSelect: this.args.nameSelect,
    }
  },
  computed: {
    strMod () {
      return this.advancedData && this.$toolbox.convertAbilityToModifier(this.advancedData.strength)
    },
    dexMod () {
      return this.advancedData && this.$toolbox.convertAbilityToModifier(this.advancedData.dexterity)
    },
    conMod () {
      return this.advancedData && this.$toolbox.convertAbilityToModifier(this.advancedData.constitution)
    },
    intMod () {
      return this.advancedData && this.$toolbox.convertAbilityToModifier(this.advancedData.intelligence)
    },
    wisMod () {
      return this.advancedData && this.$toolbox.convertAbilityToModifier(this.advancedData.wisdom)
    },
    chaMod () {
      return this.advancedData && this.$toolbox.convertAbilityToModifier(this.advancedData.charisma)
    },

    displayAdvanced () {
      return this.advancedData && !this.minimal
    }
  },
  watch: {
    nameSearch (nameFragment) {
      nameFragment && nameFragment !== this.nameSelect && this.queryNameSelections(nameFragment)
    },
  },
  methods: {
    emitUpdate () {
      this.$emit('update', this.$data)
    },

    async queryNameSelections (nameFragment) {
      this.nameLoading = true
      this.nameOptions = (await this.$monsters.search([{ key: 'name', value: nameFragment }])).results
      this.nameLoading = false
    },

    rollInitiative () {
      this.initiative = _.random(1, 20) + (this.advancedData ? Number.parseInt(this.dexMod) : 0)
      return this.initiative
    },

    handleNameChange () {
      _.debounce(async () => {
        if (_.isObject(this.name)) {
          this.advancedData = await this.$monsters.get(this.name.index)

          this.name = this.name.name
          this.initiative = this.rollInitiative()
          this.armorClass = this.advancedData.armor_class
          this.hitPoints = this.advancedData.hit_points
        } else {
          this.advancedData = null
        }

        this.emitUpdate()
      }, 10)()
    }
  }
}
</script>

<style scoped lang="scss">
@import '~vuetify/src/styles/settings/_variables';

.attributes-list {
  position: absolute;
  right: 90px;
  bottom: -10px;
}

@media #{map-get($display-breakpoints, 'md-and-down')} {
  .col {
    margin-right: 10px;

    &:last-child, &:nth-last-child(2) {
      margin-right: 0;
    }
  }
}
</style>

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
      <v-text-field v-model="name" label="Name" @change="emitUpdate" />
    </v-col>

    <v-col>
      <v-text-field v-model.number="initiative" label="Initiative" type="number" @change="emitUpdate">
        <v-icon slot="append" color="primary" @click="rollInitiative">
          mdi-dice
        </v-icon>
      </v-text-field>
    </v-col>

    <v-col v-if="!minimal">
      <v-text-field v-model.number="armorClass" type="number" label="Armor Class" @change="emitUpdate" />
    </v-col>

    <v-col v-if="!minimal">
      <v-text-field v-model.number="hitPoints" type="number" label="Ht Points" @change="emitUpdate" />
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
      name: this.nameInit,
      initiative: this.initiativeInit,
      armorClass: this.armorClassInit,
      hitPoints: this.hitPointsInit
    }
  },
  methods: {
    emitUpdate () {
      this.$emit('update', this.$data)
    },

    rollInitiative () {
      this.initiative = _.random(1, 20)
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

<template>
  <v-row class="initiative-element-wrap justify-space-around">
    <v-col>
      <v-text-field v-model="name" label="Name" @change="emitUpdate" />
    </v-col>

    <v-col>
      <v-text-field v-model.number="initiative" type="number" label="Initiative" @change="emitUpdate" />
    </v-col>

    <v-col>
      <v-text-field v-model.number="armorClass" type="number" label="Armor Class" @change="emitUpdate" />
    </v-col>

    <v-col>
      <v-text-field v-model.number="hitPoints" type="number" label="Ht Points" @change="emitUpdate" />
    </v-col>

    <v-col class="col-1 align-self-center">
      <v-tooltip top>
        <template #activator="{ on, attrs }">
          <v-btn
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
export default {
  name: "InitiativeElement",
  props: {
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
    }
  }
}
</script>

<style scoped lang="scss">
.initiative-element-wrap {
  width: 100%;
}
</style>

<template>
  <tr>
    <td class="borderless">
      <v-text-field v-model="name" label="Name" @change="emitUpdate" />
    </td>
    <td class="borderless">
      <v-text-field v-model.number="initiative" type="number" label="Initiative" @change="emitUpdate" />
    </td>
    <td class="borderless">
      <v-text-field v-model.number="armorClass" type="number" label="Armor Class" @change="emitUpdate" />
    </td>
    <td class="borderless">
      <v-text-field v-model.number="hitPoints" type="number" label="Ht Points" @change="emitUpdate" />
    </td>
    <td class="borderless pa-0">
      <v-btn icon @click="$emit('remove')">
        <v-icon>
          mdi-delete
        </v-icon>
      </v-btn>
    </td>
  </tr>
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

<style scoped>

</style>

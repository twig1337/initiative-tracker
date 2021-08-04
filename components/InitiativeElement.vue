<template>
  <tr>
    <td class="borderless">
      <v-text-field label="Name" :value="name" />
    </td>
    <td class="borderless">
      <v-text-field type="number" label="Initiative" :value="initiative" />
    </td>
    <td class="borderless">
      <v-text-field type="number" label="Hit Points" :value="hp" />
    </td>
  </tr>
</template>

<script>
export default {
  name: "InitiativeElement",
  props: {
    name: { type: String, default: '' },
    initiative: { type: Number, default: null },
    hp: { type: Number, default: null }
  },
}
</script>

<style scoped>

</style>

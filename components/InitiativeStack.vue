<template>
  <div>
    <v-simple-table id="initiative-tracker-table">
      <template #default>
        <thead>
          <tr>
            <th>

            </th>
          </tr>
        </thead>
        <tbody>
        <InitiativeElement
            class="borderless"
            v-for="(initiativeElement, index) in initiativeElements"
            :key="initiativeElement.id"
            :name="initiativeElement.name"
            :initiative="initiativeElement.initiative"
            :hp="initiativeElement.hp"
            @remove="initiativeElements.splice(index, 1)"
        />
        </tbody>
        <v-btn
            text
            fab
            @click="addInitiativeElement"
            class="mt-1"
        >
          <v-icon align-self="center">mdi-plus</v-icon>
        </v-btn>
      </template>
    </v-simple-table>
  </div>
</template>

<script>
import InitiativeElement from "./InitiativeElement"

export default {
  name: "InitiativeStack",
  components: { InitiativeElement },
  data () {
    return {
      nextInitiativeElement: 3,
      initiativeElements: [{id: 1}, {id: 2}]
    }
  },
  methods: {
    addInitiativeElement () {
      this.initiativeElements.push({
        id: this.nextInitiativeElement++
      })
    }
  }
}
</script>

<style scoped>

</style>

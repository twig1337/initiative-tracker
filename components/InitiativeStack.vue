<template>
  <v-row
      align="center"
      justify="center"
  >
    <v-col>
      <v-row
          align="center"
          justify="center"
      >
        <v-col class="col-1">
          <v-btn
              icon
              large
              outlined
              class="mt-1 ml-1"
              @click="addInitiativeElement"
          >
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-col>
        <v-col>
            <v-simple-table class="initiative-stack overflow-y-auto py-2" trans>
              <template #default>
                <tbody>
                <InitiativeElement
                    v-for="(initiativeElement, index) in initiativeElements"
                    :key="initiativeElement.id"
                    :name-init="initiativeElement.name"
                    :initiative-init="initiativeElement.initiative"
                    :armor-class-init="initiativeElement.armorClass"
                    :hit-points-init="initiativeElement.hitPoints"
                    class="borderless"
                    @remove="removeInitiativeElement(index)"
                    @update="initiativeElements[index] = $event"
                />
                </tbody>
              </template>
            </v-simple-table>
        </v-col>
      </v-row>

      <v-row>
        <v-divider />
      </v-row>

      <v-row justify="end" class="pt-2">
        <v-btn
            depressed
            small
            :disabled="initiativeElements.length < 2"
            @click="sortByInitiative()"
        >
          <v-icon left>mdi-sort-numeric-variant</v-icon>
          sort initiative
        </v-btn>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import InitiativeElement from "./InitiativeElement"

export default {
  name: "InitiativeStack",
  components: { InitiativeElement },
  data () {
    return {
      nextInitiativeElement: 2,
      initiativeElements: [{ id: 1 }]
    }
  },
  methods: {
    addInitiativeElement () {
      this.initiativeElements.push({
        id: this.nextInitiativeElement++
      })
    },

    removeInitiativeElement (index) {
      this.initiativeElements.splice(index, 1)

      if (!this.initiativeElements.length) {
        this.addInitiativeElement()
      }
    },

    sortByInitiative () {
      console.log(this.initiativeElements);
      this.initiativeElements.sort((a, b) => b.initiative - a.initiative)
      console.log(this.initiativeElements);
    }
  }
}
</script>

<style scoped lang="scss">
.initiative-stack {
  max-height: 66vh;
}
</style>

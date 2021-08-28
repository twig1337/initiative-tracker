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
        <v-col class="col-1 d-none d-sm-flex">
          <v-tooltip top>
            <template #activator="{ on, attrs }">
              <v-btn
                  icon
                  large
                  outlined
                  class="mt-1 ml-1 primary--text"
                  style="border-color: #e30711"
                  v-bind="attrs"
                  v-on="on"
                  @click="addInitiativeElement"
              >
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </template>
            <div>Add Combatant</div>
          </v-tooltip>
        </v-col>

        <v-col>
          <v-list :key="listRenders" class="overflow-visible py-2">
            <v-list-item
                v-for="initiativeElement in initiativeElements"
                :key="initiativeElement.id"
                class="pa-0"
            >
              <InitiativeElement
                  :minimal="isMinimal"
                  :args="initiativeElement"
                  class="borderless"
                  @remove="removeInitiativeElement"
                  @update="updateInitiativeElement"
              />
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>

      <v-row>
        <v-divider light :class="{ 'mx-2': isMinimal }" style="border-color: rgba(227,7,17,0.25)" />
      </v-row>

      <v-row justify="end" class="pt-2">
        <!-- Sort -->
        <v-tooltip bottom>
          <template #activator="{ on, attrs }">
            <v-btn
                icon
                color="primary"
                v-bind="attrs"
                v-on="on"
                @click="sortInitiativeElements()"
            >
              <v-icon>mdi-sort-numeric-variant</v-icon>
            </v-btn>
          </template>
          <span>Sort by Initiative</span>
        </v-tooltip>

        <!-- Minimize -->
        <v-tooltip bottom>
          <template #activator="{ on, attrs }">
            <v-btn
                icon
                :class="{ 'primary--text': isMinimal, }"
                v-bind="attrs"
                v-on="on"
                @click="isMinimal = !isMinimal"
            >
              <v-icon>mdi-arrow-collapse-vertical</v-icon>
            </v-btn>
          </template>
          <div class="text-center">{{ isMinimal ? 'Disable' : 'Enable' }} <br /> Minimal Mode</div>
        </v-tooltip>

        <!-- Reset -->
        <v-dialog
            v-model="verifyReset"
            max-width="173"
        >
          <template #activator="{ on: dialog }">
            <v-tooltip bottom>
              <template #activator="{ on: tooltip }">
                <v-btn
                    icon
                    color="primary"
                    v-on="{ ...tooltip, ...dialog }"
                    @click="verifyReset = true"
                >
                  <v-icon>mdi-autorenew</v-icon>
                </v-btn>
              </template>
              <span>Reset Tracker</span>
            </v-tooltip>
          </template>
          <v-card class="pb-1">
            <v-card-title>
              Are you sure?
            </v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                  color="primary"
                  text
                  @click="resetInitiativeElements(); verifyReset = false"
              >
                Yes
              </v-btn>
              <v-btn
                  color="gray"
                  text
                  @click="verifyReset = false"
              >
                No
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>

      <v-row justify="center" class="d-sm-none">
        <v-tooltip top>
          <template #activator="{ on, attrs }">
            <v-btn
                icon
                large
                outlined
                v-bind="attrs"
                v-on="on"
                @click="addInitiativeElement"
            >
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </template>
          <div>Add Actor</div>
        </v-tooltip>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import _ from 'lodash'
import InitiativeElement from "./InitiativeElement"

export default {
  name: "InitiativeStack",
  components: { InitiativeElement },
  data () {
    return {
      initiativeElements: [{ id: 1 }],
      isMinimal: false,
      isSorting: true,
      listRenders: 0,
      nextInitiativeElement: 2,
      verifyReset: false
    }
  },

  mounted () {
    this.$nextTick(() => {
      this.isMinimal = this.$vuetify.breakpoint.mobile = this.$vuetify.breakpoint.width < 600
    })
  },

  methods: {
    addInitiativeElement () {
      this.initiativeElements.push({ id: this.nextInitiativeElement++ })
    },

    preventEmptyList () {
      if (!this.initiativeElements.length) {
        this.addInitiativeElement()
      }
    },

    removeInitiativeElement (id) {
      this.initiativeElements = this.initiativeElements.filter(e => e.id !== id)

      this.preventEmptyList()
    },

    resetInitiativeElements () {
      this.initiativeElements = [{ id: this.nextInitiativeElement++ }]
    },

    sortInitiativeElements () {
      this.initiativeElements = _.orderBy(_.filter(this.initiativeElements, 'initiative'), 'initiative', 'desc')

      this.preventEmptyList()

      // Force v-list re-render.
      this.listRenders++
    },

    updateInitiativeElement (event) {
      this.initiativeElements[this.initiativeElements.findIndex(e => e.id === event.id)] = event
    }
  }
}
</script>

<style scoped lang="scss">

</style>

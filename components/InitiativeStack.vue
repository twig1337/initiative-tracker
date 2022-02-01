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
        <v-col>
          <v-list class="overflow-visible py-2">
            <v-list-item
                v-for="actor in activeActorList"
                :key="actor.id"
                class="pa-0"
            >
              <InitiativeActor
                  :actor-id="actor.id"
                  class="borderless"
              />
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>

      <v-row no-gutters justify="center">
        <v-col class="col-sm-12 col-md-8">
          <ActorSearch />
        </v-col>
      </v-row>

      <v-row>
        <v-divider light :class="{ 'mx-2': settings.isMinimal }" style="border-color: rgba(227,7,17,0.25)" />
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
                :class="{ 'primary--text': settings.isMinimal, }"
                v-bind="attrs"
                v-on="on"
                @click="toggleMinimal"
            >
              <v-icon>mdi-arrow-collapse-vertical</v-icon>
            </v-btn>
          </template>
          <div class="text-center">{{ settings.isMinimal ? 'Disable' : 'Enable' }} <br /> Minimal Mode</div>
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
    </v-col>
  </v-row>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import ActorSearch from "./ActorSearch"
import InitiativeActor from "./InitiativeActor"

export default {
  name: "InitiativeStack",
  components: { InitiativeActor, ActorSearch },
  data () {
    return {
      initiativeElements: [{ id: 1 }],
      nextInitiativeElement: 2,
      verifyReset: false
    }
  },

  computed: {
    activeActorList () {
      return this.actors
    },

    ...mapState({
      actors: state => state.actors.list,
      settings: state => state.settings
    })
  },

  mounted () {
    this.$nextTick(() => {
      this.setMinimal(this.$vuetify.breakpoint.width < 600)
    })
  },

  methods: {
    resetInitiativeElements () {
      this.initiativeElements = [{ id: this.nextInitiativeElement++ }]
    },

    ...mapMutations('settings', [
      'setMinimal',
      'toggleMinimal'
    ])
  }
}
</script>

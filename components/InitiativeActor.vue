<template>
  <v-row
      id="initiative-actor"
      :class="[
        { 'pb-2': displayAdvanced },
        'justify-space-around'
      ]"
  >
    <v-col>
      <v-text-field
          v-model="actor.name"
      />
    </v-col>

    <v-col>
      <v-text-field
          v-model.number="actor.initiative"
          :label="`Initiative (${actor.dexterityModifier})`"
          type="number"
          autocomplete="new-password"
      >
        <v-tooltip :slot="isMinimal ? 'prepend' : 'append'" top>
          <template #activator="{ on, attrs }">
            <v-icon
                color="primary"
                v-bind="attrs"
                v-on="on"
                @click="actor.rollInitiative()"
            >
              mdi-dice-d20
            </v-icon>
          </template>
          <span>Roll Initiative</span>
        </v-tooltip>
      </v-text-field>
    </v-col>

    <v-col v-if="!isMinimal">
      <v-text-field
          v-model.number="actor.armorClass"
          type="number"
          label="Armor Class"
          autocomplete="new-password"
      />
    </v-col>

    <v-col v-if="!isMinimal">
      <v-text-field
          v-model.number="actor.hitPoints"
          type="number"
          label="Hit Points"
          autocomplete="new-password"
      />
    </v-col>

    <v-col class="col-1 align-self-center">
      <v-tooltip top>
        <template #activator="{ on, attrs }">
          <v-btn
              class="primary--text"
              icon
              v-bind="attrs"
              v-on="on"
              @click="removeActor(actorId)"
          >
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </template>
        <span>Delete</span>
      </v-tooltip>
    </v-col>

    <v-slide-x-reverse-transition>
      <p v-if="displayAdvanced" class="attributes-list text-right caption font-weight-light">
        STR {{ actor.strength }}({{ actor.strengthModifier }})&nbsp;&nbsp;
        DEX {{ actor.dexterity }}({{ actor.dexterityModifier }})&nbsp;&nbsp;
        CON {{ actor.constitution }}({{ actor.constitutionModifier }})&nbsp;&nbsp;
        INT {{ actor.intelligence }}({{ actor.intelligenceModifier }})&nbsp;&nbsp;
        WIS {{ actor.wisdom }}({{ actor.wisdomModifier }})&nbsp;&nbsp;
        CHA {{ actor.charisma }}({{ actor.charismaModifier }})
      </p>
    </v-slide-x-reverse-transition>
  </v-row>
</template>

<script>
import { mapMutations, mapState } from "vuex"

export default {
  name: "InitiativeActor",

  props: {
    actorId: { type: Number, default: null }
  },

  data () {
    return {
      actor: this.$store.getters['actors/getById'](this.actorId),
    }
  },

  computed: {
    displayAdvanced () {
      return !this.isMinimal
    },

    ...mapState({
      isMinimal: state => state.settings.isMinimal
    }),
  },

  methods: {
    ...mapMutations({
      removeActor: 'actors/remove'
    })
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

  .attributes-list {
    position: absolute;
    right: 20px;
    bottom: -10px;
    max-width: 100%;
    overflow-x: auto;
    white-space: nowrap;
  }
}

@media #{map-get($display-breakpoints, 'xs-only')} {
  #initiative-actor {
    margin: 0;
    overflow: hidden;

    > .col,
    > [class*=col-] {
      padding: 0;
    }
  }

  .attributes-list {
    right: 0;
  }
}
</style>

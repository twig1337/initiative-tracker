<template>
  <v-app light>
    <v-app-bar app flat="flat" color="white" class="mx-3">
      <v-img
          max-width="60"
          contain src="/logo.png"
          class="mr-4"
      />

      <v-toolbar-title>Initiative Tracker</v-toolbar-title>

      <v-spacer></v-spacer>

<!--      <v-btn icon>-->
<!--        <v-icon>mdi-heart</v-icon>-->
<!--      </v-btn>-->
    </v-app-bar>

    <v-main>
      <v-container fill-height>
        <Nuxt />
      </v-container>
    </v-main>

    <v-footer  color="white">
      <v-card
          class="text-center w100 border-top-primary"
          flat
          tile
      >
        <v-card-text>
          &copy; {{ new Date().getFullYear() }} — <strong>Dungeon Tools</strong>
        </v-card-text>
      </v-card>
    </v-footer>
  </v-app>
</template>

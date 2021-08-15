<template>
  <v-app light>
    <v-app-bar app flat="flat" color="white" class="mx-3">
      <v-img
          max-width="60"
          contain src="/images/logo.png"
          class="mr-4"
      />

      <v-toolbar-title>Initiative Tracker</v-toolbar-title>

      <v-spacer />

      <v-btn icon color="primary" href="https://www.buymeacoffee.com/vatta" target="_blank" >
        <v-img contain max-width="27" src="/images/bmc-logo-no-background.png" alt="Buy Me A Coffee" />
      </v-btn>
    </v-app-bar>

    <v-main>
      <Nuxt />
    </v-main>

    <v-footer color="white">
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

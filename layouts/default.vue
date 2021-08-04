<template>
  <v-app light>
    <v-app-bar app flat="flat" color="white">
      <v-btn text>
        <v-icon>mdi-account</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container fill-height>
        <Nuxt />
      </v-container>
    </v-main>

    <v-footer color="white">
      <v-col class="text-center" cols="12">
        &copy; {{ new Date().getFullYear() }} — <strong>Initiative Tracker</strong>
      </v-col>
    </v-footer>
  </v-app>
</template>

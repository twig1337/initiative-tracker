<template>
  <v-app light>
    <v-app-bar app flat="flat" color="white">
      <v-toolbar-title>
        <v-img max-width="75" contain src="/logo.png" style="transform: scaleX(-1);" />
      </v-toolbar-title>
    </v-app-bar>

    <v-main>
      <v-container fill-height>
        <Nuxt />
      </v-container>
    </v-main>

    <v-footer color="white">
      <v-col class="text-center" cols="12">
        &copy; {{ new Date().getFullYear() }} — <strong>Dungeon Tools</strong>
      </v-col>
    </v-footer>
  </v-app>
</template>

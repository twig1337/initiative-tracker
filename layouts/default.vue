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

      <v-btn icon color="green" @click="toggleBugReporter">
        <v-icon>
          mdi-ladybug
        </v-icon>
      </v-btn>

      <v-btn
          icon
          color="orange"
          @click="toggleSupportUs"
      >
        <v-icon>mdi-heart</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <Nuxt />

      <BugReporter
          id="report-a-bug"
          :active="isShowingBugReporter"
          :class="{'hidden': !isShowingBugReporter}"
          @close="isShowingBugReporter = false"
      />

      <v-overlay
          opacity=0
          :value="isShowingBugReporter"
          @click.native="toggleBugReporter"
      />
    </v-main>

    <v-footer color="white">
      <v-card
          class="text-center w100 border-top-primary"
          flat
          tile
      >
        <v-card-text>
          &copy; {{ new Date().getFullYear() }} — <strong>Dungeon Tools</strong>
          <br>
          <small>This site is protected by reCAPTCHA and the Google
            <a href="https://policies.google.com/privacy">Privacy Policy</a> and
            <a href="https://policies.google.com/terms">Terms of Service</a> apply.
          </small>
        </v-card-text>
      </v-card>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    isShowingBugReporter: false
  }),

  methods: {
    toggleBugReporter () {
      this.isShowingBugReporter = !this.isShowingBugReporter
    },

    toggleSupportUs () {
      this.isShowingBugReporter = false
      document.getElementById('bmc-wbtn').click()
    }
  }
}
</script>

<style lang="scss">
#report-a-bug {
  position: fixed;
  right: 18px;
  bottom: 19px;
  z-index: 100;
  transition: all 500ms ease;
  opacity: 1;

  &.hidden {
    opacity: 0;
    bottom: -100vh;
  }
}
</style>

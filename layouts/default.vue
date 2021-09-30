<template>
  <v-app light>
    <v-navigation-drawer
        v-model="navDrawer"
        temporary
        absolute
        class="d-sm-none"
    >
      <v-list nav dense>
        <v-list-item-group v-model="navDrawerActive" active-class="primary--text text--accent-4">
          <v-list-item @click="toggleSupportUs">
            <v-list-item-icon>
              <v-icon>mdi-heart</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>Show some love</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item @click="toggleContactUs">
            <v-list-item-icon>
              <v-icon>mdi-email-edit</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>Chat with me</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app flat="flat" color="white" class="mx-3">
      <v-img
          max-width="60"
          contain src="/images/logo.png"
          class="mr-4"
      />

      <v-toolbar-title>Initiative Tracker</v-toolbar-title>

      <v-spacer />

      <v-app-bar-nav-icon class="d-sm-none" @click.stop="navDrawer = !navDrawer" />

      <v-btn
          class="d-none d-sm-flex"
          icon
          color="primary"
          @click="toggleSupportUs"
      >
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn
          class="d-none d-sm-flex"
          icon
          color="primary"
          @click="toggleContactUs"
      >
        <v-icon>mdi-email-edit</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <Nuxt />

      <ContactUsForm
          id="contact-us"
          color="primary"
          type="contact_us"
          :active="isShowingContactUs"
          :class="{'hidden': !isShowingContactUs}"
          @close="isShowingContactUs = false"
      >
        <v-card-title>
          Got a question? Feature Request?
        </v-card-title>

        <v-card-subtitle>
          Let me know your thoughts. I appreciate your feedback!
        </v-card-subtitle>
      </ContactUsForm>

      <v-overlay
          opacity=0
          :value="isShowingContactUs"
          @click.native="toggleContactUs"
      />

      <ContactUsForm
          id="report-a-bug"
          color="primary"
          icon="ladybug"
          type="bug_report"
          :active="isShowingBugReporter"
          :class="{'hidden': !isShowingBugReporter}"
          @close="isShowingBugReporter = false"
      >
        <v-card-title>
          Found a bug?
        </v-card-title>

        <v-card-subtitle>
          Thank you for helping improve this site by reporting issues!
        </v-card-subtitle>
      </ContactUsForm>

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
          <span style="cursor: pointer" @click="toggleBugReporter">
            <strong>Report a bug</strong>
          </span>
          <br>
          <small>This site is protected by reCAPTCHA and the Google
            <a href="https://policies.google.com/privacy">Privacy Policy</a> and
            <a href="https://policies.google.com/terms">Terms of Service</a> apply.
            | &copy; {{ new Date().getFullYear() }} — Dungeon Tools
          </small>
        </v-card-text>
      </v-card>
    </v-footer>
  </v-app>
</template>

<script>

export default {
  data: () => ({
    navDrawer: false,
    navDrawerActive: null,
    isShowingBugReporter: false,
    isShowingContactUs: false
  }),

  watch: {
    navDrawerActive () {
      this.navDrawer = false
    }
  },

  methods: {
    toggleBugReporter () {
      this.isShowingBugReporter = !this.isShowingBugReporter
    },

    toggleContactUs () {
      this.isShowingContactUs = !this.isShowingContactUs
    },

    toggleSupportUs () {
      this.isShowingBugReporter = false
      this.isShowingContactUs = false
      document.getElementById('bmc-wbtn').click()
    }
  }
}
</script>

<style lang="scss">
#report-a-bug, #contact-us {
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

// import colors from 'vuetify/es5/util/colors'

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s | Dungeon Tools',
    title: 'Initiative Tracker',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'A simple and clean D&D 5e initiative tracker.' },
      { name: 'format-detection', content: 'telephone=no' },
      { name: 'msapplication-TileColor', content: '#b91d47' },
      { name: 'theme-color', content: '#ffffff' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
      { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
      { rel: 'manifest', href: '/site.webmanifest' },
      { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#e30711' }
    ],
    script: [
      {
        "data-name": "BMC-Widget",
        "data-cfasync": "false",
        "src": "https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js",
        "data-id": "vatta",
        "data-description": "Support me on Buy me a coffee!",
        "data-message": "",
        "data-color": "#ff813f",
        "data-position": "Top",
        "data-x_margin": "18",
        "data-y_margin": "-61"
      }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/main.scss'
  ],

  // https://nuxtjs.org/docs/2.x/directory-structure/nuxt-config#runtimeconfig
  publicRuntimeConfig: {
    googleAnalyticsId: 'G-LDLSFPPM4P',
    recaptcha: {
      siteKey: '6LfhbE0cAAAAAEdv0F3wSQCu3J4bNAu6_IeK_yrS'
    }
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    // https://matteo-gabriele.gitbook.io/vue-gtag/
    '@/plugins/gtag',

    // https://docs.amplify.aws/
    '@/plugins/amplify',

    // Custom Plugins
    '@/plugins/dnd5eapi',
    '@/plugins/toolbox',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/sentry',
    '@nuxtjs/sitemap',
    '@nuxtjs/axios',
    '@nuxtjs/recaptcha',
  ],

  // https://www.npmjs.com/package/@nuxtjs/recaptcha
  recaptcha: {
    hideBadge: true,
    version: 3
  },

  // https://sentry.nuxtjs.org/
  sentry: {
    dsn: 'https://2fbd55f7644845f5a4e2e130f2c8f2ce@o231239.ingest.sentry.io/5910006'
  },

  // https://sitemap.nuxtjs.org/
  sitemap: {
    hostname: 'https://initiative-tracker.dungeon.tools'
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      themes: {
        light: {
          primary: '#e30711'
        }
      }
    }
  }
}

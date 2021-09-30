<template>
  <v-card class="ml-5">
    <div :class="['d-flex flex-row-reverse', color ]">
      <v-btn
          class="float-right"
          icon
          plain
          @click="$emit('close')"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </div>

    <div :class="['w100 text-center pb-7', color ]">
      <v-icon class="text-h1">mdi-{{ icon }}</v-icon>
    </div>

    <v-alert
        v-if="formErrors.length"
        type="error"
        outlined
        class="ma-3"
    >
      <div v-for="error in formErrors" :key="error">{{ error }}</div>
    </v-alert>

    <v-alert
        v-if="formSuccess"
        outlined
        dismissible
        type="success"
        class="ma-3"
    >
      {{ formSuccess }}
    </v-alert>

    <div style="position: relative">
      <loading
          :active.sync="loading"
          :is-full-page="false"
          color="black"
      />

      <slot/>

      <v-card-text class="overflow-auto" style="max-height: 50vh">
        <v-form
            ref="form"
            v-model="valid"
        >
          <v-textarea
              v-model="description"
              :rules="descriptionRules"
              :color="color"
              label="Description"
              counter
              required
          ></v-textarea>

          <v-text-field
              v-model="email"
              :rules="emailRules"
              :color="color"
              label="E-mail (Optional)"
              hint="Only include if you would like a reply!"
              persistent-hint
          />
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
            text
            :color="color"
            :disabled="!valid"
            @click="submit"
        >
          Submit
        </v-btn>
      </v-card-actions>
    </div>
  </v-card>
</template>

<script>
import Amplify, { API } from 'aws-amplify'
import Loading from 'vue-loading-overlay'
import awsconfig from '../aws-exports'
import 'vue-loading-overlay/dist/vue-loading.css'

Amplify.configure(awsconfig)

export default {
  name: "ContactUsForm",

  components: {
    Loading
  },

  props: {
    color: { type: String, default: 'primary' },
    icon: { type: String, default: 'email-edit' },
    type: { type: String, default: 'default' }
  },

  data: () => ({
    valid: true,
    description: '',
    descriptionRules: [
      v => !!v || 'Description of the bug is required',
      v => (v && v.length <= 500) || 'Description must be less than 500 characters',
    ],
    email: '',
    emailRules: [
      v => (!v || /.+@.+\..+/.test(v)) || 'E-mail must be valid',
    ],
    formErrors: [],
    formSuccess: '',
    loading: false
  }),

  async mounted () {
    try {
      await this.$recaptcha.init()
    } catch (e) {
      this.$sentry.captureException(e)
    }
  },

  beforeDestroy () {
    this.$recaptcha.destroy()
  },

  methods: {
    async submit () {
      this.formSuccess = ''
      this.formErrors = []
      this.loading = true

      try {
        await API.post('dungeonTools', '/contact-us', {
          body: {
            type: this.type,
            userEmail: this.email,
            content: this.description,
            recaptcha: await this.$recaptcha.execute(this.type)
          }
        })

        this.formSuccess = 'Done and done. I appreciate you!'
        this.description = this.email = ''
      } catch (e) {
        if (e.errors) {
          this.formErrors = e.errors.map(e => e.message)
        } else {
          this.formErrors = ['Nat 1, Something broke...', 'I\'ll get right on it! Please try again in a bit!']
        }
      } finally {
        this.loading = false
        this.$refs.form.resetValidation()
      }
    }
  }
}
</script>

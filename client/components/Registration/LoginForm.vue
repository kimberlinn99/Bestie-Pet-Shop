<template>
  <v-form
    lazy-validation
    v-model="valid"
    @submit.prevent="submitForm"
    ref="form"
  >
    <v-alert
      text
      dense
      :class="[isError ? 'error': 'success' ]"
      icon="mdi-exclamation-thick"
      v-if="message != ''"
    >
      {{ message }}
    </v-alert>
    <v-row>
      <v-col
        cols="12"
        md="12"
      >
        <v-text-field
          v-model="email"
          :rules="emailRules"
          label="E-mail"
          required
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        cols="12"
        md="12"
      >
        <v-text-field
          v-model="password"
          :rules="passwordRule"
          :type="'password'"
          label="Password"
          required
        ></v-text-field>
      </v-col>
    </v-row>
    <div>
      <p class="mt-2 mb-0 text-caption">Don't have an account? 
        <nuxt-link to="/signup">Sign Up</nuxt-link>
      </p>
      <p class="text-caption"> 
        <nuxt-link to="/" class="black--text">
          Continue shopping without login
        </nuxt-link>
      </p>
      <v-btn text tile 
        type="submit"
        :disabled="!valid"
        class="key-button text-center"
      >
        Log in
      </v-btn>
    </div>
  </v-form>
</template>

<script>
export default {
  data(){
    return {
      valid: false,
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ],
      password: '',
      passwordRule: [
        v => !!v || 'Password is required',
        v => v.length >= 6 || 'Password must be at least 6 characters'
      ],
      message: '',
      isError: false
    }
  },
  methods: {
    async submitForm(){
      this.$refs.form.validate()
      const response = (await this.$axios.$post('/log-in', {
        email: this.email, 
        password: this.password
      }))
      this.message = response.message
      if(typeof response.user == 'undefined'){
        this.isError = true
      }else{
        this.isError = false
        this.$store.commit('sessionStorage/setUser', response.user)
        setTimeout(() => {
          this.$router.push('/')
        },1000)
      }
    } 
  }
}
</script>

<style lang="scss" scoped>
.col-md-12, .col-12{
  padding-top: 0!important;
  padding-bottom: 0!important;
}
a{
  color: var(--secondary-color) !important;
  text-decoration: underline;
}
.error{
  background-color: orangered !important;
}
.success{
  background-color: green !important;
}
.error, .success{
  color: white;
}
::v-deep{
  .key-button .v-btn__content, .mdi-exclamation-thick::before{
    color: white !important;
  }
}
@media only screen and (max-width: 700px){
  .msg{
    margin-top: 0 !important;
  }
}
</style>
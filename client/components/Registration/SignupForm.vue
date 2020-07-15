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
    <v-row>
      <v-col
        cols="12"
        md="6"
      >
        <v-text-field
          v-model="firstname"
          :rules="nameRules"
          label="First name"
          required
        ></v-text-field>
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <v-text-field
          v-model="lastname"
          :rules="nameRules"
          label="Last name"
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
          v-model="address"
          :rules="addressRules"
          label="Address"
          required
        ></v-text-field>
      </v-col>
    </v-row>
    <div>
      <p class="mt-3 text-caption msg">Already have an account? 
        <nuxt-link to="/login">Log In</nuxt-link>
      </p>
      <v-btn text tile
        :disabled="!valid"
        class="key-button text-center"
        type="submit"
      >
        Sign up
      </v-btn>
    </div>
  </v-form>
</template>

<script>
export default {
  data(){
    return {
      valid: false,
      firstname: '',
      lastname: '',
      nameRules: [
        v => !!v || 'Name is required'
      ],
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
      address: '',
      addressRules: [
        v => !!v || 'Address is required'
      ],
      message: '',
      isError: false
    }
  },
  methods: {
    async submitForm(){
      this.$refs.form.validate()
      const response = (await this.$axios.$post('/sign-up', {
        email: this.email, 
        password: this.password, 
        firstName: this.firstname, 
        lastName: this.lastname, 
        address: this.address
      }))
      this.message = response.message
      if(response.status == 'SUCCESS'){
        this.isError = false
        this.$store.commit('sessionStorage/setUser', response.user)
        setTimeout(() => {
          this.$router.push('/')
        },1000)
      } else{
        this.isError = true
        this.firstname = response.firstName,
        this.lastname = response.lastName,
        this.address = response.address
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
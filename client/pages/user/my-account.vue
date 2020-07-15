<template>
  <div class="narrow-container">
    <v-layout row wrap class="outer-layout" v-if="user">
      <!-- Left Panel -->
      <v-flex xs12 md3>
        <left-panel />
      </v-flex>

      <!-- Right Panel -->
      <v-flex xs12 md9>
        <v-card tile flat class="ml-2 pa-5 pb-0 card-wrapper">
          <h1>My Account</h1>
          <hr>
          <div class="mt-5">
            <p>Login Email:</p>
            <p>{{ user.email }}</p>
          </div>
          <form @submit.prevent="submitForm">
            <v-layout row wrap class="my-5 px-3">
              <v-flex xs12 md5>
                <label for="firstname">First Name</label> <br>
                <input type="text" name="firstname" placeholder="First Name" v-model="firstname">
              </v-flex>
              <v-flex xs12 md5 class="ml-5">
                <label for="lastname">Last Name</label> <br>
                <input type="text" name="lastname" placeholder="Last Name" v-model="lastname">
              </v-flex>
              <v-flex xs12 md5 class="mt-4">
                <label for="phone">Phone</label> <br>
                <input type="text" name="phone" placeholder="Phone" v-model="phone">
              </v-flex>
              <v-flex xs12 md5 class="mt-4 ml-5">
                <label for="address">Address</label> <br>
                <textarea 
                  name="address" 
                  cols="20" rows="2"
                  placeholder="Address"
                  v-model="address"
                >
                </textarea>
              </v-flex>
              <v-flex xs12 md5>
                <v-btn type="submit" text block tile class="update-btn">
                  Update Info
                </v-btn>
              </v-flex>
            </v-layout>
          </form>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import LeftPanel from '@/components/UserInfo/LeftPanel'

export default {
  head: {
    title: 'My Account'
  },
  components: {
    LeftPanel
  },
  data(){
    return {
      firstname: '',
      lastname: '',
      phone: '',
      address: ''
    }
  },
  computed: {
    user() {
      return this.$store.state.sessionStorage.user || null
    }
  },
  methods: {
    submitForm(){
      const newInfo = {
        id: this.user.id,
        firstName: this.firstname,
        lastName: this.lastname,
        phone: this.phone,
        address: this.address
      }
      this.$store.dispatch('sessionStorage/updateUserInfo', newInfo)
      alert('Your new information has been updated')
      this.$router.push('/user/my-account')
    }
  },
  mounted() {
    this.firstname = this.user.firstName
    this.lastname = this.user.lastName
    this.phone = this.user.phone
    this.address = this.user.address
  },
}
</script>

<style lang="scss" scoped>
.outer-layout{
  margin: 50px 0;
}
.card-wrapper, input, textarea{
  border: 1px solid;
}
h1{
  color: var(--primary-color);
}
p, label, input, textarea{
  margin: 0;
  font-size: 0.8rem;
}
input, textarea{
  outline: none;
  padding: 3px 5px;
  width: 100%;
  margin-top: 3px;
}
textarea{
  resize: none;
}
hr{
  border-top: 1px solid black;
  margin-top: 15px;
}
.update-btn{
  margin-top: 10px;
  background-color: var(--secondary-color);
  color: white;
  text-transform: capitalize;
  font-size: 0.7rem;
}
@media only screen and (max-width: 700px){
  .narrow-container{
    width: 80%;
  }
  .card-wrapper, .flex{
    margin: 0 !important;
  }
  .card-wrapper{
    margin-top: 10px !important;
  }
}
</style>
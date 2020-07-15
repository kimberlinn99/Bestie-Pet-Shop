<template>
  <div v-if="user">
    <v-card tile flat class="mr-2 card-wrapper">
      <v-card tile>
        <!-- Dialog -->
        <v-dialog
          v-model="dialog"
          width="400"
        >
          <template v-slot:activator="{ on, attrs }">
            <span 
              style="float: right;" 
              class="ma-2"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon >mdi-pencil</v-icon>
            </span>
          </template>
          <v-card>
            <v-card-title
              class="headline grey lighten-2"
              primary-title
            >
              Profile Image
            </v-card-title>
            <v-card-text class="mt-5">
              <form>
                <label for="newProfileImage">
                  <input 
                    type="file" 
                    name="newProfileImage" 
                    ref="file"
                    @change="handleFileUpload"
                  >
                </label>
              </form> 
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" text
                @click="dialog = false"
                @click.prevent="cancelChange"
              >
                Cancel
              </v-btn>
              <v-btn color="orange" text
                @click="dialog = false"
                @click.prevent="submitFile"
              >
                Update
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <img 
          alt="Profile Image" 
          :src="getProductImage(profileImage)"
          loading="lazy"
        />
        <p class="text-body-2 text-center ma-0">
          {{ user.firstName }} {{ user.lastName }}
        </p>
      </v-card>

      <v-card flat tile class="pt-3">
        <v-list>
          <nuxt-link 
            :to="item.linkTo"
            v-for="item in linkList" 
            :key="item.title"
          >
            <v-list-item>
              {{ item.title }}
            </v-list-item>
          </nuxt-link>
        </v-list>
      </v-card>
    </v-card>
  </div>
</template>

<script>
export default {
  data(){
    return{
      userInfo: {},
      profileImage: 'public/uploads/default_profile_image.png',
      newProfileImage: '',
      dialog: false,
      linkList: [
        {
          title: 'My Account',
          linkTo: '/user/my-account'
        },
        {
          title: 'My Orders',
          linkTo: '/user/my-order'
        }
      ]
    }
  },
  methods: {
    getProductImage(url){
      return `http://localhost:8080/${url}`
    },
    handleFileUpload(){
      this.newProfileImage = this.$refs.file.files[0]
    },
    cancelChange(){
      this.$refs.file.value = null
    },
    async submitFile(){
      let formData = new FormData()
      formData.append('profileImage', this.newProfileImage)
      try {
        const response = await this.$axios.$patch(
          `/user/account/update/profile-image/${this.user.id}`,
          formData,
          {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
          }
        )
        this.$store.commit('sessionStorage/setUser', response.user)
        alert('Upload new profile image successfully')
        setTimeout(() => {
          window.location.reload(true)
        },1000)
      } catch(err) {
        this.$router.push('/user/my-account')
      }
    }
  },
  computed: {
    user() {
      return this.$store.state.sessionStorage.user || null
    }
  },
  mounted(){
    if(Object.keys(this.user).length){
      this.userInfo = this.user
      this.profileImage = this.user.profileImage
    } else{
      this.$router.push('/')
    }
  }
}
</script>

<style lang="scss" scoped>
.card-wrapper{
  border: 1px solid;
}
img{
  width: 100px;
  height: 100px;
  margin: 10px 40px;
  margin-top: 0;
  border-radius: 50%;
}
.v-list-item:hover{
  background-color: rgb(231, 231, 231);
}
.nuxt-link-exact-active .v-list-item{
  background-color: var(--secondary-color) !important;
}
@media only screen and (max-width: 700px){
  .card-wrapper{
    margin: 0 !important;
  }
  img{
    margin-left: 120px;
  }
}
</style>
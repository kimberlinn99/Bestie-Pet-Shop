<template>
  <v-app>
    <div class="container">
      <h1 v-if="error.statusCode === 400">
        {{ badRequest }}
      </h1>
      <h1 v-else-if="error.statusCode === 401">
        {{ unauthorized }}
      </h1>
      <h1 v-else-if="error.statusCode === 404">
        {{ pageNotFound }}
      </h1>
      <h1 v-else-if="error.statusCode === 500">
        {{ internalServerError }}
      </h1>
      <h1 v-else>
        {{ otherError }}
      </h1>
      <div class="link">
        <NuxtLink to="/">
          Home Page
        </NuxtLink>
      </div>
    </div>
  </v-app>
</template>

<script>
export default {
  name: 'error',
  layout: 'registration',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      badRequest: '400 Bad Request',
      unauthorized: '401 Unauthorized',
      pageNotFound: '404 Not Found',
      internalServerError: '500 Internal Server Error',
      otherError: 'An error occurred'
    }
  },
  head () {
    var title
    if(this.error.statusCode === 404){
      title = this.pageNotFound
    } else if(this.error.statusCode === 400){
      title = this.badRequest
    } else if(this.error.statusCode === 401){
      title = this.unauthorized
    } else if(this.error.statusCode === 500){
      title = this.internalServerError
    } else{
      title = this.otherError
    }
    return {
      title
    }
  }
}
</script>

<style scoped>
:root{
  --primary-color: #FF5722;
}
.container{
  width: 80%;
  margin: 0 auto;
}
h1 {
  text-align: center;
  margin-top: 100px;
}
.link{
  text-align: center;
  margin-top: 30px;
}
.link a{
  text-decoration: underline;
  font-weight: 500;
  color: var(--primary-color) !important;
}
</style>

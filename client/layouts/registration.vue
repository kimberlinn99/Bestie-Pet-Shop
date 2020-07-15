<template>
  <v-app>
    <nuxt/>
  </v-app>
</template>

<script>
export default {
  name: 'registration'
}
</script>

<style>
:root{
  --primary-color: #FF5722;
  --secondary-color: #00ACC1;
}
*{
  box-sizing: border-box;
}
body{
  font-family: 'Courier New', Courier, monospace;
}
.registration-container{
  width: 50%;
  margin: 30px auto;
}
.key-button{
  background-color: var(--primary-color);
  left: 40%;
}
@media only screen and (max-width: 700px){
  .registration-container{
    width: 80%;
  }
}
</style>
<template>
  <v-layout row wrap>
    <v-flex md4  class="message">
      <h1>Throw us <br>
        a question,
        we promise
        to fetch</h1>
    </v-flex>
    <v-flex md8 class="feedback-form-container">
        <feedback-form />
    </v-flex>
  </v-layout>
</template>

<script>
import FeedbackForm from './FeedbackForm'

export default {
  components: {
    FeedbackForm
  }
}
</script>

<style lang="scss" scoped>
h1{
  padding: 20px;
  color: var(--secondary-color);
  line-height: 2rem;
}
.feedback-form-container{
  padding: 50px;
}
.message{
    margin-top: 50px;
    padding-right: 20px;
}
@media only screen and (max-width: 700px){
  .message{
    margin-top: 20px;
    padding-bottom: 0;
  }
  .feedback-form-container{
    padding: 20px;
    margin-bottom: 10px;
  }
}
</style>
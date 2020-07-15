<template>
  <div class="narrow-container">
    <visit-us />
    <v-divider></v-divider>
    <feedback />
  </div>
</template>

<script>
import VisitUs from '@/components/Contact/VisitUs'
import Feedback from '@/components/Contact/Feedback'

export default {
  components: {
    VisitUs,
    Feedback
  }  
}
</script>

<style lang="scss" scoped>
@media only screen and (max-width: 700px){
  .narrow-container{
    width: 80%;
  }
}
</style>
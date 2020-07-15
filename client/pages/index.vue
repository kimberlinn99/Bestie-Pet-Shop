<template>
  <div>
    <carousel /> <br>
    <div class="content">
      <content-section-a  />
      <v-divider></v-divider>
      <content-section-b  />
      <partner-comp  />
    </div>
  </div>
</template>

<script>
import Carousel from '@/components/HomePage/Carousel'
import ContentSectionA from '@/components/HomePage/ContentSectionA'
import ContentSectionB from '@/components/HomePage/ContentSectionB'
import PartnerComp from '@/components/HomePage/PartnerComp'

export default {
 components: {
   Carousel,
   ContentSectionA,
   ContentSectionB,
   PartnerComp
 },
 head: {
   title: 'Home Page'
 }
}
</script>

<style lang="scss" scoped>
@media only screen and (max-width: 700px){
  .content .v-divider{
    width: 80%;
    margin: 0 auto;
  }
}
</style>

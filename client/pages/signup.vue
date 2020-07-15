<template>
  <div class="registration-container">
    <logo-header />
    <h3 class="mt-5 mb-2 pt-5 msg">SIGN UP</h3>
    <signup-form />
  </div>
</template>

<script>
import SignupForm from '@/components/Registration/SignupForm'
import LogoHeader from '@/components/Registration/LogoHeader'

export default {
  layout: 'registration',
  head: {
    title: 'Sign up'
  },
  components: {
    SignupForm,
    LogoHeader
  }
}
</script>

<style lang="scss" scoped>
@media only screen and (max-width: 700px){
  .msg{
    margin-top: 0 !important;
  }
}
</style>
<template>
  <div class="registration-container">
    <logo-header />
    <h3 class="mt-5 mb-2 pt-5">LOG IN</h3>
    <login-form />
  </div>
</template>

<script>
import LoginForm from '@/components/Registration/LoginForm'
import LogoHeader from '@/components/Registration/LogoHeader'

export default {
  layout: 'registration',
  head: {
    title: 'Login'
  },
  components: {
    LoginForm,
    LogoHeader
  }
}
</script>
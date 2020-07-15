<template>
 <v-btn tile  depressed
    height="30px"
    class="white--text text-caption text-capitalize primary-btn"
    :to="linkTo">
      {{ title }}
  </v-btn>
</template>

<script>
export default {
  props: ['title', 'linkTo']
}
</script>

<style lang="scss" scoped>
.primary-btn{
  background-color: var(--primary-color) !important;
}
</style>

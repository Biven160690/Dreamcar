<template>
  <div class="wrapper">
  <userSettings/><changePassword/>
  </div>
</template>
<script>
import userSettings from '~/components/userSettings.vue';//Form for user information
import changePassword from '~/components/changePassword.vue';//form change password
export default {
  components: {
    userSettings,
    changePassword
  }
}
</script>
<style>
.wrapper{
width: 100%;
display: inline-flex;
justify-content: space-between;
}
</style>

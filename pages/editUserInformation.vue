<!--<Page user information>!-->
<template>
  <div class="wrapper">
    <userSettings/><change-password/>
  </div>
</template>
<script>
import userSettings from '~/components/userSettings.vue'; //Component for user information
import changePassword from '~/components/changePassword.vue';//Component for change password
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

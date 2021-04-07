<!-- Change password form-->

<template>
  <div class="content">
    <div class="form">
      <h1>CHANGE PASSWORD</h1>
      <form>
        <v-text-field
          v-model="passw"
          :error-messages="oldPasswordErrors"
          :counter="16"
          :value="password"
          :type="value ? 'password' : 'text'"
          :append-icon="value ? 'mdi-eye' : 'mdi-eye-off'"
          label="Old password"
          required
          @click:append="() => (value = !value)"
          @input="$v.passw.$touch()"
          @blur="$v.passw.$touch()"
       ></v-text-field>
          <v-text-field
          v-model="password"
          :disabled="this.$v.passw.$invalid"
          :error-messages="passwordErrors"
          :counter="16"
          :value="password"
          :append-icon="value ? 'mdi-eye' : 'mdi-eye-off'"
          :type="value ? 'password' : 'text'"
          label="New password"
          required
          @click:append="() => (value = !value)"
          @input="$v.password.$touch()"
          @blur="$v.password.$touch()"
       ></v-text-field>
        <v-text-field
           v-model="repeatPassword"
          :disabled="this.$v.password.$invalid"
          :error-messages="repeatPasswordErrors"
          :counter="16"
          :value="password"
          :append-icon="value ? 'mdi-eye' : 'mdi-eye-off'"
          :type="value ? 'password' : 'text'"
          label="Repeat new password"
          required
          @click:append="() => (value = !value)"
          @input="$v.repeatPassword.$touch()"
          @blur="$v.repeatPassword.$touch()"
        ></v-text-field>
        <div class="button">
          <v-btn @click="clear"> clear </v-btn>
          <v-btn class="mr-4" :disabled="this.$v.passw.$invalid" @click="submit">
            submit
          </v-btn>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { mapGetters, mapMutations } from "vuex";
import {
  required,
  sameAs,
  maxLength,
  minLength,
} from "vuelidate/lib/validators";
export default {
  mixins: [validationMixin],
  data() {
    return {
      passw: "",
      userPasswFromStore: "",
      password: "",
      repeatPassword: "",
      value: true,
    };
  },
  created() {
    this.userPasswFromStore = this.$store.getters.getLoggedUser.passw;
  },
  validations: {
    passw: {
      required,
      sameAsPassw: sameAs("userPasswFromStore"),
    },
    password: { required, minLength: minLength(5), maxLength: maxLength(16) },
    repeatPassword: {
      required,
      sameAsPassword: sameAs("password"),
    },
  },
  computed: {
    ...mapGetters(["getLoggedUser"]),
    oldPasswordErrors() {
      const errors = [];
      if (!this.$v.passw.$dirty) return errors;
      !this.$v.passw.sameAs &&
       errors.push("Input password must be identical with old password.");
       return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.maxLength &&
        errors.push("New password must be at most 16 characters long");
      !this.$v.password.minLength &&
        errors.push("New password must be at least 5 characters long");
      !this.$v.password.required && errors.push("New password is required.");
      return errors;
    },
    repeatPasswordErrors() {
      const errors = [];
      if (!this.$v.repeatPassword.$dirty) return errors;
      !this.$v.repeatPassword.sameAs &&
       errors.push("Passwords must be identical.");
       return errors;
    },
  },
  methods: {
    ...mapMutations(["updateLoggedUserPassword"]),
    submit() {
      if ( this.passw === this.userPasswFromStore) {
      if (this.password === this.repeatPassword
      && this.password.length > 4) {
        var user = {
        id: this.getLoggedUser.id,
        passw: this.password,
        }
        alert("password changed successfully");
        this.updateLoggedUserPassword(user);
       } else {
        return alert('Wrong  or not filled "New password" form');
      }
       } else {
        return alert('Wrong old password');
    };
  },
    clear() {
      this.$v.$reset();
      this.passw = "";
      this.password = "";
      this.repeatPassword = "";
    },
  },
};
</script>
<style scoped>
.content {
  width: 37%;
  justify-content: center;
  margin-top: 50px;
  float: right;
  margin: 0% 5% 0% 0%;
}
.content h1 {
  margin-top: 50px;
}
.form {
  background-color: #e3e3e3;
  display: flex;
  flex-direction: column;
  text-align: center;
  margin-top: 50px;
  padding: 0 5% 0 5%;
}
form {
  margin-bottom: 50px;
  margin-top: 50px;
}
.button {
  margin-top: 3%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
</style>

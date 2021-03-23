<!-- Change password form-->

<template>
  <div class="content">
    <div class="form">
      <h1>CHANGE PASSWORD</h1>
      <form>
        <v-text-field
          v-model="passw"
          :counter="16"
          :type="'password'"
          label="Old password"
          required
          @input="$v.passw.$touch()"
          @blur="$v.passw.$touch()"
        ></v-text-field>
        <v-text-field 
          :disabled="this.$v.passw.$invalid"
          v-model="password"
          :error-messages="passwordErrors"
          :counter="16"
          :type="'password'"
          label="Password"
          required
          @input="$v.password.$touch()"
          @blur="$v.password.$touch()"
        ></v-text-field>
        <v-text-field 
          :disabled="this.$v.passw.$invalid"
          v-model="repeatPassword"
          :error-messages="repeatPasswordErrors"
          :counter="16"
          :type="'password'"
          label="Repeat new password"
          required
          @input="$v.repeatPassword.$touch()"
          @blur="$v.repeatPassword.$touch()"
        ></v-text-field>
        <div class="button">
          <v-btn @click="clear"> clear </v-btn>
          <v-btn class="mr-4" :disabled="this.$v.$invalid" @click="submit">
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
    };
  },

  created() {
    this.userPasswFromStore = this.$store.getters.getLoggedUser.passw;
  },

  validations: {
    passw: {
      required,
      minLength: minLength(5),
      maxLength: maxLength(16),
      sameAsPassw: sameAs("userPasswFromStore"),
    },
    password: { required, minLength: minLength(5), maxLength: maxLength(16) },
    repeatPassword: {
      sameAsPassword: sameAs("password"),
    },
  },
  computed: {
    ...mapGetters(["getLoggedUser"]),
    oldPasswordErrors() {
      const errors = [];
      if (!this.$v.passw.$$dirty) return errors;
      !this.$v.passw.maxLength &&
        errors.push("Password must be at most 16 characters long");
      !this.$v.passw.minLength &&
        errors.push("Password must be at least 5 characters long");
      !this.$v.passw.required && errors.push("Password is required.");
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.maxLength &&
        errors.push("Password must be at most 16 characters long");
      !this.$v.password.minLength &&
        errors.push("Password must be at least 5 characters long");
      !this.$v.password.required && errors.push("Password is required.");
      return errors;
    },
    repeatPasswordErrors() {
      const errors = [];
      if (!this.$v.repeatPassword.$dirty) return errors;
      !this.$v.repeatPassword.maxLength &&
        errors.push("Password must be at most 16 characters long");
      !this.$v.repeatPassword.minLength &&
        errors.push("Password must be at least 5 characters long");
      !this.$v.repeatPassword.required && errors.push("Password is required.");
      return errors;
    },
  },
  methods: {
    ...mapMutations(["updateLoggedUserPassword"]),
    submit() {
      var user = {
        id: this.getLoggedUser.id,
        passw: this.password,
      };
      alert("password changed successfully");
      this.updateLoggedUserPassword(user);
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
.link {
  text-decoration: none;
  color: #85c9ef;
  border-bottom: 2px solid #85c9ef;
}
.button {
  margin-top: 3%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
</style>

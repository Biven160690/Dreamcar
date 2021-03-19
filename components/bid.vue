<template>
  <v-row justify="end">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" dark v-bind="attrs" v-on="on">
          PARTICIPATE
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">How to place a bid</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
              <v-col cols="12" sm="6">
                <v-text-field
                  id="app"
                  v-model="yourBid"
                  :rules="yourBidRules"
                  :error-messages="yourBidErrors"
                  :counter="10"
                  solo
                  label="Your bid"
                  clearable
                  required
                  @input="$v.yourBid.$touch()"
                  @blur="$v.yourBid.$touch()"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="close">
            Close
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="save"
            :disabled="this.$v.$invalid"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { validationMixin } from "vuelidate";
import { mapMutations } from "vuex";
import {
  required,
  minLength,
  maxLength,
  numeric
} from "vuelidate/lib/validators";

export default {
  mixins: [validationMixin],

  validations: {
    yourBid: {
      required,
      minLength: minLength(1),
      maxLength: maxLength(10),
      numeric
    }
  },
  data: () => ({
    dialog: "", // связь с модальным окном
    yourBid: ""
  }),
  computed: {
    yourBidErrors() {
      const errors = [];
      if (!this.$v.yourBid.$dirty) return errors;
      !this.$v.yourBid.maxLength &&
        errors.push("Bid must be at most 10 characters long");
      !this.$v.yourBid.minLength &&
        errors.push("Bid must be at least 1 characters long");
      // !this.$v.yourBid.required && errors.push("Enter bid");
      !this.$v.yourBid.numeric && errors.push("Please enter only numbers");
      return errors;
    }
  },

  methods: {
    ...mapMutations(["addBidUser"]),
    close() {
      this.yourBid = ""; // чистим  строку ввода
      this.dialog = false; // закрываем модальное окно
    },
    save() {
      var bid = {
        yourBid: this.yourBid
      };
      this.addBidUser(bid);
      alert(`Your bid has been accepted: ${this.yourBid} $`);
      this.yourBid = ""; // чистим строку ввода
      this.dialog = false; // закрываем модальное окно
    },
  }
};
</script>

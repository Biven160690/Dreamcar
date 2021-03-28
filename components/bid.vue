<template>
  <v-row justify="end">
    <v-dialog v-model="dialog" persistent max-width="500px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          v-bind="attrs"
          v-on="on"
          dark
          color="#B0E0E6"
          elevation="6"
          x-large
          class="black--text"
        >
          PARTICIPATE
        </v-btn>
      </template>
      <v-card>
        <v-card-title> </v-card-title>
        <div class="window">
          <v-card-text>
            <v-container>
              <v-row>
                <div>
                  <div>
                    <h1>PLACE A BET</h1>
                    <p>
                      Please note that according to the company's <br />
                      auction policy, you can only bid on a given lot
                    </p>
                  </div>
                  <h3>LOT ID:{{ lot.id }}</h3>
                  <h3>EXPIRATION TIME:{{ lot.expirationTime }}</h3>
                  <h3>CURRENT BID: {{ lot.bid }} $</h3>
                </div>
                <v-col cols="12" md="12">
                  <div class="inp">
                    <v-text-field
                      id="app"
                      clearable
                      color="green"
                      prefix="$"
                      v-model="yourBid"
                      :error-messages="yourBidErrors"
                      :counter="10"
                      label="Your bid"
                      required
                      @input="$v.yourBid.$touch()"
                      @blur="$v.yourBid.$touch()"
                    ></v-text-field>
                  </div>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <div class="btn">
            <v-card-actions class="text-center mb-8">
              <v-btn
                width="150px"
                depressed
                color="red"
                @click="close"
                class="mr-6"
              >
                CANCEL
              </v-btn>
              <v-btn
                depressed
                color="#B0E0E6"
                width="150px"
                @click="save"
                :disabled="this.$v.$invalid"
              >
                BID
              </v-btn>
            </v-card-actions>
          </div>
        </div>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { validationMixin } from "vuelidate";
import { mapMutations, mapGetters } from "vuex";
import {
  required,
  minLength,
  maxLength,
  numeric,
  minValue
} from "vuelidate/lib/validators";

export default {
  mixins: [validationMixin],

  validations: {
    yourBid: {
      required,
      minLength: minLength(1),
      maxLength: maxLength(10),
      numeric,
      minValue: minValue(1)
    }
  },
  data: () => ({
    dialog: "",
    yourBid: "",
    user: {},
    lot: [],
    bids: []
  }),
  computed: {
    yourBidErrors() {
      const errors = [];
      if (!this.$v.yourBid.$dirty) return errors;
      !this.$v.yourBid.maxLength &&
        errors.push("Bid must be at most 10 characters long");
      !this.$v.yourBid.minLength &&
        errors.push("Bid must be at least 1 characters long");
      !this.$v.yourBid.minValue && errors.push("Price must be at least 1");
      !this.$v.yourBid.numeric && errors.push("Please enter only numbers");
      return errors;
    }
  },
  created() {
    var user = this.$store.getters.getLoggedUser;
    this.user = user;

    var lots = this.$store.getters.getAllLots;
    var lot = lots.find(lot => lot.id == this.$route.params.id);
    this.lot = lot;
  },

  methods: {
    ...mapMutations(["searchMinBidAndItsLength", "addBid"]),
    ...mapGetters(["getAllBids"]),

    close() {
      this.yourBid = "";
      this.dialog = false;
    },
    save() {
      var bids = this.getAllBids();
      this.bids = bids;
      var newId = bids.length;
      for (var i = 0; i < bids.length; i++) {
        if (newId === bids[i].id) {
          newId++;
        }
      }

      var newBid = {
        id: newId,
        lot_id: this.lot.id,
        user_id: this.user.id,
        bid_price: this.yourBid,
        isWinner: "bid_id",
        date: this.lot.expirationTime,
        user_company: this.user.company
      };
      this.addBid(newBid);

      this.searchMinBidAndItsLength(this.lot);

      alert(`Your bid has been accepted: ${this.yourBid} $`);
      this.yourBid = "";
      this.dialog = false;
    }
  }
};
</script>
<style>
.window {
  display: flex;
  flex-direction: column;
  font-family: "initial";
}
.window h3 {
  line-height: 1.7;
  color: black;
  margin-left: 20px;
}
.window h1 {
  padding-bottom: 30px;
  color: black;
  margin: 0px 0px 0px 140px;
}
.window p {
  padding-bottom: 30px;
  margin: 0px 0px 0px 100px;
}
.inp {
  margin: 30px 10px 0px 10px;
}
.btn {
  display: flex;
  justify-content: center;
}
</style>

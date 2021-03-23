<template>
  <div class="container">
    <v-app>
      <div class="page__content">
        <div class="lot_component">
          <h1>LOT ID: {{ lot.id }}</h1>
          <div class="header">
            <h2>{{ lot.part_name }}</h2>
            <h2>STATUS: {{ lot.status }}</h2>
          </div>
          <div class="content">
            <img
              src="@/assets/img/discs.png"
              alt="DISCS"
              width="180px"
              height="180px"
            />
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
          <div class="chars">
            <h3>QUANTITY: {{ lot.quantity }}</h3>
            <h3>BIRTH DATE: 22.02.2021 18:00</h3>
            <h3>EXPIRATION TIME: {{ lot.expirationTime }}</h3>
            <h3>DESIRED PRICE: {{ lot.desiredPrice }}$</h3>
          </div>
          <div class="footer">
            <div class="footer__chars">
              <h2>CURRENT BID: {{ lot.bid }}$</h2>
              <h2>TIME LEFT:</h2>
              <timer v-bind:deadline="lot.expirationTime" class="size"> </timer>
            </div>
          </div>
          <bid class="bid"></bid>
        </div>
        <div class="bids">
          <h1>BIDS</h1>
          <div v-if="isLogged">
            <div class="bid_id" v-for="bid in bids" :key="bid.id">
              <h3>COMPANY: {{ bid.user_company }}</h3>
              <div>
                <h1>BET: {{ bid.bid_price }}$</h1>
                <h3>{{ bid.date }}</h3>
              </div>
            </div>
          </div>
          <div v-else>
            <div class="bid_error">
              <p>
                In order to see the bids of other participants - log into your
                account
              </p>
            </div>
          </div>
        </div>
      </div>
    </v-app>
  </div>
</template>
<script>
import timer from "@/components/lots_sergey/timer.vue";
import bid from "@/components/bid.vue";
import { mapGetters, mapMutations } from "vuex";
export default {
  components: {
    timer,
    bid,
  },
  methods: {
    ...mapMutations(["addIdUser"]),
  },
  data: () => ({
    lot: {},
    bids: [],
    isLogged: false,
  }),
  computed: {},
  created() {
    var lots = this.$store.getters.getAllLots;
    var lot = lots.find((lot) => lot.id == this.$route.params.id);
    this.lot = lot;
    this.addIdUser(lot); // получаю выбранный лот

    var isLogged = this.$store.getters.isUserLogged;
    this.isLogged = isLogged;

    var bids = this.$store.getters.getAllBids;
    var cur_bids = bids.filter((bid) => bid.lot_id == this.$route.params.id);
    this.bids = cur_bids;
  },
};
</script>

<style scoped>
.bid {
  margin: -80px 20px 10px 0px;
  padding: 20px 20px 0px 0px;
}
.page__content {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.lot_component {
  background-color: #e3e3e3;
  display: flex;
  flex-direction: column;
  width: 60%;
  padding: 20px;
}
.header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.content {
  display: flex;
  flex-direction: row;
  align-content: center;
  margin-top: 20px;
}
.chars {
  margin-top: 20px;
}
.footer {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 40px;
}
button {
  width: 125px;
  height: 30px;
  border-radius: 5px;
  background-color: #85c9ef;
  color: #fff;
  font-size: 14px;
  margin-top: 20px;
  margin-left: 30px;
}
img {
  margin-right: 30px;
}

.bids {
  display: flex;
  flex-direction: column;
  width: 35%;
}

.bid_id {
  background-color: #e3e3e3;
  padding: 10px;
  margin-bottom: 20px;
}

.bid_id div {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.bid_error {
  background-color: #e3e3e3;
  padding: 10px;
  margin-bottom: 20px;
  text-align: center;
}
.bid_error p {
  width: 50%;
  margin: 0 auto;
}
</style>

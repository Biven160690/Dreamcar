<template>
  <div class="parent" id="app" data-app>
    <div class="auctions">
      <h1>AUCTIONS</h1>
    </div>
    <div class="data">
      <v-select
        v-model="status"
        :items="getAddStatuses"
        :menu-props="{ up: true, offsetY: true }"
        label="Status"
        @click="dataForSearch"
      ></v-select>
    </div>
    <div class="data">
      <v-select
        v-model="name"
        :items="getAddNames"
        :menu-props="{ up: true, offsetY: true }"
        label="Part name"
        @click="dataForSearch"
      ></v-select>
    </div>
    <div id="button">
      <v-btn class="button" color="#B0E0E6" @click="search">Search</v-btn>
      <v-btn class="button" color="#d9dbdb" @click="clear">Clear</v-btn>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  computed: mapGetters(["getAddStatuses", "getAddNames"]),
  data: () => ({
    name: "",
    status: ""
  }),
  methods: {
    ...mapMutations(["lotFilter", "deleteSearchParameters", "dataForSearch"]),
    search() {
      var optionsSearch = {
        status: this.status,
        name: this.name
      };
      this.lotFilter(optionsSearch);
    },
    clear() {
      (this.name = ""), (this.status = ""), this.deleteSearchParameters();
    }
  }
};
</script>

<style>
.parent {
  display: flex;
  justify-content: space-between;
  padding: 0px 0px 10px 0px;
}
.data {
  width: 30%;
  padding: 35px 0px 0px 40px;
  margin: 0px 0px 0px 70px;
}
.auctions {
  padding: 35px 20px 0px 40px;
}
.button {
  padding: 0px;
  margin: 0px;
}
#button {
  margin: 30px 20px 0px 20px;
  display: flex;
  /* color: #f37470"; */
}
</style>

<template>
  <div class="container">
    <v-simple-table fixed-header>
      <template v-slot:default>
        <thead>
          <tr>
            <th id="ttt">
              NAME LOT
            </th>
            <th>
              DESIRED PRICE
            </th>
            <th>
              TIME LIFE
            </th>
            <th>
              STATUS
            </th>
            <th>
              CURRET BID
            </th>
          </tr>
        </thead>
        <tbody class="www">
          <tr v-for="item in desserts" :key="item.name">
            <td id="ttt">{{ item.name }}</td>
            <td>{{ item.calories }}</td>
            <td>{{ item.calories1 }}</td>
            <td>{{ item.calories2 }}</td>
            <td>{{ item.calories3 }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      desserts: [
        {
          name: "Frozen Yogurt",
          calories: 159,
          calories1: 250
        },
        {
          name: "Ice cream sandwich",
          calories: 237,
          calories1: 250
        },
        {
          name: "Eclair",
          calories: 262
        },
        {
          name: "Cupcake",
          calories: 305
        },
        {
          name: "Gingerbread",
          calories: 356
        },
        {
          name: "Jelly bean",
          calories: 375
        },
        {
          name: "Lollipop",
          calories: 392
        },
        {
          name: "Honeycomb",
          calories: 408
        },
        {
          name: "Donut",
          calories: 452
        },
        {
          name: "KitKat",
          calories: 518
        }
      ]
    };
  }
};
</script>
<style>
.www {
  /* display: flex; */
  text-align: center;
  /* display: flex; */
}
#ttt {
  /* display: flex; */
  text-align: left;
}
</style>

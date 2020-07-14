<template>
  <main class="pa-5">
    <Loader v-if="isLoading"/>
    <section v-else>
      <h1>{{ msg }}</h1>
      <!--    {{ countries }}-->
      <v-list>
        <v-subheader>COUNTRIES</v-subheader>
        <v-list-item-group v-model="item" color="primary">
          <v-list-item v-for="(item, i) in items" :key="i">
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </section>
  </main>
</template>
<script>
  import LineChart from "./lineChart";
  import Loader from "./Loader";

  export default {
    name: "countries",
    components: {
      LineChart,
      Loader
    },
    data: () => ({
      msg: "Countries stats",
      item: 1,
      items: [
        {text: "Country 1", icon: "mdi-clock"}
      ],
      countries: null,
      isLoading: true
    }),
    mounted() {
      this.axios
        .get("https://corona.lmao.ninja/v2/historical?lastdays=30")
        .then(response => {
          this.countries = response.data;
          this.isLoading = false;
        })
    }
  }
</script>
<style scoped>
  h1,
  h2 {
    font-weight: normal;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
</style>
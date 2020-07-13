<template>
  <main class="lighten-5 pa-5" :class="{gray: !isLoading}">
    <Loader v-if="isLoading"/>
    <section v-else>
      <section>
        <h1 class="display-1">{{ queryName }}</h1>
        <v-row align="center" justify="center">
          <start-cards
              v-for="(card, index) in countryDataCards"
              :key="index"
              :cardTitle="card.title"
              :bgColor="card.bgColor"
              :cardAmount="card.amount"
              :cardAmountNew="card.amountNew"
              :cardIcon="card.icon"
          />
        </v-row>
      </section>
      <section>
        <h2 class="display-1">Visuals</h2>
        <v-row class="ma-5" align="center" justify="center">
          <LineChart
              v-for="(visual, index) in countryDataVisuals"
              :key="index"
              :chart-data="visual.chartData"
              :chart-options="visual.chartOptions"
          />
        </v-row>
      </section>
    </section>
  </main>
</template>
<script>
  import StartCards from "./StartCards";
  import LineChart from "./lineChart";
  import Loader from "./Loader";

  export default {
    name: "country",
    components: {
      StartCards,
      LineChart,
      Loader
    },
    props: ["queryName"],
    data: () => ({
      isLoading: true,
      cards: [],
      visuals: []
    }),
    mounted() {
      // this.$store.dispatch('newCountry', this.queryName)
      // this.$store.dispatch('newCountryName', this.queryName)
      // this.updateCountryStats()
      this.isLoading = false;
    },
    methods: {
      updateCountryStats() {
        let data = this.$store.getters.country;
        this.cards.push({ title: 'total cases', bgColor: 'primary lighten-2', amount: data.cases, amountNew: data.cases, icon: 'mdi-alert-box' });
        this.cards.push({ title: 'deaths', bgColor: 'red accent-2', amount: data.deaths, amountNew: 0, icon: 'mdi-emoticon-dead' });
        this.cards.push({ title: 'recoveries', bgColor: 'teal lighten-1', amount: data.recoveries, amountNew: 0, icon: 'mdi-hospital-box' });
        this.visuals = [];
        this.visuals.push({
          id: 1,
          chartData: {
            labels: data.visualLabels,
            datasets: [{
              label: 'Total cases',
              backgroundColor: '#6aaaff',
              data: data.visualData.cases
            }]
          }
        });
        this.visuals.push({
          id: 2,
          chartData: {
            labels: data.visualLabels,
            datasets: [{
              label: 'Deaths',
              backgroundColor: '#ff5252',
              data: data.visualData.deaths
            }]
          }
        });
        this.visuals.push({
          id: 3,
          chartData: {
            labels: data.visualLabels,
            datasets: [{
              label: 'Recoveries',
              backgroundColor: '#26a69a',
              data: data.visualData.recoveries
            }]
          }
        })
      }
    },
    computed: {
      countryDataCards() {
        let countryData = this.$store.getters.country;
        let cards = [];
        
        cards.push({
          title: "total cases",
          bgColor: "primary lighten-2",
          amount: countryData.cases,
          amountNew: 0,
          icon: "mdi-alert-box"
        });
        cards.push({
          title: "deaths",
          bgColor: "red accent-2",
          amount: countryData.deaths,
          amountNew: 0,
          icon: "mdi-emoticon-dead"
        });
        cards.push({
          title: "recoveries",
          bgColor: "teal lighten-1",
          amount: countryData.recoveries,
          amountNew: 0,
          icon: "mdi-hospital-box"
        });
        
        return cards
      },
      countryDataVisuals() {
        let countryData = this.$store.getters.country;
        let visuals = [];

        visuals.push({
          id: 1,
          chartData: {
            labels: countryData.visualLabels,
            datasets: [{
              label: "Total cases",
              backgroundColor: "#6aaaff",
              data: countryData.visualData.cases
            }]
          }
        });

        visuals.push({
          id: 1,
          chartData: {
            labels: countryData.visualLabels,
            datasets: [{
              label: "Deaths",
              backgroundColor: "#ff5252",
              data: countryData.visualData.deaths
            }]
          }
        });

        visuals.push({
          id: 3,
          chartData: {
            labels: countryData.visualLabels,
            datasets: [{
              label: "Recoveries",
              backgroundColor: "#26a69a",
              data: countryData.visualData.recoveries
            }]
          }
        });
        
        return visuals
      }
    }
  }
</script>
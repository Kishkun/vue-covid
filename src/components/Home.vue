<template>
  <main class="lighten-5 pa-5" :class="{gray: !isLoading}">
    <Loader v-if="isLoading"/>
    <section v-else>
      <section>
        <h1 class="display-1">World summary stats</h1>
        <v-row align="center" justify="center" class="ma-10">
          <StartCards
              v-for="(card, index) in cards"
              :key="index"
              :card-title="card.title"
              :bg-color="card.bgColor"
              :card-amount="card.amount"
              :card-amount-new="card.amountNew"
              :card-icon="card.icon"
          />
        </v-row>
      </section>
      <section>
        <h2 class="display-1">Visuals</h2>
        <v-row class="ma-10" align="center" justify="center">
          <LineChart
              v-for="(visual, index) in visuals"
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
    name: "home",
    components: {
      StartCards,
      LineChart,
      Loader
    },
    data: () => ({
      cards: [
        {
          title: "total case",
          bgColor: "primary lighten-2",
          amount: 1000,
          amountNew: 200,
          icon: "mdi-alert-box"
        },
        {
          title: "deaths",
          bgColor: "red accent-2",
          amount: 1000,
          amountNew: 200,
          icon: "mdi-emoticon-dead"
        },
        {
          title: "recoveries",
          bgColor: "teal lighten-1",
          amount: 1000,
          amountNew: 200,
          icon: "mdi-hospital-box"
        }
      ],
      visuals: [],
      continents: null,
      allData: null,
      isLoading: true
    }),
    mounted() {
      this.axios
        .get("https://corona.lmao.ninja/v2/countries?sort")
        .then(response => {
          this.continents = response.data;
          this.updateStats();
        })
        .catch(error => {
          console.error("An API error", error)
        });

      this.axios
        .get("https://corona.lmao.ninja/v2/historical/all")
        .then(response => {
          this.allData = response.data;
          this.updateVisuals();
          this.isLoading = false;
        })
        .catch(error => {
          console.log("An API error", error)
        })
    },
    methods: {
      updateStats() {
        let data = this.continents;
        let cases = 0;
        let deaths = 0;
        let recoveries = 0;

        for (let elem of data) {
          cases += elem.cases;
          deaths += elem.deaths;
          recoveries += elem.recovered;
        }

        this.cards[0].amount = cases;
        this.cards[1].amount = deaths;
        this.cards[2].amount = recoveries;
      },
      updateVisuals() {
        let data = this.allData;
        let cases = data.cases;
        let deaths = data.deaths;
        let recoveries = data.recovered;

        let labels = [];
        let casesPerDay = [];
        let deathsPerDay = [];
        let recoveriesPerDay = [];

        for (let key in cases) {
          labels.push(key);
          casesPerDay.push(cases[key]);
          deathsPerDay.push(deaths[key]);
          recoveriesPerDay.push(recoveries[key]);
        }

        this.visuals.push({
          id: 1,
          chartData: {
            labels: labels,
            datasets: [{
              label: "Total cases",
              backgroundColor: "#6aaaff",
              data: casesPerDay
            }]
          }
        });

        this.visuals.push({
          id: 1,
          chartData: {
            labels: labels,
            datasets: [{
              label: "Deaths",
              backgroundColor: "#ff5252",
              data: deathsPerDay
            }]
          }
        });

        this.visuals.push({
          id: 3,
          chartData: {
            labels: labels,
            datasets: [{
              label: "Recoveries",
              backgroundColor: "#26a69a",
              data: recoveriesPerDay
            }]
          }
        });
        
        let lastDayCases = casesPerDay[casesPerDay.length - 1] - casesPerDay[casesPerDay.length - 2];
        let lastDayDeaths = deathsPerDay[deathsPerDay.length - 1] - deathsPerDay[deathsPerDay.length - 2];
        let lastDayRecoveries = recoveriesPerDay[recoveriesPerDay.length - 1] - recoveriesPerDay[recoveriesPerDay.length - 2];
        
        this.cards[0].amountNew += lastDayCases;
        this.cards[1].amountNew += lastDayDeaths;
        this.cards[2].amountNew += lastDayRecoveries;
      }
    }
  }
</script>
<style scoped>
  h1,
  h2 {
    font-weight: normal;
    text-align: center;
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
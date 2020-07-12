import { Line, mixins } from "vue-chartjs";
const {reactiveProp} = mixins;

export default {
  name: "line-chart",
  extends: Line,
  props: {
    chartData: Object,
    chartOptions: Object
  },
  mixins: [reactiveProp],
  mounted() {
    this.renderChart(this.chartData, this.chartOptions)
  }
}
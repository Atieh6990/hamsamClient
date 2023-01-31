import {Line} from 'vue-chartjs'
import chart from "../api/profileALIREZA"

export default {
  props: ['chartData'],
  extends: Line,
  mounted() {
    setTimeout(() => {
      // console.log('render chart ===>' + JSON.stringify(this.chartData))
      this.renderChart(this.chartData)
    }, 2000)
  },
  // data() {
  //   return {
  //     ccc: {
  //       labels: ['', '', '', '', '', '', '', ''],
  //       datasets: [
  //         {
  //           data: [0, 7, 50, 68, 32, 20, 12, 40],
  //           // data: chartData,
  //           label: 'دریافت امتیاز',
  //           backgroundColor: '#42CAEB',
  //           borderColor: [
  //             '#42EAEB',
  //           ],
  //           borderWidth: 6,
  //           options: {
  //             scales: {
  //               xAxes: [{
  //                 display: true,
  //                 gridLines: {
  //                   display: false
  //                 },
  //                 scaleLabel: {
  //                   display: true,
  //                   labelString: 'Month'
  //                 }
  //               }],
  //               yAxes: [{
  //                 display: true,
  //                 gridLines: {
  //                   display: false
  //                 },
  //                 scaleLabel: {
  //                   display: true,
  //                   labelString: 'Value'
  //                 }
  //               }]
  //             }
  //           },
  //
  //         },
  //       ]
  //     }
  //   }
  // },

  method: {
    getChart(id) {
      // console.log(this.ccc);
      // return this.ccc;
      return chart.getChartData(id).then(data => {
        // console.log(data);
        return data
      })
      // .catch(error => {
      //   alert(error);
      // })
    }
  }
}

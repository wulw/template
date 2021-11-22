<template>
  <div class="party-age-wrapper">
    <div id="partyAgeId"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts'

let partyAgeChart = null

export default {
  name: 'partyAge',

  data () {
    return {

    }
  },
  methods: {
    createPartyAgeChart() {
      let option = option = {
        title: {
          text: ''
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          top: 0,
          left: '3%',
          right: 24,
          bottom: '3%',
          containLabel: true
        },
        color: ['#D0021B', '#F07138', '#F5A623', '#5CBEDC', '#E4848E'],
        xAxis: {
          type: 'value',
          boundaryGap: [0, 0.01]
        },
        yAxis: {
          type: 'category',
          data: ['30岁以下', '30-40岁', '41-50岁', '51-60岁', '60岁以上']
        },
        series: [
          {
            name: '2011',
            type: 'bar',
            barWidth: 8,
            data: [18203, 23489, 29034, 104970, 131744]
          }
        ]
      }

      partyAgeChart = echarts.init(document.getElementById('partyAgeId'))
      partyAgeChart.setOption(option)
    }
  },
  mounted() {
    this.createPartyAgeChart()
  }
}
</script>

<style lang="scss" scoped>
.party-age-wrapper {
  margin-top: 48px;
  height: calc(100% - 48px);
  width: 100%;
  #partyAgeId {
    width: 100%;
    height: 100%;
  }
}
</style>

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

  props: {
    ageData: {
      type: Array,
      default: []
    }
  },
  data () {
    return {

    }
  },
  watch: {
    ageData(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.createPartyAgeChart()
      }
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
          data: this.ageData.map(item => item.name)
        },
        series: [
          {
            name: '',
            type: 'bar',
            barWidth: 8,
            data: this.ageData.map(item => item.count)
          }
        ]
      }

      partyAgeChart = echarts.init(document.getElementById('partyAgeId'))
      partyAgeChart.setOption(option)
    }
  },
  mounted() {
    // this.getHomeList()
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

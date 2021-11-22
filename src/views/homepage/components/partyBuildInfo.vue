<template>
  <div class="party-build-info">
    <div id="partyBuildInfoId"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts'

let partyBuildInfoChart = null

export default {
  name: 'partyBuildInfo',

  data () {
    return {

    }
  },
  methods: {
    initEcharts() {
      let option = {
        title: {
          text: 'Referer of a Website',
          subtext: 'Fake Data',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'horizontal',
          left: 'center',
          bottom: 0
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: '50%',
            data: [
              { value: 1048, name: 'Search Engine' },
              { value: 735, name: 'Direct' },
              { value: 580, name: 'Email' },
              { value: 484, name: 'Union Ads' },
              { value: 300, name: 'Video Ads' }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }

      partyBuildInfoChart = echarts.init(document.getElementById('partyBuildInfoId'))
      partyBuildInfoChart.setOption(option)
    }
  },
  mounted() {
    this.initEcharts()
    window.onresize = () => {
      partyBuildInfoChart.resize()
    }
  }
}
</script>

<style lang="scss" scoped>
.party-build-info {
  width: 100%;
  margin-top: 48px;
  height: calc(100% - 48px);
  #partyBuildInfoId {
    width: 100%;
    height: 100%;
  }
}
</style>

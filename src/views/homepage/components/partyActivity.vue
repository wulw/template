<template>
  <div class="party-activity-wrapper">
    <div id="partyActivityId"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts'

let partyActivityChart = null

export default {
  name: 'partyActivity',

  props: {
    activityData: {
      type: Object,
      default: null
    }
  },
  data () {
    return {

    }
  },
  watch: {
    activityData(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.initEcharts()
      }
    }
  },
  methods: {
    initEcharts () {
      let option = {
        // color: ['#D0021B', '#F07138', '#F5A623', '#5CBEDC', '#E4848E', '#FFDA33'],
        grid: {
          top: 8,
          bottom: 24,
          right: 16,
          left: 40
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        xAxis: {
          type: 'category',
          nameRotate: 45,
          data: ['组织生活会', '三会一课', '中心小组学习会', '民主生活会', '主题党日活动', '谈话谈心']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [
              {
                value: this.activityData.zzshh,
                itemStyle: {
                  color: '#D0021B'
                }
              },
              {
                value: this.activityData.shyk,
                itemStyle: {
                  color: '#F07138'
                }
              },
              {
                value: this.activityData.zxzxxh,
                itemStyle: {
                  color: '#F5A623'
                }
              },
              {
                value: this.activityData.mzshh,
                itemStyle: {
                  color: '#5CBEDC'
                }
              },
              {
                value: this.activityData.ztdyhd,
                itemStyle: {
                  color: '#E4848E'
                }
              },
              {
                value: this.activityData.thtx,
                itemStyle: {
                  color: '#FFDA33'
                }
              }
            ],
            type: 'bar',
            barWidth: 26
          }
        ]
      }

      console.log(echarts)
      partyActivityChart = echarts.init(document.getElementById('partyActivityId'))
      partyActivityChart.setOption(option)
    }
  },
  mounted() {
    window.onresize = function() {
      partyActivityChart.resize()
    }
  }
}
</script>

<style lang="scss" scoped>
.party-activity-wrapper {
  width: 100%;
  margin-top: 48px;
  height: calc(100% - 48px);
  #partyActivityId {
    width: 100%;
    height: 100%;
  }
}
</style>

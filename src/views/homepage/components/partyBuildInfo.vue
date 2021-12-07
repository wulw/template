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

  props: {
    buildData: {
      type: Object,
      default: null
    }
  },
  data () {
    return {

    }
  },
  watch: {
    buildData(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.initEcharts()
      }
    }
  },
  methods: {
    initEcharts() {
      let option = {
        title: {
          text: '',
          subtext: '',
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
            name: '',
            type: 'pie',
            radius: '50%',
            data: [
              { value: this.buildData.zcwj, name: '政策文件' },
              { value: this.buildData.ldjh, name: '领导讲话' },
              { value: this.buildData.dwzs, name: '党务知识' },
              { value: this.buildData.djyw, name: '党建要闻' }
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
    this.initEcharts
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

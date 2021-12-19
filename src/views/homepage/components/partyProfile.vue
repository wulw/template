<template>
  <div class="party-profile-wrapper">
    <div id="partyProfileId"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts'

let partyProfileChart = null

export default {
  name: 'partyProfile',

  props: {
    profileData: {
      type: Object,
      default: null
    }
  },
  data () {
    return {

    }
  },
  watch: {
    profileData(newVal, oldVal){
      if (newVal !== oldVal) {
        this.createPartyProfileChart()
      }
    }
  },
  methods: {
    createPartyProfileChart() {
      const option = {
        color: ['#D0021B'],
        title: [
          {
            subtext: '党总支',
            left: '12.5%',
            top: '75%',
            textAlign: 'center'
          },
          {
            subtext: '党支部',
            left: '37.5%',
            top: '75%',
            textAlign: 'center'
          },
          {
            subtext: '正式党员',
            left: '62.5%',
            top: '75%',
            textAlign: 'center'
          },
          {
            subtext: '预备党员',
            left: '87.5%',
            top: '75%',
            textAlign: 'center'
          }
        ],
        series: [
          {
            type: 'pie',
            radius: ['40%', '50%'],
            center: ['50%', '50%'],
            data: [{
               name: this.profileData.dangzongzhi, // + '人',
               value: this.profileData.dangzongzhi
            }],
            left: 0,
            right: '75%',
            top: 0,
            bottom: 0,
            label: {
              show: true,
              position: 'center'
            }
          },
          {
            type: 'pie',
            radius: ['40%', '50%'],
            center: ['50%', '50%'],
            data: [{
               name: this.profileData.dangzhibu, // + '人',
               value: this.profileData.dangzhibu
            }],
            label: {
              show: true,
              position: 'center'
            },
            left: '25%',
            right: '50%',
            top: 0,
            bottom: 0
          },
          {
            type: 'pie',
            radius: ['40%', '50%'],
            center: ['50%', '50%'],
            data: [{
               name: this.profileData.zsdy + '人',
               value: this.profileData.zsdy
            }],
            label: {
              show: true,
              position: 'center'
            },
            left: '50%',
            right: '25%',
            top: 0,
            bottom: 0
          },
          {
            type: 'pie',
            radius: ['40%', '50%'],
            center: ['50%', '50%'],
            data: [{
               name: this.profileData.ybdy + '人',
               value: this.profileData.ybdy
            }],
            label: {
              show: true,
              position: 'center'
            },
            left: '75%',
            right: 0,
            top: 0,
            bottom: 0
          }
        ]
      }

      partyProfileChart = echarts.init(document.getElementById('partyProfileId'))
      partyProfileChart.setOption(option)
    }
  }
}
</script>

<style lang="scss" scoped>
.party-profile-wrapper {
  margin-top: 24px;
  height: calc(100% - 24px);
  width: 100%;
  #partyProfileId {
    width: 100%;
    height: 100%;
  }
}
</style>

<template>
  <div class="party-gender-wrapper">
    <div id="partyGenderId"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts'

let partyGenderChart = null 

export default {
  name: 'partyGender',

  props: {
    genderData: {
      type: Object,
      default: null
    }
  },
  data () {
    return {

    }
  },
  watch: {
    genderData(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.createPartyGenderChart()
      }
    }
  },
  methods: {
    createPartyGenderChart() {
      var man = 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAuCAYAAAAoaDnGAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAFKADAAQAAAABAAAALgAAAABZTFDaAAAEIklEQVRIDaWXX2gcRRzHf7/Zu9SHgoEIgi1WpLHRgj5Y8aVIS1ONQaUiDfYSLAoiQov62Lc8BFFQfBDBB30Q8U57D0F90NgktSVWBdtKbFMu12iUNrRpc+nFpL293Z2fv9m7vc7uzl1Odrkw8/vN9/fZmZ3f/AlCi+fAWKFHpK03EShDAHMg8Z1qyR7ND2yvNgvDZg2ZieLrAvFtbu/UNUR0HGx46Yv+7ku6P6gbgQeOzb4gLJHnRmM7B08tOmt9Pzz1yFoACkoRVIJy/9HzHQw70gKmpDvvsu54NojRyxgw3YlbWPCQLjLVhbB2G/1RJ4p0GoisqD9q87fcGPUpO9bDqlu9wv7rJnHIh3AuZNeNGDDft73EbTmTOPBx70ouwdHA1ssYUDWurayO+OmhK+t1zsdbgHT4qz3dc4bmpmkBPNsbO7o2vMFJvZ8QNiGBTYC/Sul9kNu7bcoEa+rbNXw8FTSqNHp+/ELXvtGzoQQP2qNlLHEz44UXBYrDEuhIds8DJ6MByh6aLD5HhAcl0Xu53u6fdU0DmJmY2YKQHkHEIV9AdNn1vH1fPtnzmx4wdKy4CywcZV8np5ctAT53HHw337f1otKhGt49OzcfRAHDCLhZD+aAyx55/bnenmnlHxwvPAZofYsId0d0Swz+0AH5CQ5OFE9wr54ICTSDZ/tPl9yn07xTEKXGGKZWkvHhDJhPAeK9xta6k192fwrS3xCrW8F8OdG5FL/2d1beV483FgzaZmyIOgm+E5xbxiUU1bZlI1xkIM22JV5XRI7rOgsCUC6tq21DwJ+4XAVnUaBLZTb4l/AhWFxeKK0ImbJucL45CXG8KeCVH1/eXRGiAmWeRTspkAf5t2KImx3uLZ7p1aRAztN5H7jmVSv8BVcSA5H+8YF3lgsVHvK/iYEga8D8wIDH6zURkOOrgix1FgWHFC4n6yEuS6j4+eyfKfxBzycB8jGxOjtnq8Ot1kOnZI8AyQx3feH/grkzBd7dR06/tsPP5caOrUCD48VPUeAr7UPpL7sCj+f7u68FMf6QA4PTvdiot1Hh9Tqtw1RIGAiy0AbntkTCmdtGrRYGSskHTfvrmoQMHWAKGQKS7VziYVyNvtVk82SUHc+Nbc4hYPaZh29wsH8cmiBhH83kf8rHbrEhIAfwBg6nw4FNrVMwPMynZ/iJAhXyl7DEbBHKSVNLDMhdPMN/LbcztQCcqmt8cQyYncrOcy//ML1d803W75Gaq1aNAdV34Zkeiyk1Bw+36YU0DlSBHn2ttiSN0aiyf+a6UznRcEQqRmD2VHaabxMnI9qaSfCR6f+TQGsEqmFLCe/z0PmnPURnr3k3P9M8saoZyLJc79bv+d7zcRChZlYivtqqd0rbuPoGgXq5ZMNbXRuowt18FKR7KLv3wfVmH/4DDcKmEuDeXI0AAAAASUVORK5CYII='

      var woman = 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAuCAYAAADHqlL4AAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAFaADAAQAAAABAAAALgAAAADe6puZAAAEu0lEQVRIDa1XXWxURRQ+Z+7d/u22aiKKpl1aoU1jpRqsphIj0SiRAuEBaaJGDQ/iUxOhWBXbMJZWfixNE2NiYkCRaIJ/IZYYHzT0TY1I0ICRlKbY8qOgibhLW7Z77/HM7c7t3b13b2XrJNuZ+c53vjkzc2buFCGknOnZW1VC8AIBtiHCtA0wYE9M7qt+47WLIW6A+Yzj3f1PgYA+JtyWxSEYI7A3V3Vt/TwL93QCRcd37G0BxMNsjHi4bpOIptCGlsrt7Udd0NMQnrbTHN/cX4qIvfkEFYntJSBwx7FNmwIH9YnCDbCU/e52Rgj5Q0D3Lbi9rjaI4hMlgxYyMXBZvAIcbZExw/XCTtsvasNVHysYILKMZJDJJ5qauvYzEF0KIudgv6UmU6dzMKfrE63due2yjfhWENmLEdkDi3e/csWL6bZPVBninVt6baIPNCmgfmeflcw7sG9Dzr3+5mpbiOp4V/vb6gDwSdpIAPVMtHnHfyGE9+Od7YdGpSwxjVg3w+9WdXUMewc2vR2nLXC9QNw43tNXXtW5ZRdjH/3asbvcKpukBimdjTkt+26OGPgeJ+wam3CUOVmiWZEq52hF5ASDd6gBbKCBkXTipYelTKu+KqOyr940xUHmNM0g9E1lZ/tj3OYJzZSsNY1FzSYm18wa8cUlRsX+Y1KWKWysp+8hjvCrWUGH2Twu+xdrH1VniYKg1Yyxz2zhNX3mVqP8Q74PnkfAL3jKi2atqoVRFLTGixm6M9zWVmzGbtrDjrdoTNd8eur5t5ZtJRrLqWMVK5YfGBoacpbAjbR4waJGJKjPIf+nLmfEvc9BrE6TXVEUYhVPzZ8NmhlS8wxKTQPXaYoj+vGGDQZH+bgGC6lZeJ3SUb6O6P2NTXWEdE8hYtqHl2DZ8qXNd7miBhiPqiloQiE1p0wxiZklyKypyEqJQkQzPmuPSmniqNxZHTGLTqp8m4eY60q21WwaZuQBFrzMh+wvTvsqtmYlv8sOaXByXmPzeXYUgOJpM5FODhoTpUeiUeNBFHiE0+q6RdkhmaLpllQCLkTLIhFXYKy7v1cI2BYS0Bwm+9nKzq0HFcnZqFNSFgmkVXN4hZoJxHpNcETLoOxOXpcGDRZUE6wYkbviytcR5ftxpfrkFiSWceKduLFImCsdUSmlAEJ15c2/CHyCRRD5gl2CBvzEieRcxPNSJkimwWoUaNqt/4ugigYhZiI+aabI+swENHhNWvn8q81y0+w6ouaHIJ3kzT40beGnroD65KJZvoyPxCMMNvOvgV8qcV6hzP2QMwS/YgjxR0a/s4C+pnTieI2UU4rliua48Fdzz8KIYX7PDCdNcu388Wzlr+gnfjyTUkGGAzBxiQX/DLLxVFNWmk4F2RQWPDU2cKrxiwT+CHLk6V1MQfJckE1heUWVkSMaU7W/4HCtlP/48RkkVJSzYSTIkd9UaoPyllBR/i8k642kVci2v9XtoDpUFCw6ozbF60gEfwuyC480AVfP8kVzwSvK7eOV8uXzOVhWNzRS9XTkSE94PZBokPucGPlLqGjG7Uvtzht0ZdpOHdb9fPWcomnLGuRonSUgwv018tWz+cQ0Pqdojez4ncV6WfiHicT0du0YVv8LQE9vj7wGElEAAAAASUVORK5CYII='

      let maxData = this.genderData.man + this.genderData.woman

      console.log(maxData)

      let option = {
          tooltip: {
          },
          xAxis: {
              max: maxData,
              splitLine: {show: false},
              offset: 10,
              axisLine: {
                  lineStyle: {
                      color: '#999'
                  }
              },
              axisLabel: {
                  margin: 10
              },
              show: false
          },
          yAxis: {
              data: ['男性', '女性'],
              inverse: true,
              axisTick: {show: false},
              axisLine: {show: false},
              axisLabel: {
                  margin: 10,
                  color: '#999',
                  fontSize: 16
              }
          },
          grid: {
              top: 'center',
              height: 120,
              left: 56,
              right: 80
          },
          series: [{
              // current data
              type: 'pictorialBar',
              // symbol: man,
              symbolRepeat: 'fixed',
              symbolMargin: '5%',
              symbolClip: true,
              symbolSize: [10, 26],
              symbolBoundingData: maxData,
              data: [
                {
                  value: this.genderData.man,
                  symbol: man
                },
                {
                  value: this.genderData.woman,
                  symbol: woman
                }
              ],
              markLine: {
                  symbol: 'none',
                  label: {
                      formatter: 'max: {c}',
                      position: 'start'
                  },
                  lineStyle: {
                      color: 'green',
                      type: 'dotted',
                      opacity: 0.2,
                      width: 2
                  },
                  data: [{
                      type: 'max'
                  }]
              },
              z: 10
          }, 
          {
            // full data
            type: 'pictorialBar',
            itemStyle: {
                normal: {
                    opacity: 0.2
                }
            },
            label: {
                show: true,
                formatter: function (params) {
                    return (params.value / maxData * 100).toFixed(1) + ' %';
                },
                position: 'right',
                offset: [10, 0],
                color: 'green',
                fontSize: 18
            },
            animationDuration: 0,
            symbolRepeat: 'fixed',
            symbolMargin: '5%',
            // symbol: woman,
            symbolSize: [10, 26],
            symbolBoundingData: maxData,
            data: [
              {
                value: this.genderData.man,
                symbol: man
              },
              {
                value: this.genderData.woman,
                symbol: woman
              }
            ],
            z: 5
        }]
      }

      partyGenderChart = echarts.init(document.getElementById('partyGenderId'))
      partyGenderChart.setOption(option)
    }
  }
}
</script>

<style lang="scss" scoped>
.party-gender-wrapper {
  margin-top: 48px;
  height: calc(100% - 48px);
  width: 100%;
  #partyGenderId {
    width: 100%;
    height: 100%;
  }
}
</style>

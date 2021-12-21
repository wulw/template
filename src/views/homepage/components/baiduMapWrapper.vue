<template>
  <div class="baidu-map-wrapper">
    <baidu-map
      id="mapId"
      :scroll-wheel-zoom="true"
      @ready="mapReady">
    </baidu-map>
  </div>
</template>

<script>
export default {
  name: 'baiduMapWrapper',

  props: {
    baiduMapData: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {

    }
  },
  methods: {
    mapReady ({ BMap, map }) {
      // 选择一个经纬度作为中心点
      this.point = new BMap.Point(113.27, 23.13)
      map.centerAndZoom('合肥', 12)

      this.baiduMapData.forEach(item => {
        let marker = new BMap.Marker(new BMap.Point(item.lng, item.lat))
        map.addOverlay(marker)
        // let label = new BMap.Label(item.xiang, {       // 创建文本标注
        //   position: new BMap.Point(item.lng, item.lat),
        //   offset: new BMap.Size(0, -50)
        // })  
        // map.addOverlay(label)  
      })
      // // 创建点标记
      // var marker1 = new BMap.Marker(new BMap.Point(116.404, 39.925))
      // var marker2 = new BMap.Marker(new BMap.Point(116.404, 39.915))
      // var marker3 = new BMap.Marker(new BMap.Point(116.395, 39.935))
      // var marker4 = new BMap.Marker(new BMap.Point(116.415, 39.931))
      // // 在地图上添加点标记
      // map.addOverlay(marker1)
      // map.addOverlay(marker2)
      // map.addOverlay(marker3)
      // map.addOverlay(marker4)
    }
  }
}
</script>

<style lang="scss" scoped>
.baidu-map-wrapper {
  width: 100%;
  height: 100%;
  ::v-deep#mapId {
    width: 100%;
    height: 100%;
    div {
      border-radius: 8px;
    }
  }
}
</style>

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

  data () {
    return {

    }
  },
  methods: {
    mapReady ({ BMap, map }) {
      // 选择一个经纬度作为中心点
      this.point = new BMap.Point(113.27, 23.13);
      map.centerAndZoom('合肥', 12);
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

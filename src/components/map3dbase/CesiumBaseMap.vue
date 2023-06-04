<template>
  <div id="cesiummapdiv">
    <div id="base3dmap"></div>
  </div>
</template>
<script>
import CesiumBaseMap from './CesiumBaseMap';
export default CesiumBaseMap;
</script>

<style lang="less" scoped>
#cesiummapdiv {
  height: 100%;
  width: 100%;
}
#base3dmap {
  height: 100%;
  width: 100%;
}

/deep/.cesium-viewer-toolbar {
  display: none;
}
/deep/.earthview-popup-head {
  color: #5f91fc;
}
/deep/.compass {
  display: none;
}
/deep/.navigation-controls {
  display: none;
}
/deep/#distanceLegendDiv {
  display: none;
}
/deep/.earthview-popup-body::-webkit-scrollbar {
  height: 0 !important;
  width: 0 !important;
}
</style>

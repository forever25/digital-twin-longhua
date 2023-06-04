/*
 *3d地图容器组件
 * @module components/map3dbase/CesiumBaseMap
 * @desc 用于3维展示地图
 * @author zhaoting
 * @date 2019年12月26日
 * @param {Array} [center]    - 地图默认中心坐标
 * @param {Number} [zoom]     - 地图缩放级别
 */
import {
  Message
} from 'view-design';
import axios from 'axios';
window.mapLayer = null;
window.layer = null;
window.modelTile = [];
//矢量面数据
window.modelArray = [];
window.modelIdArray = [];
window.entity = null; //线图层
window.modeCurrentId = ""
window.modeCurrentHight = null
import {
  getDistance
} from "@/utils/getDistance.js"
export default {
  name: '',
  components: {},
  events: {},
  props: {},
  data() {
    return {
      parkingAreasList: []
    };
  },
  created() { },
  mounted() {
    this.init3dMap();
  },
  computed: {
    imgData() {
      return this.$store.state.imgDisplay.imgData
    },
  },
  watch: {
    imgData: {
      handler(newValue, oldValue) {
        console.log(newValue)
      },
      deep: true,
      immediate: true
    }
  },
  methods: {

    init3dMap() {
      if (window.cesiumMap != null) {
        window.cesiumMap = null;
      }
      window.cesiumMap = EarthView;
      window.polyline = new EarthView.PolylineGeometry(); //线图层
      window.cesiumMap.createEarth("base3dmap", {
        allowPrint: true,
      });
      window.cesiumMap.pointMark = new EarthView.PlaceMark(); //标注图层
      // window.cesiumMap.getEarth().scene.globe.show = true; //不显示地球，这条和地球透明度选一个就可以
      window.cesiumMap.getEarth().scene.sun.show = false; //在Cesium1.6(不确定)之后的版本会显示太阳和月亮，不关闭会影响展示
      window.cesiumMap.getEarth().scene.moon.show = false;
      window.cesiumMap.getEarth().scene.skyBox.show = false; //关闭天空盒，否则会显示天空颜色
      // window.cesiumMap.getEarth().imageryLayers.get(0).show = false; //不显示底图
      window.cesiumMap.getEarth().scene.globe.baseColor = Cesium.Color.fromCssColorString('#7A929A');
      window.cesiumMap.getEarth().scene.globe.enableLighting = false;
      window.cesiumMap.getEarth().shadows = false;
      window.entity = new EarthView.Entity(); //线图层
      //是否加载天地图底图
      if (globalConfig.map.isLoadBaseMap) this.addTiandituBaseLayer();
      //是否加载模型数据
      window.cesiumMap.model = new EarthView.Model();
      // 加载图层
      if (globalConfig.mapLayer.length > 0) {
        for (var i = 0; i < globalConfig.mapLayer.length; i++) {
          this.createLayer(globalConfig.mapLayer[i], 500 + i)
        }
      }

      if (this.handler != null) {
        this.handler.destroy();
        this.handler = null;
      }
      var arrLoc = [];
      var pickPosition = {
        x: null,
        y: null
      }
      var handler = new Cesium.ScreenSpaceEventHandler(window.cesiumMap.getEarth().scene.canvas); //定义事件

      //单击显示点位坐标信息
      handler.setInputAction(function (lclickment) {
        //得到当前三维场景
        var scene = window.cesiumMap.getEarth().scene;
        //得到当前三维场景的椭球体
        var ellipsoid = scene.globe.ellipsoid;
        //var cartesian = LoadCesium.window.cesiumMap.getEarth().camera.pickEllipsoid(lclickment.position, ellipsoid);
        var cartesian = window.cesiumMap.getEarth().scene.pickPosition(lclickment.position);
        let positionPick = cartesian;
        var pinBuilder = new Cesium.PinBuilder();
        if (cartesian) {
          var cartographic = ellipsoid.cartesianToCartographic(cartesian);
          var lon = Cesium.Math.toDegrees(cartographic.longitude).toFixed(7);
          var lat = Cesium.Math.toDegrees(cartographic.latitude).toFixed(7);
          //地理高度
          // var height = (cartographic.height+1).toFixed(2);
          //console.log(lon+","+lat+","+height);
          //相机高度
          var height = window.cesiumMap.getEarth().camera.positionCartographic.height.toFixed(0);
          var heading = Cesium.Math.toDegrees(window.cesiumMap.getEarth().camera.heading).toFixed(2)
          var pitch = Cesium.Math.toDegrees(window.cesiumMap.getEarth().camera.pitch).toFixed(2)
          console.log(lon + "," + lat + "," + height + ',' + heading + ',' + pitch);
        }
      }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

      // this.resetLocation();

      //添加鼠标移动事件(模型拾取)
      // this.addSingleMode();
      // handler.setInputAction((movement) => {
      //   let pickFeature = window.cesiumMap.getEarth().scene.pick(movement.endPosition);
      //   if (pickFeature && pickFeature.id && pickFeature.id._id) {
      //     //判断ID是否在矢量面内
      //     if (window.modelIdArray.indexOf(pickFeature.id._id) > -1) {
      //       if (window.modeCurrentId && window.modeCurrentId == "") {
      //         //高亮模型
      //         this.addHightPolygon(pickFeature.id._id)
      //         window.modeCurrentId = pickFeature.id._id
      //       } else {
      //         if (window.modeCurrentId != pickFeature.id._id) {
      //           //清空原始高亮模型
      //           this.removeHightPolygon()
      //           //高亮模型
      //           this.addHightPolygon(pickFeature.id._id)
      //           window.modeCurrentId = pickFeature.id._id
      //         }
      //       }
      //     }
      //   } else {
      //     //清空高亮
      //     this.removeHightPolygon()
      //     window.modeCurrentId = ""
      //   }
      // }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
      // 添加初始化设置
      this.addElectronicFence()
      this.flyEvent(globalConfig.map.detail)
    }, //3维地图初始化

    /**
     * @description: 添加高亮模型
     * @author: wzd
     * @date: 2022-03-12 16:40:04
     */
    addHightPolygon(id) {
      if (id) {
        //寻找高亮数据
        let temp = window.modelArray.filter(item => {
          return item.id == id
        });
        if (temp && temp.length > 0) {
          window.modeCurrentHight = this.createExtrudedPolygonTemp(temp[0].points)
        }
      }
    },

    //坐标转换
    getDegreesArrayHeights(pointArray, height) {
      let degreesArrayHeights = [];
      for (let i = 0; i < pointArray.length; i += 2) {
        degreesArrayHeights.push(pointArray[i]);
        degreesArrayHeights.push(pointArray[i + 1]);
        degreesArrayHeights.push(height);
      }
      return degreesArrayHeights;
    },

    /**
     * @description: 添加高亮
     * @author: wzd
     * @date: 2022-03-12 16:52:15
     */
    createExtrudedPolygonTemp(polygonGeometry) {
      let idStr = this.getUUID()
      let temp = new Cesium.Entity({
        id: idStr,
        polygon: {
          hierarchy: Cesium.Cartesian3.fromDegreesArray(polygonGeometry),
          material: Cesium.Color.YELLOW.withAlpha(0.5),
          outline: false,
          outlineColor: Cesium.Color.BLANK,
          show: true,
        },
        show: true
      });
      return window.cesiumMap.getEarth().entities.add(temp);
    },

    /**
     * @description: 移除高亮模型
     * @author: wzd
     * @date: 2022-03-12 16:41:08
     */
    removeHightPolygon() {
      if (window.modeCurrentHight) {
        window.cesiumMap.getEarth().entities.remove(window.modeCurrentHight);
        window.modeCurrentHight = null;
      }
    },

    /**
     * @description: 单体化事件
     * @author: wzd
     * @date: 2022-03-12 08:39:36
     */
    addSingleMode() {
      axios({
        method: "GET",
        url: globalConfig.buildingAreaQueryConfig.url,
        params: {
          service: "WFS",
          version: "1.0.0",
          request: "GetFeature",
          typeName: globalConfig.buildingAreaQueryConfig.layer,
          maxFeatures: 1000,
          outputFormat: "application/json"
        }
      }).then(res => {
        if (res && res.features) {
          if (res.features.length > 0) {
            //加载面数据
            this.addPolygon(res.features);
          } else {
            console.log("调用geoserver的wfs服务失败。")
          }
        } else {
          console.log("调用geoserver的wfs服务失败。")
        }
      }).catch(err => {
        console.log("调用geoserver的wfs服务失败,原因:" + err)
      })
    },

    /**
     * @description: 加载面数据
     * @author: wzd
     * @date: 2022-03-12 09:12:20
     */
    addPolygon(data, dataId) {
      for (let i = 0; i < data.length; i++) {
        if (data[i].geometry && data[i].geometry.coordinates && data[i].geometry.coordinates.length > 0) {
          for (let j = 0; j < data[i].geometry.coordinates.length; j++) {
            for (let n = 0; n < data[i].geometry.coordinates[j].length; n++) {
              let coordinatesArray = [];
              for (let m = 0; m < data[i].geometry.coordinates[j][n].length; m++) {
                coordinatesArray.push(data[i].geometry.coordinates[j][n][m][0])
                coordinatesArray.push(data[i].geometry.coordinates[j][n][m][1])
              }
              let idStr = dataId ? dataId : this.getUUID()
              let polygon = new Cesium.Entity({
                id: idStr,
                polygon: {
                  hierarchy: Cesium.Cartesian3.fromDegreesArray(coordinatesArray),
                  material: Cesium.Color.RED.withAlpha(0),
                  outline: false,
                  outlineColor: Cesium.Color.BLANK,
                  show: true,
                },
                show: true
              });
              window.cesiumMap.getEarth().entities.add(polygon);
              window.modelArray.push({
                id: idStr,
                points: coordinatesArray
              })
              window.modelIdArray.push(idStr)
            }
          }
        }
      }
    },

    /**
     * @description: 生成UUID
     * @author: wzd
     * @date: 2022-03-12 14:45:18
     */
    getUUID() {
      var temp_url = URL.createObjectURL(new Blob());
      var uuid = temp_url.toString(); // blob:https://xxx.com/b250d159-e1b6-4a87-9002-885d90033be3
      URL.revokeObjectURL(temp_url);
      return uuid.substr(uuid.lastIndexOf("/") + 1);
    },

    addTiandituBaseLayer() {
      window.layer = new EarthView.Layer();
      window.layer.addTiandituLayer("天地图影像", {
        mapStyle: EarthView.TiandituMapsStyle.IMG_W,
        tk: "14ba77517bab8f35dcc7d88916ee09cd",
        maximumLevel: 18
      });
      window.layer.addTiandituLayer("天地图注记", {
        mapStyle: EarthView.TiandituMapsStyle.CIA_W,
        tk: "14ba77517bab8f35dcc7d88916ee09cd",
        maximumLevel: 18
      });
    }, //加载天地图底图
    // 加载模型
    createLayer(config, zindex, model1) {
      if (config.type == "layer.photography") {
        //倾斜摄影-三维模型数据
        window.cesiumMap.model.remove3Dtiles(config.id);
        let tileSet = window.cesiumMap.model.add3DTiles(config.url, config.id, (tmp_tileSet) => {
          window.cesiumMap.model.adjuest3DtilesVerticalPosition(tmp_tileSet, config.height);
        });
        tileSet.id = config.id;
        tileSet.show = true;
        window.modelTile.push(tileSet)
      }
    },
    treeClickEvent(data) {
      if (data.type && data.type == "model") {
        window.modelTile.map(items => {
          if (data.checked && data.id == items.id) {
            items.show = true;
            this.flyEvent(data.location)
          } else if (!data.checked && data.id == items.id) {
            items.show = false;
          }
        })
      } else {
        if (data.checked) {
          if (data.id == "whdx-003") {
            this.addXingHuLabel(data);
            let datas = JSON.parse(JSON.stringify(data));
            datas.location.lat = parseFloat(datas.location.lat) - 0.0003
            this.flyEvent(datas.location)
          } else {
            this.flyEvent(data.location);
          }
        }
      }
    },

    addLineLayer(dataArr) {
      let lineSum = [];
      for (let j = 0; j < dataArr.length; j++) {
        let lineArr = [];
        lineArr.push(dataArr[j].lon);
        lineArr.push(dataArr[j].lat);
        // lineArr.push(dataArr[j].alt);
        var oneLine = {
          id: `line`,
          points: lineArr,
          rgba: [1, 0, 0, 1],
          lineWidth: 3
        }
        lineSum.push(oneLine)
      }
      window.polyline.add(lineSum, "line");
    },


    /**
     *@author: ljj
     *@Date: 2022-03-10 09:57:55
     *@description: 飞行事件
     */
    flyEvent(data) {
      if (data.lon && data.lat && data.alt) {
        window.cesiumMap.getEarth().camera.flyTo({
          destination: Cesium.Cartesian3.fromDegrees(data.lon, data.lat, data.alt > 40 ? data.alt : 60),
          orientation: {
            heading: Cesium.Math.toRadians(data.heading ? data.heading : 0), // 水平偏角，默认正北 0
            pitch: Cesium.Math.toRadians(data.pitch ? data.pitch : -90), // 俯视角，默认-90，垂直向下
            roll: Cesium.Math.toRadians(data.roll ? data.roll : 0), // 旋转角
          }
        });
      }
    },
    /**
     *@author: ljj
     *@Date: 2022-03-07 16:20:06
     *@description: 添加景点
     */
    addAttractions() {
      if (window.walkFly) {
        window.walkFly.clear();
      }
      let that = this;
      if (globalConfig.attractions.length > 0) {
        //添加三维坐标
        globalConfig.attractions.map(item => {
          if (window.cesiumMap && window.cesiumMap.pointMark) {
            var ss = document.getElementsByClassName('.earthview-popup .earthview-popup-head img')
            if (ss && ss.length > 0) {
              ss.trigger('click');
            }
            window.cesiumMap.pointMark.addMassiveMark([{
              id: item.id,
              url: "/img/attractions.png",
              lon: item.lon,
              lat: item.lat,
              height: 124,
              width: 43,
              altitude: parseFloat(item.alt) + 20, //和图片的高度有关系
              label: item.name,
              font: "16px 微软雅黑",
              pixelOffset: new Cesium.Cartesian2((-15 * item.name.length / 2), -80),
            }], "attractions").bindPopup({
              popHeight: 300,
              popWidth: 400,
              doQuery4Content: (id) => {
                let temp = globalConfig.attractions.filter((one => {
                  return one.id == id;
                }));
                if (temp && temp.length > 0) {
                  item = temp[0];
                  let content = `<iframe width="100%" height="100%" frameborder=0 src="./Attractions?id=${item.id}"></iframe>`
                  return {
                    head: item.name,
                    body: content,
                  }
                }
              }
            }, "attractions");
          }
          // window.cesiumMap.flyTo(item.lon, item.lat, item.alt + globalConfig.cameraHeight);
        })
      }
    },
    /**
     *@author: ljj
     *@Date: 2022-03-07 16:20:06
     *@description: 添加单车
     */
    addBike() {
      if (window.walkFly) {
        window.walkFly.clear();
      }
      let that = this;
      if (globalConfig.BikeSharingInfo.bikeInfo.length > 0) {
        //添加三维坐标
        globalConfig.BikeSharingInfo.bikeInfo.map(item => {
          if (window.cesiumMap && window.cesiumMap.pointMark) {
            var ss = document.getElementsByClassName('.earthview-popup .earthview-popup-head img')
            if (ss && ss.length > 0) {
              ss.trigger('click');
            }
            window.cesiumMap.pointMark.addMassiveMark([{
              id: item.id,
              url: "/img/bike.png",
              lon: item.lon,
              lat: item.lat,
              height: 100,
              width: 40,
              altitude: parseFloat(item.alt) + 20, //和图片的高度有关系
              label: item.name,
              font: "16px 微软雅黑",
              pixelOffset: new Cesium.Cartesian2((-15 * item.name.length / 2), -80),
            }], "bikeInfo").bindPopup({
              popHeight: 200,
              popWidth: 300,
              doQuery4Content: (id) => {
                //播放轨迹
                // let bikePath = [];
                // let tempPath = globalConfig.bikeInfo.filter(one => {
                //   return one.id == id
                // })
                // if (tempPath && tempPath.length > 0) {
                //   bikePath = tempPath[0].path
                //   if (bikePath && bikePath.length > 0) {
                //     this.initData(bikePath)
                //   }
                // }
                let temp = globalConfig.BikeSharingInfo.bikeInfo.find((one => {
                  return one.id == id;
                }));
                if (temp) {
                  let content = `<iframe width="100%" height="100%" frameborder=0 src="./BikeDetail?id=${temp.id}"></iframe>`
                  return {
                    head: temp.name + "详情",
                    body: content,
                  }
                }
              }
            }, "bikeInfo");
          }
        })
      }
    },
    /**
     *@author: ljj
     *@Date: 2022-03-07 16:20:06
     *@description: 添加目标识别点位
     */
    addTarget() {
      if (window.walkFly) {
        window.walkFly.clear();
      }
      if (window.setInter) {
        window.clearInterval(window.setInter);
      }
      globalConfig.targetInfoData.map(item => {
        if (window.cesiumMap && window.cesiumMap.pointMark) {
          let ss = document.getElementsByTagName('img')
          if (ss && ss.length > 0) {
            for (let indexVar = 0; indexVar < ss.length; indexVar++) {
              if (ss[indexVar].parentNode && ss[indexVar].parentNode.className) {
                if (ss[indexVar].parentNode.className == "earthview-popup-head") {
                  ss[indexVar].click();
                  break;
                }
              }
            }
          }
          window.cesiumMap.pointMark.addMassiveMark([{
            id: item.id,
            url: '/img/target/' + item.iconImage,
            lon: item.lon,
            lat: item.lat,
            height: 100,
            width: 40,
            altitude: parseFloat(item.alt) + 20, //和图片的高度有关系
          }], "targetInfo").bindPopup({
            popHeight: 500,
            popWidth: 270,
            doQuery4Content: (id) => {
              //播放轨迹
              let personPath = [];
              let tempPath = globalConfig.targetInfoData.filter(one => {
                return one.id == id
              })
              if (tempPath && tempPath.length > 0) {
                personPath = tempPath[0].path
                if (personPath && personPath.length > 0) {
                  // this.initData(personPath)
                  // this.addLineLayer(personPath)
                }
              }
              let content = `<iframe width="100%" height="100%" frameborder=0 src="./PersonnelTrack?id=${id}"></iframe>`
              return {
                head: "人员轨迹",
                body: content,
              }
            }
          }, "targetInfo");
          // window.cesiumMap.flyTo(data.lon, data.lat, data.alt + globalConfig.cameraHeight);
          // let datas = JSON.parse(JSON.stringify(item.path));
          // datas.lat = parseFloat(datas.lat) - 0.0004;
          // datas.alt = parseFloat(datas.alt) + 50;
          // this.flyEvent(datas)
        }
      })
    },
    /**
     *@author: ljj
     *@Date: 2022-03-08 18:34:44
     *@description: 添加星湖楼
     */
    addXingHuLabel(data) {
      if (window.cesiumMap && window.cesiumMap.pointMark) {
        var ss = document.getElementsByClassName('.earthview-popup .earthview-popup-head img')
        if (ss && ss.length > 0) {
          ss.trigger('click');
        }
        window.cesiumMap.pointMark.addMassiveMark([{
          id: data.id,
          url: "/img/xinghu.png",
          lon: data.location.lon,
          lat: data.location.lat,
          height: 110,
          width: 43,
          altitude: 160, //和图片的高度有关系
          label: data.title,
          font: "16px 微软雅黑",
          pixelOffset: new Cesium.Cartesian2((-15 * data.title.length / 2), -80),
        }], "xinghu").bindPopup({
          popHeight: 0,
          popWidth: 0,
          doQuery4Content: (id) => {
            window.open(data.location.url);
            return {
              head: "",
              body: "",
            }
          }
        }, "xinghu");
      }
    },
    /**
     *@author: ljj
     *@Date: 2022-03-08 16:25:10
     *@description: 定位摄像头
     */
    flyToMonitor(data) {
      let datas = JSON.parse(JSON.stringify(data))
      datas.lat = parseFloat(datas.lat) - 0.0004
      datas.alt = parseFloat(datas.alt) + 50;
      this.flyEvent(datas)
    },
    /**
     * @description: 添加目标定位点
     * @author: wzd
     * @date: 2022-03-09 10:54:15
     */
    flyToTarget(data) {
      if (window.walkFly) {
        window.walkFly.clear();
      }
      if (window.setInter) {
        window.clearInterval(window.setInter);
      }
      if (window.cesiumMap && window.cesiumMap.pointMark) {
        let ss = document.getElementsByTagName('img')
        if (ss && ss.length > 0) {
          for (let indexVar = 0; indexVar < ss.length; indexVar++) {
            if (ss[indexVar].parentNode && ss[indexVar].parentNode.className) {
              if (ss[indexVar].parentNode.className == "earthview-popup-head") {
                ss[indexVar].click();
                break;
              }
            }
          }
        }
        window.cesiumMap.pointMark.addMassiveMark([{
          id: data.id,
          url: '/img/target/' + data.iconImage,
          lon: data.lon,
          lat: data.lat,
          height: 100,
          width: 40,
          altitude: parseFloat(data.alt) + 20, //和图片的高度有关系
        }], "targetInfo").bindPopup({
          popHeight: 500,
          popWidth: 270,
          doQuery4Content: (id) => {
            //播放轨迹
            let personPath = [];
            let tempPath = globalConfig.targetInfoData.filter(one => {
              return one.id == id
            })
            if (tempPath && tempPath.length > 0) {
              personPath = tempPath[0].path
              if (personPath && personPath.length > 0) {
                // this.initData(personPath)
                // this.addLineLayer(personPath)
              }
            }
            let content = `<iframe width="100%" height="100%" frameborder=0 src="./PersonnelTrack?id=${id}"></iframe>`
            return {
              head: "人员轨迹",
              body: content,
            }
          }
        }, "targetInfo");
        // window.cesiumMap.flyTo(data.lon, data.lat, data.alt + globalConfig.cameraHeight);
        let datas = JSON.parse(JSON.stringify(data));
        datas.lat = parseFloat(datas.lat) - 0.0004;
        datas.alt = parseFloat(datas.alt) + 50;
        this.flyEvent(datas)
      }
    },
    /**
     *@author: ljj
     *@Date: 2022-03-09 09:50:58
     *@description: 定位单车
     */
    flyToBike(data) {
      if (window.walkFly) {
        window.walkFly.clear();
      }
      let datas = JSON.parse(JSON.stringify(data));
      datas.lat = parseFloat(datas.lat)

      datas.alt = parseFloat(datas.alt);
      this.flyEvent(datas)
    },
    initData(data) {
      // 轨迹只有一个点或者少于一个点返回
      if (data.length <= 1) {
        return
      }
      var ellipsoid = window.cesiumMap.getEarth().scene.globe.ellipsoid;
      if (window.walkFly) {
        window.walkFly.clear();
      }
      if (window.setInter) {
        window.clearInterval(window.setInter);
      }
      let lineData = [];
      let points = [];
      for (let i = 0; i < data.length; i++) {
        // if (firstPoint.gps_x && data[i].gps_x == firstPoint.gps_x && data[i].gps_y == firstPoint.gps_y && data[i].gps_z == firstPoint.gps_z) {
        //   continue;
        // } else {
        //   firstPoint = data[i];
        if (data[i].lon && data[i].lat && data[i].alt) {
          points.push({
            lon: data[i].lon,
            lat: data[i].lat,
            alt: parseFloat(data[i].alt) + globalConfig.monitorHeight
          });
          lineData.push(Cesium.Cartesian3.fromDegrees(data[i].lon, data[i].lat, data[i].alt, ellipsoid))
        }
        // }
      }
      // data.map(item => {
      //   if (item.gps_x && item.gps_y && item.gps_z) {
      //     if (firstPoint.gps_x && item.gps_x == firstPoint.gps_x&& item.gps_y == firstPoint.gps_y&& item.gps_x == firstPoint.gps_y)
      //       points.push({
      //         lon: item.gps_x,
      //         lat: item.gps_y,
      //         alt: item.gps_z
      //       });
      //   }
      //   lineData.push(Cesium.Cartesian3.fromDegrees(item.gps_x, item.gps_y, item.gps_z, ellipsoid))
      // });
      if (lineData.length <= 1) {
        return
      }
      let timer = getDistance(lineData);
      window.walkFly = new EarthView.WalkFly({
        points: points,
        duration: timer,
        url: "/police/police.gltf",
        tileset: null
      });
      window.walkFly.play();
      // window.setInter = window.setInterval(() => {
      // this.play(points, timer)
      // }, (timer + 5) * 1000)
    },
    // 添加电子围栏
    addElectronicFence() {
      var material = new Cesium.PolylineOutlineMaterialProperty({
        outlineColor: new Cesium.Color.fromCssColorString("rgba(255,0,0,1)"),
        color: new Cesium.Color.fromCssColorString("rgba(255,0,0,1)")
      });
      const lineArr = []
      const lineFea = globalConfig.electronicFence
      for (var li = 0; li < lineFea.length; li++) {
        lineArr.push(lineFea[li][0]);
        lineArr.push(lineFea[li][1]);
        // lineArr.push(1000);
      }
      // this.addDynamicWall(lineArr)
      window.entity.addPolyline(lineArr, {
        material: material,
        width: 4,
        clampToGround: true
      }, "electronicFence");
    },
    addDynamicWall(path) {
      var wall = window.cesiumMap.getEarth().entities.add({
        wall: {
          positions: Cesium.Cartesian3.fromDegreesArray(path),
          material: new Cesium.PolylineTrailLinkMaterialProperty({
            color: Cesium.Color.RED,
            cesiumMap: window.cesiumMap,
            duration: 2000 // 持续时间,单位毫秒（0时为静止状态）
          }),
          maximumHeights: [3040, 3040, 3040, 3040, 3040],
          minimumHeights: [3012.65, 3010.85, 3005.36, 3010.29, 3012.65]
        }
      });
      // this.cesiumMap.getEarth().flyTo(wall);
      // })
    },
    play(point, time) {
      let url = "/police/police.gltf";
      window.walkFly = new EarthView.WalkFly({
        points: point,
        duration: time,
        url: url,
        tileset: null,
      });
      window.walkFly.play();
    },
    // 恢复默认位置 大门
    // resetLocation() {
    //   this.flyEvent(globalConfig.DataCabin[0].location)
    // },
    // 添加所摄像头
    addAllMonitorInfo() {
      let that = this;
      if (globalConfig.monitorInfo.length > 0) {
        globalConfig.monitorInfo.map(item => {
          if (window.cesiumMap && window.cesiumMap.pointMark) {
            var ss = document.getElementsByClassName('.earthview-popup .earthview-popup-head img')
            if (ss && ss.length > 0) {
              ss.trigger('click');
            }
            window.cesiumMap.pointMark.addMassiveMark([{
              id: item.id,
              url: '/img/monitor.png',
              lon: item.lon,
              lat: item.lat,
              height: 100,
              width: 40,
              altitude: parseFloat(item.alt) + 20, //和图片的高度有关系
              label: item.name,
              font: "16px 微软雅黑",
              pixelOffset: new Cesium.Cartesian2((-15 * item.name.length / 2), -80),
              // horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
              // verticalOrigin: Cesium.VerticalOrigin.TOP,
            }], "monitorInfo").bindPopup({
              popHeight: 380,
              popWidth: 600,
              doQuery4Content: (id) => {
                let temp = globalConfig.monitorInfo.filter((one => {
                  return one.id == id;
                }));
                if (temp && temp.length > 0) {
                  item = temp[0];
                  let content = `<iframe width="100%" height="100%" frameborder=0 src="./Monitor?id=${item.id}"></iframe>`
                  return {
                    head: item.name + "-实时监控",
                    body: content,
                  }
                }
              }
            }, "monitorInfo");
          }
        })
      }
    },
    // 添加停车区域
    addParkingAreas() {
      globalConfig.BikeSharingInfo.ParkingAreas.forEach(it => {
        const data = it.feature
        for (let i = 0; i < data.length; i++) {
          if (data[i].geometry && data[i].geometry.coordinates && data[i].geometry.coordinates.length > 0) {
            for (let j = 0; j < data[i].geometry.coordinates.length; j++) {
              for (let n = 0; n < data[i].geometry.coordinates[j].length; n++) {
                let coordinatesArray = [];
                for (let m = 0; m < data[i].geometry.coordinates[j][n].length; m++) {
                  coordinatesArray.push(data[i].geometry.coordinates[j][n][m][0])
                  coordinatesArray.push(data[i].geometry.coordinates[j][n][m][1])
                }
                let idStr = it.postId;
                let polygon = {
                  id: idStr,
                  polygon: {
                    hierarchy: Cesium.Cartesian3.fromDegreesArray(coordinatesArray),
                    material: Cesium.Color.RED.withAlpha(0.6),
                    // height: 5000,
                    outlineWidth: 2,
                    outline: false,
                    outlineColor: new Cesium.Color(252, 81, 68, 1),
                    show: true,
                  },
                  show: true
                };
                this.parkingAreasList.push(window.cesiumMap.getEarth().entities.add(polygon))
              }
            }
          }
        }
      })
      // // 删除之前的模型
      // let entID = window.cesiumMap.getEarth().entities.getById(this.addParkingAreasId)
      // window.cesiumMap.getEarth().entities.remove(entID);
      // this.addParkingAreasId = row.postId;
    },
    // 清除定位停车区域
    clearParkingAreas() {
      this.parkingAreasList.forEach(it => {
        window.cesiumMap.getEarth().entities.remove(it)
      })
      this.parkingAreasList = [];
    },
    // 清除轨迹
    clearTrack() {
      window.entity.remove("line");
    },
    // 清除单车所有痕迹
    claerBikeAll() {
      this.clearTrack()
      this.clearParkingAreas()
    },
    // 定位停车区域
    flyToParkingAreas(row) {
      if (window.walkFly) {
        window.walkFly.clear();
      }
      const loactionTectEntity = this.parkingAreasList.find(it => it._id === row.postId)
      window.cesiumMap.getEarth().flyTo(loactionTectEntity, {
        duration: 4,
        maximumHeight: 1000,
        offset: new Cesium.HeadingPitchRange(0.0, Cesium.Math.toRadians(-25.0))
      }
      )
    },
    // 添加轨迹
    trackDetails(row) {
      this.clearTrack()
      var material = new Cesium.PolylineOutlineMaterialProperty({
        outlineColor: new Cesium.Color.fromCssColorString("rgba(255,127,0,1)"),
        color: new Cesium.Color.fromCssColorString("rgba(255,127,0,1)")
      });
      const lineArr = []
      const lineFea = row.path
      for (var li = 0; li < lineFea.length; li++) {
        lineArr.push(lineFea[li].lon);
        lineArr.push(lineFea[li].lat);
        // lineArr.push(1000);
      }

      window.entity.addPolyline(lineArr, {
        material: material,
        width: 5,
        clampToGround: true
      }, "line");

    },
    showMaskInfo(name) {
      window.cesiumMap.pointMark.removeMassiveMark('monitorInfo');
      window.cesiumMap.pointMark.removeMassiveMark('targetInfo');
      window.cesiumMap.pointMark.removeMassiveMark('xinghu');
      window.cesiumMap.pointMark.removeMassiveMark('bikeInfo');
      window.cesiumMap.pointMark.removeMassiveMark('attractions');
      this.claerBikeAll()
      if (name == "showMonitorPanel") {
        this.addAllMonitorInfo();
      } else if (name == "showTargetInfoPanel") {
        this.addTarget();
      } else if (name == "showBikePanel") {
        this.addBike();
        this.addParkingAreas();
      } else if (name == "") {

      }
      // this.addAttractions();
      // this.addAllMonitorInfo();
      // this.addTarget();
    },
  }
}
<template>
  <div>
    <div id="cesiumContainer"
         v-bind:style="styleObject"></div>
  </div>
</template>
<script>
const Cesium = window.Cesium;
import $ from 'jquery'
// import '../assets/js/require.min.js'
export default {
  name: "vmap",
  data () {
    return {
      styleObject: {
        width: '100%',
        position: 'absolute',
        top: '0px',
        bottom: '0px',
        left: '0px',
        backgroundColor: '#000000'
      },
      smviewer: {},
      f_url: '',
      scenicList: [],
      csList: [],
      zxList: [],
      wifiList: [],
      fdList: [],
      csListFilter: [],
      zxListFilter: [],
      wifiListFilter: [],
      fdListFilter: [],
      fId: 0,
      F_Id: []
    };
  },
  created () {
    this.gissetting3d()

  },
  mounted () {
    this.smviewer = new Cesium.Viewer('cesiumContainer');

    //使用本地的一张图片初始化地球（2：1）
    this.smviewer.imageryLayers.addImageryProvider(new Cesium.SingleTileImageryProvider({
      url: require('../assets/images/worldimage.jpg')
    }));
    var scene = this.smviewer.scene;
    scene.globe.depthTestAgainstTerrain = false;
    var camera = scene.camera;
    //添加S3M图层服务
    var url = "http://119.3.248.197:8090/iserver/services/3D-themodel/rest/realspace/datas/themodle@3data/config";
    var promise = scene.addS3MTilesLayerByScp(url, {
      name: 'threemodel'
    });
    promise.then(function (layers) {
      camera.setView({
        destination: Cesium.Cartesian3.fromDegrees(116.395872721121, 40.0058802722209, 600),
        orientation: {
          heading: 6.016771,
          pitch: -0.500416,
          roll: 0.0
        }
      });
    });
    var camera = scene.camera;
    // console.log(camera)
    this.$store.dispatch('setsmviewer', this.smviewer)
    this.$store.dispatch('setcamera', camera)
  },
  methods: {
    async gissetting3d () {
      await this.$http.get('/gissetting/3d').then(res => {
        console.log(res)
        let result = res.data.data
        this.f_url = result.F_URL
        this.fId = result.F_Id
        this.$store.dispatch("setfId", this.fId);
        this.scenicLists()
        this.getListCs()
        this.getListZx()
        this.getListWIFI()
        this.getListFd()
      })
    },
    async scenicLists () {
      await this.$http.get("/gisscenicarea/getlist/" + this.fId).then(res => {
        // console.log(res);
        this.scenicList = res.data.data;
        this.$store.dispatch("setScenicList", this.scenicList);
        for (var i = 0; i < this.scenicList.length; i++) {
          var scenicListAdd = this.smviewer.entities.add({
            name: this.scenicList[i].F_Remarks,
            position: Cesium.Cartesian3.fromDegrees(this.scenicList[i].F_XPoint * 1, this.scenicList[i].F_YPoint * 1, this.scenicList[i].F_Height * 1),

            billboard: {
              image: require('../assets/images/scenic_icon.png'),
              width: 30,
              height: 40,
            },
            label: {
              text: this.scenicList[i].F_Name,
              font: '18pt monospace',
              style: Cesium.LabelStyle.FILL_AND_OUTLINE,
              outlineWidth: 2,
              fontWeight: 600,
              verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
              pixelOffset: new Cesium.Cartesian2(0, -20)
            }
          });
          this.$store.dispatch("setscenicListAdd", scenicListAdd);
          // this.smviewer.entities.remove(scenicListAdd)
        }
      });
    },
    async getListCs () {
      this.F_Id = this.$store.state.F_Id
      var F_Id = this.F_Id[0]
      console.log(F_Id)
      await this.$http.get("/scenicareaaround/getlist/" + F_Id).then(res => {
        console.log(res);
        this.csList = res.data.data;
        this.csListFilter = this.csList.filter(function (e) {
          return e.F_GisSteeingId;
        })
        // this.$store.dispatch("setScenicList", this.csListFilter);
        for (var i = 0; i < this.csListFilter.length; i++) {
          var csListAdd = this.smviewer.entities.add({
            name: this.csListFilter[i].F_Remarks,
            position: Cesium.Cartesian3.fromDegrees(this.csListFilter[i].F_XPoint * 1, this.csListFilter[i].F_YPoint * 1, this.csListFilter[i].F_Height * 1),

            billboard: {
              image: require('../assets/images/cs.png'),
              width: 30,
              height: 40,
            },
            label: {
              text: this.csListFilter[i].F_Name,
              font: '18pt monospace',
              style: Cesium.LabelStyle.FILL_AND_OUTLINE,
              outlineWidth: 2,
              fontWeight: 600,
              verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
              pixelOffset: new Cesium.Cartesian2(0, -20)
            }
          });
          this.$store.dispatch("setcsListAdd", csListAdd);
        }
      });
    },
    async getListZx () {
      this.F_Id = this.$store.state.F_Id
      var F_Id = this.F_Id[1]
      await this.$http.get("/scenicareaaround/getlist/" + F_Id).then(res => {
        console.log(res);
        this.zxList = res.data.data;
        this.zxListFilter = this.zxList.filter(function (e) {
          return e.F_GisSteeingId;
        })
        // this.$store.dispatch("setScenicList", this.zxListFilter);
        for (var i = 0; i < this.zxListFilter.length; i++) {
          var zxListAdd = this.smviewer.entities.add({
            name: this.zxListFilter[i].F_Remarks,
            position: Cesium.Cartesian3.fromDegrees(this.zxListFilter[i].F_XPoint * 1, this.zxListFilter[i].F_YPoint * 1, this.zxListFilter[i].F_Height * 1),

            billboard: {
              image: require('../assets/images/zx.png'),
              width: 30,
              height: 40,
            },
            label: {
              text: this.zxListFilter[i].F_Name,
              font: '18pt monospace',
              style: Cesium.LabelStyle.FILL_AND_OUTLINE,
              outlineWidth: 2,
              fontWeight: 600,
              verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
              pixelOffset: new Cesium.Cartesian2(0, -20)
            }
          });
          this.$store.dispatch("setzxListAdd", zxListAdd);
        }
      });
    },
    async getListWIFI () {
      this.F_Id = this.$store.state.F_Id
      var F_Id = this.F_Id[2]
      await this.$http.get("/scenicareaaround/getlist/" + F_Id).then(res => {
        console.log(res);
        this.wifiList = res.data.data;
        this.wifiListFilter = this.wifiList.filter(function (e) {
          return e.F_GisSteeingId;
        })
        // this.$store.dispatch("setScenicList", this.wifiListFilter);
        for (var i = 0; i < this.wifiListFilter.length; i++) {
          var wifiListAdd = this.smviewer.entities.add({
            name: this.wifiListFilter[i].F_Remarks,
            position: Cesium.Cartesian3.fromDegrees(this.wifiListFilter[i].F_XPoint * 1, this.wifiListFilter[i].F_YPoint * 1, this.wifiListFilter[i].F_Height * 1),

            billboard: {
              image: require('../assets/images/wifi.png'),
              width: 30,
              height: 40,
            },
            label: {
              text: this.wifiListFilter[i].F_Name,
              font: '18pt monospace',
              style: Cesium.LabelStyle.FILL_AND_OUTLINE,
              outlineWidth: 2,
              fontWeight: 600,
              verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
              pixelOffset: new Cesium.Cartesian2(0, -20)
            }
          });
          this.$store.dispatch("setwifiListAdd", wifiListAdd);
        }
      });
    },
    async getListFd () {
      this.F_Id = this.$store.state.F_Id
      var F_Id = this.F_Id[3]
      await this.$http.get("/scenicareaaround/getlist/" + F_Id).then(res => {
        console.log(res);
        this.fdList = res.data.data;
        this.fdListFilter = this.fdList.filter(function (e) {
          return e.F_GisSteeingId;
        })
        for (var i = 0; i < this.fdListFilter.length; i++) {
          var fdListAdd = this.smviewer.entities.add({
            name: this.fdListFilter[i].F_Remarks,
            position: Cesium.Cartesian3.fromDegrees(this.fdListFilter[i].F_XPoint * 1, this.fdListFilter[i].F_YPoint * 1, this.fdListFilter[i].F_Height * 1),
            billboard: {
              image: require('../assets/images/fd.png'),
              width: 30,
              height: 40,
            },
            label: {
              text: this.fdListFilter[i].F_Name,
              font: '18pt monospace',
              style: Cesium.LabelStyle.FILL_AND_OUTLINE,
              outlineWidth: 2,
              fontWeight: 600,
              verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
              pixelOffset: new Cesium.Cartesian2(0, -20)
            }
          });
          this.$store.dispatch("setfdListAdd", fdListAdd);
        }
      });
    },

  }
};
</script>
<style scoped>
</style>
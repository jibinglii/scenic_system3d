<template>
  <div class="item">
    <div class="popover">
      <el-popover trigger="click"
                  placement="right"
                  width="460"
                  v-model="visible"
                  title="景点游玩"
                  popper-class="jian_sights">
        <p @click="visible = false">关闭</p>
        <div class="listDiv">
          <div class="list"
               v-for="(item,index) in $store.state.scenicList"
               :key="index">
            <div class="left">
              <img :src="item.F_Image" />
            </div>
            <div class="right">
              <h3>{{item.F_Name}}</h3>
              <p>{{item.F_Remarks}}</p>
              <div class="button_div">
                <el-button @click="checkMapClick(item)">查看地图</el-button>
              </div>
            </div>
          </div>
        </div>
        <img :src="img"
             class="img"
             alt
             slot="reference" />
      </el-popover>
    </div>
  </div>
</template>

<script>
import { Popover, Button } from "element-ui";
export default {
  name: "search",
  data () {
    return {
      visible: false,
      img: require("../assets/images/jd.png"),
    };
  },
  created () {
    // this.getLIsts();
  },
  methods: {
    checkMapClick (item) {
      // console.log(item)
      var camera = this.$store.state.camera
      camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(item.F_XPoint * 1, item.F_YPoint * 1, item.F_Height * 1),
        orientation: {
          heading: 3.361386,
          pitch: -0.543285,
          roll: 6.283185307179563
        }
      });
    }
  },
  components: {
    "el-popover": Popover,
    "el-button": Button
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.img {
  position: absolute;
  left: 44%;
  top: -53px;
}
.el-popover p {
  margin-top: -30px;
}
.button_div {
  text-align: right;
  padding-right: 10px;
}
</style>

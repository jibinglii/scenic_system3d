<template>
  <div class="item">
    <div class="popover">
      <el-popover trigger="hover"
                  placement="right"
                  width="460"
                  v-model="visible"
                  title="实时监控"
                  popper-class="jian_monitor">
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
                <el-button @click.native="viewMapClick(item)">查看</el-button>
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
      isshow: false,
      img: require("../assets/images/jk.png"),
      activeImg: require("../assets/images/active_jk.png"),
      scenicList: []
    };
  },
  created () {
  },
  methods: {
    viewMapClick (item) {
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
.el-popover p {
  margin-top: -30px;
}
.button_div {
  text-align: right;
  padding-right: 10px;
}
.img {
  position: absolute;
  right: 28%;
  top: -6%;
}
@media (min-width: 1000px) and (max-width: 1441px) {
  .img {
    position: absolute;
    right: 24%;
    top: -6%;
  }
}
</style>

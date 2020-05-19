<template>
  <div class="item">
    <div class="popover">
      <el-popover trigger="click"
                  placement="right-start"
                  width="460"
                  v-model="visible">
        <p @click="visible = false">关闭</p>
        <div style="text-align:center;margin-top:10px">
          <el-input placeholder="搜索"
                    prefix-icon="el-icon-search"
                    v-model="searchText"
                    @change="onChange"></el-input>
        </div>
        <div class="listDiv">
          <div class="list"
               v-for="(item,index) in lists"
               :key="index"
               v-show="searchText">
            <div class="left">
              <img :src="item.F_Image" />
            </div>
            <div class="right">
              <h3>{{item.F_Name}}</h3>
              <p>{{item.F_Remarks}}</p>
              <div class="button_div">
                <el-button @click.native="viewMapClick(item)">查看地图</el-button>
                <!-- <el-button>实时监控</el-button> -->
              </div>
            </div>
          </div>
          <div v-show="isShow"
               style="text-align:center">未搜索到指定内容</div>
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
import { Popover, Button, Input } from "element-ui";
export default {
  name: "search",
  data () {
    return {
      visible: false,
      isShow: false,
      searchText: "",
      img: require("../assets/images/search.png"),
      activeImg: require("../assets/images/active_search.png"),
      lists: [],
      map: null,
      F_Id: []
    };
  },
  methods: {
    onChange () {
      this.getListSearch()
    },
    async getListSearch () {
      var keyword = this.searchText
      console.log(keyword)
      await this.$http.get("/scenicareaaround/getlistforsearch/" + keyword).then(res => {
        console.log(res)
        this.lists = res.data.data

        if (res.data.data.length === 0) {
          this.isShow = true
        } else {
          this.isShow = false
        }
      });
    },
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
    "el-button": Button,
    "el-input": Input
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.listDiv {
  height: 300px;
}
.img {
  position: absolute;
  left: 6%;
  top: 60%;
}

@media (min-width: 1000px) and (max-width: 1441px) {
  .img {
    position: absolute;
    left: 1%;
    top: 60%;
  }
}
</style>

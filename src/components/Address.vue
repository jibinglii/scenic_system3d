<template>
  <div class="item">
    <div class="popover">
      <el-popover trigger="click"
                  placement="right"
                  width="460"
                  v-model="visible"
                  title="景点设施"
                  popper-class="jian_address">
        <p @click="visible = false">关闭</p>
        <div class="address_item">
          <el-button v-for="(item,index) in lists"
                     :key="index"
                     @click.native="typeBtn(index)">
            <div class="imgs">
              <img :src="item.F_Image"
                   class="icon _icon" />
              <img :src="item.F_HighlightImage"
                   class="active_icon _icon" />
              <span :style="{color:item.F_Color}">{{item.F_Name}}</span>
            </div>
          </el-button>
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
      img: require("../assets/images/address.png"),
      lists: [],
      FId: [],
    };
  },
  created () {
    this.gettypelist();
  },
  methods: {
    async gettypelist () {
      await this.$http.get("/scenicareaaround/gettypelist").then(res => {
        console.log(res);
        this.lists = res.data.data;
        for (var i = 0; i < this.lists.length; i++) {
          this.FId.push(this.lists[i].F_Id);
        }
        this.$store.dispatch('setF_Id', this.FId)
      });
    },
    typeBtn (index) {
      var csListAdd = this.$store.state.csListAdd
      var zxListAdd = this.$store.state.zxListAdd
      var wifiListAdd = this.$store.state.wifiListAdd
      var fdListAdd = this.$store.state.fdListAdd
      this.smviewer = this.$store.state.smviewer
      this.smviewer.entities.removeAll(csListAdd);
      this.smviewer.entities.removeAll(zxListAdd);
      this.smviewer.entities.removeAll(wifiListAdd);
      this.smviewer.entities.removeAll(fdListAdd);
      if (index == 0) {
        this.$emit('parentgetListCs')
      }
      if (index == 1) {
        this.$emit('parentgetListZx')
      }
      if (index == 2) {
        this.$emit('parentgetListWIFI')
      }
      if (index == 3) {
        this.$emit('parentgetListFd')
      }
    },
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
  left: 28%;
  top: -6%;
}
@media (min-width: 1000px) and (max-width: 1441px) {
  .img {
    position: absolute;
    left: 24%;
    top: -6%;
  }
}
.el-popover p {
  margin-top: -30px;
}
.address_item {
  display: flex;
  flex-wrap: wrap;
  .el-button {
    border-radius: 14px;
    width: 93px;
    height: 45px;
    line-height: 40px;
    padding: 0;
    margin-left: 0 !important;
    margin-right: 7px;
    margin-top: 10px;
    margin-bottom: 5px;
    .imgs {
      display: flex;
      align-items: center;
      justify-content: center;
      span {
        padding-left: 5px;
      }
      ._icon {
        width: 25px;
      }
      .active_icon {
        display: none;
      }
      .icon {
        display: block;
      }
      &:hover {
        .active_icon {
          display: block;
        }
        .icon {
          display: none;
        }
        span {
          // color: #fff !important;
        }
      }
    }
  }
}
</style>

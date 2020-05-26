<template>
  <div class="index_div">
    <v-map ref="mychild"></v-map>
    <!-- <iframe src="../static/gettingStarted/TheBlackBamboopark.html"
            width="100%"
            height="100%"
            class="ifram_3d"></iframe> -->
    <div id='toolbar'
         class="param-container tool-bar">
      <span type="button"
            id="play"
            class="button black"
            title="开始"></span>
      <span type="button"
            id="pause"
            class="button black"
            title="暂停"></span>
      <span type="button"
            id="stop"
            class="button black"
            title="停止"></span>
      <div style="width: 150px;">
        <select id="stopList"
                class="form-control"
                style="width: 100%;height:30px;margin:10px 0">
          <!--<option disabled selected value>&#45;&#45;选择站点&#45;&#45;</option>-->
        </select>
      </div>
      <div class="checkbox">
        <label>
          <input type="checkbox"
                 id="show-line"
                 unchecked> 显示飞行路线
        </label>
      </div>
      <div class="checkbox">
        <label>
          <input type="checkbox"
                 id="show-stop"
                 unchecked> 显示飞行站点
        </label>
      </div>
    </div>
    <div class="title_Div"
         :style="{'background-image':'url('+title_bg+')'}">
      <h2>数字景区虚拟旅游系统</h2>
      <div class="numbers">
        <span>
          在园人数：
          <i>{{ticketData.ZaiYuanCount}}</i>人
        </span>
        <span>
          进园人数：
          <i>{{ticketData.RuYuanCount}}</i>人
        </span>
        <span>
          实时售票数：
          <i>{{ticketData.ShiShiShouPiao}}</i>人
        </span>
      </div>
    </div>
    <div class="list_div">
      <v-search @click.native="mouseSearch"></v-search>
      <v-weather @click.native="mouseWeather"></v-weather>
      <v-sights @click.native="mouseSight"></v-sights>
      <v-address @click.native="mouseAddress"
                 @parentgetListCs="childgetListCs"
                 @parentgetListZx="childgetListZx"
                 @parentgetListWIFI="childgetListWIFI"
                 @parentgetListFd="childgetListFd"></v-address>
      <v-monitor @click.native="mouseMonitor"
                 @parentgetmonitorLists="childgetmonitorLists"></v-monitor>
      <v-navigation @click.native="mouseNavigation"></v-navigation>
      <v-statistics @click.native="mousestatic"></v-statistics>
    </div>
    <div class="echarts_right">
      <v-pack-data v-show="$store.state.isPack"></v-pack-data>
      <v-ticket-data v-show="$store.state.isTicket"></v-ticket-data>
      <v-monitor-data v-show="$store.state.isMonitor"></v-monitor-data>
    </div>
  </div>
</template>
<script>
import { Popover, Button } from "element-ui";
import VMap from "../components/VMap";
import Search from "../components/Search";
import Weather from "../components/Weather";
import Sights from "../components/Sights";
import Address from "../components/Address";
import Monitor from "../components/Monitor";
import Navigation from "../components/Navigation";
import Statistics from "../components/Statistics";
import packData from "../components/packData";
import TicketData from "../components/TicketData";
import MonitorData from "../components/MonitorData";
export default {
  name: "index",
  data () {
    return {
      title_bg: require("../assets/images/title_bg.png"),
      visible: false,
      isshow: false,
      img: require("../assets/images/data.png"),
      activeImg: require("../assets/images/active_data.png"),
      staticLists: [
        {
          name: "停车场数据",
          id: 0
        },
        {
          name: "票务数据",
          id: 1
        },
        {
          name: "环境监测",
          id: 2
        }
      ],
      ticketData: {
        ZaiYuanCount: "",
        RuYuanCount: "",
        ShiShiShouPiao: ""
      },
      smviewer: {},
      scenicListAdd: []
    };
  },
  created () {
    this.ticketDatas();
  },
  methods: {
    childgetListCs () {
      this.$refs.mychild.getListCs();
    },
    childgetListZx () {
      this.$refs.mychild.getListZx();
    },
    childgetListWIFI () {
      this.$refs.mychild.getListWIFI();
    },
    childgetListFd () {
      this.$refs.mychild.getListFd();
    },
    childgetmonitorLists () {
      this.$refs.mychild.getmonitorLists();
    },
    mouseSight () {
      if (this.$store.state.scenicList != '') {
        var csListAdd = this.$store.state.csListAdd
        var zxListAdd = this.$store.state.zxListAdd
        var wifiListAdd = this.$store.state.wifiListAdd
        var fdListAdd = this.$store.state.fdListAdd
        this.smviewer = this.$store.state.smviewer
        this.smviewer.entities.removeAll(csListAdd);
        this.smviewer.entities.removeAll(zxListAdd);
        this.smviewer.entities.removeAll(wifiListAdd);
        this.smviewer.entities.removeAll(fdListAdd);
      }
      this.$refs.mychild.scenicLists();
    },
    mouseAddress () {
      this.smviewer = this.$store.state.smviewer
      var scenicListAdd = this.$store.state.scenicListAdd
      this.smviewer.entities.removeAll(scenicListAdd);
      this.$refs.mychild.getListCs();
      this.$refs.mychild.getListZx();
      this.$refs.mychild.getListWIFI();
      this.$refs.mychild.getListFd();
      $('#toolbar').hide()
    },
    mouseMonitor () {
      // if (this.$store.state.scenicList != '') {
      var csListAdd = this.$store.state.csListAdd
      var zxListAdd = this.$store.state.zxListAdd
      var wifiListAdd = this.$store.state.wifiListAdd
      var fdListAdd = this.$store.state.fdListAdd
      this.smviewer = this.$store.state.smviewer
      this.smviewer.entities.removeAll(csListAdd);
      this.smviewer.entities.removeAll(zxListAdd);
      this.smviewer.entities.removeAll(wifiListAdd);
      this.smviewer.entities.removeAll(fdListAdd);
      // }
      // this.$refs.mychild.getmonitorLists();
      $('#toolbar').hide()
    },
    mouseNavigation () {
      if (this.$store.state.scenicList != '') {
        $('#toolbar').show()
      }
    },
    mouseSearch () {
      this.$refs.mychild.getListCs();
      this.$refs.mychild.getListZx();
      this.$refs.mychild.getListWIFI();
      this.$refs.mychild.getListFd();
      this.$refs.mychild.scenicLists();
      $('#toolbar').hide()
    },
    mouseWeather () {
      $('#toolbar').hide()
    },
    mousestatic () {
      $('#toolbar').hide()
    },
    async ticketDatas () {
      await this.$http
        .get("http://119.3.248.197:8086/api/mobile/PiaoWuShuJu")
        .then(res => {
          console.log(res);
          this.ticketData.ShiShiShouPiao = res.data.data.ShiShiShouPiao;
          this.ticketData.ShiShiJianPiao = res.data.data.ShiShiJianPiao;
          this.ticketData.RuYuanCount = res.data.data.RuYuanCount;
          this.ticketData.ZaiYuanCount = res.data.data.ZaiYuanCount;
        });
    }
  },
  components: {
    "v-map": VMap,
    "v-search": Search,
    "v-weather": Weather,
    "v-sights": Sights,
    "v-address": Address,
    "v-monitor": Monitor,
    "v-navigation": Navigation,
    "v-statistics": Statistics,
    "v-pack-data": packData,
    "v-ticket-data": TicketData,
    "v-monitor-data": MonitorData,
    "el-popover": Popover,
    "el-button": Button
  }
};
</script>
<style scoped lang="scss">
.index_div {
  .ifram_3d {
    position: fixed;
    left: 0;
    top: 0;
  }
  #toolbar {
    position: fixed;
    top: 40px;
    left: 20px;
    #play {
      content: url(../assets/images/play.png);
      height: 40px;
      padding: 5px;
    }

    #pause {
      content: url(../assets/images/pause.png);
      height: 40px;
      padding: 5px;
    }

    #stop {
      content: url(../assets/images/stop.png);
      height: 40px;
      padding: 5px;
    }
    .checkbox {
      line-height: 20px;
      font-size: 12px;
      label {
        display: flex;
        align-items: center;
        input {
          margin-right: 5px;
        }
      }
    }
  }
  .title_Div {
    width: 636px;
    height: 114px;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    z-index: 9999;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    margin: auto;
    color: #fff;
    padding: 10px 0 10px;
    h2 {
      color: #fff;
      font-size: 34px;
      padding-top: 13px;
      letter-spacing: 14px;
      background: -webkit-linear-gradient(90deg, #e6faff, #a4f0ff);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .numbers {
      padding-top: 29px;
      font-size: 12px;
      span {
        font-weight: 100;
        padding-right: 10px;
        i {
          font-style: normal;
        }
      }
    }
  }
  .popover {
    z-index: 9999;
    position: absolute;
    top: 50%;
  }
  .list_div {
    background: url(../assets/images/bg_line.png) no-repeat;
    width: 60%;
    height: 247px;
    background-size: 100%;
    position: fixed;
    bottom: 0;
    left: 0%;
    right: 0;
    margin: auto;
  }
  .echarts_right {
    position: absolute;
    top: 11%;
    right: 1%;
    z-index: 9999;
    ._div {
      margin-bottom: 10px;
    }
  }
}
</style>
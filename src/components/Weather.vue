<template>
  <div class="item">
    <div class="popover">
      <el-popover
        trigger="hover"
        placement="right"
        width="460"
        v-model="visible"
        title="天气"
        popper-class="jian_weather"
      >
        <p @click="visible = false">关闭</p>
        <iframe
          src="http://weather.seniverse.com/?token=baab943b-0200-4e73-ae33-c93686246f9a"
          id="_weather"
          frameborder="0"
          height="445"
          width="100%"
          scrolling="no"
        ></iframe>

        <img :src="img" class="img" alt slot="reference" />
      </el-popover>
    </div>
  </div>
</template>

<script>
import { Popover, Button, Collapse, CollapseItem } from "element-ui";
export default {
  name: "weather",
  data() {
    return {
      visible: false,
      isshow: false,
      activeName: 0,
      img: require("../assets/images/weather.png")
    };
  },
  methods: {},
  components: {
    "el-popover": Popover,
    "el-button": Button,
    "el-collapse": Collapse,
    "el-collapse-item": CollapseItem
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.el-popover p {
  margin-top: -30px;
}
.img {
  position: absolute;
  left: 15%;
  top: 26%;
}

// .el-popover .popper__arrow {
//   top: 105px !important;
// }
</style>

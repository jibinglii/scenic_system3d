<template>
  <div class="item">
    <div class="popover">
      <img :src="img"
           class="img"
           alt
           slot="reference" />

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
      img: require("../assets/images/dh.png"),
    };
  },
  methods: {},
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
  right: 15%;
  top: 26%;
}
@media (min-width: 1000px) and (max-width: 1441px) {
  .img {
    position: absolute;
    right: 11%;
    top: 26%;
  }
}
.el-popover p {
  margin-top: -30px;
}
</style>

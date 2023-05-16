<template>
  <div class="customerservice-screen-world-map">
    <div ref="worldMap" id="world-map" class="world-map"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import "echarts-gl";
import { population } from "@assets/js/population";

import bathymetry_bw_composite_4k from "@assets/img/bathymetry_bw_composite_4k.jpg";
import baseTexture from "@assets/img/baseTexture.jpg";
import heightTexture from "@assets/img/heightTexture.jpg";
// import lake from  '@assets/img/lake.hdr';
import starfield from "@assets/img/starfield.jpg";

var ROOT_PATH = "https://echarts.apache.org/examples";

export default {
  name: "worldmap",
  data() {
    return {};
  },
  methods: {
    init() {
      // 图表自适应
      window.onresize = () => {
        if (this.$refs.worldMap) {
          echarts.init(this.$refs.worldMap).resize();
        }
      };
    },
    createMap() {
      let myChart = echarts.init(this.$refs.worldMap);

      const data = population
        .filter(function (dataItem) {
          return dataItem[2] > 0;
        })
        .map(function (dataItem) {
          return [dataItem[0], dataItem[1], Math.sqrt(dataItem[2])];
        });

      console.log("data----", data);
      // let option = {
      //   xAxis: {
      //     type: 'category',
      //     data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      //   },
      //   yAxis: {
      //     type: 'value'
      //   },
      //   series: [
      //     {
      //       data: [150, 230, 224, 218, 135, 147, 260],
      //       type: 'line'
      //     }
      //   ]
      // }

      // let option = {
      //   visualMap: {
      //     show: false,
      //     min: 0,
      //     max: 60,
      //     inRange: {
      //       symbolSize: [1.0, 10.0],
      //     },
      //   },
      //   globe: {
      //     // environment: ROOT_PATH + "/data-gl/asset/starfield.jpg",
      //     // heightTexture: ROOT_PATH + '/data-gl/asset/bathymetry_bw_composite_4k.jpg',
      //     environment: starfield,
      //     heightTexture: bathymetry_bw_composite_4k,
      //     displacementScale: 0.05,
      //     displacementQuality: "high",
      //     globeOuterRadius: 100,
      //     baseColor: "#000",
      //     shading: "realistic",
      //     realisticMaterial: {
      //       roughness: 0.2,
      //       metalness: 0,
      //     },
      //     postEffect: {
      //       enable: true,
      //       depthOfField: {
      //         focalRange: 15,
      //         enable: true,
      //         focalDistance: 100,
      //       },
      //     },
      //     temporalSuperSampling: {
      //       enable: true,
      //     },
      //     light: {
      //       ambient: {
      //         intensity: 0,
      //       },
      //       main: {
      //         intensity: 0.1,
      //         shadow: false,
      //       },
      //       ambientCubemap: {
      //         texture: ROOT_PATH + "/data-gl/asset/lake.hdr",
      //         // texture: lake,
      //         exposure: 1,
      //         diffuseIntensity: 0.5,
      //         specularIntensity: 2,
      //       },
      //     },
      //     viewControl: {
      //       autoRotate: false,
      //       beta: 180,
      //       alpha: 20,
      //       distance: 100,
      //     },
      //   },
      //   series: {
      //     type: "scatter3D",
      //     coordinateSystem: "globe",
      //     blendMode: "lighter",
      //     symbolSize: 2,
      //     itemStyle: {
      //       color: "rgb(50, 50, 150)",
      //       opacity: 1,
      //     },
      //     data: data,
      //   },
      // }

      let option = {
        globe: {
          baseTexture: heightTexture, // 替换为实际的纹理图片路径
          heightTexture: heightTexture, // 替换为实际的高程纹理图片路径
          environment: starfield,
          displacementScale: 0.1, // 调整地球表面的凹凸感
          shading: "lambert", // 光照模型，可选值：'lambert'、'realistic'
          light: {
            main: {
              intensity: 1, // 光照强度
              shadow: false, // 是否显示阴影
            },
            ambient: {
              intensity: 0.5, // 环境光照强度
            },
          },
        },
        series: [
          {
            type: "globe",
            globeRadius: 100,
            baseTexture: heightTexture, // 替换为实际的纹理图片路径
            heightTexture: heightTexture, // 替换为实际的高程纹理图片路径
            environment: starfield,
            displacementScale: 0.1, // 调整地球表面的凹凸感
            shading: "lambert", // 光照模型，可选值：'lambert'、'realistic'
            light: {
              main: {
                intensity: 1, // 光照强度
                shadow: false, // 是否显示阴影
              },
              ambient: {
                intensity: 0.5, // 环境光照强度
              },
            },
            viewControl: {
              autoRotate: true, // 自动旋转
              autoRotateSpeed: 10, // 自动旋转速度
            },
          },
        ],
      };

      myChart.setOption(option);
    },
  },
  mounted() {
    this.createMap();
    this.init();
  },
};
</script>

<style lang="scss" scoped>
.customerservice-screen-world-map {
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  .world-map {
    flex: 1;
  }
}
</style>

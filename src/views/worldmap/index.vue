<template>
  <div class="customerservice-screen-world-map">
    <div ref="worldMap" id="world-map" class="world-map"></div>
  </div>
</template>

<script>
import {
  request,
  getCoordinates,
  numberWithCommas,
  formatDate,
} from "@/utils/index";

import {
  GLOBE_IMAGE_URL,
  BACKGROUND_IMAGE_URL,
  GEOJSON_URL,
  // GEOJSON_URL2,
  CASES_API,
} from "@/constants";

import Globe from "globe.gl";
import * as d3 from "d3";

// const colorScale = d3.scaleSequentialPow(d3.interpolateYlOrRd).exponent(1 / 4);

const colorScale = d3.scaleSequential()
  .domain([0, 4]) // 定义输入域
  .interpolator(d3.interpolate('#82AEDB', '#410E6C')); // 定义插值范围

// 这里要分为与中国地图一样的四个等级
const getVal = (feat) => {
  return feat.covidData.confirmed / feat.properties.POP_EST;
};

export default {
  name: "worldmap",
  data() {
    return {
      world: null,
      flagName: null,
      flagEndpoint: "https://corona.lmao.ninja/assets/img/flags",
      dates: [],
      countries: [],
      featureCollection: [],
      featureCollection2: [],
    };
  },
  methods: {
    init() {
      // 图表自适应
      window.onresize = () => {};
    },
    createMap() {
      const me = this;
      // const N = 300;
      // const gData = [...Array(N).keys()].map(() => ({
      //   lat: (Math.random() - 0.5) * 180,
      //   lng: (Math.random() - 0.5) * 360,
      //   size: Math.random() / 3,
      //   color: ['red', 'white', 'blue', 'green'][Math.round(Math.random() * 3)]
      // }));
      // me.world = Globe()(me.$refs.worldMap)
      //   .globeImageUrl(GLOBE_IMAGE_URL)
      //   .backgroundImageUrl(BACKGROUND_IMAGE_URL)
      //   .pointsData(gData)
      //   .pointAltitude('size')
      //   .pointColor('color')

      me.world = Globe()(this.$refs.worldMap)
        .globeImageUrl(GLOBE_IMAGE_URL)
        .backgroundImageUrl(BACKGROUND_IMAGE_URL)
        .showGraticules(false)
        .polygonAltitude(0.06)
        .polygonCapColor((feat) => {
          return colorScale(getVal(feat))
          // return '#82AEDB'
        })
        .polygonSideColor(() => "rgba(0, 100, 0, 0.05)")
        .polygonStrokeColor(() => "#111")
        .polygonLabel(({ properties: d, covidData: c }) => {
          if (d.ADMIN === "France") {
            me.flagName = "fr";
          } else if (d.ADMIN === "Norway") {
            me.flagName = "no";
          } else {
            me.flagName = d.ISO_A2.toLowerCase();
          }

          return `
        <div class="card">
          <div class="container">
             <span class="card-title"><b>${d.NAME}</b></span> <br />
             <div class="card-spacer"></div>
             <hr />
             <div class="card-spacer"></div>
             <span>今日待办工单数据: ${numberWithCommas(c.confirmed)}</span>  <br />
          </div>
        </div>
      `;
        })
        .onPolygonHover((hoverD) =>
          me.world
            .polygonAltitude((d) => (d === hoverD ? 0.12 : 0.06))
            .polygonCapColor((d) =>
              // d === hoverD ? "steelblue" : colorScale(getVal(d))
              d === hoverD ? "steelblue" :  '#82AEDB'
            )
        )
        .polygonsTransitionDuration(200);

      me.getCases();
    },
    async getCases() {
      const me = this;
      me.countries = await request(CASES_API);
      me.featureCollection = (await request(GEOJSON_URL)).features;

      // featureCollection2 = (await request(GEOJSON_URL2)).features.map(d => {
      //   d.geometry.type = "Polygon";
      //   d.geometry.coordinates = polygonFromCenter(d.geometry.coordinates);
      //   return d;
      // });
      // featureCollection = featureCollection.concat(featureCollection2);

      // world.polygonsData(countriesWithCovid);

      me.dates = Object.keys(me.countries.China);
      me.updateCounters();
      me.updatePolygonsData();
      me.updatePointOfView();
    },
    updateCounters() {},
    updatePolygonsData() {
      const me = this;
      for (let x = 0; x < me.featureCollection.length; x++) {
        const country = me.featureCollection[x].properties.NAME;
        if (me.countries[country]) {
          me.featureCollection[x].covidData = {
            confirmed: me.countries[country][me.dates[0]].confirmed,
            deaths: me.countries[country][me.dates[0]].deaths,
            recoveries: me.countries[country][me.dates[0]].recoveries,
          };
        } else {
          me.featureCollection[x].covidData = {
            confirmed: 0,
            deaths: 0,
            recoveries: 0,
          };
        }
      }

      const maxVal = Math.max(...me.featureCollection.map(getVal));
      colorScale.domain([0, maxVal]);
      me.world.polygonsData(me.featureCollection);
    },
    async updatePointOfView() {
      const me = this;
      // Get coordinates
      try {
        const { latitude, longitude } = await getCoordinates();

        me.world.pointOfView(
          {
            lat: latitude,
            lng: longitude,
          },
          1000
        );
      } catch (e) {
        console.log("Unable to set point of view.");
      }
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

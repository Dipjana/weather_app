<template>
  <div class="header">
    <div>
      <div
        style="
          text-align: center;
          padding-top: 14px;
          padding-bottom: 14px;
          color: white;
        "
      >
        <h5>My Locations</h5>
      </div>
      <div style="position: relative; padding-left: 10px; padding-right: 10px">
        <CIcon class="searchIcon" :icon="cilSearch" size="l" />
        <input placeholder="Your City" />
        <CIcon class="locationIcon" :icon="cilLocationPin" size="l" />
      </div>
    </div>
  </div>
  <div class="body">
    <div class="weather-wrap">
      <div class="location-box">
        <div class="location">
          <p>West Bengal, India</p>
        </div>
        <div class="date">{{ date }}</div>
      </div>
      <div class="city">
        <span><CIcon class="cityLoc" :icon="cilLocationPin" size="l" /></span>
        <h5>{{ weatherData?.name }}</h5>
      </div>
    </div>

    <div class="weather-box">
      <div class="temp">{{ this.temp }}&deg;C</div>
      <!-- <div class="weather">Rain</div> -->
    </div>
  </div>
</template>

<script>
import { CIcon } from "@coreui/icons-vue";
import { cilSearch, cilCircle, cilLocationPin } from "@coreui/icons";
import { api } from "boot/axios";
import { Notify } from "quasar";

export default {
  name: "app",
  components: {
    CIcon,
  },
  data() {
    return {
      cilSearch,
      cilCircle,
      cilLocationPin,
      api_key: "01e374bacb59a90acf422af0f05ca4ed",
      url_base: "",
      weatherData: null,
      temp: null,
      date: null,
      lat: null,
      long: null,
    };
  },
  methods: {
    async fetchWeatherData() {
      // const options = {
      //   enableHighAccuracy: true,
      //   timeout: 10000,
      // };
      navigator.geolocation.watchPosition(
        (res, error, options) => {
          // console.log(res);
          this.lat = res.coords.latitude;
          this.long = res.coords.longitude;
          console.log(this.lat, this.long);
          api
            .get(
              `https://api.openweathermap.org/data/2.5/weather?lat=${this.lat}&lon=${this.long}&appid=${this.api_key}`
            )
            .then((response) => {
              this.weatherData = response.data;
              this.temp = Math.floor(this.weatherData.main.temp - 273.15);
            });
        },
        (err) => {
          console.log("access faild");
        }
      );
    },

    getDate() {
      let options = { year: "numeric", month: "long", day: "numeric" };
      let today = new Date();
      this.date = today.toLocaleDateString("en-US", options);
    },
  },
  // setResults(results) {
  //   console.log(results);
  // },
  mounted() {
    this.fetchWeatherData();
    this.getDate();
  },
};
</script>

<style>
.body {
  background: #10658e url("../assets/cloud.png") no-repeat center center;
  background-size: cover;

  height: 100vh;
}
.header {
  width: auto;
  height: 13vh;
  background-color: #10658e;
}
input {
  width: 100%;
  padding: 10px 40px;
  height: inherit;
  border-radius: 25px;
  background: rgba(255, 255, 255, 0.5);
  border: none;
  font-size: 17px;
}
.searchIcon {
  width: 20px;
  position: absolute;
  left: 21px;
  top: 14px;
  color: #fff;
}
.locationIcon {
  position: absolute;
  right: 21px;
  width: 20px;
  top: 14px;
  color: #fff;
}

.weather-box {
  text-align: center;
}

.weather-box .temp {
  display: inline-block;
  padding: 10px 25px;
  color: #fff;
  font-size: 69px;
  font-weight: 900;
  text-shadow: 3px 6px rgba(0, 0, 0, 0.25);
  background-color: rgba(255, 255, 255, 0.25);
  border-radius: 16px;
  margin: 30px 0px;
  box-shadow: 3px 6px rgba(0, 0, 0, 0.25);
}
.location-box {
  display: flex;
  justify-content: space-between;
  padding: 8px;
  color: #fff;
}
.cityLoc {
  width: 25px;
}
.city {
  display: flex;
  color: #fff;
}
</style>

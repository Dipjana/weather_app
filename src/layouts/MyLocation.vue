<template>
  <div class="header">
    <div>
      <div class="searchBox">
        <h5>My Locations</h5>
      </div>
      <div class="searchInput">
        <CIcon class="searchIcon" :icon="cilSearch" size="l" />
        <input
          placeholder="Your City"
          type="text"
          v-model="query"
          @keypress="fetchWeather"
        />
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
        <h5>{{ this.weatherData?.name }}</h5>
      </div>
    </div>

    <div class="weather-box">
      <div class="temp">{{ this.temp }}&deg;C</div>
    </div>

    <div class="todayStat">
      <div><h5>today</h5></div>
      <div>
        <h5>
          <CIcon class="statIcon" :icon="cilSun" size="l" />
          <CIcon class="statIcon" :icon="cilArrowTop" size="l" />
          {{ this.time1 }} AM
          <CIcon class="statIcon" :icon="cilArrowBottom" size="l" />
          {{ this.time2 }} PM
        </h5>
      </div>
    </div>

    <h5>{{ this.time }} - sunny</h5>
    <div class="border-back">
      <div class="box">
        <h5>pressure: {{ this.weatherData?.main.pressure }}hPa</h5>
        <h5>humidity: {{ this.weatherData?.main.humidity }} %</h5>
        <h5>dew point: 23&deg;</h5>
      </div>
      <div class="box">
        <h5>AQI 130 Moderately polluted</h5>
        <h5>light wind form E(10 kph)</h5>
      </div>
    </div>
  </div>
</template>

<script>
import { CIcon } from "@coreui/icons-vue";
import {
  cilSearch,
  cilCircle,
  cilLocationPin,
  cilArrowBottom,
  cilArrowTop,
  cilSun,
} from "@coreui/icons";
import { api, axios, cityApi } from "boot/axios";
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
      cilArrowBottom,
      cilArrowTop,
      cilSun,
      api_key: "01e374bacb59a90acf422af0f05ca4ed",
      url_base: "",
      weatherData: null,
      temp: null,
      date: null,
      lat: null,
      long: null,
      query: "",
      location: "",
      feelLike: "",
      time: "",
      time1: "",
      time2: "",
    };
  },
  methods: {
    fetchWeather(e) {
      //geocode.maps.co/search?q=kolkata
      https: if (e.key == "Enter") {
        console.log(this.query);
        api.get(`geocode.maps.co/search?q=${this.query}`).then((response) => {
          console.log(response);
          this.lot = response.data[0].latitude;
          this.long = response.data[0].longitude;
          this.name = response.data[0].name;
          this.fetchWeatherData(this.lot, this.long);
        });
      }
    },
    async fetchWeatherData(lat, long) {
      // const options = {
      //   enableHighAccuracy: true,
      //   timeout: 10000,
      // };

      api
        .get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${this.api_key}`
        )
        .then((response) => {
          this.weatherData = response.data;
          this.temp = Math.floor(this.weatherData.main.temp - 273.15);
          this.feelLike = Math.floor(this.weatherData.main.feels_like - 273.15);

          const date1 = new Date(this.weatherData.sys.sunrise * 1000);
          const hours1 = date1.getHours();
          const minutes1 = date1.getMinutes();
          this.time1 = `${hours1}:${minutes1}`;

          const date2 = new Date(this.weatherData.sys.sunset * 1000);
          const hours2 = date2.getHours();
          const minutes2 = date2.getMinutes();

          this.time2 = `${hours2 - 12}:${minutes2}`;

          console.log(this.time1);
        });
    },

    getDate() {
      let options = { year: "numeric", month: "long", day: "numeric" };
      let today = new Date();
      this.date = today.toLocaleDateString("en-US", options);
      const hours = today.getHours();
      const minutes = today.getMinutes();
      const amOrPm = hours >= 12 ? "PM" : "AM";

      // hours %= 12;
      // hours = hours || 12;

      this.time = `${hours - 12}:${minutes} ${amOrPm}`;
    },
    getGeoLocation() {
      navigator.geolocation.watchPosition(
        (res, error, options) => {
          // console.log(res);
          this.lat = res.coords.latitude;
          this.long = res.coords.longitude;
          this.fetchWeatherData(this.lat, this.long);
          console.log(this.lat, this.long);
        },
        (err) => {
          console.log("geo location faild");
        }
      );
    },
  },
  // setResults(results) {
  //   console.log(results);
  // },

  mounted() {
    this.getGeoLocation();
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
.searchBox {
  text-align: center;
  padding-top: 14px;
  padding-bottom: 14px;
  color: white;
}
.searchInput {
  position: relative;
  padding-left: 10px;
  padding-right: 10px;
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
.statIcon {
  width: 10px;
}
.city {
  display: flex;
  color: #fff;
}
.todayStat {
  display: flex;
  justify-content: space-between;
  /* padding: 0px 10px; */
  color: white;
  border-bottom: 1px solid white;
  margin: 0px 10px;
}
.todayStat h5 {
  font-size: 14px;
}
.border-back {
  display: flex;
}
h5 {
  font-size: 14px;
  color: #fff;
  padding: 0 10px;
  position: relative;
  z-index: 999;
}
.border-back h5 {
  font-size: 14px;
  color: #fff;
  padding: 0 10px;
  position: relative;
  z-index: 999;
}
.box {
  width: 50%;
}
</style>

// src/boot/axios.js

import { boot } from "quasar/wrappers";
import axios from "axios";

const api = axios.create({
  baseURL: "https://api.openweathermap.org/",
});

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API

  //api.defaults.headers.common["X-Meteum-API-Key"] = "e53ea7d7-895f-40f2-b5d0-9f05fe123a72";
});

export { axios, api };

// src/boot/axios.js

import { boot } from "quasar/wrappers";
import axios from "axios";

const api = axios.create({
  baseURL: "",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
const cityApi = axios.create({
  baseURL: "",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "X-Api-Key": "nkYEwAs+mdn0C4Ahe867ew==eXrlBcvTZcjgiZiG",
  },
});

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API

  // cityApi.defaults.headers.common["X-Api-Key "] =
  //   "nkYEwAs+mdn0C4Ahe867ew==eXrlBcvTZcjgiZiG";
});

export { axios, api, cityApi };

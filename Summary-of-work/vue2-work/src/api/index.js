import * as api from "./api";
import axios from "axios";

axios.defaults.baseURL = "http://39.105.194.32:7009";

axios.defaults.headers["Content-Type"] =
  "application/x-www-form-urlencoded;charset=UTF-8";
axios.defaults.timeout = 5000;

export default api;

//get
export function GET(url) {
  return axios
    .get(url)
    .then(function (res) {
      if (res && res.status === 200) {
        return res.data;
      }
    })
    .catch(error => {
      console.error("网络请求错误 at: ", url);
      console.error("ERROR", error);
    });
}

/*delete*/
export function DELETE(url, data) {
  return axios
    .delete(url, data)
    .then(function (res) {
      if (res && res.status === 200) {
        return res.data;
      }
    })
    .catch(error => {
      console.error("网络请求错误 at: ", url);
      console.error("ERROR", error);
    });
}

/*post*/
export function POST(url, data) {
  return axios
    .post(url, data)
    .then(function (res) {
      if (res && res.status === 200) {
        return res.data;
      }
    })
    .catch(error => {
      console.error("网络请求错误 at: ", url);
      console.error("ERROR", error);
    });
}

/*put*/
export function PUT(url, data) {
  return axios
    .put(url, data)
    .then(res => {
      if (res && res.status === 200) {
        return res.data;
      }
    })
    .catch(error => {
      console.error("网络请求错误 at : ", url);
      console.error("ERROR", error);
    });
}

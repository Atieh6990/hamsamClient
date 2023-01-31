import {ROAST_CONFIG} from '../config';
import axios from 'axios';
import axiosback from "./ajax";

axios.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  return Promise.reject(error);
});
export default {

  matches() {

    let Url = ROAST_CONFIG.URL_Newssn + 'forecast/matches';
    return axios({
      method: "POST",
      url: Url,
    }).then(response => {
      let data = response['data'];
      return data;

    });
  },
  registerForecast: function (matchId, type, score) {

    let Url = ROAST_CONFIG.URL_Newssn + 'forecast/forecast';
    return axios({
      method: 'POST',
      url: Url,
      data: {
        "match": matchId,
        "type": type,
        "score": score
      },
      crossDomain: true,
    }).then(response => {

      let data = response['data'];
      return data;

    });

  }, cancelForecast: function (matchId) {

    let Url = ROAST_CONFIG.URL_Newssn + 'forecast/forecastcancel';
    return axios({
      method: 'POST',
      url: Url,
      data: {
        "match_id": matchId,
      },
      crossDomain: true,
    }).then(response => {

      let data = response['data'];
      return data;

    });

  }, forecastMe: function (url) {
    let Url = ROAST_CONFIG.URL_Newssn + 'forecast/forecastme';
    return axios({
      method: 'POST',
      url: url,
      crossDomain: true,
    }).then(response => {

      let data = response['data'];
      return data;

    });
  }
}

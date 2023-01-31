import {ROAST_CONFIG} from '../config';
import axios from 'axios';
import axiosback from "./ajax";

axios.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    return Promise.reject(error);
});


export default {

    ranking(url,status) {
        let Orgdata = "status=" + status;
        return axios({
            method: "POST",
            url: url,
            data:Orgdata
        }).then(response => {
            let data = response['data'];
            return data;

        });
    },
    rankingLoad(userID, startPage, rankNum) {

        let Orgdata = {data: '{"userID":"' + userID + '","positionFrom":"' + (startPage * rankNum) + '","positionTo":"' + (((startPage) + 1) * (rankNum)) + '","status":"0"}'};
        let Url = ROAST_CONFIG.URL_Oldssn + "/?act=userRank&type=top&positionTo=" + (((startPage) + 1) * (rankNum)) + "&positionFrom=" + (startPage * rankNum) + "&userID=" + userID + "";
        let data = axiosback.convertOldSsn(Orgdata, Url);


        return axios({
            method: "POST",
            url: Url,
            data: data
        }).then(response => {
            let data = response['data'];
            return data;

        })
    },pageOneRanking(userID, startPage, rankNum) {

        let Orgdata = {data: '{"userID":"' + userID + '","positionFrom":"' + (startPage * rankNum) + '","positionTo":"' + (((startPage) + 1) * (rankNum)) + '","status":"0"}'};
        let Url = ROAST_CONFIG.URL_Oldssn + "/?act=wall&type=rankFirst";
        let data = axiosback.convertOldSsn(Orgdata, Url);


        return axios({
            method: "POST",
            url: Url,
            data: data
        }).then(response => {
            let data = response['data'];
            return data;

        })
    },Weather(City) {
    return axios({
      method: "GET",
      url: "http://parsijoo.ir/api?serviceType=weather-API&q="+City,
    }).then(response => {
      let data = response['data'];
      return data;
    });
  },Clock() {
    return axios({
      method: "GET",
      url: "https://api.codebazan.ir/time-date/?json=all",
    }).then(response => {
      let data = response['data'];
      return data;
    });
  }


}

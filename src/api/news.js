import axiosback from './ajax'
import {ROAST_CONFIG} from '../config'
import axios from 'axios';

export default {
  news() {
      let Url = ROAST_CONFIG.URL_Newssn + "news";
      return axios({
          method: "POST",
          url: Url,
      }).then(response => {
          let data = response['data'];
          return data;

      })
  } ,
    newsList(url) {
      let Url = url;
      return axios({
          method: "POST",
          url: Url,
      }).then(response => {
          let data = response['data'];
          return data;

      })
  }
  // news() {
  //   let Orgdata = {data: '{"positionTo": "11", "positionFrom": "0"}'};
  //   let Url = ROAST_CONFIG.URL_Oldssn + "?act=news&type=get";
  //   let data = axiosback.convertOldSsn(Orgdata, Url);
  //   return axios({
  //     method: "POST",
  //     url: Url,
  //     data: data
  //   }).then(response => {
  //     return response['data'];
  //   })
  // }
   , newNews() {

        let Url =  "http://app.akharinkhabar.ir/androidonlinenews5317.aspx?code=0&index=0&havebody=1";
       // let data = axiosback.convertOldSsn(Orgdata, Url);
        return axios({
            method: "GET",
            dataType: "html",
            contentType: 'application/x-www-form-urlencoded',
            url: Url,
            data: ''
        }).then(response => {
            return response['data'];
        })
    }
}

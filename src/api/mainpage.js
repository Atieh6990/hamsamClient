import axiosback from './ajax'
import {ROAST_CONFIG} from '../config'
import func from '../mixins/func'
import store from '../store/index'
import axios from 'axios';

export default {
  news() {
    let Orgdata ={data: '{"positionTo": "11", "positionFrom": "0"}'};
    let Url=ROAST_CONFIG.URL_Oldssn + "?act=news&type=get";
    let data = axiosback.convertOldSsn(Orgdata, Url);
    return axios({
      method: "POST",
      url: Url,
      data: data
    }).then(response => {
      let data = response['data'];
     // console.log('data login aio->' + JSON.stringify(data));
      return data;

    })
  },wall(){
    let Orgdata = {data: '{"userID":"' +store.getters.getUser['userID']+ '","positionTo": "11", "positionFrom": "0","status":"0"}'};
    let Url=ROAST_CONFIG.URL_Oldssn + "?act=wall&type=list";
    let data = axiosback.convertOldSsn(Orgdata, Url);
    return axios({
      method: "POST",
      url:Url,
      data: data
    }).then(response => {
      let data = response['data'];
      //  console.log('data login guest->' + JSON.stringify(data));
      return data;

    })
  },rank(){
    let Orgdata = {data: '{"userID":"' +store.getters.getUser['userID'] + '","positionFrom":"0","positionTo":"5","status":"0"}'};
    let Url=ROAST_CONFIG.URL_Oldssn + "?act=wall&type=rankFirst";
    let data = axiosback.convertOldSsn(Orgdata, Url);
    return axios({
      method: "POST",
      url:Url,
      data: data
    }).then(response => {
      let data = response['data'];
      //  console.log('data login guest->' + JSON.stringify(data));
      return data;

    })
  }

}

import {ROAST_CONFIG} from '../config';
import axios from 'axios';

export default {

  apps(url, year, old, cat) {
    let Orgdata;
    if (cat == '' || cat == 0) {
      Orgdata = "year=" + year + "&old=" + old;
    } else {
      Orgdata = "year=" + year + "&old=" + old + "&cat=" + cat;
    }
    let Url = url;

    return axios({
      method: "POST",
      url: Url,
      data: Orgdata
    }).then(response => {
      let data = response['data'];
      // $('#debugDiv').append('<p>' + ' tooye then response apps' + '</p><br>');
      return data;

    }).catch(error => {
      // $('#debugDiv').append('<p>' + ' tooye catch response apps  ' + JSON.stringify(error) + '</p><br>');
    });
  },
  topApps(year, old) {
    let Orgdata = "year=" + year + "&old=" + old;
    let Url = ROAST_CONFIG.URL_Newssn + 'application/top';
    return axios({
      method: "POST",
      url: Url,
      data: Orgdata
    }).then(response => {
      let data = response['data'];
      return data;

    });
  },

  appDetail(appID) {
    let Orgdata = "id=" + appID;
    let Url = ROAST_CONFIG.URL_Newssn + 'application/detail';
    return axios({
      method: "POST",
      url: Url,
      data: Orgdata
    }).then(response => {
      let data = response['data'];
      // console.log('data login aio->' + JSON.stringify(data));
      return data;

    });
  },

  rate(appID, rate) {
    let Orgdata = "id=" + appID + "&rate=" + rate;
    let Url = ROAST_CONFIG.URL_Newssn + 'application/rate';
    return axios({
      method: "POST",
      url: Url,
      data: Orgdata
    }).then(response => {
      let data = response['data'];
      // console.log('data login aio->' + JSON.stringify(data));
      return data;

    });
  },
  comment(url, appID) {
    // alert(url + ' ' + token+ ' ' + appID)
    let Orgdata = "id=" + appID;
    let Url = url;
    return axios({
      method: "POST",
      url: Url,
      data: Orgdata
    }).then(response => {
      let data = response['data'];
      // console.log('data login aio->' + JSON.stringify(data));
      return data;

    });
  },
  sendComment(appID, text) {
    // alert('text ->'+ text)
    let Orgdata = "id=" + appID + "&text=" + text;
    let Url = ROAST_CONFIG.URL_Newssn + 'application/comment/save';
    return axios({
      method: "POST",
      url: Url,
      data: Orgdata
    }).then(response => {
      let data = response['data'];
      // console.log('data login aio->' + JSON.stringify(data));
      return data;

    });
  },

}

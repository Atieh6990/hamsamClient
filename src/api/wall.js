import axiosback from './ajax'
import {ROAST_CONFIG} from '../config'
import func from '../mixins/func'
import store from '../store/index'
import axios from 'axios';

var header = {Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImFhMjc5NzhmMzg0MzAyOGVlM2NhYThiNDJlMjk4YzFmMDVhZmY0YWIyYmYxNDA0NjM5ZWU0ODEzNGQwNDUxMTcxODJhZmZiNTRmMjdmYzZiIn0.eyJhdWQiOiIxIiwianRpIjoiYWEyNzk3OGYzODQzMDI4ZWUzY2FhOGI0MmUyOThjMWYwNWFmZjRhYjJiZjE0MDQ2MzllZTQ4MTM0ZDA0NTExNzE4MmFmZmI1NGYyN2ZjNmIiLCJpYXQiOjE1NTA5OTU2NjksIm5iZiI6MTU1MDk5NTY2OSwiZXhwIjoxNTgyNTMxNjY5LCJzdWIiOiIyNzYyOTYiLCJzY29wZXMiOltdfQ.xEr85Zo3Cuoxyx0vOd8SMrDf9x_sbJjCIqMxVo0NPNDZGp1yQiqbdgGQbNTcLs5aWufzQcIVwTHEQkl9oHtV-LP87oLCfwlvQyrz1RphmdGaalsdmYHhzV4AvpjcN7Agb1WPenSxizTVNcrSY2b58-x12ASWwZmjW_h5fevmKxV2UMahgcCpxNrr_rk_xHRAI40mSIEd8nht5MWm4fWL6HuxHnRtBz-sBXFxrDwk0lN9owqCqgGdqDSwG703m3u43eWCwxdLgbHIaFpUEe7df6QsEbD9L8eg0FGpgbQVUkxsLLLWdofhWEzEM7TpMqXkeuy-Fzs_MgdgO-17yCQ9DHlsMAibFy6V9bpSdA8zB8d_CpNe5Dkcrp4Y8P3HD207APAUrp_jFV_XlVSkMew6a-boV-hhCbFh_OFH4IxSK0qIvqayLKn0jTqQRvJDD9nyJs9SwD9nekG74lm3d_U4ye__O6bybK2Bf6PAaeUh0XBU2kcb-Re1dZz9pxfrrTUoYLughl0BtQcDRMpSKvlOUNB8-mS_0otahOFCQrx0VgJXnnQ1hcMGl8mf6HF2dtDJzcyWBjz0XVvfsNyG3bUjzbIwDkHNSQn8IKHIEvy7X-0wJDQjpsezqjMak6mgV_V2e6_1Gkj4EB-SR_JAMr9n3TAiM5HVjeLXNxK5xtlM1ys'};
export default {
  top() {
    let Url = ROAST_CONFIG.URL_Newssn + "wall/top";

    return axios({
      method: "POST",
      url: Url,

    }).then(response => {
      // console.log(response)
      return response['data'];
    })
  },
  list(url, id, person) {

    let Url = url;
    let data = {category: id, status: person};

    return axios({
      method: "POST",
      // headers: header,
      url: Url,
      data: data,
    }).then(response => {
      return response['data'];
    }).catch(error => {
    })


  }, listcatperson(positionFrom, positionTo, status, category) {
    var Orgdata = {data: '{"userID":"' + store.getters.getUser['userID'] + '","positionFrom": "' + positionFrom + '","positionTo": "' + positionTo + '","status": "' + status + '","cat":"' + category + '"}'};
    let Url = ROAST_CONFIG.URL_Oldssn + "?act=wall&type=list";
    let data = axiosback.convertOldSsn(Orgdata, Url);
    return axios({
      method: "POST",
      url: Url,
      data: data
    }).then(response => {
      return response['data'];

    })
  }, listcatFriends(positionFrom, positionTo, status, category) {
    var Orgdata = {data: '{"userID":"' + store.getters.getUser['userID'] + '","positionFrom": "' + positionFrom + '","positionTo": "' + positionTo + '","status": "' + status + '","cat":"' + category + '"}'};
    let Url = ROAST_CONFIG.URL_Oldssn + "?act=wall&type=list";
    let data = axiosback.convertOldSsn(Orgdata, Url);
    return axios({
      method: "POST",
      url: Url,
      data: data,
      headers: 'Bearer '
    }).then(response => {
      return response['data'];

    })
  }, like(wallID) {
    let Url = ROAST_CONFIG.URL_Newssn + "wall/like";
    let data = {id: wallID};
    return axios({
      method: "POST",
      url: Url,
      data: data,
      headers: header
    }).then(response => {
      return response['data'];

    })
  },
  report(wallID) {
    let Url = ROAST_CONFIG.URL_Newssn + "wall/report";
    let data = {id: wallID};
    return axios({
      method: "POST",
      url: Url,
      data: data,
      headers: header
    }).then(response => {
      return response['data'];

    })
  },
  delete(wallID) {
    let Url = ROAST_CONFIG.URL_Newssn + "wall/delete";
    let data = {id: wallID};
    return axios({
      method: "POST",
      url: Url,
      data: data,
      headers: header
    }).then(response => {
      return response['data'];

    })
  },
  reply(wallID) {

    let Orgdata = {data: '{"userID":"' + store.getters.getUser['userID'] + '","wallID":"' + wallID + '"}'};
    let Url = ROAST_CONFIG.URL_Oldssn + "wall/comment/post";
    let data = axiosback.convertOldSsn(Orgdata, Url);
    return axios({
      method: "POST",
      url: Url,
      data: data
    }).then(response => {
      return response['data'];

    })
  }, insert(wall_id, text) {
    // var Orgdata = {data: '{"userID":"' + store.getters.getUser['userID'] + '","text":"' + encodeURIComponent(text) + '","image":"","link":"","status":"' + status + '","cat":"' + cat + '","parentMain":"' + parentMain + '","parentID":"' + parentID+ '"}'};
    let Url = ROAST_CONFIG.URL_Newssn + "wall/comment/post";
    // let data = axiosback.convertOldSsn(Orgdata, Url);
    let data = {id: wall_id, text: text};
    return axios({
      method: "POST",
      url: Url,
      data: data,
      // headers: header
    }).then(response => {
      //console.log(response.data);
      return response['data'];

    })
  },

  getComments(id) {
    let url = ROAST_CONFIG.URL_Newssn + 'wall/detail';
    return axios({
      method: 'post',
      url: url,
      data: {id: id}
    })
      .then(response => {
        return response.data;
      })
  },

  post(cat, text) {
    let url = ROAST_CONFIG.URL_Newssn + "wall/post";
    let data = {category: cat, text: text};
    return axios({
      method: "post",
      url: url,
      data: data,
      headers: header
    }).then(response => {
      return response.data;
    })
  }

}

import {ROAST_CONFIG} from '../config';
import axiosback from './ajax'
import axios from 'axios';

export default {

  getChallenges(id) {
    return axios({
      method: 'post',
      url: ROAST_CONFIG.URL_Newssn + 'challenge/list',
      data: {id: id}
    })
      .then(data => {
        return data.data;
      })
  },

  challengeStartGiveup(id) {
    return axios({
      method: 'post',
      url: ROAST_CONFIG.URL_Newssn + 'challenge/start',
      data: {id: id}
    })
      .then(data => {
        return data;
      })
  },

  activityList(id) {
    return axios({
      method: 'post',
      url: ROAST_CONFIG.URL_Newssn + 'activity/list',
      data: {userid: id}
    })
      .then(data => {
        return data.data
      })
  },

  challengeDetail(id, userid) {
    return axios({
      method: 'post',
      url: ROAST_CONFIG.URL_Newssn + 'challenge/detail',
      data: {id: id, userid: userid}
    }).then(response => {
      return response.data.data;
    })
  },

  challengeApp(id, value) {
    let Orgdata = "id=" + id + "&value=" + value;
    let url = ROAST_CONFIG.New_Url_Laravel + "activity/start";

    return axios({
      method: "POST",
      url: url,
      data: Orgdata
      // headers: {'Accept': 'application/json', 'Authorization': "Bearer " + store.getters.access_token}

    }).then(response => {

      return response['data'];

    })
  },

  getOtherChallengers(id) {

    return axios({
      method: "POST",
      url: ROAST_CONFIG.URL_Newssn + 'challenge/people',
      data: {id: id}

    }).then(response => {

    //  console.log(response);
      return response['data'];

    })
  }

}

import {ROAST_CONFIG} from '../config';
import axios from 'axios';

axios.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  return Promise.reject(error);
});

export default {

  openProfile(userId) {
    return axios({
      method: 'post',
      url: ROAST_CONFIG.URL_Newssn + 'profile/detail',
      data: {id: userId}
    })
      .then(data => {
        return data.data;
      })
  },

  friendsList(id) {
    let url = ROAST_CONFIG.URL_Newssn + "friend/list";
    let data = {type: 1, user_id: id};
    return axios({
      method: 'post',
      url: url,
      data: data
    })
      .then(response => {
        return response.data.data;
      })
  },

  favouritesList(id) {
    let url = ROAST_CONFIG.URL_Newssn + "favorites/list";
    return axios({
      method: 'post',
      url: url,
      data: {id: id}
    })
      .then(response => {
        var favourites = [];

        favourites = response.data.data.list
        favourites = favourites.filter((value, key) => {
          if (value.is_active)
            return value;
        });
        // console.log(favourites);
        return favourites;
      })
  },

  getChartData(id) {
    return axios({
      method: 'post',
      url: ROAST_CONFIG.URL_Newssn + 'profile/chart',
      data: {id: id}
    })
      .then(data => {
        // console.log(data.data.data);
        return data.data.data;
      })
  },

  // let data = axiosback.convertOldSsn(Orgdata, Url);

  badges(id) {
    return axios({
      method: "POST",
      url: ROAST_CONFIG.URL_Newssn + 'badges',
      data: {type: "all", user_id: id}
    }).then(response => {
      // console.log(response);
      return response.data
    }).catch(response => {
      return false;
    });
  },

  friendshipStatus(id) {
    return axios({
      method: 'post',
      url: ROAST_CONFIG.URL_Newssn + 'profile/detail',
      data: {id: id}
    })
      .then(data => {
        return data.data.data;
      })
  },

  myScores(id){
    return axios({
      method: 'post',
      url: ROAST_CONFIG.URL_Newssn + 'challenge/score/list',
      data: {userid: id}
    }).
      then(data => {
        return data.data;
    })
  },

  myActivities(id){
    return axios ({
      method: 'post',
      url: ROAST_CONFIG.URL_Newssn + 'activity/score/list',
      data: {userid: id}
    })
      .then(data => {
        return data.data
      })
  },


// {
//   "data": [
//   {
//     "point": 0,
//     "coin": 0,
//     "medal": 0,
//     "icon": null,
//     "time": "2019-04-02 06:52:49",
//     "pasttime": "1 هفته پیش",
//     "title": "نوشتن پست",
//     "id": 4
//   },
//   {
//     "point": 0,
//     "coin": 0,
//     "medal": 0,
//     "icon": null,
//     "time": "2019-02-12 06:52:49",
//     "pasttime": "2 ماه پیش",
//     "title": "فیلم دیدن در اکران",
//     "id": 10
//   },
//   {
//     "point": 0,
//     "coin": 0,
//     "medal": 0,
//     "icon": null,
//     "time": "2019-04-14 14:29:20",
//     "pasttime": "1 ثانیه پیش",
//     "title": "تکمیل پروفایل",
//     "id": 22
//   },
//   {
//     "point": 0,
//     "coin": 0,
//     "medal": 0,
//     "icon": null,
//     "time": "2019-04-14 14:29:20",
//     "pasttime": "1 ثانیه پیش",
//     "title": "لایک گرفتن روی پست",
//     "id": 23
//   }
// ],
//   "links": {
//   "first": "http://ssn.tvapps.ir/hamsam/pservice//api/v1/activity/score/list?page=1",
//     "last": "http://ssn.tvapps.ir/hamsam/pservice//api/v1/activity/score/list?page=1",
//     "prev": null,
//     "next": null
// },
//   "meta": {
//   "current_page": 1,
//     "from": 1,
//     "last_page": 1,
//     "path": "http://ssn.tvapps.ir/hamsam/pservice//api/v1/activity/score/list",
//     "per_page": 10,
//     "to": 4,
//     "total": 4
// },
//   "success": true
// }

}

import {ROAST_CONFIG} from '../config'
import axios from 'axios';

//token ba tavafogh sabet ast //TODO
var header = {Authorization: 'token eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhIjoxMjE5NjQ2NiwiYiI6MTMxMjQxMTgsImMiOjEsImV4cCI6MTY3NDk5ODQ1OSwiaWF0IjoxNjY3MjIyNDU5fQ.AR67fDd0pO-6smtc2Yza2xbiSst0N2iSjEWWzgtTdN4'};
axios.interceptors.request.use(function (config) {
  // config.headers.SourceChannel = 'GF_TV_ID_40202';
  return config;
}, function (error) {
  return Promise.reject(error);
});

export default {

  gapFilms(index, size , id = '') {
    let Url = ROAST_CONFIG.gapFilm_Url + "Content/GetContentByTagForTv?PageIndex=" + index + "&PageSize=" + size + "&TagId="+id+"&SourceChannel=GF_TV_ID_40202";
    return axios({
      method: "GET",
      url: Url,
    }).then(response => {
      let data = response['data'];
      return data;
    })
  },
  productList(limit, offset) {
    let Url = ROAST_CONFIG.digiToon_url + "product-list/?offset=" + offset + "&limit=" + limit + "";
    return axios({
      method: "GET",
      url: Url,
    }).then(response => {
      let data = response['data'];
      return data;
    })
  },

  productDetail(id) {
    let Url = ROAST_CONFIG.digiToon_url + "product/" + id + "/";
    return axios({
      method: "GET",
      url: Url,
    }).then(response => {
      let data = response['data'];
      return data;
    })
  },


  streamLink(id) {
    let Url = ROAST_CONFIG.digiToon_url + "stream-link/" + id + "/";
    return axios({
      method: "GET",
      url: Url,
    }).then(response => {
      let data = response['data'];
      return data;
    })
  }
}

import axiosback from '../ajax'
import {ROAST_CONFIG} from '../../config'
import func from '../../mixins/func'
import store from '../../store/index'
import axios from 'axios';

export default {
  chatList() {

    let Url=ROAST_CONFIG.URL_Newssn + "chat/list";

    return axios({
      method: "POST",
      url: Url,

    }).then(response => {
      return response['data'];
    })
  },
    PMLazyLoad(ID,nextPage) {
        let Orgdata  ={id:ID};

        let Url=nextPage;

        return axios({
            method: "POST",
            url: Url,
            data:Orgdata,

        }).then(response => {
            return response['data'];
        })
    },ChatListLazyLoad(nextPage){
        let Url=nextPage;

        return axios({
            method: "POST",
            url: Url,

        }).then(response => {
            return response['data'];
        })
    },

  pmList(ID ) {
      let Orgdata  ={id:ID};

      let Url=ROAST_CONFIG.URL_Newssn + "chat/messages";
    return axios({
      method: "POST",
      url: Url,
data:Orgdata,
    }).then(response => {
      return response['data'];
    })
  },

  insertPm( recieverID , pm) {

    let Url=ROAST_CONFIG.URL_Newssn + "chat/messages/save";
    let data = {user_id :recieverID,message:pm,sticker_id:0};
    return axios({
      method: "POST",
      url: Url,
      data: data
    }).then(response => {
      return response['data'];
    })
  },

  lastPm(userID , recieverID , pmId) {
    const Orgdata = {data: '{"senderID":"' + recieverID + '","recieverID":"' + userID + '","pmID":"' + pmId + '"}'};
    let Url=ROAST_CONFIG.URL_Oldssn + "?act=chat&type=lastPM";
    let data = axiosback.convertOldSsn(Orgdata, Url);
    return axios({
      method: "POST",
      url: Url,
      data: data
    }).then(response => {
      return response['data'];
    })
  },
insertBot(pm,time){


  let Url=`http://cssn.bot2.ir/?usr=${store.getters.getUser['userID']}--${time}&msg=${pm}`;

  return axios({
    method: "GET",
    url: Url,
  }).then(response => {
    return response['data'];
  })

}

}

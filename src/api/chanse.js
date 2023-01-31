import axiosback from './ajax'
import {ROAST_CONFIG} from '../config'
import func from '../mixins/func'
import store from '../store/index'
import axios from 'axios';

export default {
    get() {


    let Url = ROAST_CONFIG.URL_Newssn + 'chance/interval';

    return axios({
      method: "POST",
      url: Url,

    }).then(response => {
      return response['data'];
    })
  }, insert(selected) {

        let Url = ROAST_CONFIG.URL_Newssn + 'chance/play';
    let data= {interval :selected};
    return axios({
      method: "POST",
      url: Url,
     data:data
    }).then(response => {
      return response['data'];

    })
  }

}
/*  var data = {data: '{"userID":"' + user.userID + '","selectPeriod":"' + valBox + '"}'};

                        ajax("POST", urlNow + '/?act=chance1812&type=insert', createPageTwentySeven.randomArray, data);*/
/**/


/* var data = {data: '{"userID":"' + user.userID + '"}'};
    ajax("POST", urlNow + "/?act=chance&type=get", createPageTwentySeven.managerChance, data);*/
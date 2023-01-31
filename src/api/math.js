import {ROAST_CONFIG} from '../config';
import axiosback from './ajax'
import axios from 'axios';

axios.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    return Promise.reject(error);
});


export default {

    mathRank() {
        return axios({
            method: 'post',
            url: ROAST_CONFIG.URL_Newssn + 'math/rank',
        })
            .then(data => {
                return data.data;
            })
    },

    mathStartGame() {
        return axios({
            method: 'post',
            url: ROAST_CONFIG.URL_Newssn + 'math/start',
        })
            .then(data => {
                return data.data;
            })
    },


    mathEndGame(gameId, truAns) {
        let Orgdata = "game_id=" + gameId + "&score=" + truAns;
        return axios({
            method: 'post',
            url: ROAST_CONFIG.URL_Newssn + 'math/end',
            data: Orgdata
        })
            .then(data => {
                return data.data;
            })
    }
}

import axiosback from './ajax'
import {ROAST_CONFIG} from '../config'
import func from '../mixins/func'
import store from '../store/index'
import axios from 'axios';

export default {
    startGame() {


        let url= ROAST_CONFIG.URL_Newssn + "puzzle/start";
       // let data  ={id:ID};
        return axios({
            method: "POST",
            url:url,
          //  data: data
        }).then(response => {
            return response['data'];

        })
    },
    saveScoreGame(gameId,moveCount,score2048) {


        let url= ROAST_CONFIG.URL_Newssn  + "puzzle/end";
        let data = {game_id :gameId,counts:moveCount,score: score2048 };
        return axios({
            method: "POST",
            url:url,
            data: data
        }).then(response => {
            return response['data'];

        })
    },
    getLogGame(gameId,moveCount,score2048) {

        let url= ROAST_CONFIG.URL_Newssn  + "puzzle/play";
        let data = {game_id :gameId,counts:moveCount,score: score2048 };
        return axios({
            method: "POST",
            url:url,
            data: data
        }).then(response => {
            return response['data'];

        })
    }

}

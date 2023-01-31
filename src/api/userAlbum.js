import {ROAST_CONFIG} from '../config';
import axiosback from './ajax'
import axios from 'axios';

axios.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    return Promise.reject(error);
});


export default {


    pictureUrl(isprofile, album) {
        let Orgdata;
        if (album == -1) {
            Orgdata = "isprofile=" + isprofile;
        } else {
            Orgdata = "isprofile=" + isprofile + "&album=" + album;
        }

        let Url = ROAST_CONFIG.URL_Newssn + 'picture/url';
        return axios({
            method: "POST",
            url: Url,
            data: Orgdata
        }).then(response => {
            let data = response['data'];
            return data;

        }).catch(response => {

        });;
    },


    pictureList(url,userId) {
       // let Url = ROAST_CONFIG.URL_Newssn + 'picture/list';

        let Orgdata = {"userid": "" + userId+ ""}
        let Url = url;

        return axios({
            method: "POST",
            url: Url,
            data: Orgdata
        }).then(response => {
            let data = response['data'];
            return data;
        }).catch(response => {

        });;
    },


    albumCreate(name) {
        let Url = ROAST_CONFIG.URL_Newssn + 'album/create';
        let Orgdata = 'title=' + name;
        return axios({
            method: "POST",
            url: Url,
            data: Orgdata
        }).then(response => {
            let data = response['data'];
            return data;

        }).catch(response => {

        });;
    },


    albumDetail(id,userId) {
        let Url = ROAST_CONFIG.URL_Newssn + 'album/detail';
        // let Orgdata = 'id=' + id + ',userid='+userId;
        let Orgdata = {"userid": "" + userId+ "","id":""+id+""}


        return axios({
            method: "POST",
            url: Url,
            data: Orgdata
        }).then(response => {
            let data = response['data'];
            return data;

        }).catch(response => {

        });;
    },


    albumDelete(id) {
        let Url = ROAST_CONFIG.URL_Newssn + 'album/delete';
        let Orgdata = 'id=' + id;
        return axios({
            method: "POST",
            url: Url,
            data: Orgdata
        }).then(response => {
            let data = response['data'];
            return data;

        }).catch(response => {

        });;
    },

    pictureDelete(picId){

        let Url = ROAST_CONFIG.URL_Newssn + 'picture/delete';
        let Orgdata = 'id=' + picId;
        return axios({
            method: "POST",
            url: Url,
            data: Orgdata
        }).then(response => {
            let data = response['data'];
            return data;

        }).catch(response => {

        });
    }

}

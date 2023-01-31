import axiosback from './ajax'
import {ROAST_CONFIG} from '../config'
import func from '../mixins/func'
import store from '../store/index'
import axios from 'axios';

export default {
    TvData: JSON.parse(func.methods.fillUserTv(store.getters.getModelTv)),
    loginAio() {
        let Orgdata = {data: func.methods.fillUserTv(store.getters.getModelTv)};
        let url = ROAST_CONFIG.URL_LARAVEL + "aio/login";
        let data = axiosback.convertLaravel(Orgdata, url);
        return axios({
            method: "POST",
            url: url,
            data: data
        }).then(response => {
            return response['data'];

        })
    }, loginGuest() {
        //this.fillUserTv(this.getModelTv())

        let Orgdata = {mac: this.TvData["macID"], old: this.TvData["isOld"], model: this.TvData["year"]};
        let url = ROAST_CONFIG.New_Url_Laravel + "guest";
        // let data = axiosback.convertLaravel(Orgdata,url);
        return axios({
            method: "POST",
            url: url,
            data: Orgdata
        }).then(response => {
            return response['data'];

        })
    }, refreshToken(refreshToken) {

        let Orgdata = {refresh_token: refreshToken};
        let url = ROAST_CONFIG.New_Url_Laravel + "refresh";

        return axios({
            method: "POST",
            url: url,
            data: Orgdata
        }).then(response => {
            return response['data'];

        })
    }, loginPhone(phone, pass) {
        let Orgdata = {mac: this.TvData["macID"], mobile: phone, pass: axiosback.createPassword(pass)}

        let url = ROAST_CONFIG.New_Url_Laravel + "login";//pass

        return axios({
            method: "POST",
            url: url,
            data: Orgdata
        }).then(response => {
            return response;
        })
    }, forgetPass(phone) {

        let Orgdata = {mobile: phone};
        let url = ROAST_CONFIG.New_Url_Laravel + "forgetpass";//Fpass

        return axios({
            method: "POST",
            url: url,
            data: Orgdata
        }).then(response => {
            return response["data"];

        })
    }, registerPhone(phone) {

        let Orgdata = {mobile: phone};
        let url = ROAST_CONFIG.New_Url_Laravel + "code";//phone

        return axios({
            method: "POST",
            url: url,
            data: Orgdata
        }).then(response => {
            return response['data'];
        })
    }, changepass(token, vrcode, phone) {
        let Orgdata = {key: token, mobile: phone, code: vrcode};
        let url = ROAST_CONFIG.New_Url_Laravel + "changepass"//CHpass";

        return axios({
            method: "POST",
            url: url,
            data: Orgdata
        }).then(response => {
            return response;

        })
    }, registerFinal(token, vrcode, phone) {
        //console.log(store.getters.getTvDetail);
        let Orgdata = '';

        Orgdata = {
            mac: this.TvData["macID"],
            old: this.TvData["isOld"],
            model: this.TvData["year"],
            key: token,
            code: vrcode,
            mobile: phone
        };

        let url = ROAST_CONFIG.New_Url_Laravel + "signup";
        //let data = axiosback.convertLaravel(Orgdata,url);
        return axios({
            method: "POST",
            url: url,
            data: Orgdata
        }).then(response => {
            return response;

        })
    }, GetProfile() {


        let url = ROAST_CONFIG.New_Url_Laravel + "profile";
        //let data = axiosback.convertLaravel(Orgdata,url);
        return axios({
            method: "POST",
            url: url,
            headers: {'Accept': 'application/json', 'Authorization': "Bearer " + store.getters.access_token}

        }).then(response => {
            return response['data'];

        })
    },


}

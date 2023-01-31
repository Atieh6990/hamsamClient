import {ROAST_CONFIG} from '../config';
import axiosback from './ajax'
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

    totalbadges(url, id, type) {
        let Url = url
        let Orgdata = {'user_id': id, 'type': type}
        return axios({
            method: "POST",
            url: Url,
            data: Orgdata,
        }).then(response => {
            let data = response['data'];
            return data
        }).catch(response => {

        });
    },

    badges(url) {
        let Url = url

        return axios({
            method: "POST",
            url: Url,
        }).then(response => {
            let data = response['data'];
            return data
        }).catch(response => {

        });
    },
    friends(userID) {
        let Orgdata = {data: '{"userID":"' + userID + '","status":"1"}'};
        let Url = ROAST_CONFIG.URL_Oldssn + "?act=friend&type=get&tk=";
        let data = axiosback.convertOldSsn(Orgdata, Url);

        return axios({
            method: "POST",
            url: Url,
            data: data,

        }).then(response => {
            let data = response['data'];
            //console.log(JSON.stringify(data))
            return data

        }).catch(response => {

        });
    },

    favoriteList(id) {
        let Url = ROAST_CONFIG.URL_Newssn + "favorites/list";
        let Orgdata = "id=" + id;
        return axios({
            method: "POST",
            url: Url,
            data: Orgdata
        }).then(response => {
            let data = response['data'];
            return data

        }).catch(response => {

        });
    },
    favoriteSave(id) {
        let Url = ROAST_CONFIG.URL_Newssn + "favorites/save";
        let Orgdata = "id=" + id;
        return axios({
            method: "POST",
            url: Url,
            data: Orgdata

        }).then(response => {
            let data = response['data'];
            return data

        }).catch(response => {

        });
    },

    friendsList() {
        let url = ROAST_CONFIG.URL_Newssn + "friend/list";
        let data = {type: 1};
        return axios({
            method: 'post',
            url: url,
            data: data
        })
            .then(response => {
                return response.data.data;
            })
    },

    favouritesList() {
        let url = ROAST_CONFIG.URL_Newssn + "favorites/list";
        return axios({
            method: 'post',
            url: url,
        })
            .then(response => {
                var list = response.data.data.list;
                var favs = [];
                for (var i = 18; i <= 24; i++) {
                    // if (list[i].is_active === "1") {
                    favs.push(list[i]);
                    // }
                }
                return favs;
            })
    },


    profileView(userid) {
        let Url = ROAST_CONFIG.URL_Newssn + "profile/view";
        let Orgdata = "id=" + userid;
        return axios({
            method: "POST",
            url: Url,
            data: Orgdata
        }).then(response => {
            let data = response['data'];
            return data
        }).catch(response => {

        });
    },

    profileSave(send) {

        let Url = ROAST_CONFIG.URL_Newssn + "profile/save";
        let Orgdata = send;
        return axios({
            method: "POST",
            url: Url,
            data: Orgdata
        }).then(response => {
            let data = response['data'];
            return data
        }).catch(response => {

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
    }

}

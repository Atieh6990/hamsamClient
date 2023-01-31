import {ROAST_CONFIG} from '../config';
import axios from 'axios';
import axiosback from "./ajax";

axios.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    return Promise.reject(error);
});
export default {
    rules() {

        let Url = ROAST_CONFIG.URL_Newssn + 'rules';
        return axios({
            method: "POST",
            url: Url,
        }).then(response => {
            let data = response['data'];
            return data;

        });
    },
}
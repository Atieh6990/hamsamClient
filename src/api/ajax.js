import axios from "axios/index";

let cntReq54 = 1;
let cntReq = 1;
import md5 from '../js/md5'
import func from '../mixins/func'
import store from '../store/index'

/*axios.interceptors.response.use(function (response) {

    // alert(response.status);
    return response;
}, function (error) {
    // Do something with response error
    if (error.response.status == 401) {

        app1.$router.push({path: '/seven/' + new Date().getTime()});

        // return axios.request(error.config);
    }
    return Promise.reject(error);
});*/
export default {

    convertLaravel(sendData, link) {
        //sendData=JSON.stringify(sendData);
        //console.log('data->' + JSON.stringify(sendData));
        //sendData=sendData.toString();
        //console.log('data string->' + (sendData));
        var last10 = link.substr(link.length - 10);
        var originalData = (sendData);
        var act = this.getParameterByName('act', link);
        var typeParam = this.getParameterByName('type', link);
        var hashUser = 1;
        var hashAll = 1;
        //console.log('last100>' + last10);
        if ((last10 == 'api/signup') || (last10 == 'c/api/pass') || (last10 == '/api/Fpass') || (last10 == 'api/CHpass') || (last10 == '/api/guest') || (last10 == '/aio/login') || (last10 == '/api/phone') || (last10 == 'api/verify')) {
            hashUser = 0;

        }
        var timeNow = $.now();
        var sendParams = {
            "agent": timeNow,
            "cnt": cntReq54++
        };
        //console.log(JSON.stringify("send dataaa=>" + JSON.stringify(sendData)));
        var exSendData = $.extend(sendData, sendParams);
        //  console.log(JSON.stringify("exSendData dataaa=>" + JSON.stringify(exSendData)));
        var md5First = this.encryptReqLaravel(((timeNow).toString()) + JSON.stringify(exSendData), 'khepelkhan24');
        // console.log("md5First->" + md5First);
        var base64First = this.b64EncodeUnicode(md5First + ((timeNow).toString()));
        //console.log("base64First->" + base64First);
        var md5Second = this.encryptReqLaravel(base64First, ((timeNow).toString()) + 'kharzahre');
        // console.log("md5Second->" + md5Second);
        var base54Second = this.b64EncodeUnicode(md5Second + md5First);
        //console.log("base54Second->" + base54Second);
        var md5Request = this.encryptReqLaravel(base54Second, 'zargar');
        // console.log("md5Request ghable hashe user->" + md5Request);
        if (hashUser == 1) {
            var pvkey = func.methods.getParam('pfK');
            //console.log("pvkey->" + pvkey);
            var userID = func.methods.getParam('ufK');
            //console.log("userID ->" + userID);
            var base64UserFirst = this.b64EncodeUnicode(userID + pvkey);
            //console.log("base64UserFirst->" + base64UserFirst);
            var md5UserFirst = this.encryptReqLaravel(base64UserFirst, "pepezidkhepel");
            //console.log("md5UserFirst->" + md5UserFirst);
            var base64user2 = this.b64EncodeUnicode(md5UserFirst + userID);
            //console.log("base64user2->" + base64user2);
            var md5Key = this.encryptReqLaravel(pvkey, "virgool2");
            //console.log("md5Key->" + md5Key);
            var base64Final = this.encryptReqLaravel(base64user2 + md5Key);
            //console.log("base64Final->" + base64Final);
            var md5User = this.encryptReqLaravel(base64Final, base64UserFirst + "siah");
            //console.log("md5User->" + md5User);
            var editedHash = this.encryptReqLaravel(this.b64EncodeUnicode(md5User + md5Request));
            //console.log("editedHash->" + editedHash);
            md5Request = editedHash;
        }
        // console.log("send data org11111111111->" + JSON.stringify(secondSend));
        if (hashAll == 0) {
            exSendData = $.extend(originalData, sendParams);
            // console.log("send data org->" + JSON.stringify(secondSend));
            // console.log("extended send data after change->" + JSON.stringify(exSendData));
        }
        var obj = {'hdata': exSendData, 'hash': md5Request};
        //console.log("final send data--->" + JSON.stringify(obj));
        // sendData = "datas=" + JSON.stringify(obj);
        // sendData = "datas=" + btoa(encodeURIComponent(JSON.stringify(obj)));
        var base64String = btoa(btoa("RI56kMA" + btoa(encodeURIComponent(JSON.stringify(obj)))) + "EPELX23KHAT=");
        //console.log("base64 data before replace->" + base64String);
        base64String = base64String.replace(/F/g, "*");
        base64String = base64String.replace(/O/g, ":");
        // base64String = base64String.replaceAll("O", ":");
        //console.log("base64 data after replace->" + base64String);
        let sendDataFinal = "datas=" + base64String;
        return sendDataFinal;
    }, convertOldSsn(sendData, link) {

        var originalData = sendData;
        var actRequest = this.getParameterByName('act', link);
        var typeRequest = this.getParameterByName('type', link);
        var act = this.getParameterByName('act', link);
        var hashUser = 1;
        var hashAll = 1;

        if (act == 'signup' || ((act == 'news') && (typeRequest == 'get')) || (act == 'guide') || (act == 'userRank') || ((act == 'comment') && (typeRequest == 'get')) || ((act == 'chat') && (typeRequest == 'groupS')) || ((act == 'chat') && (typeRequest == 'sticker')) || (act == 'rate') || (act == 'appDetail') || (act == 'qr')) {
            hashUser = 0;
        }
        var timeNow = $.now();
        var sendParams = {
            "agent": timeNow,
            "cnt": cntReq++
        };
        var exSendData = $.extend(sendData, sendParams);
        //console.log("sendData bade extend parse int---->" + JSON.stringify(exSendData));
        var base64fist = this.encryptReq(((timeNow).toString()) + JSON.stringify(exSendData), 'ocihc');
        // console.log("base64fist->" + base64fist);
        var md5fist = this.encryptReq(base64fist, 'ocihc');
        // console.log("md5first->" + md5fist);
        var base64second = this.b64EncodeUnicode(((timeNow).toString()) + ((md5fist).toString()));
        // mylog.log("base64second->" + base64second);
        var md5Second = this.encryptReq(base64second, timeNow);
        // console.log("md5Second->" + md5Second);
        if (hashUser == 1) {
            // console.log('fffffffffffffffffffffffffff');
            let key = this.b64DecodeUnicode(this.b64DecodeUnicode(store.getters.getUser['pv']));
            var base64User = this.b64EncodeUnicode(((key).toString()) + ((md5Second).toString()));
            var md5User = this.encryptReq(base64User, key);
            md5Second = md5User;
            //console.log('77777777777777');
        }
        //  console.log("send data org11111111111->" + JSON.stringify(secondSend));
        if (hashAll == 0) {
            exSendData = $.extend(originalData, sendParams);
        }
        var obj = {'hdata': exSendData, 'hash': md5Second};
        //console.log("final send data--->" + JSON.stringify(obj));
        // sendData = "datas=" + JSON.stringify(obj);
        // sendData = "datas=" + btoa(encodeURIComponent(JSON.stringify(obj)));
        var base64String = btoa(btoa("RI56kMA" + btoa(encodeURIComponent(JSON.stringify(obj)))) + "EPELX23KHAT=");
        // console.log("base64 data before replace->" + base64String);
        base64String = base64String.replace(/F/g, "*");
        base64String = base64String.replace(/O/g, ":");
        // console.log("base64 data after replace->" + base64String);
        sendData = "datas=" + base64String;
        //console.log('sendData--->'+sendData);
        return sendData;

    },
    getParameterByName(name, url) {
        if (!url) {
            url = window.location.href;
        }
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results)
            return null;
        if (!results[2])
            return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }, encryptReqLaravel(str, key) {
        return md5(md5(str, key));
    }, b64EncodeUnicode(str) {
        return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (match, p1) {
            return String.fromCharCode('0x' + p1);
        }))
    }, b64DecodeUnicode(str) {
        return decodeURIComponent(Array.prototype.map.call(atob(str), function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''))
    }, encryptReq(str, key) {
        return md5(md5(str, key + 'abc'));
    }, createPassword(pass) {
//alert(pass)
        var passOne = md5(pass + pass);
        var md5pass = md5(md5((passOne + passOne), 'kherkhookh24'));
        var finalPass = md5((md5pass), 'dmpn245f1')
        //alert(finalPass)
       return finalPass;
    }


}

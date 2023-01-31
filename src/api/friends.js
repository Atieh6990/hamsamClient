import {ROAST_CONFIG} from '../config';
import axios from 'axios';
import axiosback from "./ajax";

axios.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  return Promise.reject(error);
});


export default {
  pending(url) {
    let Url = url;
    return axios({
      method: "POST",
      url: Url,
    }).then(response => {
      let data = response['data'];
      return data;

    });
  },
  friends(url, type) {

    let Orgdata = "type=" + type;
    let Url = url;
    return axios({
      method: "POST",
      url: Url,
      data: Orgdata
    }).then(response => {
      let data = response['data'];
      return data;

    });
  },

  unfriend(friendID) {
    let Orgdata = "user_id=" + friendID;
    let Url = ROAST_CONFIG.URL_Newssn + "friend/unfriend";
    return axios({
      method: "POST",
      url: Url,
      data: Orgdata
    }).then(response => {
      let data = response['data'];
      return data;

    })

  },
  answer(friendID, type) {
    let Orgdata = "user_id=" + friendID + "&type=" + type;
    let Url = ROAST_CONFIG.URL_Newssn + "friend/answer";
    return axios({
      method: "POST",
      url: Url,
      data: Orgdata
    }).then(response => {
      let data = response['data'];
      return data;

    })
  },


  filterSearch(url, string, gender, age, pic) {
    let Orgdata = {};

    if (string != '') {

      Orgdata['str'] = string;

    }
    if (gender != '') {

      Orgdata['gender'] = gender;

    }
    if (age != '') {

      Orgdata['age'] = age;

    }
    if (pic != '') {

      Orgdata['pic'] = pic;


    }
    let Url = ROAST_CONFIG.URL_Newssn + "search";
    return axios({
      method: "POST",
      url: url,
      data: Orgdata
    }).then(response => {
      let data = response['data'];
      return data;

    })


  },
  requestToFri(friendID) {
    // alert(friendID)
    let Orgdata = "user_id=" + friendID;
    let Url = ROAST_CONFIG.URL_Newssn + "friend/request";
    return axios({
      method: "POST",
      url: Url,
      data: Orgdata
    }).then(response => {
      let data = response['data'];
      return data;

    })
  },

     cancelPending(id) {
    return axios({
      method: 'post',
      url: ROAST_CONFIG.URL_Newssn + 'friend/request/delete',
      data: {user_id: id}
    })
      .then(data => {
        return data.data;
      })
  },


  /**************************************************** OLD *******************************************/

  getstate() {
    var hhh = {
      "data": {
        "states": [
          {
            "id": 1,
            "name": "آذربايجان شرقي",
            "parent": 0
          },
          {
            "id": 2,
            "name": "آذربايجان غربي",
            "parent": 0
          },
          {
            "id": 3,
            "name": "اردبيل",
            "parent": 0
          },
          {
            "id": 4,
            "name": "اصفهان",
            "parent": 0
          },
          {
            "id": 5,
            "name": "ايلام",
            "parent": 0
          },
          {
            "id": 6,
            "name": "بوشهر",
            "parent": 0
          },
          {
            "id": 7,
            "name": "تهران",
            "parent": 0
          },
          {
            "id": 8,
            "name": "چهارمحال و بختياري",
            "parent": 0
          },
          {
            "id": 9,
            "name": "خراسان جنوبي",
            "parent": 0
          },
          {
            "id": 10,
            "name": "خراسان رضوي",
            "parent": 0
          },
          {
            "id": 11,
            "name": "خراسان شمالي",
            "parent": 0
          },
          {
            "id": 12,
            "name": "خوزستان",
            "parent": 0
          },
          {
            "id": 13,
            "name": "زنجان",
            "parent": 0
          },
          {
            "id": 14,
            "name": "سمنان",
            "parent": 0
          },
          {
            "id": 15,
            "name": "سيستان و بلوچستان",
            "parent": 0
          },
          {
            "id": 16,
            "name": "فارس",
            "parent": 0
          },
          {
            "id": 17,
            "name": "قزوين",
            "parent": 0
          },
          {
            "id": 18,
            "name": "قم",
            "parent": 0
          },
          {
            "id": 19,
            "name": "كردستان",
            "parent": 0
          },
          {
            "id": 20,
            "name": "كرمان",
            "parent": 0
          },
          {
            "id": 21,
            "name": "كرمانشاه",
            "parent": 0
          },
          {
            "id": 22,
            "name": "كهكيلويه و بويراحمد",
            "parent": 0
          },
          {
            "id": 23,
            "name": "گلستان",
            "parent": 0
          },
          {
            "id": 24,
            "name": "گيلان",
            "parent": 0
          },
          {
            "id": 25,
            "name": "لرستان",
            "parent": 0
          },
          {
            "id": 26,
            "name": "مازندران",
            "parent": 0
          },
          {
            "id": 27,
            "name": "مركزي",
            "parent": 0
          },
          {
            "id": 28,
            "name": "هرمزگان",
            "parent": 0
          },
          {
            "id": 29,
            "name": "همدان",
            "parent": 0
          },
          {
            "id": 30,
            "name": "يزد",
            "parent": 0
          },
          {
            "id": 504,
            "name": "البرز",
            "parent": 0
          }
        ],
        "cities": [
          {
            "id": 31,
            "name": "اردبيل",
            "parent": 3
          },
          {
            "id": 32,
            "name": "ارشق",
            "parent": 3
          },
          {
            "id": 33,
            "name": "انگوت",
            "parent": 3
          },
          {
            "id": 34,
            "name": "بيله سوار",
            "parent": 3
          },
          {
            "id": 35,
            "name": "پارس آباد",
            "parent": 3
          },
          {
            "id": 36,
            "name": "خلخال",
            "parent": 3
          },
          {
            "id": 37,
            "name": "سرعين",
            "parent": 3
          },
          {
            "id": 38,
            "name": "قشلاق دشت",
            "parent": 3
          },
          {
            "id": 39,
            "name": "كوثر",
            "parent": 3
          },
          {
            "id": 40,
            "name": "گرمي",
            "parent": 3
          },
          {
            "id": 41,
            "name": "مشكين شهر",
            "parent": 3
          },
          {
            "id": 42,
            "name": "مغان",
            "parent": 3
          },
          {
            "id": 43,
            "name": "نمين",
            "parent": 3
          },
          {
            "id": 44,
            "name": "نير",
            "parent": 3
          },
          {
            "id": 45,
            "name": "هير",
            "parent": 3
          },
          {
            "id": 46,
            "name": "اردستان",
            "parent": 4
          },
          {
            "id": 47,
            "name": "اصفهان",
            "parent": 4
          },
          {
            "id": 48,
            "name": "آران و بيدگل",
            "parent": 4
          },
          {
            "id": 49,
            "name": "باغ بهادران",
            "parent": 4
          },
          {
            "id": 50,
            "name": "تيران",
            "parent": 4
          },
          {
            "id": 51,
            "name": "تيران و كرون",
            "parent": 4
          },
          {
            "id": 52,
            "name": "چادگان",
            "parent": 4
          },
          {
            "id": 53,
            "name": "خميني شهر",
            "parent": 4
          },
          {
            "id": 54,
            "name": "خوانسار",
            "parent": 4
          },
          {
            "id": 55,
            "name": "خور و بيابانك",
            "parent": 4
          },
          {
            "id": 56,
            "name": "خوراسگان",
            "parent": 4
          },
          {
            "id": 57,
            "name": "دولت آباد",
            "parent": 4
          },
          {
            "id": 58,
            "name": "زرين شهر",
            "parent": 4
          },
          {
            "id": 59,
            "name": "سميرم",
            "parent": 4
          },
          {
            "id": 60,
            "name": "شاهين شهر",
            "parent": 4
          },
          {
            "id": 61,
            "name": "شهرضا",
            "parent": 4
          },
          {
            "id": 62,
            "name": "فريدن",
            "parent": 4
          },
          {
            "id": 63,
            "name": "فريدونشهر",
            "parent": 4
          },
          {
            "id": 64,
            "name": "فلاورجان",
            "parent": 4
          },
          {
            "id": 65,
            "name": "كاشان",
            "parent": 4
          },
          {
            "id": 66,
            "name": "كوهپايه",
            "parent": 4
          },
          {
            "id": 67,
            "name": "گلپايگان",
            "parent": 4
          },
          {
            "id": 68,
            "name": "مباركه",
            "parent": 4
          },
          {
            "id": 69,
            "name": "ميمه",
            "parent": 4
          },
          {
            "id": 70,
            "name": "نائين",
            "parent": 4
          },
          {
            "id": 71,
            "name": "نجف آباد",
            "parent": 4
          },
          {
            "id": 72,
            "name": "نطنز",
            "parent": 4
          },
          {
            "id": 73,
            "name": "ارگوازي ملكشاهي",
            "parent": 5
          },
          {
            "id": 74,
            "name": "ايلام",
            "parent": 5
          },
          {
            "id": 75,
            "name": "ايوان",
            "parent": 5
          },
          {
            "id": 76,
            "name": "آبدانان",
            "parent": 5
          },
          {
            "id": 77,
            "name": "دره شهر",
            "parent": 5
          },
          {
            "id": 78,
            "name": "دهلران",
            "parent": 5
          },
          {
            "id": 79,
            "name": "شيروان و چرداول",
            "parent": 5
          },
          {
            "id": 80,
            "name": "مهران",
            "parent": 5
          },
          {
            "id": 81,
            "name": "اسكو",
            "parent": 1
          },
          {
            "id": 82,
            "name": "اهر",
            "parent": 1
          },
          {
            "id": 83,
            "name": "آذرشهر",
            "parent": 1
          },
          {
            "id": 84,
            "name": "بستان آباد",
            "parent": 1
          },
          {
            "id": 85,
            "name": "بناب",
            "parent": 1
          },
          {
            "id": 86,
            "name": "تبريز",
            "parent": 1
          },
          {
            "id": 87,
            "name": "جلفا",
            "parent": 1
          },
          {
            "id": 88,
            "name": "چالدران",
            "parent": 1
          },
          {
            "id": 89,
            "name": "خداآفرين",
            "parent": 1
          },
          {
            "id": 90,
            "name": "خسروشهر",
            "parent": 1
          },
          {
            "id": 91,
            "name": "سراب",
            "parent": 1
          },
          {
            "id": 92,
            "name": "شبستر",
            "parent": 1
          },
          {
            "id": 93,
            "name": "عجب شير",
            "parent": 1
          },
          {
            "id": 94,
            "name": "كليبر",
            "parent": 1
          },
          {
            "id": 95,
            "name": "",
            "parent": 1
          },
          {
            "id": 96,
            "name": "مرند",
            "parent": 1
          },
          {
            "id": 97,
            "name": "ملكان",
            "parent": 1
          },
          {
            "id": 98,
            "name": "مهربان",
            "parent": 1
          },
          {
            "id": 99,
            "name": "ميانه",
            "parent": 1
          },
          {
            "id": 100,
            "name": "ورزقان",
            "parent": 1
          },
          {
            "id": 101,
            "name": "هادي شهر",
            "parent": 1
          },
          {
            "id": 102,
            "name": "هريس",
            "parent": 1
          },
          {
            "id": 103,
            "name": "هشترود",
            "parent": 1
          },
          {
            "id": 104,
            "name": "اروميه",
            "parent": 2
          },
          {
            "id": 105,
            "name": "اشنويه",
            "parent": 2
          },
          {
            "id": 106,
            "name": "انزل",
            "parent": 2
          },
          {
            "id": 107,
            "name": "بوكان",
            "parent": 2
          },
          {
            "id": 108,
            "name": "پلدشت",
            "parent": 2
          },
          {
            "id": 109,
            "name": "پيرانشهر",
            "parent": 2
          },
          {
            "id": 110,
            "name": "تكاب",
            "parent": 2
          },
          {
            "id": 111,
            "name": "خوي",
            "parent": 2
          },
          {
            "id": 112,
            "name": "رحمت آباد",
            "parent": 2
          },
          {
            "id": 113,
            "name": "سردشت",
            "parent": 2
          },
          {
            "id": 114,
            "name": "سلماس",
            "parent": 2
          },
          {
            "id": 115,
            "name": "سيه چشمه",
            "parent": 2
          },
          {
            "id": 116,
            "name": "شاهين دژ",
            "parent": 2
          },
          {
            "id": 117,
            "name": "شوط",
            "parent": 2
          },
          {
            "id": 118,
            "name": "قره ضياءالدين",
            "parent": 2
          },
          {
            "id": 119,
            "name": "قزل",
            "parent": 2
          },
          {
            "id": 120,
            "name": "كشاورز",
            "parent": 2
          },
          {
            "id": 121,
            "name": "ماكو",
            "parent": 2
          },
          {
            "id": 122,
            "name": "مهاباد",
            "parent": 2
          },
          {
            "id": 123,
            "name": "مياندوآب",
            "parent": 2
          },
          {
            "id": 124,
            "name": "نازلو",
            "parent": 2
          },
          {
            "id": 125,
            "name": "نقده",
            "parent": 2
          },
          {
            "id": 126,
            "name": "نوشين شهر",
            "parent": 2
          },
          {
            "id": 127,
            "name": "برازجان",
            "parent": 6
          },
          {
            "id": 128,
            "name": "بوشهر",
            "parent": 6
          },
          {
            "id": 129,
            "name": "تنگستان",
            "parent": 6
          },
          {
            "id": 130,
            "name": "جم",
            "parent": 6
          },
          {
            "id": 131,
            "name": "دشتستان",
            "parent": 6
          },
          {
            "id": 132,
            "name": "دشتي",
            "parent": 6
          },
          {
            "id": 133,
            "name": "دير",
            "parent": 6
          },
          {
            "id": 134,
            "name": "ديلم",
            "parent": 6
          },
          {
            "id": 135,
            "name": "ريگ",
            "parent": 6
          },
          {
            "id": 136,
            "name": "سعدآباد",
            "parent": 6
          },
          {
            "id": 137,
            "name": "كنگان",
            "parent": 6
          },
          {
            "id": 138,
            "name": "گاوبندي",
            "parent": 6
          },
          {
            "id": 139,
            "name": "گناوه",
            "parent": 6
          },
          {
            "id": 140,
            "name": "اسلامشهر",
            "parent": 7
          },
          {
            "id": 141,
            "name": "اشتهارد",
            "parent": 504
          },
          {
            "id": 142,
            "name": "بوستان",
            "parent": 7
          },
          {
            "id": 143,
            "name": "پاكدشت",
            "parent": 7
          },
          {
            "id": 144,
            "name": "پيشوا",
            "parent": 7
          },
          {
            "id": 145,
            "name": "تهران",
            "parent": 7
          },
          {
            "id": 146,
            "name": "حسن آباد",
            "parent": 7
          },
          {
            "id": 147,
            "name": "دماوند",
            "parent": 7
          },
          {
            "id": 148,
            "name": "رباط كريم",
            "parent": 7
          },
          {
            "id": 149,
            "name": "رودهن",
            "parent": 7
          },
          {
            "id": 150,
            "name": "ساوجبلاغ",
            "parent": 7
          },
          {
            "id": 151,
            "name": "شهرري",
            "parent": 7
          },
          {
            "id": 152,
            "name": "شهريار",
            "parent": 7
          },
          {
            "id": 153,
            "name": "طالقان",
            "parent": 504
          },
          {
            "id": 154,
            "name": "فيروزكوه",
            "parent": 7
          },
          {
            "id": 155,
            "name": "قدس",
            "parent": 7
          },
          {
            "id": 156,
            "name": "قرچك",
            "parent": 7
          },
          {
            "id": 157,
            "name": "كرج",
            "parent": 504
          },
          {
            "id": 158,
            "name": "كهريزك",
            "parent": 7
          },
          {
            "id": 159,
            "name": "گلستان",
            "parent": 7
          },
          {
            "id": 160,
            "name": "لواسانات",
            "parent": 7
          },
          {
            "id": 161,
            "name": "مارليك",
            "parent": 7
          },
          {
            "id": 162,
            "name": "ملارد",
            "parent": 7
          },
          {
            "id": 163,
            "name": "نظرآباد",
            "parent": 504
          },
          {
            "id": 164,
            "name": "ورامين",
            "parent": 7
          },
          {
            "id": 165,
            "name": "هشتگرد",
            "parent": 504
          },
          {
            "id": 166,
            "name": "اردل",
            "parent": 8
          },
          {
            "id": 167,
            "name": "بروجن",
            "parent": 8
          },
          {
            "id": 168,
            "name": "سامان",
            "parent": 8
          },
          {
            "id": 169,
            "name": "شهركرد",
            "parent": 8
          },
          {
            "id": 170,
            "name": "فارسان",
            "parent": 8
          },
          {
            "id": 171,
            "name": "فلارد",
            "parent": 8
          },
          {
            "id": 172,
            "name": "كوهرنگ",
            "parent": 8
          },
          {
            "id": 173,
            "name": "كيار",
            "parent": 8
          },
          {
            "id": 174,
            "name": "گندمان",
            "parent": 8
          },
          {
            "id": 175,
            "name": "لردگان",
            "parent": 8
          },
          {
            "id": 176,
            "name": "بيرجند",
            "parent": 9
          },
          {
            "id": 177,
            "name": "خوسف",
            "parent": 9
          },
          {
            "id": 178,
            "name": "درميان",
            "parent": 9
          },
          {
            "id": 179,
            "name": "زهان",
            "parent": 9
          },
          {
            "id": 180,
            "name": "زيركوه",
            "parent": 9
          },
          {
            "id": 181,
            "name": "سده",
            "parent": 9
          },
          {
            "id": 182,
            "name": "سرايان",
            "parent": 9
          },
          {
            "id": 183,
            "name": "سربيشه",
            "parent": 9
          },
          {
            "id": 184,
            "name": "قائن",
            "parent": 9
          },
          {
            "id": 185,
            "name": "قائنات",
            "parent": 9
          },
          {
            "id": 186,
            "name": "نهبندان",
            "parent": 9
          },
          {
            "id": 187,
            "name": "نيمبلوك",
            "parent": 9
          },
          {
            "id": 188,
            "name": "باخزر",
            "parent": 10
          },
          {
            "id": 189,
            "name": "بردسکن",
            "parent": 10
          },
          {
            "id": 190,
            "name": "تايباد",
            "parent": 10
          },
          {
            "id": 191,
            "name": "تربت جام",
            "parent": 10
          },
          {
            "id": 192,
            "name": "تربت حيدريه",
            "parent": 10
          },
          {
            "id": 193,
            "name": "جغتاي",
            "parent": 10
          },
          {
            "id": 194,
            "name": "جوين",
            "parent": 10
          },
          {
            "id": 195,
            "name": "چناران",
            "parent": 10
          },
          {
            "id": 196,
            "name": "خضري",
            "parent": 10
          },
          {
            "id": 197,
            "name": "خليل آباد",
            "parent": 10
          },
          {
            "id": 198,
            "name": "خواف",
            "parent": 10
          },
          {
            "id": 199,
            "name": "خوشاب",
            "parent": 10
          },
          {
            "id": 200,
            "name": "درگز",
            "parent": 10
          },
          {
            "id": 201,
            "name": "رشتخوار",
            "parent": 10
          },
          {
            "id": 202,
            "name": "زبرخان",
            "parent": 10
          },
          {
            "id": 203,
            "name": "سبزوار",
            "parent": 10
          },
          {
            "id": 204,
            "name": "سرخس",
            "parent": 10
          },
          {
            "id": 205,
            "name": "سرولايت",
            "parent": 10
          },
          {
            "id": 206,
            "name": "ششتمد",
            "parent": 10
          },
          {
            "id": 207,
            "name": "صالح آباد",
            "parent": 10
          },
          {
            "id": 208,
            "name": "طرقبه",
            "parent": 10
          },
          {
            "id": 209,
            "name": "فردوس",
            "parent": 10
          },
          {
            "id": 210,
            "name": "فريمان",
            "parent": 10
          },
          {
            "id": 211,
            "name": "فيض آباد",
            "parent": 10
          },
          {
            "id": 212,
            "name": "قوچان",
            "parent": 10
          },
          {
            "id": 213,
            "name": "كاشمر",
            "parent": 10
          },
          {
            "id": 214,
            "name": "كلات",
            "parent": 10
          },
          {
            "id": 215,
            "name": "كوهسرخ",
            "parent": 10
          },
          {
            "id": 216,
            "name": "گناباد",
            "parent": 10
          },
          {
            "id": 217,
            "name": "مشهد",
            "parent": 10
          },
          {
            "id": 218,
            "name": "نيشابور",
            "parent": 10
          },
          {
            "id": 219,
            "name": "اسفراين",
            "parent": 11
          },
          {
            "id": 220,
            "name": "آشخانه",
            "parent": 11
          },
          {
            "id": 221,
            "name": "بجنورد",
            "parent": 11
          },
          {
            "id": 222,
            "name": "جاجرم",
            "parent": 11
          },
          {
            "id": 223,
            "name": "رازوجركلان",
            "parent": 11
          },
          {
            "id": 224,
            "name": "شيروان",
            "parent": 11
          },
          {
            "id": 225,
            "name": "فاروج",
            "parent": 11
          },
          {
            "id": 226,
            "name": "مانه و سملقان",
            "parent": 11
          },
          {
            "id": 227,
            "name": "نادري",
            "parent": 11
          },
          {
            "id": 228,
            "name": "اميديه",
            "parent": 12
          },
          {
            "id": 229,
            "name": "انديكا",
            "parent": 12
          },
          {
            "id": 230,
            "name": "انديمشك",
            "parent": 12
          },
          {
            "id": 231,
            "name": "اهواز",
            "parent": 12
          },
          {
            "id": 232,
            "name": "ايذه",
            "parent": 12
          },
          {
            "id": 233,
            "name": "آبادان",
            "parent": 12
          },
          {
            "id": 234,
            "name": "آغاجاري",
            "parent": 12
          },
          {
            "id": 235,
            "name": "باغملك",
            "parent": 12
          },
          {
            "id": 236,
            "name": "بندرماهشهر",
            "parent": 12
          },
          {
            "id": 237,
            "name": "بهبهان",
            "parent": 12
          },
          {
            "id": 238,
            "name": "خرمشهر",
            "parent": 12
          },
          {
            "id": 239,
            "name": "دزفول",
            "parent": 12
          },
          {
            "id": 240,
            "name": "دشت آزادگان",
            "parent": 12
          },
          {
            "id": 241,
            "name": "رامشير",
            "parent": 12
          },
          {
            "id": 242,
            "name": "رامهرمز",
            "parent": 12
          },
          {
            "id": 243,
            "name": "سوسنگرد",
            "parent": 12
          },
          {
            "id": 244,
            "name": "شادگان",
            "parent": 12
          },
          {
            "id": 245,
            "name": "شوش",
            "parent": 12
          },
          {
            "id": 246,
            "name": "شوشتر",
            "parent": 12
          },
          {
            "id": 247,
            "name": "گتوند",
            "parent": 12
          },
          {
            "id": 248,
            "name": "مسجدسليمان",
            "parent": 12
          },
          {
            "id": 249,
            "name": "ملاثاني",
            "parent": 12
          },
          {
            "id": 250,
            "name": "هنديجان",
            "parent": 12
          },
          {
            "id": 251,
            "name": "ابهر",
            "parent": 13
          },
          {
            "id": 252,
            "name": "ايجرود",
            "parent": 13
          },
          {
            "id": 253,
            "name": "بزينه رود",
            "parent": 13
          },
          {
            "id": 254,
            "name": "خدابنده",
            "parent": 13
          },
          {
            "id": 255,
            "name": "خرمدره",
            "parent": 13
          },
          {
            "id": 256,
            "name": "زنجان",
            "parent": 13
          },
          {
            "id": 257,
            "name": "سجاس",
            "parent": 13
          },
          {
            "id": 258,
            "name": "سلطانيه",
            "parent": 13
          },
          {
            "id": 259,
            "name": "طارم",
            "parent": 13
          },
          {
            "id": 260,
            "name": "قيدار",
            "parent": 13
          },
          {
            "id": 261,
            "name": "گرماب",
            "parent": 13
          },
          {
            "id": 262,
            "name": "ماهنشان",
            "parent": 13
          },
          {
            "id": 263,
            "name": "ايوانكي",
            "parent": 14
          },
          {
            "id": 264,
            "name": "بسطام",
            "parent": 14
          },
          {
            "id": 265,
            "name": "بيارجمند",
            "parent": 14
          },
          {
            "id": 266,
            "name": "دامغان",
            "parent": 14
          },
          {
            "id": 267,
            "name": "سمنان",
            "parent": 14
          },
          {
            "id": 268,
            "name": "شاهرود",
            "parent": 14
          },
          {
            "id": 269,
            "name": "شهميرزاد",
            "parent": 14
          },
          {
            "id": 270,
            "name": "گرمسار",
            "parent": 14
          },
          {
            "id": 271,
            "name": "مهدي شهر",
            "parent": 14
          },
          {
            "id": 272,
            "name": "ميامي",
            "parent": 14
          },
          {
            "id": 273,
            "name": "ايرانشهر",
            "parent": 15
          },
          {
            "id": 274,
            "name": "بزمان",
            "parent": 15
          },
          {
            "id": 275,
            "name": "چابهار",
            "parent": 15
          },
          {
            "id": 276,
            "name": "خاش",
            "parent": 15
          },
          {
            "id": 277,
            "name": "دشتياري",
            "parent": 15
          },
          {
            "id": 278,
            "name": "زابل",
            "parent": 15
          },
          {
            "id": 279,
            "name": "زاهدان",
            "parent": 15
          },
          {
            "id": 280,
            "name": "سراوان",
            "parent": 15
          },
          {
            "id": 281,
            "name": "سرباز",
            "parent": 15
          },
          {
            "id": 282,
            "name": "شهركي و ناروئي",
            "parent": 15
          },
          {
            "id": 283,
            "name": "كنارك",
            "parent": 15
          },
          {
            "id": 284,
            "name": "ميان كنگي",
            "parent": 15
          },
          {
            "id": 285,
            "name": "نيك شهر",
            "parent": 15
          },
          {
            "id": 286,
            "name": "ارسنجان",
            "parent": 16
          },
          {
            "id": 287,
            "name": "استهبان",
            "parent": 16
          },
          {
            "id": 288,
            "name": "اقليد",
            "parent": 16
          },
          {
            "id": 289,
            "name": "آباده",
            "parent": 16
          },
          {
            "id": 290,
            "name": "بوانات",
            "parent": 16
          },
          {
            "id": 291,
            "name": "بيضا",
            "parent": 16
          },
          {
            "id": 292,
            "name": "جهرم",
            "parent": 16
          },
          {
            "id": 293,
            "name": "خرامه",
            "parent": 16
          },
          {
            "id": 294,
            "name": "خرم بيد",
            "parent": 16
          },
          {
            "id": 295,
            "name": "خضر",
            "parent": 16
          },
          {
            "id": 296,
            "name": "خنج",
            "parent": 16
          },
          {
            "id": 297,
            "name": "داراب",
            "parent": 16
          },
          {
            "id": 298,
            "name": "زرقام",
            "parent": 16
          },
          {
            "id": 299,
            "name": "زرين دشت",
            "parent": 16
          },
          {
            "id": 300,
            "name": "سپيدان",
            "parent": 16
          },
          {
            "id": 301,
            "name": "سروستان",
            "parent": 16
          },
          {
            "id": 302,
            "name": "سعادت شهر",
            "parent": 16
          },
          {
            "id": 303,
            "name": "شيراز",
            "parent": 16
          },
          {
            "id": 304,
            "name": "صفاشهر",
            "parent": 16
          },
          {
            "id": 305,
            "name": "فراشبند",
            "parent": 16
          },
          {
            "id": 306,
            "name": "فسا",
            "parent": 16
          },
          {
            "id": 307,
            "name": "فيروزآباد",
            "parent": 16
          },
          {
            "id": 308,
            "name": "قيروكارزين",
            "parent": 16
          },
          {
            "id": 309,
            "name": "كازرون",
            "parent": 16
          },
          {
            "id": 310,
            "name": "كربال",
            "parent": 16
          },
          {
            "id": 311,
            "name": "كوار",
            "parent": 16
          },
          {
            "id": 312,
            "name": "لارستان",
            "parent": 16
          },
          {
            "id": 313,
            "name": "لامرد",
            "parent": 16
          },
          {
            "id": 314,
            "name": "مرودشت",
            "parent": 16
          },
          {
            "id": 315,
            "name": "ممسني",
            "parent": 16
          },
          {
            "id": 316,
            "name": "ني ريز",
            "parent": 16
          },
          {
            "id": 317,
            "name": "اسفروردين",
            "parent": 17
          },
          {
            "id": 318,
            "name": "البرز",
            "parent": 17
          },
          {
            "id": 319,
            "name": "الموت",
            "parent": 17
          },
          {
            "id": 320,
            "name": "آبگرم",
            "parent": 17
          },
          {
            "id": 321,
            "name": "آبيك",
            "parent": 17
          },
          {
            "id": 322,
            "name": "آوج",
            "parent": 17
          },
          {
            "id": 323,
            "name": "بوئين زهرا",
            "parent": 17
          },
          {
            "id": 324,
            "name": "تاكستان",
            "parent": 17
          },
          {
            "id": 325,
            "name": "خرمدشت",
            "parent": 17
          },
          {
            "id": 326,
            "name": "رامند",
            "parent": 17
          },
          {
            "id": 327,
            "name": "رودبار شهرستان",
            "parent": 17
          },
          {
            "id": 328,
            "name": "شال",
            "parent": 17
          },
          {
            "id": 329,
            "name": "ضياءآباد",
            "parent": 17
          },
          {
            "id": 330,
            "name": "قزوين",
            "parent": 17
          },
          {
            "id": 331,
            "name": "جعفريه",
            "parent": 18
          },
          {
            "id": 332,
            "name": "خلجستان",
            "parent": 18
          },
          {
            "id": 333,
            "name": "قم",
            "parent": 18
          },
          {
            "id": 334,
            "name": "كهك",
            "parent": 18
          },
          {
            "id": 335,
            "name": "بانه",
            "parent": 19
          },
          {
            "id": 336,
            "name": "بيجار",
            "parent": 19
          },
          {
            "id": 337,
            "name": "حسن آباد",
            "parent": 19
          },
          {
            "id": 338,
            "name": "دهگلان",
            "parent": 19
          },
          {
            "id": 339,
            "name": "ديواندره",
            "parent": 19
          },
          {
            "id": 340,
            "name": "سقز",
            "parent": 19
          },
          {
            "id": 341,
            "name": "سنندج",
            "parent": 19
          },
          {
            "id": 342,
            "name": "قروه",
            "parent": 19
          },
          {
            "id": 343,
            "name": "كامياران",
            "parent": 19
          },
          {
            "id": 344,
            "name": "كراني",
            "parent": 19
          },
          {
            "id": 345,
            "name": "مريوان",
            "parent": 19
          },
          {
            "id": 346,
            "name": "ارزوئيه",
            "parent": 20
          },
          {
            "id": 347,
            "name": "انار",
            "parent": 20
          },
          {
            "id": 348,
            "name": "بافت",
            "parent": 20
          },
          {
            "id": 349,
            "name": "بردسير",
            "parent": 20
          },
          {
            "id": 350,
            "name": "بم",
            "parent": 20
          },
          {
            "id": 351,
            "name": "جيرفت",
            "parent": 20
          },
          {
            "id": 352,
            "name": "رابر",
            "parent": 20
          },
          {
            "id": 353,
            "name": "راور",
            "parent": 20
          },
          {
            "id": 354,
            "name": "رفسنجان",
            "parent": 20
          },
          {
            "id": 355,
            "name": "زرند",
            "parent": 20
          },
          {
            "id": 356,
            "name": "سيرجان",
            "parent": 20
          },
          {
            "id": 357,
            "name": "شهداد",
            "parent": 20
          },
          {
            "id": 358,
            "name": "شهربابك",
            "parent": 20
          },
          {
            "id": 359,
            "name": "عنبرآباد",
            "parent": 20
          },
          {
            "id": 360,
            "name": "فارياب",
            "parent": 20
          },
          {
            "id": 361,
            "name": "قلعه گنج",
            "parent": 20
          },
          {
            "id": 362,
            "name": "كرمان",
            "parent": 20
          },
          {
            "id": 363,
            "name": "كهنوج",
            "parent": 20
          },
          {
            "id": 364,
            "name": "گلبافت",
            "parent": 20
          },
          {
            "id": 365,
            "name": "ماهان",
            "parent": 20
          },
          {
            "id": 366,
            "name": "منوجان",
            "parent": 20
          },
          {
            "id": 367,
            "name": "اسلام آباد",
            "parent": 21
          },
          {
            "id": 368,
            "name": "پاوه",
            "parent": 21
          },
          {
            "id": 369,
            "name": "جوانرود",
            "parent": 21
          },
          {
            "id": 370,
            "name": "روانسر",
            "parent": 21
          },
          {
            "id": 371,
            "name": "سرپل ذهاب",
            "parent": 21
          },
          {
            "id": 372,
            "name": "سنقركليائي",
            "parent": 21
          },
          {
            "id": 373,
            "name": "صحنه",
            "parent": 21
          },
          {
            "id": 374,
            "name": "قصرشيرين",
            "parent": 21
          },
          {
            "id": 375,
            "name": "كرمانشاه",
            "parent": 21
          },
          {
            "id": 376,
            "name": "كرند غرب",
            "parent": 21
          },
          {
            "id": 377,
            "name": "كنگاور",
            "parent": 21
          },
          {
            "id": 378,
            "name": "گيلان غرب",
            "parent": 21
          },
          {
            "id": 379,
            "name": "هرسين",
            "parent": 21
          },
          {
            "id": 380,
            "name": "بهمئي",
            "parent": 22
          },
          {
            "id": 381,
            "name": "دروهان",
            "parent": 22
          },
          {
            "id": 382,
            "name": "دهدشت",
            "parent": 22
          },
          {
            "id": 383,
            "name": "گچساران",
            "parent": 22
          },
          {
            "id": 384,
            "name": "ياسوج",
            "parent": 22
          },
          {
            "id": 385,
            "name": "آزادشهر",
            "parent": 23
          },
          {
            "id": 386,
            "name": "آق قلا",
            "parent": 23
          },
          {
            "id": 387,
            "name": "بندر گز",
            "parent": 23
          },
          {
            "id": 388,
            "name": "بندرتركمن",
            "parent": 23
          },
          {
            "id": 389,
            "name": "راميان",
            "parent": 23
          },
          {
            "id": 390,
            "name": "علي آباد",
            "parent": 23
          },
          {
            "id": 391,
            "name": "كردكوي",
            "parent": 23
          },
          {
            "id": 392,
            "name": "كلاله",
            "parent": 23
          },
          {
            "id": 393,
            "name": "گاليكش",
            "parent": 23
          },
          {
            "id": 394,
            "name": "گرگان",
            "parent": 23
          },
          {
            "id": 395,
            "name": "گميشان",
            "parent": 23
          },
          {
            "id": 396,
            "name": "گنبد",
            "parent": 23
          },
          {
            "id": 397,
            "name": "مراوه تپه",
            "parent": 23
          },
          {
            "id": 398,
            "name": "مينودشت",
            "parent": 23
          },
          {
            "id": 399,
            "name": "املش",
            "parent": 24
          },
          {
            "id": 400,
            "name": "آستارا",
            "parent": 24
          },
          {
            "id": 401,
            "name": "آستانه",
            "parent": 24
          },
          {
            "id": 402,
            "name": "بندرانزلي",
            "parent": 24
          },
          {
            "id": 403,
            "name": "جيرنده",
            "parent": 24
          },
          {
            "id": 404,
            "name": "خمام",
            "parent": 24
          },
          {
            "id": 405,
            "name": "رحيم آباد",
            "parent": 24
          },
          {
            "id": 406,
            "name": "رشت",
            "parent": 24
          },
          {
            "id": 407,
            "name": "رضوانشهر",
            "parent": 24
          },
          {
            "id": 408,
            "name": "رودبار",
            "parent": 24
          },
          {
            "id": 409,
            "name": "رودسر",
            "parent": 24
          },
          {
            "id": 410,
            "name": "سنگر",
            "parent": 24
          },
          {
            "id": 411,
            "name": "سياهكل",
            "parent": 24
          },
          {
            "id": 412,
            "name": "شفت",
            "parent": 24
          },
          {
            "id": 413,
            "name": "صومعه سرا",
            "parent": 24
          },
          {
            "id": 414,
            "name": "تالش",
            "parent": 24
          },
          {
            "id": 415,
            "name": "عمارلو",
            "parent": 24
          },
          {
            "id": 416,
            "name": "فومن",
            "parent": 24
          },
          {
            "id": 417,
            "name": "گرگانرود",
            "parent": 24
          },
          {
            "id": 418,
            "name": "لاهيجان",
            "parent": 24
          },
          {
            "id": 419,
            "name": "لنگرود",
            "parent": 24
          },
          {
            "id": 420,
            "name": "ماسال",
            "parent": 24
          },
          {
            "id": 421,
            "name": "ازنا",
            "parent": 25
          },
          {
            "id": 422,
            "name": "الشتر",
            "parent": 25
          },
          {
            "id": 423,
            "name": "اليگودرز",
            "parent": 25
          },
          {
            "id": 424,
            "name": "بروجرد",
            "parent": 25
          },
          {
            "id": 425,
            "name": "پلدختر",
            "parent": 25
          },
          {
            "id": 426,
            "name": "خرم آباد",
            "parent": 25
          },
          {
            "id": 427,
            "name": "درود",
            "parent": 25
          },
          {
            "id": 428,
            "name": "رومشكان",
            "parent": 25
          },
          {
            "id": 429,
            "name": "زرقام",
            "parent": 25
          },
          {
            "id": 430,
            "name": "كوهدشت",
            "parent": 25
          },
          {
            "id": 431,
            "name": "نورآباد",
            "parent": 25
          },
          {
            "id": 432,
            "name": "آمل",
            "parent": 26
          },
          {
            "id": 433,
            "name": "بابل",
            "parent": 26
          },
          {
            "id": 434,
            "name": "بابلسر",
            "parent": 26
          },
          {
            "id": 435,
            "name": "بهشهر",
            "parent": 26
          },
          {
            "id": 436,
            "name": "تنكابن",
            "parent": 26
          },
          {
            "id": 437,
            "name": "جويبار",
            "parent": 26
          },
          {
            "id": 438,
            "name": "چالوس",
            "parent": 26
          },
          {
            "id": 439,
            "name": "چمستان",
            "parent": 26
          },
          {
            "id": 440,
            "name": "رامسر",
            "parent": 26
          },
          {
            "id": 441,
            "name": "ساري",
            "parent": 26
          },
          {
            "id": 442,
            "name": "سوادكوه",
            "parent": 26
          },
          {
            "id": 443,
            "name": "شيرگاه",
            "parent": 26
          },
          {
            "id": 444,
            "name": "عباس آباد",
            "parent": 26
          },
          {
            "id": 445,
            "name": "فريدونكنار",
            "parent": 26
          },
          {
            "id": 446,
            "name": "قائمشهر",
            "parent": 26
          },
          {
            "id": 447,
            "name": "كلاردشت",
            "parent": 26
          },
          {
            "id": 448,
            "name": "گلوگاه",
            "parent": 26
          },
          {
            "id": 449,
            "name": "لاريجان",
            "parent": 26
          },
          {
            "id": 450,
            "name": "محمودآباد",
            "parent": 26
          },
          {
            "id": 451,
            "name": "ميانرود",
            "parent": 26
          },
          {
            "id": 452,
            "name": "نكاء",
            "parent": 26
          },
          {
            "id": 453,
            "name": "نور",
            "parent": 26
          },
          {
            "id": 454,
            "name": "نوشهر",
            "parent": 26
          },
          {
            "id": 455,
            "name": "اراك",
            "parent": 27
          },
          {
            "id": 456,
            "name": "آشتيان",
            "parent": 27
          },
          {
            "id": 457,
            "name": "تفرش",
            "parent": 27
          },
          {
            "id": 458,
            "name": "خمين",
            "parent": 27
          },
          {
            "id": 459,
            "name": "خنداب",
            "parent": 27
          },
          {
            "id": 460,
            "name": "دليجان",
            "parent": 27
          },
          {
            "id": 461,
            "name": "زرند",
            "parent": 27
          },
          {
            "id": 462,
            "name": "ساوه",
            "parent": 27
          },
          {
            "id": 463,
            "name": "سربند",
            "parent": 27
          },
          {
            "id": 464,
            "name": "فراهان",
            "parent": 27
          },
          {
            "id": 465,
            "name": "كميجان",
            "parent": 27
          },
          {
            "id": 466,
            "name": "محلات",
            "parent": 27
          },
          {
            "id": 467,
            "name": "نوبران",
            "parent": 27
          },
          {
            "id": 468,
            "name": "ابوموسي",
            "parent": 28
          },
          {
            "id": 469,
            "name": "بستك",
            "parent": 28
          },
          {
            "id": 470,
            "name": "بشاگرد",
            "parent": 28
          },
          {
            "id": 471,
            "name": "بندر خمير",
            "parent": 28
          },
          {
            "id": 472,
            "name": "بندرعباس",
            "parent": 28
          },
          {
            "id": 473,
            "name": "بندرلنگه",
            "parent": 28
          },
          {
            "id": 474,
            "name": "جاسك",
            "parent": 28
          },
          {
            "id": 475,
            "name": "حاجي آباد",
            "parent": 28
          },
          {
            "id": 476,
            "name": "رودان",
            "parent": 28
          },
          {
            "id": 477,
            "name": "قشم",
            "parent": 28
          },
          {
            "id": 478,
            "name": "كيش",
            "parent": 28
          },
          {
            "id": 479,
            "name": "گاوبندي",
            "parent": 28
          },
          {
            "id": 480,
            "name": "ميناب",
            "parent": 28
          },
          {
            "id": 481,
            "name": "اسدآباد",
            "parent": 29
          },
          {
            "id": 482,
            "name": "بهار",
            "parent": 29
          },
          {
            "id": 483,
            "name": "تويسركان",
            "parent": 29
          },
          {
            "id": 484,
            "name": "خزل",
            "parent": 29
          },
          {
            "id": 485,
            "name": "رزن",
            "parent": 29
          },
          {
            "id": 486,
            "name": "فامنين",
            "parent": 29
          },
          {
            "id": 487,
            "name": "كبودرآهنگ",
            "parent": 29
          },
          {
            "id": 488,
            "name": "گل تپه",
            "parent": 29
          },
          {
            "id": 489,
            "name": "ملاير",
            "parent": 29
          },
          {
            "id": 490,
            "name": "نهاوند",
            "parent": 29
          },
          {
            "id": 491,
            "name": "همدان",
            "parent": 29
          },
          {
            "id": 492,
            "name": "ابركوه",
            "parent": 30
          },
          {
            "id": 493,
            "name": "اردكان",
            "parent": 30
          },
          {
            "id": 494,
            "name": "بافق",
            "parent": 30
          },
          {
            "id": 495,
            "name": "تفت",
            "parent": 30
          },
          {
            "id": 496,
            "name": "خاتم",
            "parent": 30
          },
          {
            "id": 497,
            "name": "صدوق",
            "parent": 30
          },
          {
            "id": 498,
            "name": "طبس",
            "parent": 30
          },
          {
            "id": 499,
            "name": "مهريز",
            "parent": 30
          },
          {
            "id": 500,
            "name": "ميبد",
            "parent": 30
          },
          {
            "id": 501,
            "name": "نير",
            "parent": 30
          },
          {
            "id": 502,
            "name": "هرات و مروست",
            "parent": 30
          },
          {
            "id": 503,
            "name": "يزد",
            "parent": 30
          },
          {
            "id": 508,
            "name": "قاین",
            "parent": 9
          },
          {
            "id": 509,
            "name": "فردوس",
            "parent": 9
          },
          {
            "id": 510,
            "name": "ایلام",
            "parent": 5
          },
          {
            "id": 511,
            "name": "سربندر",
            "parent": 12
          },
          {
            "id": 512,
            "name": "بیجار",
            "parent": 19
          },
          {
            "id": 513,
            "name": "رویان",
            "parent": 26
          },
          {
            "id": 514,
            "name": "بجستان",
            "parent": 10
          },
          {
            "id": 515,
            "name": "بومهن",
            "parent": 7
          },
          {
            "id": 516,
            "name": "نسیم شهر",
            "parent": 7
          },
          {
            "id": 517,
            "name": "یزد",
            "parent": 30
          },
          {
            "id": 518,
            "name": "فردیس",
            "parent": 504
          },
          {
            "id": 519,
            "name": "اندیشه",
            "parent": 504
          },
          {
            "id": 521,
            "name": "اردبیل",
            "parent": 1
          },
          {
            "id": 522,
            "name": "بلداجی",
            "parent": 8
          },
          {
            "id": 526,
            "name": "کاشمر",
            "parent": 10
          },
          {
            "id": 527,
            "name": "گیلاوند",
            "parent": 7
          }
        ]
      },
      "message": "ok",
      "success": true
    };
    //  console.log('hhh ->'+JSON.stringify(hhh))
    return hhh;
  },
  city(userID, stateID) {
    let Orgdata = {data: '{"userID":"' + userID + '","parentCity":"' + stateID + '"}'};
    let Url = ROAST_CONFIG.URL_Oldssn + "/?act=search&type=state";
    let data = axiosback.convertOldSsn(Orgdata, Url);
    return axios({
      method: "POST",
      url: Url,
      data: data
    }).then(response => {
      let data = response['data'];
      // console.log('data unfreind->' + JSON.stringify(data));
      return data;

    })
  },
  continueFriend(userID, stateID, gender, pic, age, medals, term, positionFrom, positionTo) {

    let Orgdata = {data: '{"userID":"' + userID + '","city":"' + stateID + '","gender":"' + gender + '","pic":"' + pic + '","age":"' + age + '","medals":"' + medals + '","term":"' + term + '","positionFrom":"' + positionFrom + '","positionTo":"' + positionTo + '"}'};
    //  console.log('Orgdata ----->' + JSON.stringify(Orgdata))
    let Url = ROAST_CONFIG.URL_Oldssn + "?act=search&type=filter";
    let data = axiosback.convertOldSsn(Orgdata, Url);
    return axios({
      method: "POST",
      url: Url,
      data: data
    }).then(response => {
      let data = response['data'];
      // console.log('data unfreind->' + JSON.stringify(data));
      return data;

    })
  },

}

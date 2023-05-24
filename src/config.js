/*
    Defines the API route we are using.
*/

var url_Image = 'http://ssn.tvapps.ir/alt2/';
var url_Image3 = 'http://ssn.tvapps.ir/alt3/';
var url_Oldssn = 'http://ssn.tvapps.ir/alt2/index.php/';
var url_Newssn = 'http://ssn.tvapps.ir/hamsam/pservice//api/v1/';
var url_Laravel = 'http://ssn.tvapps.ir/alt2/hamsam/public/api/';
var New_Url_Laravel = 'http://ssn.tvapps.ir/hamsam/pservice/api/v1/';
var url_Gamecenter = 'http://ssn.tvapps.ir/alt2/ssn/images/version/GameCenter/'
var url_forecast = 'https://samyar.rasgames.ir/ssnpishbini/api/v1/'
var url_Newssn = 'http://ssn.tvapps.ir/hamsam/pservice/api/v1/';
var url_Img_comp = '/dist/images/'
var url_Img_page = '/dist/images/'
var url_comp_server = 'http://ssn.tvapps.ir/hamsamClient/3.0/images/'//../../assets/images/chat/sticker.png
var url_Img_server = 'http://ssn.tvapps.ir/hamsamClient/3.0/images/'//../assets/images/chat/sticker.png
var url_Domain = 'http://ssn.tvapps.ir/'
var digiToon_url = 'https://apitwo.digitoon.ir/partner/'
var digitoonToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhIjoxMjE5NjQ2NiwiYiI6MTMxMjQxMTgsImMiOjEsImV4cCI6MTY3NDk5ODQ1OSwiaWF0IjoxNjY3MjIyNDU5fQ.AR67fDd0pO-6smtc2Yza2xbiSst0N2iSjEWWzgtTdN4'
var gapFilmUrl = 'https://rapidcore.gapfilm.ir/api/v1/'

switch (process.env.NODE_ENV) {
  case 'development':


    break;
  case 'production':

    break;
}

export const ROAST_CONFIG = {
  URL_IMAGE: url_Image,
  URL_IMAGE3: url_Image3,
  URL_LARAVEL: url_Laravel,
  URL_Oldssn: url_Oldssn,
  URL_GAMECENTER: url_Gamecenter,
  URL_FORECAST: url_forecast,
  isDevelopement:1,
  New_Url_Laravel: New_Url_Laravel,
  URL_Newssn: url_Newssn,
  url_Img_comp: url_Img_comp,
  url_Img_page: url_Img_page,
  TokenfileUrl: "samsung-TK",
  hamsmUserId: 630,
  url_comp_server: url_comp_server,
  url_Img_server: url_Img_server,
  url_Domain: url_Domain,
  digiToon_url:digiToon_url,
  digitoonToken:digitoonToken,
  gapFilm_Url:gapFilmUrl
}

import store from "../store";
import {ROAST_CONFIG} from "../config";
import {mapMutations} from 'vuex'
import {mapGetters} from 'vuex'


var keyBoardIME;
var isImeFocused;
var datas = [];
var typeUser;
var rules;

export default {
  methods: {
    ...mapGetters([
      'getCurrentPage', 'getUser'
    ]),
    ...mapMutations([
      'disconnectSocket'

    ]),
    conflicting: function () {
      //console.log('from mixin')
    }, filterValidation: function () {
      return this.$validator.validateAll().then((data) => {

        /*return this.$validator.validateAll().then((data) => {*/
        let isError = [];
        let mainObj = this;

        mainObj.errors['items'].forEach(function (elem, index) {
          //       console.log('elem[\'vmId\']->' + elem['vmId'] + ',vm id khoesh->' + mainObj.errors['vmId'] + ',msg->' + elem['msg']);
          if (elem['vmId'] == mainObj.errors['vmId']) {
            //console.log('fuuuuuuuuuuuuuuck');
            //  isError = true;
            isError.push(elem['msg']);
          }

        });
        //console.log('after->' + isError);
        return isError;
        //  });
      });
    }, filterOnepage: function (inputids) {
      // console.log("inputids",inputids)
      return this.$validator.validateAll().then((data) => {
        //  console.log(" this.$validator.validateAll",data)
        //console.log('input ids=>' + JSON.stringify(inputids));
        /*return this.$validator.validateAll().then((data) => {*/
        let isError = [];
        let mainObj = this;
        //  console.log('uuuuuuuuuuuu' + JSON.stringify(mainObj.errors));

        mainObj.errors['items'].forEach(function (elem, index) {
          //   console.log('errooooors->' + JSON.stringify(elem));
          var id = elem['id'] % 5
          if (id == 0) {
            id = 5
          }
          if (inputids.indexOf((parseInt(id)).toString()) != -1) {
            //   console.log('oook');
            isError.push(elem['msg']);
          }


        });
        //   console.log('after->' + JSON.stringify(isError));
        return isError;
        //  });
      });
    }, setCookie: function (cname, cvalue, exdays) {
      var d = new Date();
      d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
      var expires = "expires=" + d.toUTCString();
      document.cookie = cname + "=" + cvalue + "; " + expires;
    },
    getCookie: function (cname) {
      var name = cname + "=";
      var ca = document.cookie.split(';');
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
    }, filterResult(array, key, value) {
      let tempArr = [];
      array.forEach(function (elem, index) {
        // console.log('elem->' + JSON.stringify(elem) + 'key=>'+key+',value->'+value+',elem[key]->'+elem[key]);
        if (elem[key] == value) {
          //    console.log('fuuuuuuuuuuuuuuck');
          tempArr.push(elem);
        }

      });
      // console.log('tep->'+JSON.stringify(tempArr));
      return tempArr;
    }, setParam(key, value) {
      // console.log('modelTv in seeeeeeeet param = ' + modelTv);
      // console.log('in set paraaaaaaaaaaaaaaaaaaaaaaaaaaaam' + ' key = = = ' + key + '  value = =' + value);
//    switch (modelTv) {
//        case('tizen') :
//            localStorage.setItem(key, value);
//            break;
//        case('orsay') :
//            setCookie(key, value, 1000);
//            break;
//    }
      localStorage.setItem(key, value);


    }, clearParam() {
      // console.log('clear parammmmmmmmmmmmmmmmmmmmmmmmmmmmmm');
      //  console.log('modelTv in clear param = ' + modelTv);
//    switch (modelTv) {
//        case('tizen') :
//            localStorage.clear();
//            break;
//        case('orsay') :
//            document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
//            break;
//    }
      localStorage.clear();

    },

    getParam(key) {
      //  console.log('modelTv in geet param = ' + modelTv);
//    switch (modelTv) {
//        case('tizen') :
//            return localStorage.getItem(key);
//            break;
//        case('orsay') :
//            return getCookie(key);
//            break;
//    }
      return localStorage.getItem(key);

    }, fillUserTv(model) {
      switch (model) {
        case ('tizen'):
          if (ROAST_CONFIG.isDevelopement == 1) {

            //return '{"macID": "FP4G5GDXIFTXPz","year":"16","isOld":"0","ps":"dummy value","real":"dummy value, eg. UN65JS9500","model":"dummy value","firmware":"dummy value","IsCompletePrf":"1"}';

            return '{"macID": "KLpr4eeerdddd33Q22","year":"17","isOld":"0","ps":"dummy value","real":"dummy value, eg. UN65JS9500","model":"dummy value","firmware":"dummy value","IsCompletePrf":"1"}';

          }
          let real = webapis.productinfo.getRealModel();
          let modelTV = webapis.productinfo.getModelCode();
          let firmware = webapis.productinfo.getFirmware();
          let psID = webapis.productinfo.getFirmware();
          let Duid = webapis.productinfo.getDuid();
          let year = modelTV.split("_", 1);
          return '{"macID": "' + Duid + '","year":"' + year + '","isOld":"0","ps":"' + psID + '","real":"' + real + '","model":"' + modelTV + '","firmware":"' + firmware + '","IsCompletePrf":"1"}';

          break;
        case('orsay'):
          /*   var networkPlugin = document.getElementById("pluginNetwork");
             var nnaviPlugin = document.getElementById("pluginNNavi");


             user.real = '123456';
             user.model = nnaviPlugin.GetModelCode();
             user.firmware = nnaviPlugin.GetFirmware();
             user.psID = nnaviPlugin.GetFirmware();
             user.ModelCode = nnaviPlugin.GetModelCode();
             user.Mac = networkPlugin.GetHWaddr();
             user.Duid = nnaviPlugin.GetDUID(user.Mac);

   */
          //   console.log('yeaaaaaar ---->' + user.ModelCode.split("_", 1));


          break;
      }
    },
    showIme: function (inputName) {
      //   console.log('show -> '+'#' + inputName)

      datas = this.getUser();
      typeUser = datas['type'];
      rules = datas['rules'];

      if (this.getCurrentPage() != 'Seven' && this.getCurrentPage() != 'Five' && this.getCurrentPage() != 'Three') {
        if (rules == 0) {
          this.$root.$emit('popup_rules');

        } else {
          if (typeUser == 0) {
            this.$root.$emit('popup_signup');
          } else {
            if (this.getCurrentPage() == "TwentyFour") {
              this.$root.$emit('changeTopPopup');
            }
            keyBoardIME = setTimeout(function () {
              var elIme = document.querySelector('#' + inputName);
              //document.body.focus();
              elIme.focus();
              keyBoardIME = true;
              // console.log('isImeFocused11111111111 ->' + isImeFocused)
            }, 500);
          }
        }

      } else {
        keyBoardIME = setTimeout(function () {
          var elIme = document.querySelector('#' + inputName);
          //document.body.focus();
          elIme.focus();
          keyBoardIME = true;
          // console.log('isImeFocused11111111111 ->' + isImeFocused)
        }, 500);
      }


    }
    ,
    hideIme: function (inputName) {
      //  console.log('hide -> '+'#' + inputName)
      if (this.getCurrentPage() == "TwentyFour") {
        this.$root.$emit('defaultTopPopup');
      }
      clearTimeout(keyBoardIME);
      var elIme = document.querySelector('#' + inputName);
      document.body.focus();
      elIme.blur();
      isImeFocused = false;

    }
    ,
    logOut() {
      //console.log("logoutttttttttttttttttttttttttttttttttttttttttttttttttttttt")
      this.FileSsystem(ROAST_CONFIG.TokenfileUrl, "Delete")
      this.disconnectSocket()
    }
    ,
    reversArray: function (value) {
      return value.slice().reverse();
    }
    ,
    FileSsystem(fileName, action) {

      var documentsDir
      var isFile
      var fileSelected
      var _this = this

      //  console.log("loadFile0000000000000000000000000000000000000000000000000")


      function onsuccess(files) {
        //   console.log("oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo", files)
        for (var i = 0; i < files.length; i++) {
          if (files[i].name == fileName) {
            fileSelected = files[i]
            isFile = 1
          }

        }

        if (isFile) {//
          if (action == "Delete") {
            _this.DelFileSystem(fileSelected, documentsDir)
          } else if (action == "read") {
            _this.ReadFileSystem(fileName, documentsDir)
          }

        } else {
          if (action == "Delete") {

          } else if (action == "read") {
            return false
          }
        }
      }

      function onerror(error) {
        //   console.log("The error " + error.message + " occurred when listing the files in the selected folder");
      }

      tizen.filesystem.resolve(
        'documents',
        function (dir) {

          documentsDir = dir;
          dir.listFiles(onsuccess, onerror);


          //   CompressPath = dir.path + compressFileName;
        }, function (e) {
          console.log("Error" + e.message);
        }, "rw"
      );


    }
    ,
    DelFileSystem(file, documentsDir) {
      //  console.log("DeleteFile0000000000000000000000000000000000000000000000000documentsDir", documentsDir)
      //  console.log("DeleteFile0000000000000000000000000000000000000000000000000file", file)
      let _this = this;

      if (!file.isDirectory) {
        documentsDir.deleteFile(
          file.fullPath,
          function () {
            //    console.log("succesDelllllllllllllllllllllllllllllllllllllllllllllllllll")
          }, function (e) {

            //    console.log("erorDelllllllllllllllllllllllllllllllllllllllllllllllllll", e)
          });
      }

    }
    ,
    ReadFileSystem(fileName, documentsDir) {
      //  console.log("FileRead0000000000000000000000000000000000000000000000000")
      var _this = this
      var file = documentsDir.resolve(fileName);


      file.openStream(
        "r",
        function (fs) {

          var text = fs.read(file.fileSize);

          fs.close();

          _this.risponseRead(text)

        }, function (e) {
          console.log("Error " + e.message);
        }, "UTF-8");
    }
    ,
    risponseRead(text) {
      //    console.log("tttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttt", text)
    },
    openBrowser(Url) {
      var paramAppId = 'org.tizen.browser';
      var paramData = {
        url: Url,
        info: 'samsungdpay'
      };
      var appCtrlDataAry = [];
      for (var keyName in paramData) {
        var temp = new tizen.ApplicationControlData(keyName, [paramData[keyName]]);
        appCtrlDataAry.push(temp);
      }

      var url = Url;

      var browserAppCtrl = new tizen.ApplicationControl(null, url, null, null, appCtrlDataAry);
      tizen.application.launchAppControl(
        browserAppCtrl,
        paramAppId,
        function () {
          var text = 'Jump Browser Success';
          console.log(text);
        },
        function (error) {
          var text = 'Jump Browser Error : ' + JSON.stringify(error);
          console.log(text);
        },
        null
      );

    },

  },
  filters: {
    substr: function (value, count) {
      // alert(value + ' ' + count)
      if (value != undefined) {
        if (value.length > count) {
          return value.substring(0, count) + "...";
        } else {
          return value;
        }
      }


    }
    ,


  }
}

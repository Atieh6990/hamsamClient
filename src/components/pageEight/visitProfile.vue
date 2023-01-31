<template>
  <div class="parentPage">

    <div class="titleVisitProfile">
      <span class="size1">مشخصات فردی</span>
      <span v-if="otherUser == false"
            class="size2">با کلیک و انتخاب هر گزینه اطلاعات خود را ویرایش و یا تکمیل نمائید.</span>
      <span v-else class="size2">ممنون که از صفحه من بازدید کردید.</span>
    </div>

    <div class="right">
      <div class="rightChild">
        <div class="profileDataBox">
          <div v-for="(item , index) in profileTitle"
               :class="['items borderItem' , (index == 9 || index == 10)? 'hideBorder':'']">
            <div class="title all" v-if="type == 0">{{ profileTitle[index] + ' :' }}</div>
          </div>
        </div>

        <!-- ************* user name ***********-->

        <div v-if="type == 1"
             style="right: 20px;top: 120px;border-radius: 10px"
             :class="[(xpos == 0 && ypos == 1 && (active == page)&& (activeRoute==1) ? 'hoverBtn':'') , 'info']">
          نام کاربری :
          <input id="pro_0"
                 class="inputShow"
                 v-model="userName"
                 :placeholder="userName"
                 v-validate="'required|max:35|min:3'" name="نام کاربری"
          />
        </div>

        <div v-if="type == 0" style="right: 125px;top: 120px;" class="info2">{{ HideMoreText(userName) }}</div>

        <!-- *************  state-city ***********-->
        <div v-if="type == 1"
             style="right:430px;top: 120px;border-radius: 10px"
             :class="[(xpos == 1 && ypos == 1 && (active == page)&& (activeRoute==1) ? 'hoverBtn':'') , 'info']">
          شهر :
          <input id="pro_1"
                 class="inputShow"
                 v-model="CSNAme"
                 :placeholder="CSNAme"
          />
        </div>

        <div v-if="type == 0" style="right:485px;top: 120px;" class="info2">{{ HideMoreText(CSNAme) }}</div>
        <!-- ************* name ***********-->

        <div v-if="type == 1"
             style="right: 20px;top: 184px;border-radius: 10px"
             :class="[(xpos == 2 && ypos == 1 && (active == page)&& (activeRoute==1) ? 'hoverBtn':'') , 'info']">
          نام :
          <input id="pro_2"
                 class="inputShow"
                 v-model="name"
                 :placeholder="name"
                 v-validate="'max:35'" name="نام"
          />
        </div>

        <div v-if="type == 0" style="right: 65px; top: 185px;" class="info2">{{HideMoreText(name)  }}</div>


        <!--  ***************** address ************************ -->

        <div v-if="type == 1"
             style="right: 430px;top: 184px;border-radius: 10px"
             :class="[(xpos == 3 && ypos == 1 && (active == page)&& (activeRoute==1) ? 'hoverBtn':'') , 'info']">
          آدرس :
          <input id="pro_3"
                 class="inputShow"
                 v-model="address"
                 :placeholder="address"
                 v-validate="'max:220'" name="آدرس"
          />
        </div>

        <div v-if="otherUser == false">
          <div v-if="type == 0 && address && address != '' " style="right: 500px;top: 185px;" class="info2"
               id="lk">{{
          address|substr(25)   }}
          </div>
          <div v-if="type == 0 && address && address ==  '' " style="right: 500px;top: 185px;" class="info2">{{
          address
            }}
          </div>
        </div>
        <div v-if="otherUser == true">
          <div v-if="type == 0 && address && address ==  '' " style="right: 500px;top: 185px;" class="info2">*****</div>
        </div>


        <!-- ***************** family ***********************************************************-->
        <div v-if="type == 1"
             style="right: 20px;top: 249px;border-radius: 10px"
             :class="[(xpos == 4 && ypos == 1 && (active == page)&& (activeRoute==1) ? 'hoverBtn':'') , 'info']">
          نام خانوادگی :
          <input id="pro_4"
                 class="inputShow"
                 v-model="family"
                 :placeholder="family"
                 v-validate="'max:35'" name="نام خانوادگی"
          />
        </div>

        <div v-if="type == 0" style="right: 145px;top: 249px;" class="info2">{{ HideMoreText(family) }}</div>


        <!-- ************* tell ***********-->
        <div v-if="type == 1"
             style="right: 430px;top: 249px;border-radius: 10px"
             :class="[(xpos == 5 && ypos == 1 && (active == page)&& (activeRoute==1) ? 'hoverBtn':'') , 'info']">
          تلفن :
          <input id="pro_5"
                 class="inputShow"
                 v-model="tell"
                 :placeholder="tell"
                 v-validate="'numeric|min:8|max:11'" name="تلفن"
          />
        </div>
        <div v-if="type == 0 && otherUser == false" style="right:490px;top: 249px;" class="info2">{{ tell }}</div>
        <div v-if="type == 0 && otherUser == true" style="right:490px;top: 249px;" class="info2">*****</div>


        <!-- ************* age ***********-->
        <div v-if="type == 1"
             style="right: 20px;top: 314px;border-radius: 10px"
             :class="[(xpos == 6 && ypos == 1 && (active == page)&& (activeRoute==1) ? 'hoverBtn':'') , 'info']">
          سن :
          <input id="pro_6"
                 class="inputShow"
                 v-model="age"
                 :placeholder="age"
                 v-validate="'numeric'" name="سن"
          />
        </div>

        <div v-if="type == 0" style="right: 75px;top: 314px;" class="info2">{{ age }}</div>


        <!-- ************* telegram ***********-->
        <div v-if="type == 1"
             style="right: 430px;top: 314px;border-radius: 10px"
             :class="[(xpos == 7 && ypos == 1 && (active == page)&& (activeRoute==1) ? 'hoverBtn':'') , 'info']">
          تلگرام :
          <input id="pro_7"
                 class="inputShow"
                 v-model="telegram"
                 :placeholder="telegram"
                 v-validate="'max:35'" name="تلگرام"
          />
        </div>

        <div v-if="type == 0" style="right: 500px;top: 314px;;" class="info2">{{ telegram }}
        </div>


        <!-- ***************** sex ***********************************************************-->
        <div id="pro_8" class="info" style="right: 20px;top: 380px;border-radius: 10px" v-if="type == 1">
          جنسیت :
          <input type="radio" id="pro_8_1" style="position: absolute; left: 210px;top: 20px;">
          <label for="men" style="position: absolute;left: 170px;line-height: 45px;">مرد</label>
          <div class="check" style="left: 210px"
               :class="[(xpos == 8 && ypos == 1 && (active == page)&& (activeRoute==1) && (sex == 1)? 'hoverCheckBtn':'') , (selectSex == 1 ?'selectCheck':'')]"></div>

          <input type="radio" id="pro_8_2" style="left: 120px; position: absolute;top: 15px;">
          <label for="women" style="left: 85px;position: absolute;line-height: 40px;">زن</label>
          <div class="check" style="left:120px"
               :class="[(xpos == 8 && ypos == 1 && (active == page)&& (activeRoute==1) && (sex == 2)? 'hoverCheckBtn':'') , (selectSex == 2 ?'selectCheck':'')]"></div>
        </div>


        <div v-if="type == 0">

          <div v-if="selectSex == 1" style="right: 110px;top: 377px;" class="info2">{{
            'مرد'
            }}
          </div>
          <div v-if="selectSex == 2" style="right: 110px;top: 377px;" class="info2">{{
            'زن' }}
          </div>
          <div v-if="selectSex == 0" style="right: 110px;top: 377px;" class="info2">{{
            'ثبت نشده' }}
          </div>
        </div>

        <!-- ************* email ***********-->

        <div v-if="type == 1"
             style="right: 430px;top: 380px;border-radius: 10px"
             :class="[(xpos == 9 && ypos == 1 && (active == page)&& (activeRoute==1) ? 'hoverBtn':'') , 'info']">
          ایمیل :
          <input id="pro_9"
                 class="inputShow"
                 v-model="email"
                 :placeholder="email"
                 v-validate="'email|max:35'" name="ایمیل"
          />
        </div>

        <div v-if="type == 0" style="right:500px;top: 380px;" class="info2">{{ email }}</div>


        <!-- ************* education ***********-->
        <div v-if="type == 1"
             style="right: 20px;top: 445px;border-radius: 10px"
             :class="[(xpos == 10 && ypos == 1 && (active == page)&& (activeRoute==1) ? 'hoverBtn':'') , 'info']">
          تحصیلات :
          <input id="'pro_10'"
                 class="inputShow"
                 v-model="eduNAme"
                 :placeholder="eduNAme"
          />
        </div>

        <div v-if="type == 0" style="right: 125px;top:445px;" class="info2">{{ eduNAme }}</div>

      </div>


    </div>
    <div class="biographiParent">
      <span class="bioTitle">بیوگرافی</span>
      <span v-if="otherUser == false && type == 1" class="size2">شما مجاز به نوشتن 70 کاراکتر هستید.</span>
      <div v-if="type == 0 && bioTxt != null" class="bioTxt">{{ bioTxt }}</div>
      <div v-else-if="type == 0 && bioTxt == null && otherUser == false" class="bioTxt">متنی در بیوگرافی شما ثبت نشده
        است.
      </div>
      <div v-else-if="type == 0 && bioTxt == null && otherUser == true" class="bioTxt">کاربر بیوگرافی را ثبت نکرده
        است.
      </div>
      <textarea v-if="type == 1"
                :class="[((active == page)&& (activeRoute==1)&& (ypos== 3) ? 'hoverBtn':'') , type == 1 ? 'borderBio' : '']"
                class="bioTxt"
                id="bioTxt"
                v-model.trim="bioTxt"
                :placeholder="'جمله ای در وصف خودتان بنویسید...'"
                v-validate="'max:70'" name="بیوگرافی"></textarea>

    </div>

    <div v-if="otherUser == false">
      <div class="changePro"
           :class="(ypos == 0 && (active == page)&& (activeRoute==1) ?'hoverSaveBtn':'')">تغییر عکس
        <img v-if="(ypos == 0) && (active == page) && (activeRoute==1)" class="camera"
             :src="imgURL + 'profile/visitProfile/CAMERA-HVR.png'"/>
        <img v-else class="camera" :src="imgURL + 'profile/visitProfile/CAMERA.png'"/>

      </div>
      <div class="changePro" style="top: 440px;" v-if="type == 0"
           :class="(ypos == 2 && type == 0 && (active == page)&& (activeRoute==1) ?'hoverSaveBtn':'')">ویرایش
        پروفایل
      </div>
      <div class="changePro" style="top: 440px;" v-if="type == 1"
           :class="(ypos == 2 && type == 1 && (active == page)&& (activeRoute==1)?'hoverSaveBtn':'')">ذخیره
      </div>
    </div>


    <div class="errors">
      <div v-if="errorvalidation.length != 0 && errorShow == true" v-for="(item,index) in errorvalidation"
           style="background-color: #f44336" class="errorTxt">
        {{item}}
        <br>
      </div>
      <div v-if="successShow == true && successState == true" ref="successTxt"
           style="background-color: rgb(0, 166, 81);margin-top: 140px"
           class="errorTxt">
        {{successTxt}}
        <br>
      </div>
      <div v-if="successShow == true && successState == false" ref="successTxt"
           style="background-color: #f44336;margin-top: 140px"
           class="errorTxt">
        {{successTxt}}
        <br>
      </div>
    </div>
    <StateCity :activeRoute="activeRoute" :showState="showState" ref="StateCity"></StateCity>
    <education :activeRoute="activeRoute" :showEdu="showEdu" ref="education"></education>


  </div>
</template>

<script>
  import {ROAST_CONFIG} from '../../config'
  import StateCity from '../pageFive/state-city'
  import func from '../../mixins/func'
  import education from '../../components/pageEight/education'
  import {mapGetters} from 'vuex'
  import {mapMutations} from 'vuex'
  import api from '../../api/profile'


  export default {
    name: "visit-profile",
    props: ['active', 'page', 'activeRoute', 'profileData', "otherUser"],
    mixins: [func],
    data() {
      return {
        imgURL: ROAST_CONFIG.url_comp_server,
        ypos: 0,// 0->taghire ax & save , 1 ->change profile(item ha) , 2->virayesh
        type: 0,//0->faghat namayesh , 1-> save
        xpos: 0,//item haye dakh( -1 -> rooye biotext ,3->sex, 8->state/city , 4->education)
        columnCount: 2,
        tmpXpos: '',
        sex: 1,//1->men , 2->women
        selectSex: '',//1->men , 2->women
        showState: false,
        showEdu: false,
        CSNAme: '',
        eduNAme: '',
        stateId: '',
        cityId: '',
        eduId: '',
        sendData: '',
        bioTxt: '',
        filtering: [],
        userName: '',
        name: '',
        family: '',
        address: '',
        email: '',
        telegram: '',
        tell: '',
        age: '',
        errorvalidation: [],
        profileTitle: ['نام کاربری', 'شهر', 'نام', 'آدرس', 'نام خانوادگی', 'تلفن', 'سن', 'تلگرام', 'جنسیت', 'ایمیل', 'تحصیلات'],
        successTxt: '',
        successState: '',
        successShow: false,
        errorShow: false

      }
    },
    components: {
      StateCity, education
    },
    created() {


      this.fillModels();


      this.$root.$on('state_city_name', (obj) => {
        this.CSNAme = obj.state + '/' + obj.city;
        this.stateId = obj.stateId;
        this.cityId = obj.cityId;
        this.showState = false
      });
      this.$root.$on('education_name', (obj) => {
        this.eduNAme = obj.education;
        this.eduId = obj.educationId;
        this.showEdu = false
      });

      this.$root.$on('close_state_city', () => {
        this.showState = false
      });
      this.$root.$on('close_education', () => {
        this.showEdu = false
      });
      this.$root.$on('all_states', (data) => {
        let self = this
        this.filtering = data['data']['cities']
        setTimeout(function () {
          let st = data['data']['states'][self.profileData.profile.state - 1]['name'];
          let id = data['data']['states'][self.profileData.profile.state - 1]['id']
          let ct = self.filtering.filter(data => (data['parent'] == id) && data['id'] == self.profileData.profile.city);
          self.CSNAme = st + '/ ' + ct[0]['name'];
        }, 1000)
      });

      this.$root.$on('all_Edu', (data) => {
        let self = this
        setTimeout(function () {
          self.eduNAme = data[self.profileData.profile.education - 1]
        }, 1000)
      });
    },
    methods: {
      HideMoreText(text){
        if(text==null || text==undefined || text==""){
          return  text
        }
       if(text.length>20){
         return ( text.substr(0, 19) + "...")
       }else{
        return text
       }
      },
      ...mapGetters([
        'getUser'
      ]),
      ...mapMutations([
        'updateDetail', 'updateUserName'
      ]),
      fillModels() {

        this.userName = this.profileData.username;

        if (this.profileData.profile) {
          this.name = this.profileData.profile.name;
          this.family = this.profileData.profile.family;
          this.selectSex = this.profileData.profile.gender;
          this.eduId = this.profileData.profile.education;
          this.stateId = this.profileData.profile.state;
          this.bioTxt = this.profileData.profile.bio;
          this.address = this.profileData.profile.address;
          this.email = this.profileData.profile.email;
          this.telegram = this.profileData.profile.telegram;
          this.cityId = this.profileData.profile.city;
          this.tell = this.profileData.profile.tel;
          this.age = this.profileData.profile.age;

        }


      },

      left() {
        if (this.type == 1) {
          if (this.ypos == 1) {
            if (this.xpos == 8) {//sex

              if (this.sex == 1) {
                this.sex = 2;
                return true
              } else {
                this.formLeft();
                return true
              }

            } else if (this.xpos == 10) {//edu

              if (this.showEdu == false) {
                this.hideAll();
                this.ypos = 0;
                return true;
              } else {
                if (!this.$refs.education.left()) {
                  return true;
                }
              }
              return true
            } else if (this.xpos == 1) {//state/city
              if (this.showState == false) {
                return false;
              } else {
                if (!this.$refs.StateCity.left()) {
                  return true;
                }
              }

              return true
            } else {
              if (this.formLeft()) {
                return true
              }
            }
          } else if (this.ypos == 0) {
            return false;
          } else if (this.ypos == 3) {
            this.hideAll();
          }

        } else {
          return false
        }

      },
      right() {
        if (this.type == 1) {

          if (this.ypos == 1) {

            if (this.xpos == 1) {//state/city
              if (this.showState == false) {
                if (this.formRight()) {
                  return true
                }
              } else {
                if (!this.$refs.StateCity.right()) {
                  return true
                }
                return true
              }

            } else if (this.xpos == 10) { //edu
              if (this.showEdu == false) {
                return false;
              } else {
                if (!this.$refs.education.right()) {
                  return true;
                }
                return true;
              }

            } else if (this.xpos == 8) {//sex
              if (this.sex == 2) {
                this.sex = 1;
                return true
              } else {
                if (this.formRight()) {
                  return true
                }
              }
              return false
            } else {
              if (this.formRight()) {
                return true
              }

              return false
            }
          } else if (this.ypos == 0 || this.ypos == 2) {
            this.ypos = 1;
            this.xpos = 10;
            return true;
          } else if (this.ypos == 3) {
            this.hideAll();
          }


        } else {

        }
      },
      down() {
        if (this.type == 1 && this.otherUser == false) {
          if (this.ypos == 1) {
            if (this.xpos == 10) { //education
              if (this.showEdu == false) {
                this.ypos = 3;
                return true;
              } else {
                if (!this.$refs.education.down()) {
                  return true
                }
              }
            } else if (this.xpos == 1) {//state/city
              if (this.showState == false) {
                this.formDown();
                return false
              } else {
                if (!this.$refs.StateCity.down()) {
                  return true
                }
              }

            } else if (this.xpos == 9) {
              this.ypos = 0;
              this.hideAll();
              return true;
            } else {

              this.formDown();
              return false
            }

          } else if (this.ypos == 0) {
            this.ypos = 2;
            return true;
          } else if (this.ypos == 2) {
            this.ypos = 3;
            return true;
          }

        } else if (this.type == 0 && this.otherUser == false) {
          this.ypos = 2;
          return true;
        }
      },
      up() {

        if (this.type == 1 && this.otherUser == false) {

          if (this.ypos == 3) {//bio
            this.hideAll();
            this.ypos = 2;
            return true;
          } else if (this.ypos == 2) {
            this.ypos = 0;
            return true;
          } else if (this.ypos == 0) {
            this.ypos = 1;
            this.xpos = 9;
            return true;
          } else if (this.ypos == 1) {
            if (this.xpos == 10) {//education
              if (this.showEdu == false) {
                this.formUp()
                return true
              } else {
                if (!this.$refs.education.up()) {
                  return true
                }
              }

              return true
            } else if (this.xpos == 1) {//state/city
              if (this.showState == false) {
                // this.formUp()
                return false
              } else {
                if (!this.$refs.StateCity.up()) {
                  return true
                }
              }

              return true
            } else {
              if (this.formUp()) {
                return true
              }

            }
          }
          return false
        } else if (this.type == 0 && this.otherUser == false) {
          if (this.ypos == 2) {
            this.ypos = 0;
            return true
          } else {
            return false;
          }

        }
      },
      enter() {


        this.datas = this.getUser();
        let typeUser = this.datas['type'];

        if (typeUser == 0) {//mehman
          this.$root.$emit('popup_signup');
        } else {
          if (this.type == 0) {//bere roo halate virayesh
            if (this.ypos == 2) {
              this.type = 1;
              this.ypos = 1
              return true;
            } else if (this.ypos == 0) {
              return false;
            }

          } else if (this.type == 1) {
            if (this.ypos == 1) {//item ha

              if (this.xpos == 8) {//sex
                this.selectSex = this.sex
                return true;

              } else if (this.xpos == 10) {//education

                if (this.showEdu == false) {
                  this.showEdu = true;
                  return true;
                } else {
                  if (!this.$refs.education.enter()) {
                    return true;
                  }
                }

              } else if (this.xpos == 1) {//state/city
                if (this.showState == false) {
                  this.$root.$emit('reset_city');
                  this.showState = true
                  return true;
                } else {
                  if (!this.$refs.StateCity.enter()) {
                    return true;

                  }
                }
              } else {
                if (this.xpos > 5) {
                  this.$root.$emit('changeTopBack');
                }
                this.showIme('pro_' + this.xpos);
                return true;
              }
            } else if (this.ypos == 0) {
              return false;
            } else if (this.ypos == 2) {//save
              this.dataToSend();
              return true;
            } else if (this.ypos == 3) {
              this.$root.$emit('changeTopBack');
              this.showIme('bioTxt');
              return true;
            }

          }
        }


      },
      hideAll() {
        this.hideIme('pro_0');
        this.hideIme('pro_2');
        this.hideIme('pro_3');
        this.hideIme('pro_4');
        this.hideIme('pro_5');
        this.hideIme('pro_6');
        this.hideIme('pro_7');
        this.hideIme('pro_9');
        this.hideIme('bioTxt');
        this.$root.$emit('defaultTopBack');
      },
      back() {
        if (this.type == 1) {
          if (this.xpos == 1) {//state/city
            if (!this.$refs.StateCity.back()) {
              this.showState = false
              return true;
            }
          } else if (this.xpos == 10) {//education
            if (!this.$refs.education.back()) {
              this.showEdu = false
              return true;
            }
          } else {
            this.hideAll();
            this.type = 0;
            this.ypos = 0;
            return true;

          }
        } else if (this.type == 0) {

        }
      },
      formLeft() {
        if ((this.xpos % this.columnCount != parseInt(this.columnCount) - 1) && (this.xpos + 1 < this.profileTitle.length)) {
          this.hideAll();
          this.xpos++;
          this.tmpXpos = this.xpos;
          return true
        }
      },
      formRight() {
        if ((this.xpos % this.columnCount != 0)) {
          this.hideAll();
          this.xpos--;
          this.tmpXpos = this.xpos;
          return true
        }
      },
      formDown() {

        if (((this.xpos + parseInt(this.columnCount)) < (this.profileTitle.length))) {
          this.hideAll();
          this.xpos += parseInt(this.columnCount);
          this.tmpXpos = this.xpos;

          return true
        }
        return false
      },
      formUp() {
        if (((this.xpos) >= this.columnCount)) {
          this.hideAll();
          this.xpos -= parseInt(this.columnCount);
          return true
        }
      },
      dataToSend() {
        this.filterValidation().then((data) => {
          this.errorvalidation = data;

          this.errorShow = true;
          setTimeout(() => {
            this.errorShow = false;
          }, 5000)

          if (this.errorvalidation.length == 0) {
            this.errorShow = false;
            let sendData = {};
            if (this.userName != '' && this.userName != null) {
              sendData.username = this.userName;
            }
            if (this.family != '' && this.family != null) {
              sendData.family = this.family;
            }
            if (this.cityId != '' && this.cityId != null) {
              sendData.city = this.cityId;
            }
            if (this.name != '' && this.name != null) {
              sendData.name = this.name;
            }
            if (this.selectSex != '' && this.selectSex != null) {
              sendData.gender = this.selectSex;
            }
            if (this.eduId != '' && this.eduId != null) {
              sendData.education = this.eduId;
            }
            if (this.stateId != '' && this.stateId != null) {
              sendData.state = this.stateId;
            }
            if (this.bioTxt != '' && this.bioTxt != null) {
              sendData.bio = this.bioTxt;
            }
            if (this.tell != '' && this.tell != null) {
              sendData.tel = this.tell;
            }
            if (this.email != '' && this.email != null) {
              sendData.email = this.email;
            }
            if (this.telegram != '' && this.telegram != null) {
              sendData.telegram = this.telegram;
            }
            if (this.age != '' && this.age != null) {
              sendData.age = this.age;
            }
            if (this.address != '' && this.address != null) {
              sendData.address = this.address;
            }


            api.profileSave(sendData).then(data => {

              this.successState = data.success;
              this.successTxt = data.message;
              if(data.data.message){
                this.successTxt = "نام کاربری شما تکراری است"

                    }


              if (this.successState == true) {
                let userId = this.getUser().userID;
                ///this.profileData = []
                api.profileView(userId).then(data => {

                  this.bioTxt = ''
                  this.profileData = data.data;
                  this.fillModels();
                  this.updateUserName({item: "username", amount: this.userName});
                  this.$root.$emit('emitupdateUserName')
                  this.type = 0
                })
                this.successShow = true;
                setTimeout(() => {
                  this.successShow = false;
                }, 3000)
              } else {

                this.successShow = true;
                setTimeout(() => {
                  this.successShow = false;
                }, 3000);

                let txt = data.data.message;


                if (data.data.username == 1) {
                  this.errorvalidation.push(txt)
                }
                if (txt['bio'] && txt['bio'] != '') {
                  this.errorvalidation.push(txt['bio'][0])
                }
                if (txt['username'] && txt['username'] != '') {
                  this.errorvalidation.push(txt['username'][0])
                }
                if (txt['family'] && txt['family'] != '') {
                  this.errorvalidation.push(txt['family'][0])
                }
                if (txt['city'] && txt['city'] != '') {
                  this.errorvalidation.push(txt['city'][0])
                }
                if (txt['name'] && txt['name'] != '') {
                  this.errorvalidation.push(txt['name'][0])
                }
                if (txt['gender'] && txt['gender'] != '') {
                  this.errorvalidation.push(txt['gender'][0])
                }
                if (txt['education'] && txt['education'] != '') {
                  this.errorvalidation.push(txt['education'][0])
                }
                if (txt['state'] && txt['state'] != '') {
                  this.errorvalidation.push(txt['state'][0])
                }
                if (txt['tel'] && txt['tel'] != '') {
                  this.errorvalidation.push(txt['tel'][0])
                }
                if (txt['email'] && txt['email'] != '') {
                  this.errorvalidation.push(txt['email'][0])
                }
                if (txt['telegram'] && txt['telegram'] != '') {
                  this.errorvalidation.push(txt['telegram'][0])
                }
                if (txt['age'] && txt['age'] != '') {
                  this.errorvalidation.push(txt['age'][0])
                }
                if (txt['address'] && txt['address'] != '') {
                  this.errorvalidation.push(txt['address'][0])
                }

              }
            })
          }
        });


      },

    }
  }
</script>

<style scoped>
  .parentPage {
    position: absolute;
    top: 260px;
    left: 100px;
    width: 1700px;
    height: 600px;
    /*border: 1px solid red;*/
  }

  .biographiParent {
    position: absolute;
    top: 550px;
    right: 0px;
    width: 895px;
    height: 225px;
    color: #4d0d7d;
  }


  .right {
    position: absolute;
    top: 75px;
    right: 0px;
    width: 1021px;
    height: 455px;
  }

  .bio {
    position: absolute;
    top: 34.72px;
    right: 29.53px;
  }

  .bioTitle {
    font-weight: 900;
    font-size: 23px;
    float: right;
    margin-right: 30px;

  }

  .bioTxt {
    width: 870px;
    position: absolute;
    height: 120px;
    line-height: 35px;
    font-size: 19px;
    text-align: right;
    color: #000;
    right: 20px;
    top: 50px;
    border: 0px;
    padding: 10px;
    text-indent: unset;
    border-radius: 30px;
    word-wrap: break-word;
    font-family: BYekan;
  }

  .borderBio {
    border: 1px solid rgb(215, 215, 215);
    top: 60px;
  }

  .changePro {
    position: relative;
    width: 335px;
    height: 67px;
    right: 428px;
    top: 420px;
    background: #eeeeee;
    border-radius: 15px;
    line-height: 67px;
    font-size: 24px;
    text-align: center;
    color: #4d0d7d;
    font-weight: 900;
  }

  .camera {
    position: absolute;
    right: 15px;
    top: 10px;
  }

  .hoverBtn {
    border-style: solid;
    border-radius: 30px;
    background-color: rgb(255, 255, 255);
    box-shadow: 0px 3px 32px 0px rgba(0, 0, 0, 0.24);

  }

  .hoverCheckBtn {
    border: 2px solid #212121 !important;
    box-shadow: 0px 3px 32px 0px rgba(0, 0, 0, 0.24);
  }

  .hoverSaveBtn {
    background-color: #4d0d7d;
    color: #fff;
    font-weight: 100;

  }

  .profileDataBox {
    position: absolute;
    top: 110px;
    right: -55px;
    width: 1020px;
    height: 535px;
    /*border: 1px solid green;*/
  }

  .items {
    position: relative;
    float: right;
    width: 335px;
    height: 60px;
    margin-right: 75px;
    margin-top: 4px;

  }

  .borderItem {
    border-bottom-width: 1px;
    border-bottom-color: rgb(215, 215, 215);
    border-bottom-style: solid;
    /*height: 1px;*/
  }

  .hideBorder {
    border: 1px solid transparent;
  }

  .all {
    position: relative;
    float: right;
    margin-right: 1px;
  }

  .icon {
    top: 7px;
  }

  .title {
    line-height: 44px;
    font-size: 21px;
    text-align: center;
    color: #9e9e9e;
    text-indent: 5px;
    top: 7px;
  }

  .info {
    line-height: 47px;
    font-size: 21px;
    text-align: right;
    color: #9e9e9e;
    background: transparent;
    /* width: 511px; */
    width: 335px;
    height: 45px;
    position: absolute;
    border: 0px;
    white-space: nowrap;
    direction: rtl;
    text-indent: 10px;
    overflow: hidden;

  }

  .inputShow {
    position: absolute;
    border-color: transparent;
    background-color: transparent;

    width: 276px;
    height: 30px;
    top: 0px;
    text-indent: 5px;
    font-size: 21px;
    /* line-height: 35px; */
    /* padding: 0px !important; */
    margin: 0px !important;
    padding-top: 8px;
  }

  .info2 {
    line-height: 50px;
    font-size: 21px;
    text-align: right;
    color: #000000;
    text-indent: 5px;
    background: transparent;
    width: 24%;
    height: 50px;
    position: absolute;
    border: 0px;
    white-space: nowrap;
    direction: rtl;
    overflow: hidden;

  }

  .check {
    display: block;
    position: absolute;
    border: 2px solid #AAAAAA;
    border-radius: 100%;
    height: 20px;
    width: 20px;
    top: 10px;
    z-index: 5;
    background: #fff;
  }

  .selectCheck {
    background-color: #4a0f7d;
  }

  .errors {
    position: absolute;
    width: 415px;
    text-align: right;
    line-height: 50px;
    font-size: 20px;
    top: 560px;
    left: 165px;
    text-align: center;
  }

  .errorTxt {

    min-width: 415px;
    min-height: 50px;
    position: relative;
    font-size: 20px;
    color: #fff;
    border-radius: 30px;
    margin-top: 10px;
  }

  .titleVisitProfile {
    position: absolute;
    height: 60px;
    top: 25px;
    right: 28px;
    direction: rtl;
    color: #4d0d7d;
    white-space: nowrap;

  }

  .size1 {
    font-weight: 900;
    font-size: 25px;
    float: right;
    /*margin-right: 30px;*/
  }

  .size2 {
    font-weight: 100;
    font-size: 18px;
    text-indent: 20px;
    float: right;
    margin-top: 7px;
    direction: rtl;
  }

  .rightChild {
    position: absolute;
    top: -95px;
    right: 0px;
    width: 100%;
    height: 550px;
  }
</style>
